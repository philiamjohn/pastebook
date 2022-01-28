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
    public IActionResult getHomeData(
        [FromHeader(Name = "X-SessionID")] string pastebookSessionId
    )
    {
        SessionModel session = Database.GetSessionById(pastebookSessionId)!;
        if (session == null)
        {
            return Unauthorized();
        }
        return Ok(Json(Database.GetHomeData(session)));
    }

    [HttpPost]
    [Route("/login")]
    public IActionResult loginAddSessionForUser(
        [FromBody] UserCredentialsModel userCredentials
    )
    {
        SessionModel session = Database.AddSessionWithCredentials(userCredentials)!;
        if (session == null)
        {
            return Unauthorized();
        }
        return Ok(Json(session));
    }

    [HttpDelete]
    [Route("/session/{id?}")]
    public IActionResult deleteSessionBySessionId(string id){
        Database.DeleteSessionBySessionId(id);
        return Ok();
    }

    [HttpPost]
    [Route("/addpost")]
    public IActionResult addPostToDatabase([FromHeader(Name = "X-SessionID")] string pastebookSessionId, [FromBody] PostModel postDetails)
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
    public IActionResult getHomePosts(
        [FromHeader(Name = "X-SessionID")] string pastebookSessionId
    )
    {
        SessionModel session = Database.GetSessionById(pastebookSessionId)!;
        if (session == null)
        {
            return Unauthorized();
        }
        HomeDataModel homeData = Database.GetHomeData(session)!;
        List<PostModel> homePosts = Database.GetHomePosts(homeData.User_ID)!;
        return Ok(Json(homePosts));
    }
    
    // Save created album in database and retrieve album_id
    [HttpPost]
    [Route("/albums/create")]
    public IActionResult addAlbumToDatabase(
        [FromBody] AlbumModel albumDetails
    ) 
    {
        Database.AddAlbum(albumDetails);
        return Ok("Album created successfully.");
    }

    [HttpGet]
    [Route("/username/albums")]
    public IActionResult getAlbumFromDatabase(
        [FromHeader(Name = "User_ID")] int userId
    ) 
    {
        var albumDetails = Database.GetAlbum(userId);
        return Json(albumDetails);
    }
    // [HttpPost]
    // [Route("/albums/photos/add")]
    // public IActionResult addPhotosToAlbumDatabase(
    //     [FromBody] AlbumModel albumDetails
    // )
    // {

    // }



}   


