using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;

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

    //add the users details to the database
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
                //the phone is empty or null if the user does not provide phone number
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
                    @"INSERT INTO Sessions (Session_ID, Email) 
                VALUES (@Session_ID, @Email);";

                command.Parameters.AddWithValue("@Session_ID", session.SessionId);
                command.Parameters.AddWithValue("@Email", session.Email);

                command.ExecuteNonQuery();
            }
        }
    }

    public static void SendConfirmationEmail(string email, string lastname)
    {
        string to = email;
        string from = "capstoneproj202202@gmail.com";
        MailMessage message = new MailMessage(from, to);
        string mailContents =
            $@"Dear  {lastname},<br>
            Thank you for signing in with us<br>
            We are pleased to inform you that your registration has been successfully completed.<br>Now you can start using Pastebook and connect with others.<br><br><br>Regards,<br>Team Pastebook";
        message.Subject = "Welcome to Pastebook";
        message.Body = mailContents;
        message.BodyEncoding = Encoding.UTF8;
        message.IsBodyHtml = true;
        SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
        System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(
            "capstoneproj202202",
            "Dotnetbc2022"
        );
        client.EnableSsl = true;
        client.UseDefaultCredentials = false;
        client.DeliveryMethod = SmtpDeliveryMethod.Network;
        client.Credentials = credentials;
        client.Send(message);
    }

    // function used for adding username (CheckAddUserName,AddUserName, CreateUniqueUsername)
    //check if the username already exist or not
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
                        //if the username exist generate the new username with disambiguator
                        var returnValues = CreateUniqueUsername(rmodel.FirstName, rmodel.LastName);
                        // SendConfirmationEmail(rmodel.Email, rmodel.LastName);
                        AddUsername(rmodel.FirstName, rmodel.LastName, returnValues);
                    }
                }
                //if the username does not exist generate the username from adding firstname and last name lower case
                AddUsername(rmodel.FirstName, rmodel.LastName, rmodel.Username);
            }
        }
    }

    public static SessionModel AddSessionForUser(UserCredentialsModel userCredentials)
    {
        SessionModel session = new SessionModel();
        session.SessionId = null;
        //Check if there is an already existing session id for this user
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT Session_ID FROM Sessions WHERE Email = @Email";
                command.Parameters.AddWithValue("@Email", userCredentials.Email!.ToLower());

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    session.SessionId = reader.GetString(0);
                }
                session.Email = userCredentials.Email.ToLower();
            }
        }
        //if there's no sessionId, generate and add to DB; else return the existing
        if (session.SessionId == null)
        {
            session.SessionId = Guid.NewGuid().ToString();
            AddSession(session);
        }
        return session;
    }

    public static SessionModel? AddSessionWithCredentials(UserCredentialsModel userCredentials)
    {
        SessionModel session = new SessionModel();
        // Check if user credentials exist
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT Password FROM Users WHERE Email = @Email";
                command.Parameters.AddWithValue("@Email", userCredentials.Email);

                var passwordInDb = command.ExecuteScalar();
                var result = BCrypt.Net.BCrypt.Verify(
                    userCredentials.Password,
                    passwordInDb.ToString()
                );
                return result ? AddSessionForUser(userCredentials) : null;
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
                //checking if the username is null with the firstname and last name condition
                cmd.CommandText =
                    @"SELECT * FROM Users WHERE FirstName=@fn AND LastName=@ln AND UserName IS NULL";
                cmd.Parameters.AddWithValue("@fn", fname);
                cmd.Parameters.AddWithValue("@ln", lname);
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    //get the user id and add it to the firstname + lastname to generate username with disambiguator
                    var userId = reader.GetInt32(0);
                    var fullname = fname + lname + userId.ToString();
                    //return a fullname to lower case
                    return (fullname.ToLower());
                }
                return ("");
            }
        }
    }

    //this will add the username if the username does not exist in the table
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

    public static bool CheckEmailIfUnique(string email)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText = $"SELECT * FROM Users WHERE Email='{email}'";
                var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    return true;
                }
                return false;
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
                    found = true;
                    break;
                }
            }
        }
        return found ? session : null;
    }

    public static HomeDataModel? GetHomeData(SessionModel session)
    {
        HomeDataModel homeData = new HomeDataModel();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT * FROM Users WHERE Email = @Email";
                command.Parameters.AddWithValue("@Email", session.Email);

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    homeData.User_ID = reader.GetInt32(0);
                    homeData.FirstName = reader.GetString(1);
                    homeData.LastName = reader.GetString(2);
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
        }
        return homeData;
    }

    public static ProfileDataModel? GetProfileData(string username, int userId)
    {
        ProfileDataModel profileData = new ProfileDataModel();
        bool ownProfilePage = false;
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT * FROM Users WHERE User_ID = @User_ID AND UserName = @UserName";
                command.Parameters.AddWithValue("@User_ID", userId);
                command.Parameters.AddWithValue("@UserName", username);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    ownProfilePage = true;
                    profileData.User_ID = reader.GetInt32(0);
                    profileData.FirstName = reader.GetString(1);
                    profileData.LastName = reader.GetString(2);
                    profileData.Birthday = reader.GetString(5);
                    profileData.Gender = reader.GetString(6);
                    profileData.UserName = reader.GetString(10);
                    if (!reader.IsDBNull(reader.GetOrdinal("Email")))
                    {
                        profileData.Email = reader.GetString(3);
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("Phone")))
                    {
                        profileData.Phone = reader.GetString(7);
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfilePicture")))
                    {
                        profileData.ProfilePicture = reader.GetString(8);
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfileDesc")))
                    {
                        profileData.ProfileDesc = reader.GetString(9);
                    }
                    break;
                }
            }
        }
        return profileData;
    }

    public static List<PostModel>? GetProfilePosts(string username, int? userId)
    {
        List<PostModel> profilePosts = new List<PostModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {

                command.CommandText = "SELECT * FROM Posts WHERE Target_ID = @Target_ID ORDER BY DatePosted DESC;";
                command.Parameters.AddWithValue("@Target_ID", userId);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    PostModel post = new PostModel();
                    post.Post_ID = reader.GetInt32(0);
                    post.DatePosted = reader.GetDateTime(1);
                    post.User_ID = reader.GetInt32(2);
                    post.Content = reader.GetString(3);
                    if (!reader.IsDBNull(reader.GetOrdinal("Image")))
                    {
                        post.Image = reader.GetString(4);
                    }
                    post.Target_ID = reader.GetInt32(5);
                    profilePosts.Add(post);
                    // break;
                }
            }
        }
        return profilePosts;
    }

    public static void EditProfilePicture(int userId, string profilePicture)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"UPDATE Users
                 SET ProfilePicture=@ProfilePicture
                 WHERE User_ID=@User_ID;";

                command.Parameters.AddWithValue("@User_ID", userId);
                command.Parameters.AddWithValue("@ProfilePicture", profilePicture);

                command.ExecuteNonQuery();
            }
        }

    }

    public static HomeDataModel? GetUserById(string id)
    {
        HomeDataModel user = new HomeDataModel();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT * FROM Users WHERE User_ID = @id";
                command.Parameters.AddWithValue("@id", id);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    user.User_ID = reader.GetInt32(0);
                    user.FirstName = reader.GetString(1);
                    user.LastName = reader.GetString(2);
                    user.Password = reader.GetString(4);
                    user.Birthday = reader.GetString(5);
                    user.Gender = reader.GetString(6);
                    user.UserName = reader.GetString(10);
                    if (!reader.IsDBNull(reader.GetOrdinal("Email")))
                    {
                        user.Email = reader.GetString(3);
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("Phone")))
                    {
                        user.Phone = reader.GetString(7);
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfilePicture")))
                    {
                        user.ProfilePicture = reader.GetString(8);
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfileDesc")))
                    {
                        user.ProfileDesc = reader.GetString(9);
                    }
                }
                return user;
            }
        }
    }

    public static void DeleteSessionBySessionId(string id)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM Sessions WHERE Session_ID=@sid";
                cmd.Parameters.AddWithValue("@sid", id);
                cmd.ExecuteNonQuery();
            }
        }
    }

    public static List<LikerModel>? GetLikesByPostId(string id)
    {
        var likers = new List<LikerModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT Id, FirstName, LastName, ProfilePicture FROM Users INNER JOIN LikesInPosts ON Users.User_ID = LikesInPosts.User_ID WHERE LikesInPosts.Post_ID=@id;";
                command.Parameters.AddWithValue("@id", id);
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfilePicture")))
                    {
                        likers.Add(new LikerModel()
                        {
                            Id = reader["Id"].ToString(),
                            FirstName = reader["FirstName"].ToString(),
                            LastName = reader["LastName"].ToString(),
                            ProfilePicture = reader["ProfilePicture"].ToString()
                        });
                    }
                    else
                    {
                        likers.Add(new LikerModel()
                        {
                            Id = reader["Id"].ToString(),
                            FirstName = reader["FirstName"].ToString(),
                            LastName = reader["LastName"].ToString(),
                            ProfilePicture = null
                        });
                    }
                }
                return likers;
            }
        }
    }


    public static List<PostModel>? GetHomePosts(int? userId)
    {
        List<PostModel> homePosts = new List<PostModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {

                command.CommandText = "SELECT * FROM Posts WHERE User_ID = @User_ID ORDER BY DatePosted DESC;";
                command.Parameters.AddWithValue("@User_ID", userId);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    PostModel post = new PostModel();
                    post.Post_ID = reader.GetInt32(0);
                    post.DatePosted = reader.GetDateTime(1);
                    post.User_ID = reader.GetInt32(2);
                    post.Content = reader.GetString(3);
                    if (!reader.IsDBNull(reader.GetOrdinal("Image")))
                    {
                        post.Image = reader.GetString(4);
                    }
                    post.Target_ID = reader.GetInt32(5);
                    homePosts.Add(post);
                    // break;
                }
            }
        }
        return homePosts;
    }

    public static List<CommentModel>? GetCommentsByPostId(string id)
    {
        var comments = new List<CommentModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT Id, FirstName, LastName, ProfilePicture, Content FROM Users INNER JOIN CommentsInPosts ON Users.User_ID = CommentsInPosts.User_ID WHERE CommentsInPosts.Post_ID=@id;";
                command.Parameters.AddWithValue("@id", id);
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfilePicture")))
                    {
                        comments.Add(new CommentModel()
                        {
                            Id = reader["Id"].ToString(),
                            FirstName = reader["FirstName"].ToString(),
                            LastName = reader["LastName"].ToString(),
                            Content = reader["Content"].ToString(),
                            ProfilePicture = reader["ProfilePicture"].ToString()
                        });
                    }
                    else
                    {
                        comments.Add(new CommentModel()
                        {
                            Id = reader["Id"].ToString(),
                            FirstName = reader["FirstName"].ToString(),
                            LastName = reader["LastName"].ToString(),
                            Content = reader["Content"].ToString(),
                            ProfilePicture = null
                        });
                    }
                }
                return comments;
            }
        }
    }

    public static void AddPost(PostModel postDetails)
    {

        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                postDetails.DatePosted = DateTime.Now;
                if (postDetails.Image == null)
                {
                    command.CommandText = @"INSERT INTO Posts (User_ID, DatePosted, Content, Target_ID) 
                    VALUES (@User_ID, @DatePosted, @Content, @Target_ID);";
                }
                else
                {
                    command.CommandText = @"INSERT INTO Posts (User_ID, DatePosted, Content, Image, Target_ID) 
                    VALUES (@User_ID, @DatePosted, @Content, @Image, @Target_ID);";
                    command.Parameters.AddWithValue("@Image", postDetails.Image);
                }

                command.Parameters.AddWithValue("@User_ID", postDetails.User_ID);
                command.Parameters.AddWithValue("@DatePosted", postDetails.DatePosted);
                command.Parameters.AddWithValue("@Content", postDetails.Content);
                command.Parameters.AddWithValue("@Target_ID", postDetails.Target_ID);

                command.ExecuteNonQuery();
            }
        }
    }

}
