using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace training.Controllers
{
    public class SiteController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.NavClassIndex = "acctive1";
            return View();
        }

        public ActionResult Teach()
        {
            ViewBag.NavClassTeach = "acctive1";
            return View();
        }

        //Управление тренажёрами
        public ActionResult ManageTraining()
        {
            ViewBag.NavClassManageTrainigng = "acctive1";
            return View();
        }

        public ActionResult Poems()
        {
            ViewBag.NavClassLiric = "acctive1";
            return View();
        }

        public ActionResult Books()
        {
            ViewBag.NavClassLiric = "acctive1";
            return View();
        }

        public ActionResult Fit()
        {
            ViewBag.NavClassFit = "acctive1";
            return View();
        }

        public ActionResult Bn()
        {
            ViewBag.NavClassBn = "acctive1";
            return View();
        }
    }
}