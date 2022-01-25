using Microsoft.AspNetCore.Mvc;

public class PastebookController : Controller
{
    [HttpGet]
    [Route("/home")]
    public IActionResult getHomeData(
        [FromHeader(Name = "X-SessionID")] string pastebookSessionId
    )
    {
        SessionModel session = Database.GetSessionById(pastebookSessionId)!;
        if (session != null)
        {
            return Ok(Json(Database.GetHomeData(session)));
        }
        return Unauthorized();
    }
    [HttpPost]
    [Route("/login")]
    public IActionResult loginAddSessionForUser(
        [FromBody] UserCredentialsModel userCredentials
    )
    {
        SessionModel session = Database.AddSessionWithCredentials(userCredentials)!;
        if (session != null)
        {
            return Ok(Json(session));
        }
        return Unauthorized();
    }
}