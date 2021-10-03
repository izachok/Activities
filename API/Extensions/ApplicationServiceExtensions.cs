﻿using Application.Activities;
using Application.Core;
using AutoMapper.Configuration;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
		public static class ApplicationServiceExtensions
		{
				public static IServiceCollection AddApplicationServices(this IServiceCollection services, Microsoft.Extensions.Configuration.IConfiguration config)
				{
						services.AddSwaggerGen(c =>
						{
								c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
						});

						services.AddDbContext<DataContext>(options =>
						{
								options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
						});

						services.AddCors(opt =>
						{
								//TODO fix HTTPS
								opt.AddPolicy("CorsPolicy", policy => policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
						});

						services.AddMediatR(typeof(List.Handler).Assembly);
						services.AddAutoMapper(typeof(MappingProfiles).Assembly);

						return services;
				}
		}
}