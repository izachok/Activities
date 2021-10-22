using Application.Activities;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
		public class ListActivities
		{
				public class Query : IRequest<Result<List<UserActivityDto>>>
				{
						public string Predicate { get; set; }
						public string Username { get; set; }
				}

				public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
				{
						private readonly DataContext context;
						private readonly IMapper mapper;

						public Handler(DataContext context, IMapper mapper)
						{
								this.context = context;
								this.mapper = mapper;
						}

						public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
						{
								var query = context.ActivityAttendees
										.Where(x => x.AppUser.UserName == request.Username)
										.OrderBy(d => d.Activity.Date)
										.ProjectTo<UserActivityDto>(mapper.ConfigurationProvider).AsQueryable();

								switch (request.Predicate)
								{
										case "hosting":
												query = query.Where(x => x.HostUsername == request.Username);
												break;
										case "past":
												query = query.Where(x => x.Date < DateTime.UtcNow);
												break;
										case "future":
												query = query.Where(x => x.Date >= DateTime.UtcNow);
												break;
										default:
												break;
								}

								var result = await query.ToListAsync();

								return Result<List<UserActivityDto>>.Success(result);
						}
				}
		}
}
