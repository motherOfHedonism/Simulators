using DatabaseFirst;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;

namespace training.Controllers
{
    public class ExerciseController : Controller
    {
        List<int> ListIdExer = new List<int>();
        trainingsEntities context = new trainingsEntities();
        public ActionResult ExerciseOne(int id_t, int level, int id_tr)
        {
            ViewBag.NavClassT = "acctive1";

            int i = 0;
            DatabaseFirst.syll_mirror exer;
            DatabaseFirst.Them _t = context.Thems.Where(t => t.id_training == id_tr).Where(t => t.id_part == id_t).Where(t => t.level == level).FirstOrDefault();
            try
            {
                int id1 = _t.id_exercise;
                exer = context.syll_mirror.Where(t => t.id == id1 && t.level == level).FirstOrDefault();
                while (exer == null)
                {
                    id1++;
                    exer = context.syll_mirror.Where(t => t.id == id1 && t.level == level).FirstOrDefault();
                }
                word w = context.words.FirstOrDefault(n => n.id == exer.id_word);
                word w2 = context.words.FirstOrDefault(n => n.id == exer.id_answer1);
                ViewData["word1"] = w.word1;
                ViewData["word2"] = w2.word1;
                ViewData["context1"] = w.context;
                IEnumerable<DatabaseFirst.part> _p = context.parts.AsQueryable();
                ViewData["part"] = _p.ToList();
                IEnumerable<DatabaseFirst.comment> _c = context.comments.AsQueryable();
                ViewData["com"] = _c.ToList();
                ViewData["nextWord"] = id_t;
                ViewData["realLevel"] = level;
                ViewData["morphemWord"] = w.morphems;
                ViewData["morphemAnswer1"] = w2.morphems;
                ViewData["id_tr"] = id_tr;
                List<char> zz = w.word1.ToList();
                return View(exer);
            }
            catch (System.Exception exc) { exer = null; return View(exer); }
        }

        public ActionResult doError(int b)
        {
            var a = 1 / b;
            DatabaseFirst.syll_mirror exer;
            exer = context.syll_mirror.FirstOrDefault();
            return View(exer);
        }

