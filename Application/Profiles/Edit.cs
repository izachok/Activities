using Application.Activities;
using Application.Core;
using Application.Interfaces;
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

namespace Application.Profiles
{
		public class Edit
		{
				public class Command : IRequest<Result<Unit>>
				{
						public string DisplayName { get; set; }
						public string Bio { get; set; }
				}

				public class CommandValidator : AbstractValidator<Command>
				{
						public CommandValidator()
						{
								RuleFor(x => x.DisplayName).NotEmpty();
						}
				}

				public class Handler : IRequestHandler<Command, Result<Unit>>
				{
						private readonly DataContext context;
						private readonly IUserAccessor userAccessor;

						public Handler(DataContext context, IUserAccessor userAccessor)
						{
								this.context = context;
								this.userAccessor = userAccessor;
						}

						public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
						{
								var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

								if (user == null) return null;

								user.DisplayName = request.DisplayName ?? user.DisplayName;
								user.Bio = request.Bio ?? user.Bio;

								context.Entry(user).State = EntityState.Modified;

								var result = await context.SaveChangesAsync() > 0;
								if (!result)
								{
										return Result<Unit>.Failure("Failed to update profile");
								}
								return Result<Unit>.Success(Unit.Value);
						}
				}

		}
}
