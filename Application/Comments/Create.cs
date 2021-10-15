﻿using Application.Activities;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Comments
{
		public class Create
		{
				public class Command : IRequest<Result<CommentDto>>
				{
						public string Body { get; set; }
						public Guid ActivityId { get; set; }
				}

				public class CommandValidator : AbstractValidator<Command>
				{
						public CommandValidator()
						{
								RuleFor(x => x.Body).NotEmpty();
						}
				}

				public class Handler : IRequestHandler<Command, Result<CommentDto>>
				{
						private readonly DataContext context;
						private readonly IUserAccessor userAccessor;
						private readonly IMapper mapper;

						public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
						{
								this.context = context;
								this.userAccessor = userAccessor;
								this.mapper = mapper;
						}

						public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
						{
								var activity = await context.Activities.FindAsync(request.ActivityId);

								if (activity == null) return null;

								var user = await context.Users.Include(x => x.Photos).FirstOrDefaultAsync(u => u.NormalizedUserName == userAccessor.GetUsername().ToLower());

								if (user == null) return null;

								var comment = new Comment
								{
										Author = user,
										Body = request.Body,
										Activity = activity
								};

								activity.Comments.Add(comment);

								var success = await context.SaveChangesAsync() > 0;
								if (success) return Result<CommentDto>.Success(mapper.Map<CommentDto>(comment));

								return Result<CommentDto>.Failure("Failed to add comment");
						}
				}
		}
}