        public ActionResult ExerciseTwo(int id_t, int level, int id_tr)
        {
            ViewBag.NavClassT = "acctive1";

            int i = 0;
            DatabaseFirst.syll_mirror exer;
            DatabaseFirst.Them _t = context.Thems.Where(t => t.id_training == id_tr).Where(t => t.id_part == id_t).Where(t => t.level == level).FirstOrDefault();
            try
            {
                int id1 = _t.id_exercise;
                exer = context.syll_mirror.Where(t => t.id == id1 && t.level == level).FirstOrDefault();
                while (exer == null)
                {
                    id1++;
                    exer = context.syll_mirror.Where(t => t.id == id1 && t.level == level).FirstOrDefault();
                }
                word w = context.words.FirstOrDefault(n => n.id == exer.id_word);
                word w2 = context.words.FirstOrDefault(n => n.id == exer.id_answer1);
                word w3 = context.words.FirstOrDefault(n => n.id == exer.id_answer2);

                ViewData["word1"] = w.word1;
                ViewData["word2"] = w2.word1;
                ViewData["word3"] = w3.word1;


                ViewData["context2"] = w.context;
                IEnumerable<DatabaseFirst.part> _p = context.parts.AsQueryable();
                ViewData["part"] = _p.ToList();
                IEnumerable<DatabaseFirst.comment> _c = context.comments.AsQueryable();
                ViewData["com"] = _c.ToList();
                ViewData["nextWord"] = id_t;
                ViewData["realLevel"] = level;
                ViewData["morphemWord"] = w.morphems;
                ViewData["morphemAnswer1"] = w2.morphems;
                ViewData["morphemAnswer2"] = w3.morphems;


                //3 ответ
                ViewData["3answer"] = null;
                try
                {
                    word w4 = context.words.FirstOrDefault(n => n.id == exer.id_answer3);
                    ViewData["word4"] = w4.word1;
                    ViewData["morphemAnswer3"] = w4.morphems;
                    ViewData["3answer"] = "3answer";
                }
                catch (System.Exception exc) { int abcdef1 = 0; }

                //4 ответ
                ViewData["4answer"] = null;
                try
                {
                    word w5 = context.words.FirstOrDefault(n => n.id == exer.id_answer4);
                    ViewData["word5"] = w5.word1;
                    ViewData["morphemAnswer4"] = w5.morphems;
                    ViewData["4answer"] = "4answer";
                }
                catch (System.Exception exc) { int abcdef2 = 0; }


                ViewData["lexic"] = context.lexics.AsQueryable().ToList();
                ViewData["id_tr"] = id_tr;
                return View(exer);
            }
            catch (System.Exception exc) { exer = null; return View(exer); }
        }
        public ActionResult GetMorphologyByWordId(int wordId)
        {
            var word = context.words.FirstOrDefault(item => item.id == wordId);
            if (word == null)
            {
                return Json(new { Type = "Error" }, JsonRequestBehavior.AllowGet);
            }


            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            var converted = JsonConvert.SerializeObject(word.morphology, null, jsSettings);

            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(word.morphology, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetSyllMirrorWordsByLevel(int level, int pId, int id_tr)
        {
            var syllMirrorWords = context.nextViews.Where(t => t.id_training == id_tr).Where(item => item.level == level).Where(item => item.id_part == pId).Select(p => new
            {
                id = p.id,
                id_exercise = p.id_exercise,
                id_word = p.id_word,
                id_answer1 = p.id_answer1,
                id_answer2 = p.id_answer2,

                //3 ответ
                id_answer3 = p.id_answer3,

                //4 ответ
                id_answer4 = p.id_answer4,

                level = p.level
            }).ToList();

            if (syllMirrorWords.Count == 0)
            {
                return Json(new { Type = "Error" }, JsonRequestBehavior.AllowGet);
            }

            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;


            var data = JsonConvert.SerializeObject(syllMirrorWords, null, jsSettings);

            return Json(new { Type = "Success", Data = data }, JsonRequestBehavior.AllowGet);
        }

        public class AddProgressModel
        {
            public int mark { get; set; }
            public int id_exercise { get; set; }
        }
        [HttpPost]
        public ActionResult sendMarkToServer(AddProgressModel model)
        {
            if (User.Identity.IsAuthenticated)
            {
                progress entity = new progress
                {
                    id_user = User.Identity.GetUserId(),
                    id_exercice = model.id_exercise,
                    mark = model.mark
                };

                var a = context.progresses.Add(entity);
                context.SaveChanges();
                JsonSerializerSettings jsSettings = new JsonSerializerSettings();
                jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(a, null, jsSettings) }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return View();
            }
        }

        public ActionResult GetListParts()
        {
            var lp = context.part1.AsEnumerable();
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(lp, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult loadMorphologyWord(int id_word)
        {
            var morphology = context.morphology_view.Where(p => p.id == id_word).FirstOrDefault();
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(morphology, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult loadMorphologyAnswer(int id_answer)
        {
            var morphology = context.morphology_view.Where(p => p.id == id_answer).FirstOrDefault();
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(morphology, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult loadLexic(int id_e)
        {
            //var lexic = context.lexic_view.Where(p => p.level == id_e).FirstOrDefault();
            //JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            //jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            //return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(lexic, null, jsSettings) }, JsonRequestBehavior.AllowGet);

            var lexic = context.lexic_view.Where(item => item.id_exercise == id_e).Select(p => new
            {
                id_exercise = p.id_exercise,
                id_lexicAll = p.id_lexicAll,
                lexic12 = p.lexic_1_2,
                lexic23 = p.lexic_2_3,
                lexic13 = p.lexic_1_3,
                lexic34 = p.lexic_3_4,
                lexic24 = p.lexic_2_4,
                lexic14 = p.lexic_1_4,
                level = p.level,
                name12 = p.name12,
                name23 = p.name23,
                name13 = p.name13,
                name34 = p.name34,
                name24 = p.name24,
                name14 = p.name14
            }).ToList();

            if (lexic.Count == 0)
            {
                return Json(new { Type = "Error" }, JsonRequestBehavior.AllowGet);
            }

            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;


            var data = JsonConvert.SerializeObject(lexic, null, jsSettings);

            return Json(new { Type = "Success", Data = data }, JsonRequestBehavior.AllowGet);
        }
    }
}