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

    public static void AddSession(SessionModel session)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"INSERT INTO Sessions (Session_ID, Email, Phone) 
                VALUES (@Session_ID, @Email, @Phone);";

                command.Parameters.AddWithValue("@Session_ID", session.SessionId);
                command.Parameters.AddWithValue("@Email", session.Email);
                command.Parameters.AddWithValue("@Phone", session.Phone);

                command.ExecuteNonQuery();
            }
        }
    }

    public static SessionModel AddSessionForUser(UserCredentialsModel userCredentials)
    {
        SessionModel session = new SessionModel();
        session.SessionId = Guid.NewGuid().ToString();
        session.Email = userCredentials.Email;
        session.Phone = userCredentials.Phone;
        AddSession(session);
        return session;
    }

    public static SessionModel? AddSessionWithCredentials(UserCredentialsModel userCredentials)
    {
        SessionModel session = new SessionModel();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT Password FROM Users WHERE Email = @Email OR Phone = @Phone;";
                command.Parameters.AddWithValue("@Email", userCredentials.Email);
                command.Parameters.AddWithValue("@Phone", userCredentials.Phone);

                var passwordInDb = command.ExecuteScalar();
                var result = BCrypt.Net.BCrypt.Verify(userCredentials.Password, passwordInDb.ToString());
                return result ? AddSessionForUser(userCredentials) : null;
            }
        }
    }

    public static SessionModel? GetSessionById(string Id)
    {
        SessionModel session = new SessionModel();
        bool found = false;
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT * FROM Sessions WHERE Session_ID = @Id;";
                command.Parameters.AddWithValue("@Id", Id);

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    session.SessionId = reader.GetString(0);
                    session.Email = reader.GetString(1);
                    session.Phone = reader.GetString(2);
                    found = true;
                    break;
                }
            }
            return found ? session : null;
        }
    }

    public static HomeDataModel? GetHomeData(SessionModel session)
    {
        HomeDataModel homeData = new HomeDataModel();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT * FROM Users WHERE Email = @Email OR Phone = @Phone;";
                command.Parameters.AddWithValue("@Email", session.Email);
                command.Parameters.AddWithValue("@Phone", session.Phone);

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    homeData.User_ID = reader.GetInt32(0);
                    homeData.FirstName = reader.GetString(1);
                    homeData.LastName = reader.GetString(2);
                    homeData.Password = reader.GetString(4);
                    homeData.Birthday = reader.GetString(5);
                    homeData.Gender = reader.GetString(6);
                    homeData.UserName = reader.GetString(10);
                    if (!reader.IsDBNull(reader.GetOrdinal("Email")))
                    {
                        homeData.Email = reader.GetString(3);
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("Phone")))
                    {
                        homeData.Phone = reader.GetString(7);
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfilePicture")))
                    {
                        homeData.ProfilePicture = reader.GetString(8);
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfileDesc")))
                    {
                        homeData.ProfileDesc = reader.GetString(9);
                    }
                    break;
                }
            }
            return homeData;
        }
    }
}