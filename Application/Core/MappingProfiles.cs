using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
		public class MappingProfiles : Profile
		{
				public MappingProfiles()
				{
						string currentUsername = null;

						CreateMap<Activity, Activity>();

						CreateMap<Activity, ActivityDto>()
								.ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

						CreateMap<ActivityAttendee, AttendeeDto>()
								.ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
								.ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
								.ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
								.ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(p => p.IsMain).Url))
								.ForMember(s => s.FollowersCount, o => o.MapFrom(x => x.AppUser.Followers.Count))
								.ForMember(s => s.FollowingCount, o => o.MapFrom(x => x.AppUser.Followings.Count))
								.ForMember(d => d.IsFollowing, o => o.MapFrom(f => f.AppUser.Followers.Any(x => x.Observer.NormalizedUserName == currentUsername.ToLower())));

						CreateMap<AppUser, Profiles.Profile>()
								.ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url))
								.ForMember(s => s.FollowersCount, o => o.MapFrom(x => x.Followers.Count))
								.ForMember(s => s.FollowingCount, o => o.MapFrom(x => x.Followings.Count))
								.ForMember(d => d.IsFollowing, o => o.MapFrom(f => f.Followers.Any(x => x.Observer.NormalizedUserName == currentUsername.ToLower())));

						CreateMap<Comment, CommentDto>()
								.ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
								.ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
								.ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(p => p.IsMain).Url));
				}
		}
}
