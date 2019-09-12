using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseFirst;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace training.Controllers
{
    public class TrainingController : Controller
    {
        // Создать объект контекста
        trainingsEntities context = new trainingsEntities();

        // GET: Training
        public System.Web.Mvc.ActionResult Index()
        {
            ViewBag.NavClassT = "acctive1";
            return View(context.trainings.AsQueryable().ToList());
        }

        public System.Web.Mvc.ActionResult ViewTraining(int id_tr)
        {
            ViewBag.NavClassT = "acctive1";
            DatabaseFirst.training training_ = context.trainings.AsQueryable().FirstOrDefault(g => g.id == id_tr);
            //здесь новая колонка 
            IEnumerable<DatabaseFirst.part> _p = context.parts.AsQueryable().OrderBy(g => g.order_id);//OrderByDescending(x => x.id)
            ViewData["part"] = _p.ToList();
            return View(training_);
        }


        public System.Web.Mvc.ActionResult testdialog()
        {
            return View();
        }



    }
}