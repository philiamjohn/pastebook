using Microsoft.AspNetCore.Mvc;

public class PastebookController : Controller
{
    [HttpPost]
    [Route("/register")]
    public IActionResult newRegister([FromBody] RegisterModel regmodel)
    {
        System.Console.WriteLine(regmodel.FirstName + "hello");
        System.Console.WriteLine(regmodel.LastName + "hello");
        System.Console.WriteLine(regmodel.Email + "emailhello");
        System.Console.WriteLine(regmodel.Password + "hello");
        System.Console.WriteLine(regmodel.Birthday + "hello");
        System.Console.WriteLine(regmodel.Gender + "hello");
        System.Console.WriteLine(regmodel.Username + " 123123hello");
        System.Console.WriteLine(regmodel.Phone + " wewewewewe");
        Database.NewRegister(regmodel);
        Database.CheckAddUserName(regmodel);
        Database.SendConfirmationEmail(regmodel.Email, regmodel.LastName);
        return Json("ok");
    }

    [HttpGet]
    [Route("/register/{email?}")]
    public IActionResult checkEmailifUnique(string email)
    {
        var data = Database.CheckEmailIfUnique(email);
        if (!data)
        {
            return Unauthorized();
        }
        return Ok();
    }

    [HttpGet]
    [Route("/home")]
    public IActionResult getHomeData([FromHeader(Name = "X-SessionID")] string pastebookSessionId)
    {
        SessionModel session = Database.GetSessionById(pastebookSessionId)!;
        if (session == null)
        {
            return Unauthorized();
        }
        return Json(Database.GetHomeData(session));
    }

    [HttpGet]
    [Route("/searchusers")]
    public IActionResult searchUsers(
        [FromHeader(Name = "X-SessionID")] string pastebookSessionId,
        [FromHeader(Name = "X-SearchKeyword")] string searchKeyword
    )
    {
        SessionModel session = Database.GetSessionById(pastebookSessionId)!;
        if (session == null)
        {
            return Unauthorized();
        }
        return Json(Database.SearchUsers(searchKeyword));
    }

    [HttpGet]
    [Route("/notifications/{userId?}")]
    public IActionResult getNotifications(
        [FromHeader(Name = "X-SessionID")] string pastebookSessionId,
        int userId
    )
    {
        SessionModel session = Database.GetSessionById(pastebookSessionId)!;
        if (session == null)
        {
            return Unauthorized();
        }
        return Json(Database.GetNotifications(userId));
    }

    [HttpPatch]
    [Route("/notifications/{notificationId?}")]
    public IActionResult changeNotificationReadStatus(
        int notificationId
    )
    {
        Database.ChangeNotificationReadStatus(notificationId);
        return Ok("Notification read status changed.");
    }

    [HttpPatch]
    [Route("/clearallnotifications/{userId?}")]
    public IActionResult changeAllNotificationsReadStatus(
        int userId
    )
    {
        Database.ChangeAllNotificationsReadStatus(userId);
        return Ok("All Notifications read status changed.");
    }

    [HttpGet]
    [Route("/users")]
    public IActionResult getUserData([FromHeader(Name = "UserID")] string userID)
    {
        HomeDataModel user = Database.GetUserById(userID);
        if (user == null)
        {
            return Unauthorized("Fetching user data is unsuccessful");
        }
        else
        {
            return Ok(Json(user));
        }
    }

    [HttpGet]
    [Route("/postLikes")]
    public IActionResult getPostLikes([FromHeader(Name = "PostID")] string postID)
    {
        List<LikerModel> likers = Database.GetLikesByPostId(postID);
        if (likers == null)
        {
            return Unauthorized("Fetching post likes data is unsuccessful");
        }
        else
        {
            return Ok(Json(likers));
        }
    }

    [HttpGet]
    [Route("/postComments")]
    public IActionResult getPostComments([FromHeader(Name = "PostID")] string postID)
    {
        List<CommentModel> comment = Database.GetCommentsByPostId(postID);
        if (comment == null)
        {
            return Unauthorized("Fetching post comments data is unsuccessful");
        }
        else
        {
            return Ok(Json(comment));
        }
    }

    [HttpPost]
    [Route("/login")]
    public IActionResult loginAddSessionForUser([FromBody] UserCredentialsModel userCredentials)
    {
        SessionModel session = Database.AddSessionWithCredentials(userCredentials)!;
        if (session == null)
        {
            return Unauthorized();
        }
        return Json(session);
    }

    [HttpDelete]
    [Route("/session/{id?}")]
    public IActionResult deleteSessionBySessionId(string id)
    {
        Database.DeleteSessionBySessionId(id);
        return Ok();
    }

