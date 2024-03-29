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
                        var returnValues = CreateUniqueUsername(rmodel.FirstName!, rmodel.LastName);
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
                if (passwordInDb != null)
                {
                    var result = BCrypt.Net.BCrypt.Verify(
                    userCredentials.Password,
                    passwordInDb.ToString()
                );
                    return result ? AddSessionForUser(userCredentials) : null;
                }
                else
                {
                    return null;
                }
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
                command.CommandTimeout = 120;

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
                command.CommandTimeout = 120;

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
                }
            }
        }
        return homeData;
    }

    public static PostModel? GetPostById(int id)
    {
        var post = new PostModel();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT * FROM Posts WHERE Post_ID = @id";
                command.Parameters.AddWithValue("@id", id);
                command.CommandTimeout = 120;
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    post.Post_ID = reader.GetInt32(0);
                    post.DatePosted = $"{reader.GetDateTime(1).ToString("f")}";
                    post.User_ID = reader.GetInt32(2);
                    post.Content = reader.GetString(3);
                    if (!reader.IsDBNull(reader.GetOrdinal("Image")))
                    {
                        post.Image = reader.GetString(4);
                    }
                    else
                    {
                        post.Image = null;
                    }
                    post.Target_ID = reader.GetInt32(5);
                }
                return post;
            }
        }
        return null;
    }

    public static List<NotificationModel>? GetNotifications(int userId)
    {
        List<NotificationModel> notifications = new List<NotificationModel>();
        //retrieve unread notifs
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = $@"
                SELECT 
                    Notifs.Notification_ID,
                    Notifs.DateTriggered,
                    Notifs.Target_ID AS ReceivingUser_User_ID,
                    Notifs.User_ID AS TriggerUser_User_ID,
                    Notifs.Type,
                    Notifs.Content,
                    Notifs.ReadStatus,
                    TriggerUser.FirstName AS TriggerUser_FirstName,
                    TriggerUser.LastName AS TriggerUser_LastName
                FROM Notifications AS Notifs
                LEFT JOIN Users AS ReceivingUser ON Notifs.Target_ID = ReceivingUser.User_ID
                LEFT JOIN Users As TriggerUser ON Notifs.User_ID = TriggerUser.User_ID
                WHERE Notifs.ReadStatus = 'unread' AND Notifs.Target_ID = @Target_ID
                ORDER BY Notifs.DateTriggered DESC;";
                command.Parameters.AddWithValue("@Target_ID", userId);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    NotificationModel notification = new NotificationModel();
                    notification.Notification_ID = reader.GetInt32(0);
                    notification.DateTriggered = $"{reader.GetDateTime(1).ToString("f")}";
                    notification.Target_ID = reader.GetInt32(2);
                    notification.User_ID = reader.GetInt32(3);
                    notification.Type = reader.GetString(4);
                    notification.Content = reader.GetString(5);
                    notification.ReadStatus = reader.GetString(6);
                    notification.Name = $"{reader.GetString(7)} {reader.GetString(8)}";
                    notifications.Add(notification);
                }
            }
        }
        //retrieve already read notifs
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = $@"
                SELECT 
                    Notifs.Notification_ID,
                    Notifs.DateTriggered,
                    Notifs.Target_ID AS ReceivingUser_User_ID,
                    Notifs.User_ID AS TriggerUser_User_ID,
                    Notifs.Type,
                    Notifs.Content,
                    Notifs.ReadStatus,
                    TriggerUser.FirstName AS TriggerUser_FirstName,
                    TriggerUser.LastName AS TriggerUser_LastName
                FROM Notifications AS Notifs
                LEFT JOIN Users AS ReceivingUser ON Notifs.Target_ID = ReceivingUser.User_ID
                LEFT JOIN Users As TriggerUser ON Notifs.User_ID = TriggerUser.User_ID
                WHERE (Notifs.ReadStatus = 'read' OR Notifs.ReadStatus = 'accepted') AND Notifs.Target_ID = @Target_ID
                ORDER BY Notifs.DateTriggered DESC;";
                command.Parameters.AddWithValue("@Target_ID", userId);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    NotificationModel notification = new NotificationModel();
                    notification.Notification_ID = reader.GetInt32(0);
                    notification.DateTriggered = $"{reader.GetDateTime(1).ToString("f")}";
                    notification.Target_ID = reader.GetInt32(2);
                    notification.User_ID = reader.GetInt32(3);
                    notification.Type = reader.GetString(4);
                    notification.Content = reader.GetString(5);
                    notification.ReadStatus = reader.GetString(6);
                    notification.Name = $"{reader.GetString(7)} {reader.GetString(8)}";
                    notifications.Add(notification);
                }
            }
        }
        return notifications;
    }

    public static void ChangeNotificationReadStatus(int notificationId)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"UPDATE Notifications
                 SET ReadStatus=@ReadStatus
                 WHERE Notification_ID=@Notification_ID;";

                command.Parameters.AddWithValue("@Notification_ID", notificationId);
                command.Parameters.AddWithValue("@ReadStatus", "read");
                command.CommandTimeout = 120;

                command.ExecuteNonQuery();
            }
        }
    }

    public static void ChangeAllNotificationsReadStatus(int userId)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"UPDATE Notifications
                 SET ReadStatus='read'
                 WHERE ReadStatus='unread' AND Target_ID = @Target_ID;";

                command.Parameters.AddWithValue("@Target_ID", userId);
                command.CommandTimeout = 120;
                command.ExecuteNonQuery();
            }
        }
    }

    public static ProfileDataModel? GetProfileData(string username, int userId)
    {
        ProfileDataModel profileData = new ProfileDataModel();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT * FROM Users WHERE UserName = @UserName";
                command.Parameters.AddWithValue("@UserName", username);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    profileData.User_ID = reader.GetInt32(0);
                    profileData.FirstName = reader.GetString(1);
                    profileData.LastName = reader.GetString(2);
                    profileData.Birthday = reader.GetString(5);
                    profileData.Gender = reader.GetString(6);
                    profileData.UserName = reader.GetString(10);
                    // to avoid errors when data is null
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

                    if (userId == reader.GetInt32(0))
                    {
                        profileData.OwnProfile = true;
                    }
                    else
                    {
                        profileData.OwnProfile = false;
                        profileData.Friends = false;
                        profileData.FriendRequestSent = false;
                    }
                }
            }
        }

        if (profileData.OwnProfile == false)
        {
            using (var db = new SqlConnection(DB_CONNECTION_STRING))
            {
                db.Open();
                using (var command = db.CreateCommand())
                {
                    command.CommandText = "SELECT User_ID FROM FriendsPerUser WHERE User_ID = @User_ID AND Friend_ID = @Friend_ID;";
                    command.Parameters.AddWithValue("@Friend_ID", userId);
                    command.Parameters.AddWithValue("@User_ID", profileData.User_ID);
                    command.CommandTimeout = 120;

                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        profileData.Friends = true;
                    }
                }
            }

            if (profileData.Friends == false)
            {
                using (var db = new SqlConnection(DB_CONNECTION_STRING))
                {
                    db.Open();
                    using (var command = db.CreateCommand())
                    {
                        command.CommandText = "SELECT User_ID FROM Notifications WHERE Type = @Type AND (Target_ID = @Target_ID AND User_ID = @User_ID OR Target_ID = @User_ID AND User_ID = @Target_ID);";
                        command.Parameters.AddWithValue("@Type", "friendrequest");
                        command.Parameters.AddWithValue("@User_ID", userId);
                        command.Parameters.AddWithValue("@Target_ID", profileData.User_ID);
                        command.CommandTimeout = 120;

                        var reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            profileData.FriendRequestSent = true;
                        }
                    }
                }
            }
        }
        return profileData;
    }

    public static void AddFriend(int userId, string username, NotificationModel addFriendNotification)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT User_ID FROM Users WHERE UserName = @UserName;";
                command.Parameters.AddWithValue("@UserName", username);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    addFriendNotification.Target_ID = reader.GetInt32(0);
                }
            }
        }
        // notify user that a friend request has been sent by adding an entry to the notifications table
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {

                command.CommandText =
                    @"INSERT INTO Notifications (DateTriggered, Target_ID, User_ID, Type, Content, ReadStatus) 
                    VALUES (@DateTriggered, @Target_ID, @User_ID, @Type, @Content, @ReadStatus);";

                command.Parameters.AddWithValue("@DateTriggered", DateTime.Now);
                command.Parameters.AddWithValue("@Target_ID", addFriendNotification.Target_ID);
                command.Parameters.AddWithValue("@User_ID", addFriendNotification.User_ID);
                command.Parameters.AddWithValue("@Type", addFriendNotification.Type);
                command.Parameters.AddWithValue("@Content", addFriendNotification.Content);
                command.Parameters.AddWithValue("@ReadStatus", addFriendNotification.ReadStatus);
                command.CommandTimeout = 120;

                command.ExecuteNonQuery();
            }
        }
    }

    public static bool IsUserFriendsWithPostOwnerOrTarget(int loggedInUserId, int postOwnerUserId, int postTargetUserId)
    {
        bool isUserFriendsWithPostOwnerOrTarget = false;
        //if the currently logged in user is the post owner or target, they could view the post
        if (loggedInUserId == postOwnerUserId || loggedInUserId == postTargetUserId)
        {
            isUserFriendsWithPostOwnerOrTarget = true;
            return isUserFriendsWithPostOwnerOrTarget;
        }
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "SELECT User_ID FROM FriendsPerUser WHERE (User_ID = @User_ID AND Friend_ID = @PostOwner) OR (User_ID = @User_ID AND Friend_ID = @PostTarget);";
                command.Parameters.AddWithValue("@User_ID", loggedInUserId);
                command.Parameters.AddWithValue("@PostOwner", postOwnerUserId);
                command.Parameters.AddWithValue("@PostTarget", postTargetUserId);

                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    isUserFriendsWithPostOwnerOrTarget = true;
                    break;
                }
            }
        }
        return isUserFriendsWithPostOwnerOrTarget;
    }

    public static List<NotificationModel>? GetFriendRequests(int userId)
    {
        List<NotificationModel> friendRequests = new List<NotificationModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = $@"
                SELECT 
                    Notifs.Notification_ID,
                    Notifs.DateTriggered,
                    Notifs.Target_ID AS ReceivingUser_User_ID,
                    Notifs.User_ID AS TriggerUser_User_ID,
                    Notifs.Type,
                    Notifs.Content,
                    Notifs.ReadStatus,
                    TriggerUser.FirstName AS TriggerUser_FirstName,
                    TriggerUser.LastName AS TriggerUser_LastName,
                    TriggerUser.ProfilePicture AS TriggerUser_ProfilePicture,
                    TriggerUser.Username AS TriggerUser_Username
                FROM Notifications AS Notifs
                LEFT JOIN Users AS ReceivingUser ON Notifs.Target_ID = ReceivingUser.User_ID
                LEFT JOIN Users As TriggerUser ON Notifs.User_ID = TriggerUser.User_ID
                WHERE (Notifs.ReadStatus = 'unread' OR Notifs.ReadStatus = 'read') AND Notifs.Target_ID = @Target_ID AND Notifs.Type = 'friendrequest'
                ORDER BY Notifs.DateTriggered DESC;";
                command.Parameters.AddWithValue("@Target_ID", userId);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    NotificationModel friendRequest = new NotificationModel();
                    friendRequest.Notification_ID = reader.GetInt32(0);
                    friendRequest.DateTriggered = $"{reader.GetDateTime(1).ToString("f")}";
                    friendRequest.Target_ID = reader.GetInt32(2);
                    friendRequest.User_ID = reader.GetInt32(3);
                    friendRequest.Type = reader.GetString(4);
                    friendRequest.Content = reader.GetString(5);
                    friendRequest.ReadStatus = reader.GetString(6);
                    friendRequest.Name = $"{reader.GetString(7)} {reader.GetString(8)}";
                    if (!reader.IsDBNull(reader.GetOrdinal("TriggerUser_ProfilePicture")))
                    {
                        friendRequest.ProfilePicture = reader.GetString(9);
                    }
                    friendRequest.UserName = reader.GetString(10);
                    friendRequests.Add(friendRequest);
                }
            }
        }
        return friendRequests;
    }

    public static void ConfirmFriendRequest(int notificationId, int currentUserId, int requestorUserId)
    {
        //change existing friend request notification to accepted
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"UPDATE Notifications
                 SET ReadStatus=@ReadStatus
                 WHERE Notification_ID=@Notification_ID;";

                command.Parameters.AddWithValue("@Notification_ID", notificationId);
                command.Parameters.AddWithValue("@ReadStatus", "accepted");
                command.CommandTimeout = 120;

                command.ExecuteNonQuery();
            }
        }
        //add the two users to FriendsPerUser table
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"INSERT INTO FriendsPeruser (User_ID, Friend_ID) 
                    VALUES (@User_ID, @Friend_ID);";

                command.Parameters.AddWithValue("@User_ID", currentUserId);
                command.Parameters.AddWithValue("@Friend_ID", requestorUserId);
                command.CommandTimeout = 120;

                command.ExecuteNonQuery();
            }
        }
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"INSERT INTO FriendsPeruser (User_ID, Friend_ID) 
                    VALUES (@User_ID, @Friend_ID);";

                command.Parameters.AddWithValue("@User_ID", requestorUserId);
                command.Parameters.AddWithValue("@Friend_ID", currentUserId);
                command.CommandTimeout = 120;

                command.ExecuteNonQuery();
            }
        }
        // add notification to notify requestor that the friend request has been accepted
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"INSERT INTO Notifications (DateTriggered, Target_ID, User_ID, Type, Content, ReadStatus) 
                    VALUES (@DateTriggered, @Target_ID, @User_ID, @Type, @Content, @ReadStatus);";

                command.Parameters.AddWithValue("@DateTriggered", DateTime.Now);
                command.Parameters.AddWithValue("@Target_ID", requestorUserId);
                command.Parameters.AddWithValue("@User_ID", currentUserId);
                command.Parameters.AddWithValue("@Type", "requestaccepted");
                command.Parameters.AddWithValue("@Content", "");
                command.Parameters.AddWithValue("@ReadStatus", "unread");
                command.CommandTimeout = 120;

                command.ExecuteNonQuery();
            }
        }
    }

    public static void DeleteFriendRequest(int notificationId)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = "DELETE FROM Notifications WHERE Notification_ID = @Notification_ID";
                command.Parameters.AddWithValue("@Notification_ID", notificationId);
                command.CommandTimeout = 120;
                command.ExecuteNonQuery();
            }
        }
    }

    public static List<PostModel>? GetProfilePosts(string username, int fetchCount)
    {
        //get the userId of username
        int targetId = -1;
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    "SELECT User_ID FROM Users WHERE UserName = @Username;";
                command.Parameters.AddWithValue("@Username", username);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    targetId = reader.GetInt32(0);
                }
            }
        }

        List<PostModel> profilePosts = new List<PostModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"SELECT * FROM Posts WHERE Target_ID = @Target_ID OR User_ID = @Target_ID 
                    ORDER BY DatePosted DESC
                    OFFSET @RowsSkipped ROWS 
                    FETCH NEXT 10 ROWS ONLY;";
                command.Parameters.AddWithValue("@Target_ID", targetId);
                command.Parameters.AddWithValue("@RowsSkipped", (fetchCount - 1) * 10);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    PostModel post = new PostModel();
                    post.Post_ID = reader.GetInt32(0);
                    post.DatePosted = $"{reader.GetDateTime(1).ToString("f")}";
                    post.User_ID = reader.GetInt32(2);
                    if (!reader.IsDBNull(reader.GetOrdinal("Content")))
                    {
                        post.Content = reader.GetString(3);
                    }
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
                command.CommandTimeout = 120;

                command.ExecuteNonQuery();
            }
        }
    }

    public static void EditProfileDescription(int userId, string profileDescription)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"UPDATE Users
                 SET ProfileDesc=@ProfileDesc
                 WHERE User_ID=@User_ID;";

                command.Parameters.AddWithValue("@User_ID", userId);
                command.Parameters.AddWithValue("@ProfileDesc", profileDescription);
                command.CommandTimeout = 120;

                command.ExecuteNonQuery();
            }
        }
    }

    public static HomeDataModel? GetUserById(int id)
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
                command.CommandText =
                    "SELECT LikesInPosts.Like_ID, LikesInPosts.User_ID, Users.FirstName, Users.LastName, Users.ProfilePicture, Users.UserName FROM Users INNER JOIN LikesInPosts ON Users.User_ID = LikesInPosts.User_ID WHERE LikesInPosts.Post_ID=@id;";
                command.Parameters.AddWithValue("@id", id);
                command.CommandTimeout = 120;
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfilePicture")))
                    {
                        likers.Add(
                            new LikerModel()
                            {
                                Like_ID = reader["Like_ID"].ToString(),
                                UserId = reader["User_ID"].ToString(),
                                UserName = reader["UserName"].ToString(),
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                ProfilePicture = reader["ProfilePicture"].ToString()
                            }
                        );
                    }
                    else
                    {
                        likers.Add(
                            new LikerModel()
                            {
                                Like_ID = reader["Like_ID"].ToString(),
                                UserName = reader["UserName"].ToString(),
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                ProfilePicture = null
                            }
                        );
                    }
                }
                return likers;
            }
        }
    }

    public static List<PostModel>? GetHomePosts(int? userId, int fetchCount)
    {
        List<PostModel> homePosts = new List<PostModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                @"SELECT DISTINCT
                    Posts.Post_ID,
                    Posts.DatePosted,
                    Posts.User_ID,
                    Posts.Content,
                    Posts.Image,
                    Posts.Target_ID
                FROM Posts 
                LEFT JOIN FriendsPerUser ON FriendsPerUser.Friend_ID = Posts.User_ID
                WHERE (FriendsPerUser.User_ID = @User_ID OR Posts.User_ID = @User_ID)
                ORDER BY DatePosted DESC
                OFFSET @RowsSkipped ROWS 
                FETCH NEXT 10 ROWS ONLY;";
                command.Parameters.AddWithValue("@User_ID", userId);
                command.Parameters.AddWithValue("@RowsSkipped", (fetchCount - 1) * 10);
                command.CommandTimeout = 120;
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    PostModel post = new PostModel();
                    post.Post_ID = reader.GetInt32(0);
                    post.DatePosted = $"{reader.GetDateTime(1).ToString("f")}";
                    post.User_ID = reader.GetInt32(2);
                    if (!reader.IsDBNull(reader.GetOrdinal("Content")))
                    {
                        post.Content = reader.GetString(3);
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("Image")))
                    {
                        post.Image = reader.GetString(4);
                    }
                    post.Target_ID = reader.GetInt32(5);
                    homePosts.Add(post);
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
                command.CommandText =
                    "SELECT CommentsInPosts.Comment_ID, Users.UserName, Users.FirstName, Users.LastName, Users.ProfilePicture, CommentsInPosts.Content FROM Users INNER JOIN CommentsInPosts ON Users.User_ID = CommentsInPosts.User_ID WHERE CommentsInPosts.Post_ID=@id;";
                command.Parameters.AddWithValue("@id", id);
                command.CommandTimeout = 120;
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfilePicture")))
                    {
                        comments.Add(
                            new CommentModel()
                            {
                                Comment_ID = reader["Comment_ID"].ToString(),
                                UserName = reader["UserName"].ToString(),
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                Content = reader["Content"].ToString(),
                                ProfilePicture = reader["ProfilePicture"].ToString()
                            }
                        );
                    }
                    else
                    {
                        comments.Add(
                            new CommentModel()
                            {
                                Comment_ID = reader["Comment_ID"].ToString(),
                                UserName = reader["UserName"].ToString(),
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                Content = reader["Content"].ToString(),
                                ProfilePicture = null
                            }
                        );
                    }
                }
                return comments;
            }
        }
    }

    public static void AddPost(PostModel postDetails, bool postToFriendsProfile)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                // postDetails.DatePosted = DateTime.Now;
                if (postDetails.Image == null)
                {
                    command.CommandText =
                        @"INSERT INTO Posts (User_ID, DatePosted, Content, Target_ID) 
                    VALUES (@User_ID, @DatePosted, @Content, @Target_ID);";
                }
                else
                {
                    command.CommandText =
                        @"INSERT INTO Posts (User_ID, DatePosted, Content, Image, Target_ID) 
                    VALUES (@User_ID, @DatePosted, @Content, @Image, @Target_ID);";
                    command.Parameters.AddWithValue("@Image", postDetails.Image);
                }

                command.Parameters.AddWithValue("@User_ID", postDetails.User_ID);
                command.Parameters.AddWithValue("@DatePosted", DateTime.Now);
                command.Parameters.AddWithValue("@Content", postDetails.Content);
                command.Parameters.AddWithValue("@Target_ID", postDetails.Target_ID);
                command.CommandTimeout = 120;

                command.ExecuteNonQuery();
            }
        }
        // notify user if a friend posted to his profile
        if (postToFriendsProfile == true)
        {
            //determine the post_ID of the recently added post
            using (var db = new SqlConnection(DB_CONNECTION_STRING))
            {
                db.Open();
                using (var command = db.CreateCommand())
                {
                    command.CommandText = "SELECT TOP 1 Post_ID FROM Posts WHERE Target_ID = @Target_ID AND User_ID = @User_ID ORDER BY DatePosted DESC";
                    command.Parameters.AddWithValue("@Target_ID", postDetails.Target_ID);
                    command.Parameters.AddWithValue("@User_ID", postDetails.User_ID);
                    command.CommandTimeout = 120;
                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        postDetails.Post_ID = reader.GetInt32(0);
                    }
                }
            }
            // add notification
            using (var db = new SqlConnection(DB_CONNECTION_STRING))
            {
                db.Open();
                using (var command = db.CreateCommand())
                {

                    command.CommandText =
                        @"INSERT INTO Notifications (DateTriggered, Target_ID, User_ID, Type, Content, ReadStatus) 
                    VALUES (@DateTriggered, @Target_ID, @User_ID, @Type, @Content, @ReadStatus);";

                    command.Parameters.AddWithValue("@DateTriggered", DateTime.Now);
                    command.Parameters.AddWithValue("@Target_ID", postDetails.Target_ID);
                    command.Parameters.AddWithValue("@User_ID", postDetails.User_ID);
                    command.Parameters.AddWithValue("@Type", "friendpostedonprofile");
                    command.Parameters.AddWithValue("@Content", $"{postDetails.Post_ID}");
                    command.Parameters.AddWithValue("@ReadStatus", "unread");
                    command.CommandTimeout = 120;

                    command.ExecuteNonQuery();
                }
            }
        }
    }

    public static void AddAlbum(AlbumModel albumDetails)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                albumDetails.AlbumDate = DateTime.Now;
                command.CommandText =
                    @"INSERT INTO Albums (AlbumName, DateCreated) 
                    VALUES (@AlbumName, @DateCreated);";

                command.Parameters.AddWithValue("@AlbumName", albumDetails.AlbumName);
                command.Parameters.AddWithValue("@DateCreated", albumDetails.AlbumDate);

                command.CommandTimeout = 120;
                command.ExecuteNonQuery();
            }
        }
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"SELECT MAX(Album_ID) 
                    FROM Albums;
                    ";
                command.CommandTimeout = 120;
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    albumDetails.Album_ID = reader.GetInt32(0);
                }
            }
        }
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"INSERT INTO AlbumPerUser (User_ID, Album_ID) 
                    VALUES (@User_ID, @Album_ID);";

                command.Parameters.AddWithValue("@User_ID", albumDetails.User_ID);
                command.Parameters.AddWithValue("@Album_ID", albumDetails.Album_ID);

                command.CommandTimeout = 120;
                command.ExecuteNonQuery();
            }
        }
    }

    public static void UserCredentialUpdate(HomeDataModel model)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText =
                    @"UPDATE Users SET FirstName=@fn,LastName=@ln,Birthday=@b,Gender=@g,Phone=@p WHERE User_ID=@id";
                cmd.Parameters.AddWithValue("@fn", model.FirstName);
                cmd.Parameters.AddWithValue("@ln", model.LastName);
                cmd.Parameters.AddWithValue("@b", model.Birthday);
                cmd.Parameters.AddWithValue("@g", model.Gender);
                cmd.Parameters.AddWithValue("@p", model.Phone);
                cmd.Parameters.AddWithValue("@id", model.User_ID);
                cmd.CommandTimeout = 120;

                cmd.ExecuteNonQuery();
            }
        }
    }

    public static void UpdateUserEmail(HomeDataModel model)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText = @"UPDATE Users SET Email=@email WHERE User_ID=@id";
                cmd.Parameters.AddWithValue("@email", model.Email);
                cmd.Parameters.AddWithValue("@id", model.User_ID);
                cmd.CommandTimeout = 120;
                cmd.ExecuteNonQuery();
            }
        }
    }

    public static List<AlbumModel>? GetAlbum(int userId)
    {
        List<AlbumModel> albumDetails = new List<AlbumModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"SELECT AlbUser.Album_ID, Albums.AlbumName, Albums.DateCreated
                    FROM AlbumPerUser AS AlbUser
                    LEFT JOIN Users ON AlbUser.User_ID = Users.User_ID
                    LEFT JOIN Albums ON AlbUser.Album_ID = Albums.Album_ID
                    WHERE AlbUser.User_ID = @User_ID 
                    ORDER BY DateCreated DESC;";
                command.Parameters.AddWithValue("@User_ID", userId);

                command.CommandTimeout = 120;
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    AlbumModel album = new AlbumModel();
                    album.Album_ID = reader.GetInt32(0);
                    album.AlbumName = reader.GetString(1);
                    album.AlbumDate = reader.GetDateTime(2);
                    albumDetails.Add(album);
                }
            }
        }
        return albumDetails;
    }

    public static bool EditEmailCheckPassword(HomeDataModel model)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText = "SELECT Password FROM Users WHERE User_ID=@id";
                cmd.Parameters.AddWithValue("@id", model.User_ID);
                cmd.CommandTimeout = 120;

                var passwordInDb = cmd.ExecuteScalar();
                var result = BCrypt.Net.BCrypt.Verify(model.Password, passwordInDb.ToString());
                return result ? true : false;
            }
        }
    }

    public static void ChangePassBaseOnID(HomeDataModel model)
    {
        var hashPass = BCrypt.Net.BCrypt.HashPassword(model.Password);
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText = @"UPDATE Users SET Password=@p WHERE User_ID=@id";
                cmd.Parameters.AddWithValue("@p", hashPass);
                cmd.Parameters.AddWithValue("@id", model.User_ID);
                cmd.CommandTimeout = 120;
                cmd.ExecuteNonQuery();
            }
        }
    }

    public static List<ProfileDataModel> SearchUsers(string filterKeyword)
    {
        List<ProfileDataModel> profiles = new List<ProfileDataModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                // determine if the filterKeyword contains more than one word 
                if (filterKeyword.Split(' ').Length <= 1)
                {
                    //if filterKeyword is only one character, select 5 entries only to avoid timeout
                    if (filterKeyword.Length <= 1)
                    {
                        command.CommandText = @$"
                        SELECT TOP (5) User_ID, FirstName, LastName, ProfilePicture, UserName
                        FROM Users 
                        WHERE FirstName LIKE '{filterKeyword}%' 
                        OR FirstName LIKE '%{filterKeyword}%'
                        OR LastName LIKE '{filterKeyword}%' 
                        OR LastName LIKE '%{filterKeyword}%';";
                    }
                    else
                    {
                        command.CommandText = @$"
                        SELECT User_ID, FirstName, LastName, ProfilePicture, UserName
                        FROM Users WHERE CONTAINS(FirstName, @FilterKeyword)
                        OR CONTAINS(LastName, @FilterKeyword)
                        OR FirstName LIKE '{filterKeyword}%' 
                        OR FirstName LIKE '%{filterKeyword}%'
                        OR LastName LIKE '{filterKeyword}%' 
                        OR LastName LIKE '%{filterKeyword}%';";
                    }
                }
                // if more than one word
                else
                {
                    command.CommandText = @$"
                    SELECT User_ID, FirstName, LastName, ProfilePicture, UserName
                    FROM Users WHERE FREETEXT(FirstName, '{filterKeyword}')
                    OR FREETEXT(LastName, '{filterKeyword}');";
                }

                command.Parameters.AddWithValue("@FilterKeyword", filterKeyword);
                command.CommandTimeout = 120;
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    ProfileDataModel profile = new ProfileDataModel();
                    profile.User_ID = reader.GetInt32(0);
                    profile.FirstName = reader.GetString(1);
                    profile.LastName = reader.GetString(2);
                    profile.UserName = reader.GetString(4);
                    if (!reader.IsDBNull(reader.GetOrdinal("ProfilePicture")))
                    {
                        profile.ProfilePicture = reader.GetString(3);
                    }
                    profiles.Add(profile);
                }
            }
        }
        return profiles;
    }
    
    public static void UpdateUserEmailSessions(SessionModel model)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText = @"UPDATE Sessions SET Email=@email WHERE Session_ID=@id";
                cmd.Parameters.AddWithValue("@email", model.Email);
                cmd.Parameters.AddWithValue("@id", model.SessionId);
                cmd.CommandTimeout = 120;
                cmd.ExecuteNonQuery();
            }
        }
    }
    public static List<HomeDataModel>? GetFriendsList(int userId)
    {
        List<HomeDataModel> friends = new List<HomeDataModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = $@"SELECT 
                                                FrndUser.User_ID,
                                                MainUser.FirstName,
                                                MainUser.LastName,
                                                MainUser.ProfilePicture,
                                                MainUser.Username,
                                                FrndUser.Friend_ID AS Friend_User_ID,
                                                Friend.FirstName AS Friend_FirstName,
                                                Friend.LastName AS Friend_LastName,
                                                Friend.ProfilePicture AS Friend_ProfilePicture,
                                                Friend.Username AS Friend_Username
                                                FROM FriendsPerUser AS FrndUser
                                                LEFT JOIN Users AS MainUser ON FrndUser.User_ID = MainUser.User_ID
                                                LEFT JOIN Users As Friend ON FrndUser.Friend_ID = Friend.User_ID
                WHERE FrndUser.User_ID = @Target_ID ORDER BY Friend_FirstName ASC;";
                command.Parameters.AddWithValue("@Target_ID", userId);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    HomeDataModel friend = new HomeDataModel();
                    friend.FirstName = reader.GetString(6);
                    friend.LastName = reader.GetString(7);
                    friend.User_ID = reader.GetInt32(5);
                    friend.UserName = reader.GetString(9);
                    if (!reader.IsDBNull(reader.GetOrdinal("Friend_ProfilePicture")))
                    {
                        friend.ProfilePicture = reader.GetString(8);
                    }
                    friends.Add(friend);
                }
            }
        }
        return friends;
    }
    public static List<HomeDataModel>? GetFriendsListProfilePage(int userId)
    {
        List<HomeDataModel> friends = new List<HomeDataModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = $@"SELECT TOP 9
                                                FrndUser.User_ID,
                                                MainUser.FirstName,
                                                MainUser.LastName,
                                                MainUser.ProfilePicture,
                                                MainUser.Username,
                                                FrndUser.Friend_ID AS Friend_User_ID,
                                                Friend.FirstName AS Friend_FirstName,
                                                Friend.LastName AS Friend_LastName,
                                                Friend.ProfilePicture AS Friend_ProfilePicture,
                                                Friend.Username AS Friend_Username
                                                FROM FriendsPerUser AS FrndUser
                                                LEFT JOIN Users AS MainUser ON FrndUser.User_ID = MainUser.User_ID
                                                LEFT JOIN Users As Friend ON FrndUser.Friend_ID = Friend.User_ID
                WHERE FrndUser.User_ID = @Target_ID ORDER BY Friend_FirstName ASC;";
                command.Parameters.AddWithValue("@Target_ID", userId);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    HomeDataModel friend = new HomeDataModel();
                    friend.FirstName = reader.GetString(6);
                    friend.LastName = reader.GetString(7);
                    friend.User_ID = reader.GetInt32(5);
                    friend.UserName = reader.GetString(9);
                    if (!reader.IsDBNull(reader.GetOrdinal("Friend_ProfilePicture")))
                    {
                        friend.ProfilePicture = reader.GetString(8);
                    }
                    friends.Add(friend);
                }
            }
        }
        return friends;
    }

    public static void DeletePostByPostId(int? id)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM Posts WHERE Post_ID=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
    public static void UpdatePost(PostModel model)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText = @"UPDATE Posts SET Content=@c WHERE Post_ID=@id";
                cmd.Parameters.AddWithValue("@c", model.Content);
                cmd.Parameters.AddWithValue("@id", model.Post_ID);
                cmd.ExecuteNonQuery();
            }
        }
    }
    public static void AddComment(string postID, string authorID, string content, string userID)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = @"INSERT INTO CommentsInPosts (Content, User_ID, Post_ID, Date) 
                    VALUES (@content, @userId, @postId, @date);";

                command.Parameters.AddWithValue("@content", content);
                command.Parameters.AddWithValue("@userId", userID);
                command.Parameters.AddWithValue("@postId", postID);
                command.Parameters.AddWithValue("@date", DateTime.Now);
                command.CommandTimeout = 120;
                command.ExecuteNonQuery();
            }
        }
        // send notif if comment is not to own post
        if (authorID != userID)
        {
            using (var db = new SqlConnection(DB_CONNECTION_STRING))
            {
                //add notification
                db.Open();
                using (var command = db.CreateCommand())
                {
                    command.CommandText = @"INSERT INTO Notifications (DateTriggered, Target_ID, User_ID, Type, Content, ReadStatus) 
                    VALUES (@date, @target, @source, @type, @content, @status);";

                    command.Parameters.AddWithValue("@date", DateTime.Now);
                    command.Parameters.AddWithValue("@target", authorID);
                    command.Parameters.AddWithValue("@source", userID);
                    command.Parameters.AddWithValue("@type", "comment");
                    command.Parameters.AddWithValue("@content", postID);
                    command.Parameters.AddWithValue("@status", "unread");
                    command.CommandTimeout = 120;
                    command.ExecuteNonQuery();
                }
            }
        }
    }

    public static void AddLike(string postID, string authorID, string userID)
    {
        var alreadyLiked = false;
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = @"SELECT User_ID FROM LikesInPosts WHERE (User_ID=@userId AND Post_ID=@postId);";
                command.Parameters.AddWithValue("@userId", userID);
                command.Parameters.AddWithValue("@postId", postID);
                command.CommandTimeout = 120;

                var reader = command.ExecuteReader();
                if (reader.Read())
                {
                    alreadyLiked = true;
                }
            }
        }
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            if (!alreadyLiked)
            {
                using (var command = db.CreateCommand())
                {
                    command.CommandText = @"INSERT INTO LikesInPosts (User_ID, Post_ID) 
                        VALUES (@userId, @postId);";

                    command.Parameters.AddWithValue("@userId", userID);
                    command.Parameters.AddWithValue("@postId", postID);
                    command.ExecuteNonQuery();
                }
                //add notif if like is not to own post
                if (authorID != userID)
                {
                    using (var command = db.CreateCommand())
                    {
                        command.CommandText = @"INSERT INTO Notifications (DateTriggered, Target_ID, User_ID, Type, Content, ReadStatus) 
                        VALUES (@date, @target, @source, @type, @content, @status);";

                        command.Parameters.AddWithValue("@date", DateTime.Now);
                        command.Parameters.AddWithValue("@target", authorID);
                        command.Parameters.AddWithValue("@source", userID);
                        command.Parameters.AddWithValue("@type", "like");
                        command.Parameters.AddWithValue("@content", postID);
                        command.Parameters.AddWithValue("@status", "unread");
                        command.ExecuteNonQuery();
                    }
                }
            }
        }
    }

    public static void RemoveLike(string postID, string userID)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText = @"DELETE FROM LikesInPosts WHERE (User_ID=@userId AND Post_ID=@postId);";

                command.Parameters.AddWithValue("@userId", userID);
                command.Parameters.AddWithValue("@postId", postID);
                command.ExecuteNonQuery();
            }
            using (var command = db.CreateCommand())
            {
                command.CommandText = @"DELETE FROM Notifications WHERE (Type=@type AND User_ID=@userId AND Content=@postId);";

                command.Parameters.AddWithValue("@type", "like");
                command.Parameters.AddWithValue("@userId", userID);
                command.Parameters.AddWithValue("@postId", postID);
                command.ExecuteNonQuery();
            }
        }
    }

    public static List<AlbumModel>? GetPhotos(int albumId)
    {
        List<AlbumModel> photoDetails = new List<AlbumModel>();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"SELECT 
                PhAlb.Album_ID,
                Albums.AlbumName,
                Albums.DateCreated AS AlbumDate,
                Albums.Caption AS AlbumCaption,
                PhAlb.Photo_ID,
                Photos.Image,
                Photos.DateUploaded,
                Photos.Caption AS PhotoCaption
                FROM PhotosPerAlbum AS PhAlb
                LEFT JOIN Albums ON PhAlb.Album_ID = Albums.Album_ID
                LEFT JOIN Photos ON PhAlb.Photo_ID = Photos.Photo_ID
                WHERE PhAlb.Album_ID = @Album_ID;";
                command.Parameters.AddWithValue("@Album_ID", albumId);

                command.CommandTimeout = 120;
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    AlbumModel album = new AlbumModel();
                    album.Album_ID = reader.GetInt32(0);
                    album.AlbumName = reader.GetString(1);
                    album.AlbumDate = reader.GetDateTime(2);
                    if (!reader.IsDBNull(reader.GetOrdinal("AlbumCaption")))
                    {
                        album.AlbumCaption = reader.GetString(3);
                    }
                    album.Photo_ID = reader.GetInt32(4);
                    album.ImageFile = reader.GetString(5);
                    album.PhotoDate = reader.GetDateTime(6);
                    if (!reader.IsDBNull(reader.GetOrdinal("PhotoCaption")))
                    {
                        album.PhotoCaption = reader.GetString(7);
                    }
                    photoDetails.Add(album);
                }
            }
        }
        return photoDetails;
    }

    public static void AddPhotos(AlbumModel photoDetails)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"INSERT INTO Photos (Image, DateUploaded) 
                    VALUES (@Image, @DateUploaded);";

                command.Parameters.AddWithValue("@Image", photoDetails.ImageFile);
                command.Parameters.AddWithValue("@DateUploaded", DateTime.Now);
                // command.Parameters.AddWithValue("@Caption", photoDetails.PhotoCaption);

                command.CommandTimeout = 120;
                command.ExecuteNonQuery();
            }
        }
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"SELECT MAX(Photo_ID) 
                    FROM Photos;
                    ";
                command.CommandTimeout = 120;
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    photoDetails.Photo_ID = reader.GetInt32(0);
                }
            }
        }
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"INSERT INTO PhotosPerAlbum (Photo_ID, Album_ID) 
                    VALUES (@Photo_ID, @Album_ID);
                    ";

                command.Parameters.AddWithValue("@Photo_ID", photoDetails.Photo_ID);
                command.Parameters.AddWithValue("@Album_ID", photoDetails.Album_ID);

                command.CommandTimeout = 120;
                command.ExecuteNonQuery();
            }
        }
    }

    public static AlbumModel GetPhoto(int photoId)
    {
        AlbumModel photo = new AlbumModel();
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var command = db.CreateCommand())
            {
                command.CommandText =
                    @"SELECT *
                    FROM Photos
                    WHERE Photo_ID = @Photo_ID;";
                command.Parameters.AddWithValue("@Photo_ID", photoId);

                command.CommandTimeout = 120;
                var reader = command.ExecuteReader();
                while (reader.Read())
                {

                    photo.Photo_ID = reader.GetInt32(0);
                    photo.ImageFile = reader.GetString(1);
                    photo.PhotoDate = reader.GetDateTime(2);
                    if (!reader.IsDBNull(reader.GetOrdinal("Caption")))
                    {
                        photo.PhotoCaption = reader.GetString(3);
                    }
                }
            }
        }
        return photo;
    }

    public static void UpdateAlbum(AlbumModel album)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText =
                    @$"UPDATE Albums 
                    SET AlbumName = @AlbumName 
                    WHERE Album_ID = @Album_ID;
                    ";
                cmd.Parameters.AddWithValue("@AlbumName", album.AlbumName);
                cmd.Parameters.AddWithValue("@Album_ID", album.Album_ID);
                cmd.ExecuteNonQuery();
            }
        }
    }

    public static void DeleteAlbum(int albumId)
    {
        using (var db = new SqlConnection(DB_CONNECTION_STRING))
        {
            db.Open();
            using (var cmd = db.CreateCommand())
            {
                cmd.CommandText =
                    @$"DELETE FROM Albums 
                    WHERE Album_ID = @Album_ID;
                    ";
                cmd.Parameters.AddWithValue("@Album_ID", albumId);
                cmd.ExecuteNonQuery();
            }
        }
    }
}