﻿using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Photos
{
		public class SetMain
		{
				public class Command : IRequest<Result<Unit>>
				{
						public string Id { get; set; }
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
								var user = await context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

								if (user == null) return null;

								var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

								if (photo == null) return null;

								var currentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);
								if (currentMainPhoto != null) currentMainPhoto.IsMain = false;

								photo.IsMain = true;

								var result = await context.SaveChangesAsync() > 0;
								if (result) return Result<Unit>.Success(Unit.Value);
								return Result<Unit>.Failure("Problem setting main photo");
						}
				}
		}
}
