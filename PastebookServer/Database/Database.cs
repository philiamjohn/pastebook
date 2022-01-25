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
                    @"INSERT INTO Users (FirstName, LastName,Email,Password,Birthday,Gender,Phone) VALUES (@fn,@ln,@e,@p,@b,@g,@pn);";
                cmd.Parameters.AddWithValue("@fn", regmodel.FirstName);
                cmd.Parameters.AddWithValue("@ln", regmodel.LastName);
                cmd.Parameters.AddWithValue("@p", hashPass);
                cmd.Parameters.AddWithValue("@b", regmodel.Birthday);
                cmd.Parameters.AddWithValue("@g", regmodel.Gender);
                cmd.Parameters.AddWithValue("@e", regmodel.Email);
                cmd.Parameters.AddWithValue("@pn", regmodel.Phone);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public static void CheckAddUserName(RegisterModel rmodel)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                System.Console.WriteLine(rmodel);
                cmd.CommandText = @"SELECT * FROM Users WHERE UserName=@un";
                cmd.Parameters.AddWithValue("@un", rmodel.Username);
                // cmd.Parameters.AddWithValue("@ln", rmodel.LastName);
                var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    var checkValue = reader.GetString(10);
                    if (rmodel.Username == checkValue)
                    {
                        var returnValues = CreateUniqueUsername(rmodel.FirstName, rmodel.LastName);
                        // System.Console.WriteLine("yes it is");
                        // System.Console.WriteLine(g + "yes it is");
                        AddUsername(rmodel.FirstName, rmodel.LastName, returnValues);
                    }
                }
                AddUsername(rmodel.FirstName, rmodel.LastName, rmodel.Username);
            }
        }
    }

    public static string CreateUniqueUsername(string fname, string lname)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText =
                    @"SELECT * FROM Users WHERE FirstName=@fn AND LastName=@ln AND UserName IS NULL";
                cmd.Parameters.AddWithValue("@fn", fname);
                cmd.Parameters.AddWithValue("@ln", lname);
                // System.Console.WriteLine(fname + "fname");
                // System.Console.WriteLine(lname + "fname");
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    // System.Console.WriteLine(reader.GetInt32(0) + "im almost there");
                    var userId = reader.GetInt32(0);
                    var fullname = fname + lname + userId.ToString();
                    return (fullname.ToLower());
                }
                return ("");
            }
        }
    }

    public static void AddUsername(string fname, string lname, string fullname)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText =
                    $"UPDATE Users SET UserName=@un WHERE FirstName='{fname}' AND LastName='{lname}' AND UserName IS NULL";
                cmd.Parameters.AddWithValue("@un", fullname);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