    [HttpPost]
    [Route("/addpost")]
    public IActionResult addPostToDatabase(
        [FromHeader(Name = "X-SessionID")] string pastebookSessionId,
        [FromBody] PostModel postDetails
    )
    {
        SessionModel session = Database.GetSessionById(pastebookSessionId)!;
        if (session == null)
        {
            return Unauthorized();
        }
        Database.AddPost(postDetails);
        return Ok("Post Added successfully");
    }

    [HttpGet]
    [Route("/homeposts")]
    public IActionResult getHomePosts([FromHeader(Name = "X-UserId")] int userId)
    {
        List<PostModel> homePosts = Database.GetHomePosts(userId)!;
        return Json(homePosts);
    }

    // Save created album in database and retrieve album_id
    [HttpPost]
    [Route("/albums/create")]
    public IActionResult addAlbumToDatabase([FromBody] AlbumModel albumDetails)
    {
        Database.AddAlbum(albumDetails);
        return Ok("Album created successfully.");
    }

    [HttpGet]
    [Route("/username/albums")]
    public IActionResult getAlbumFromDatabase([FromHeader(Name = "User_ID")] int userId)
    {
        var albumDetails = Database.GetAlbum(userId);
        return Json(albumDetails);
    }

    [HttpPut]
    [Route("/userUpdate")]
    public IActionResult userCredentialUpdate([FromBody] HomeDataModel model)
    {
        System.Console.WriteLine(model.FirstName + "hello");
        System.Console.WriteLine(model.LastName + "hello");
        System.Console.WriteLine(model.Birthday + "hello");
        System.Console.WriteLine(model.Gender + "hello");
        System.Console.WriteLine(model.Phone + " wewewewewe");
        Database.UserCredentialUpdate(model);
        return Ok();
    }

    [HttpPut]
    [Route("/updateEmail")]
    public IActionResult updateUserEmail([FromBody] HomeDataModel model)
    {
        Database.UpdateUserEmail(model);
        return Ok();
    }

    [HttpGet]
    [Route("/profile/{username?}")]
    public IActionResult getProfileData([FromHeader(Name = "X-UserId")] int userId, string username)
    {
        return Json(Database.GetProfileData(username, userId));
    }

    [HttpGet]
    [Route("/profileposts/{username?}")]
    public IActionResult getProfilePosts(
        string username
    )
    {
        return Json(Database.GetProfilePosts(username));
    }

    [HttpPatch]
    [Route("/editprofilepicture")]
    public IActionResult editProfilePicture(
        [FromHeader(Name = "X-UserId")] int userId,
        [FromHeader(Name = "X-SessionID")] string pastebookSessionId,
        [FromBody] ProfileDataModel profileData
    )
    {
        SessionModel session = Database.GetSessionById(pastebookSessionId)!;
        if (session == null)
        {
            return Unauthorized();
        }
        Database.EditProfilePicture(userId, profileData.ProfilePicture!);
        return Ok("Post Added successfully");
    }

    [HttpPost]
    [Route("/addfriend/{username?}")]
    public IActionResult addFriend(
        [FromHeader(Name = "X-UserId")] int userId,
        [FromBody] NotificationModel addFriendNotification,
        string username
    )
    {
        Database.AddFriend(userId, username, addFriendNotification!);
        return Ok("Friend request sent successfully");
    }

    [HttpPatch]
    [Route("/editprofiledescription")]
    public IActionResult editProfileDescription(
        [FromHeader(Name = "X-UserId")] int userId,
        [FromHeader(Name = "X-SessionID")] string pastebookSessionId,
        [FromBody] ProfileDataModel profileData
        )
    {
        SessionModel session = Database.GetSessionById(pastebookSessionId)!;
        if (session == null)
        {
            return Unauthorized();
        }
        Database.EditProfileDescription(userId, profileData.ProfileDesc!);
        return Ok("Post Added successfully");
    }
    // [HttpPost]
    // [Route("/albums/photos/add")]
    // public IActionResult addPhotosToAlbumDatabase(
    //     [FromBody] AlbumModel albumDetails
    // )
    // {

    // }

    [HttpPost]
    [Route("/userUpdate")]
    public IActionResult editEmailCheckPassword([FromBody] HomeDataModel model)
    {
        var data = Database.EditEmailCheckPassword(model)!;
        if (!data)
        {
            return Unauthorized();
        }
        return Ok();
    }






















    [HttpPut]
    [Route("/changepass")]
    public IActionResult changePassBaseOnID([FromBody] HomeDataModel model)
    {
        System.Console.WriteLine(model.Password + " passsss");
        Database.ChangePassBaseOnID(model);
        return Ok();
    }

    [HttpPut]
    [Route("/updateEmailSessions")]
    public IActionResult updateUserEmailSessions([FromBody] SessionModel model)
    {
        System.Console.WriteLine(model.SessionId + " sesid");
        System.Console.WriteLine(model.Email + " EMail");
        Database.UpdateUserEmailSessions(model);
        return Ok();
    }





}
