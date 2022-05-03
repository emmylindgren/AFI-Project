using AFI_Project.Models;
namespace AFI_Project.Data {
    public class Database : DbContext{

        public Database(DbContextOptions<Database> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // REQUESTED INVITES
        modelBuilder.Entity<RequestedInviteModel>()
            .HasKey(p => new { p.Ev_Id, p.Pr_Id });

        modelBuilder.Entity<RequestedInviteModel>()
            .HasOne(p => p.Req_Event)
            .WithMany(p => p.Ev_RequestedInviteModel)
            .HasForeignKey(p => p.Ev_Id);  

        modelBuilder.Entity<RequestedInviteModel>()
            .HasOne(p => p.Req_Profile)
            .WithMany(c => c.Pr_RequestedInviteModel)
            .HasForeignKey(p => p.Pr_Id);

        // DECLINED

        modelBuilder.Entity<DeclinedInviteModel>()
            .HasKey(p => new { p.Ev_Id, p.Pr_Id });
        modelBuilder.Entity<DeclinedInviteModel>()
            .HasOne(p => p.Dec_Event)
            .WithMany(p => p.Ev_DeclinedInviteModel)
            .HasForeignKey(p => p.Ev_Id);

        modelBuilder.Entity<DeclinedInviteModel>()
            .HasOne(p => p.Dec_Profile)
            .WithMany(c => c.Pr_DeclinedInviteModel)
            .HasForeignKey(p => p.Pr_Id);

        // ATTENDING

        modelBuilder.Entity<AttendingModel>()
            .HasKey(p => new { p.Ev_Id, p.Pr_Id });
        modelBuilder.Entity<AttendingModel>()
            .HasOne(p => p.At_Event)
            .WithMany(p => p.Ev_AttendingModel)
            .HasForeignKey(p => p.Ev_Id);

        modelBuilder.Entity<AttendingModel>()
            .HasOne(p => p.At_Profile)
            .WithMany(c => c.Pr_AttendingModel)
            .HasForeignKey(p => p.Pr_Id); 

        // INTERESTED

        modelBuilder.Entity<InterestedModel>()
            .HasKey(p => new { p.Ev_Id, p.Pr_Id });
        modelBuilder.Entity<InterestedModel>()
            .HasOne(p => p.In_Event)
            .WithMany(p => p.Ev_InterestedModel)
            .HasForeignKey(p => p.Ev_Id);

        modelBuilder.Entity<InterestedModel>()
            .HasOne(p => p.In_Profile)
            .WithMany(c => c.Pr_InterestedModel)
            .HasForeignKey(p => p.Pr_Id);
        
        // PROFILEDISABILITIES

        modelBuilder.Entity<ProfileDisabilityModel>()
            .HasKey(p => new { p.Dis_Id, p.Pr_Id });
        modelBuilder.Entity<ProfileDisabilityModel>()
            .HasOne(p => p.Pr_Dis_Disability)
            .WithMany(p => p.Di_Profiles)
            .HasForeignKey(p => p.Dis_Id);

        modelBuilder.Entity<ProfileDisabilityModel>()
            .HasOne(p => p.Pr_Dis_Profile)
            .WithMany(c => c.Pr_Disabilities)
            .HasForeignKey(p => p.Pr_Id);

        // Create many-to-many relationship between tables Event and Categories.
        modelBuilder.Entity<EventCategoryModel>()
            .HasKey(p => new { p.Ev_Id, p.Cat_Id });
        modelBuilder.Entity<EventCategoryModel>()
            .HasOne(p => p.Ev_Cat_Event)
            .WithMany(p => p.Ev_Categories)
            .HasForeignKey(p => p.Ev_Id);
        modelBuilder.Entity<EventCategoryModel>()
            .HasOne(p => p.Ev_Cat_Category)
            .WithMany(c => c.Cat_Events)
            .HasForeignKey(p => p.Cat_Id);
        
        // Create many-to-many relationship between tables Events and Disabilities.
        modelBuilder.Entity<EventDisabilityModel>()
            .HasKey(p => new { p.Ev_Id, p.Dis_Id });
        modelBuilder.Entity<EventDisabilityModel>()
            .HasOne(p => p.Ev_Dis_Event)
            .WithMany(p => p.Ev_Disabilities)
            .HasForeignKey(p => p.Ev_Id);
        modelBuilder.Entity<EventDisabilityModel>()
            .HasOne(p => p.Ev_Dis_Disability)
            .WithMany(c => c.Di_Events)
            .HasForeignKey(p => p.Dis_Id);

}

        public DbSet<ProfileModel> Profiles { get; set; }
        public DbSet<EventModel> Events { get; set; }
        public DbSet<DisabilityModel> Disabilities { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<AttendingModel> Attendees { get; set; }
        public DbSet<InterestedModel> Interested { get; set; }
        public DbSet<RequestedInviteModel> RequestedInvites { get; set; }
        public DbSet<DeclinedInviteModel> DeclinedInvites { get; set; }

        public DbSet<EventCategoryModel> EventCategories { get; set; }
        public DbSet<EventDisabilityModel> EventDisabilities { get; set; }
        public DbSet<ProfileDisabilityModel> ProfileDisabilities { get; set; }
    }
}

