using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using Application.Core;
using API.Extensions;
using FluentValidation.AspNetCore;
using API.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using API.SignalR;

namespace API
{
		public class Startup
		{
				public Startup(IConfiguration configuration)
				{
						Configuration = configuration;
				}

				public IConfiguration Configuration { get; }

				// This method gets called by the runtime. Use this method to add services to the container.
				public void ConfigureServices(IServiceCollection services)
				{

						services.AddControllers(opt =>
						{
								var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
								opt.Filters.Add(new AuthorizeFilter(policy));
						})
								.AddFluentValidation(config =>
						{
								config.RegisterValidatorsFromAssemblyContaining<Create>();
						});
						services.AddApplicationServices(Configuration);
						services.AddIdentityServices(Configuration);
				}

				// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
				public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
				{
						app.UseMiddleware<ExceptionMiddleware>();

						app.UseXContentTypeOptions();
						app.UseReferrerPolicy(opt => opt.NoReferrer());
						app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
						app.UseXfo(opt => opt.Deny());
						app.UseCsp(opt => opt
								.BlockAllMixedContent()
								.StyleSources(s => s.Self())
								.FontSources(s => s.Self())
								.FormActions(s => s.Self())
								.FrameAncestors(s => s.Self())
								.ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com", "blob:", "image"))
								.ScriptSources(s => s.Self().CustomSources("sha256-vOxsBUyb6Yio50HzagY1bC+PGEIM3kZjtEY8Rd7538E="))
						);

						if (env.IsDevelopment())
						{
								//app.UseDeveloperExceptionPage();
								app.UseSwagger();
								app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
						}
						else if (env.IsProduction())
						{
								app.Use(async (context, next) =>
								{
										context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
										await next.Invoke();
								});

						}

						app.UseRouting();
						app.UseDefaultFiles();
						app.UseStaticFiles();

						app.UseCors("CorsPolicy");

						app.UseAuthentication();
						app.UseAuthorization();

						app.UseEndpoints(endpoints =>
						{
								endpoints.MapControllers();
								endpoints.MapHub<ChatHub>("/chat");
								endpoints.MapFallbackToController("Index", "Fallback");
						});
				}
		}
}
