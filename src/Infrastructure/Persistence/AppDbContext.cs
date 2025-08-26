using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class AppDbContext : IdentityDbContext<ApplicationUser, IdentityRole<string>, string>
{
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ApplicationUser>(b =>
        {
            b.Property(u => u.PreferredCulture).HasMaxLength(10).HasDefaultValue("en-US");
            b.Property(u => u.CompanyId).HasMaxLength(64);
        });

        builder.Entity<RefreshToken>(b =>
        {
            b.HasKey(x => x.Id);
            b.Property(x => x.TokenHash).IsRequired();
            b.Property(x => x.UserId).IsRequired();
            b.HasIndex(x => new { x.UserId, x.TokenHash }).IsUnique();
        });

        builder.Entity<AuditLog>(b =>
        {
            b.HasKey(x => x.Id);
            b.Property(x => x.Action).HasMaxLength(64).IsRequired();
            b.Property(x => x.EntityType).HasMaxLength(128).IsRequired();
        });
    }
}
