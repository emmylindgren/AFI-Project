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

            
        // Create many-to-many relationship between tables Post and Profiles (likes).
        modelBuilder.Entity<PostLikeModel>()
            .HasKey(p => new { p.Po_Id, p.Pr_Id });
        modelBuilder.Entity<PostLikeModel>()
            .HasOne(p => p.PoLi_Post)
            .WithMany(p => p.Po_Likes)
            .HasForeignKey(p => p.Po_Id);
        modelBuilder.Entity<PostLikeModel>()
            .HasOne(p => p.PoLi_Profile)
            .WithMany(c => c.Pr_PostLikes)
            .HasForeignKey(p => p.Pr_Id);

        // Create many-to-many relationship between tables Comments and Profiles (likes).
        modelBuilder.Entity<CommentLikeModel>()
            .HasKey(p => new { p.Co_Id, p.Pr_Id });
        modelBuilder.Entity<CommentLikeModel>()
            .HasOne(p => p.CoLi_Comment)
            .WithMany(p => p.Co_Likes)
            .HasForeignKey(p => p.Co_Id);
        modelBuilder.Entity<CommentLikeModel>()
            .HasOne(p => p.CoLi_Profile)
            .WithMany(c => c.Pr_CommentLikes)
            .HasForeignKey(p => p.Pr_Id);

        // Create many-to-many relationship between tables Comments and Profiles (likes).
        modelBuilder.Entity<ProfileBadgesModel>()
            .HasKey(pb => new { pb.Ba_Id, pb.Pr_Id });
        modelBuilder.Entity<ProfileBadgesModel>()
            .HasOne(pb => pb.Pr_Ba_Badge)
            .WithMany(b => b.Ba_Profiles)
            .HasForeignKey(pb => pb.Ba_Id);
        modelBuilder.Entity<ProfileBadgesModel>()
            .HasOne(pb => pb.Pr_Ba_Profile)
            .WithMany(p => p.Pr_Badges)
            .HasForeignKey(pb => pb.Pr_Id);

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

        public DbSet<CommentModel> Comments { get; set; }
        public DbSet<PostLikeModel> PostLikes { get; set; }
        public DbSet<CommentLikeModel> CommentLikes { get; set; }
        public DbSet<PostModel> Posts { get; set; }

        public DbSet<BadgeModel> Badges { get; set; }
        public DbSet<ProfileBadgesModel> ProfileBadges { get; set; }
    }
}

