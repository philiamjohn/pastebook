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
               CREATE TABLE Users ( User_ID INT IDENTITY (1,1) NOT NULL,
                                      FirstName VARCHAR(255) NOT NULL,
                                      LastName VARCHAR(255) NOT NULL,
                                      Email VARCHAR(255) ,
                                      Password VARCHAR(255) NOT NULL,
                                      Birthday VARCHAR(255) NOT NULL,
                                      Gender VARCHAR(255),
                                      Phone VARCHAR(255) ,
                                      UserName VARCHAR(255) NOT NULL,
                                      ProfilePicture VARCHAR(MAX) ,
                                      ProfileDesc VARCHAR(2000),
                                      PRIMARY KEY (User_ID) );";
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

    public static void NewRegister(RegisterModel regmodel)
    {
        var hashPass = BCrypt.Net.BCrypt.HashPassword(regmodel.Password);
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText =
                    @"INSERT INTO Users (FirstName, LastName,Password,Birthday,Gender,Username) VALUES (@fn,@ln,@p,@b,@g,@un);";
                cmd.Parameters.AddWithValue("@fn", regmodel.FirstName);
                cmd.Parameters.AddWithValue("@ln", regmodel.LastName);
                cmd.Parameters.AddWithValue("@p", hashPass);
                cmd.Parameters.AddWithValue("@b", regmodel.Birthday);
                cmd.Parameters.AddWithValue("@g", regmodel.Gender);
                cmd.Parameters.AddWithValue("@un", regmodel.Username);

                cmd.ExecuteNonQuery();
            }
        }
    }
}
