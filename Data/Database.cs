namespace AFI_Project.Data {
    public class Database : DbContext{
        public Database(DbContextOptions<Database> options) : base(options) {}
    }
}

