﻿using Application.Comments;
using Application.Core;
using Application.Interfaces;
using Application.Profiles;
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

namespace Application.Followers
{
		public class List
		{
				public class Query : IRequest<Result<List<Profiles.Profile>>>
				{
						public string Predicate { get; set; }
						public string Username { get; set; }
				}

				public class Handler : IRequestHandler<Query, Result<List<Profiles.Profile>>>
				{
						private readonly DataContext context;
						private readonly IMapper mapper;
						private readonly IUserAccessor userAccessor;

						public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
						{
								this.context = context;
								this.mapper = mapper;
								this.userAccessor = userAccessor;
						}

						public async Task<Result<List<Profiles.Profile>>> Handle(Query request, CancellationToken cancellationToken)
						{
								var profiles = new List<Profiles.Profile>();
								switch (request.Predicate)
								{
										case "followers":
												profiles = await context.UserFollowings
														.Where(x => x.Target.NormalizedUserName == request.Username.ToLower())
														.Select(s => s.Observer)
														.ProjectTo<Profiles.Profile>(mapper.ConfigurationProvider, new { currentUsername = userAccessor.GetUsername() })
														.ToListAsync();
												break;
										case "following":
												profiles = await context.UserFollowings
														.Where(x => x.Observer.NormalizedUserName == request.Username.ToLower())
														.Select(s => s.Target)
														.ProjectTo<Profiles.Profile>(mapper.ConfigurationProvider, new { currentUsername = userAccessor.GetUsername() })
														.ToListAsync();
												break;
								}
								return Result<List<Profiles.Profile>>.Success(profiles);
						}
				}
		}
}