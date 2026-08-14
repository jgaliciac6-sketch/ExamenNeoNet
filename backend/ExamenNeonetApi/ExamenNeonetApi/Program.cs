using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// ================================
// JWT
// ================================

var jwtSettings =
	builder.Configuration.GetSection("Jwt");

string secretKey =
	jwtSettings["SecretKey"]!;

builder.Services
	.AddAuthentication(options =>
	{
		options.DefaultAuthenticateScheme =
			JwtBearerDefaults.AuthenticationScheme;

		options.DefaultChallengeScheme =
			JwtBearerDefaults.AuthenticationScheme;
	})
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters =
			new TokenValidationParameters
			{
				ValidateIssuer = true,
				ValidateAudience = true,
				ValidateLifetime = true,
				ValidateIssuerSigningKey = true,

				ValidIssuer =
					jwtSettings["Issuer"],

				ValidAudience =
					jwtSettings["Audience"],

				IssuerSigningKey =
					new SymmetricSecurityKey(
						Encoding.UTF8.GetBytes(
							secretKey
						)
					),

				ClockSkew = TimeSpan.Zero
			};
	});

builder.Services.AddAuthorization();


// ================================
// CORS
// ================================

const string FrontendCorsPolicy =
	"FrontendCorsPolicy";

builder.Services.AddCors(options =>
{
	options.AddPolicy(
		FrontendCorsPolicy,
		policy =>
		{
			policy
				.WithOrigins(
					"http://localhost:3001"
					, "http://localhost:3000"
				)
				.AllowAnyHeader()
				.AllowAnyMethod();
		});
});

var app = builder.Build();


// ================================
// Pipeline
// ================================

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(FrontendCorsPolicy);

// IMPORTANTE
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();