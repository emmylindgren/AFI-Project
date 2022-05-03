using AFI_Project.Models;
namespace AFI_Project.Data {
    public class Database : DbContext{

        public Database(DbContextOptions<Database> options) : base(options) {}

        public DbSet<ProfileModel> Profiles { get; set; }
        public DbSet<EventModel> Events { get; set; }
        public DbSet<DisabilityModel> Disabilities { get; set; }
        public DbSet<EventCategoryModel> EventCategories { get; set; }
        public DbSet<AttendingModel> Attendees { get; set; }
        public DbSet<InterestedModel> Interested { get; set; }
        public DbSet<RequestedInviteModel> RequestedInvites { get; set; }
        public DbSet<DeclinedInviteModel> DeclinedInvites { get; set; }


    }
}

