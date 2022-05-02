using AFI_Project.Models;
namespace AFI_Project.Data {
    public class Database : DbContext{
        public Database(DbContextOptions<Database> options) : base(options) {}

        public DbSet<ProfileModel> Profiles { get; set; }
        public DbSet<EventModel> Events { get; set; }
        public DbSet<DisabilityModel> Disabilities { get; set; }
        public DbSet<EventCategoryModel> EventCategories { get; set; }

    }
}

