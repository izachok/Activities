using Application.Followers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
		public class FollowController : BaseApiController
		{
				[HttpGet("{username}")]
				public async Task<IActionResult> GetFollowing(string username, string predicate)
				{
						return HandleResult(await Mediator.Send(new List.Query { Username = username, Predicate = predicate }));
				}

				[HttpPost("{username}")]
				public async Task<IActionResult> Follow(string username)
				{
						return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUsername = username }));
				}
		}
}
