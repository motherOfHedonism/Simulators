using DatabaseFirst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace training.Controllers
{
    public class AdminController : Controller
    {
        trainingsEntities context = new trainingsEntities();

        public ActionResult Index()
        {
            ViewBag.NavClassT = "acctive1";
            IEnumerable<nextView> teachList = context.nextViews.AsEnumerable();
            IEnumerable<word> a = null;
            foreach (var item in teachList)
            {
                a = context.words.Where(t => item.id_word == t.id).AsEnumerable();
            }

            return View(a);
        }

        public ActionResult TeachUser()
        {
            ViewBag.NavClassT = "acctive1";
            return View();
        }

        public ActionResult Edit(string id)
        {
            return View();

        }

        [HttpPost]
        public async Task<ActionResult> Edit(/*RoleModificationModel model*/)
        {
            return View("Error", new string[] { "Роль не найдена" });
        }
    }
}