using Microsoft.AspNetCore.Mvc;

public class PastebookController : Controller
{
    [HttpPost]
    [Route("/register")]
    public IActionResult newRegister([FromBody] RegisterModel regmodel)
    {
        System.Console.WriteLine(regmodel.FirstName + "hello");
        System.Console.WriteLine(regmodel.LastName + "hello");
        System.Console.WriteLine(regmodel.Email + "hello");
        System.Console.WriteLine(regmodel.Password + "hello");
        System.Console.WriteLine(regmodel.Birthday + "hello");
        System.Console.WriteLine(regmodel.Gender + "hello");
        System.Console.WriteLine(regmodel.Username + "hello");

        Database.NewRegister(regmodel);
        return Json("ok");
    }
    // [Route("/")]
    // public IActionResult testPage(){
    //     return Ok("hello");
    // }
}
