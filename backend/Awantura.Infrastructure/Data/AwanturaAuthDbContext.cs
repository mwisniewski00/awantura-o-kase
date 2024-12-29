using Awantura.Domain.Entities;
using Awantura.Infrastructure.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Awantura.Infrastructure.Data
{
    public class AwanturaAuthDbContext : IdentityDbContext
    {
        private readonly IConfiguration _configuration;

        public AwanturaAuthDbContext(DbContextOptions<AwanturaAuthDbContext> dbContextOptions, IConfiguration configuration) : base(dbContextOptions)
        {
            _configuration = configuration;
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<GameParticipants> GameParticipants { get; set; }
        public DbSet<PlayerGameScore> PlayerGameScores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            var connectionString = ConnectionStringHelper.GetConnectionString(_configuration, "AwanturaAuthConnectionString");
            optionsBuilder.UseSqlServer(connectionString, options =>
            {
                options.MigrationsAssembly(typeof(AwanturaAuthDbContext).Assembly.FullName);
            });
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var playerRoleId = "a4525c03-1ae5-4b69-b79a-3948bdc5f147";
            var adminRoleId = "98063297-e6e0-4b99-a132-1e79147ce720";

            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = playerRoleId,
                    ConcurrencyStamp = playerRoleId,
                    Name = "Player",
                    NormalizedName = "Player".ToUpper(),
                },
                new IdentityRole
                {
                    Id = adminRoleId,
                    ConcurrencyStamp = adminRoleId,
                    Name = "Admin",
                    NormalizedName = "Admin".ToUpper(),
                }
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);

            modelBuilder.Entity<RefreshToken>()
                .HasIndex(r => r.Token)
                .IsUnique();

            modelBuilder.Entity<PlayerGameScore>()
                .HasKey(pgs => new { pgs.GameId, pgs.PlayerId });

            modelBuilder.Entity<Game>()
                .HasMany(g => g.PlayerScores)
                .WithOne(pgs => pgs.Game)
                .HasForeignKey(pgs => pgs.GameId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Game>()
                .HasOne(g => g.GameParticipants)
                .WithOne(gp => gp.Game)
                .HasForeignKey<GameParticipants>(gp => gp.GameId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
