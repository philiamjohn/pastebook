using System.Data.SqlClient;
public class Database
{
    private static string? DB_CONNECTION_STRING;
    
    static Database()
    {
        DB_CONNECTION_STRING = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
    }

    public static string? ReturnCS()
    {
        return DB_CONNECTION_STRING;
    }

    public static void CreateTables()
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText =
                    @"IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' and xtype='U')
                CREATE TABLE Users ( Id INT NOT NULL IDENTITY,
                                          Username VARCHAR(255),
                                          Password VARCHAR(255),
                                          LoginType VARCHAR(255),
                                          FullName VARCHAR(255),
                                          PRIMARY KEY (Id)  );";
                cmd.ExecuteNonQuery();
                cmd.CommandText =
                    @"IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CmsSessionId' and xtype='U')
                CREATE TABLE CmsSessionId (Id VARCHAR(255) NOT NULL,
                                          Username VARCHAR(255),
                                           LoginType VARCHAR(255),
                                          PRIMARY KEY (Id)  );";
                cmd.ExecuteNonQuery();
            }
        }
    }

    public static void DropTables()
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText = "DROP TABLE IF EXISTS Users";
                cmd.ExecuteNonQuery();
            }
        }
    }
}