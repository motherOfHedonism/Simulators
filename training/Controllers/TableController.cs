using System.Collections.Generic;
using System.Linq;
using DatabaseFirst;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;

namespace training.Controllers
{
    public class TableController : Controller
    {
        trainingsEntities context = new trainingsEntities();
        public ActionResult Teacher(string id)
        {
            IEnumerable<TeachU> _p = context.TeachUs.Where(t => t.id_user1 == id).AsEnumerable();
            ViewBag.NavClassT = "acctive1";
            return View(_p);
        }

        public ActionResult Student(string id)
        {
            ViewBag.NavClassT = "acctive1";
            IEnumerable<DatabaseFirst.progressUser> _p = context.progressUsers.Where(t => t.id_user == id).AsEnumerable();
            string name = context.AspNetUsers.Where(t => t.Id == id).Select(t => t.UserName).ToString();
            ViewData["id"] = id;
            ViewData["name"] = name;
            return View(_p);
        }
    }
}