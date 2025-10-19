using Microsoft.EntityFrameworkCore;
using MyProject.Models;

namespace MyProject.DbServices
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        public DbSet<PersonModel> Persons { get; set; }
    }
}
