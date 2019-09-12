using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc.Html;
using System.Web.Mvc;
using DatabaseFirst;
using Newtonsoft.Json;


namespace training.Controllers
{
    public class TeacherController : Controller
    {

        trainingsEntities context = new trainingsEntities();

        // GET: Teacher
        public System.Web.Mvc.ActionResult Index()
        {
            ViewBag.NavClassManageTraining = "acctive1";
            return View(context.trainings.AsQueryable().ToList());
        }

        public System.Web.Mvc.ActionResult ViewTraining(int id_tr)
        {
            ViewBag.NavClassManageTraining = "acctive1";
            DatabaseFirst.training training_ = context.trainings.AsQueryable().FirstOrDefault(g => g.id == id_tr);
            IEnumerable<DatabaseFirst.part> _p = context.parts.AsQueryable().OrderBy(g => g.order_id);//OrderByDescending(x => x.id)
            ViewData["part"] = _p.ToList();
            return View(training_);
        }

        public ActionResult ExercisesList(int id_t, int level, int id_tr)
        {
            ViewBag.NavClassManageTraining = "acctive1";
            IEnumerable<wordsList> teachList = context.wordsLists.Where(item => item.id_training == id_tr).Where(item => item.level == level).Where(item => item.id_part == id_t).AsEnumerable();
            ViewData["level"] = level;
            ViewData["id_t"] = id_t;
            ViewData["id_tr"] = id_tr;
            ViewData["id_tr_name"] = context.trainings.Where(item => item.id == id_tr).FirstOrDefault().name;
            return View(teachList);
        }

        public ActionResult ExercisesListAll(int id_t, int level, int id_tr)
        {
            ViewBag.NavClassManageTraining = "acctive1";
            IEnumerable<wordsListAll> teachList = context.wordsListAlls.Where(item => item.id_training == id_tr).AsEnumerable();
            ViewData["level"] = level;
            ViewData["id_t"] = id_t;
            ViewData["id_tr"] = id_tr;
            ViewData["id_tr_name"] = context.trainings.Where(item => item.id == id_tr).FirstOrDefault().name;
            return View(teachList);
        }


        public ActionResult Delete(int id, int id_t, int level, int id_tr)
        {
            ViewBag.NavClassManageTraining = "acctive1";

            IEnumerable<syll_mirror> teachList = context.syll_mirror.Where(item => item.id == id);
            DatabaseFirst.syll_mirror a = teachList.FirstOrDefault();

            IEnumerable<theme> th = context.themes.Where(item => item.id_exercise == id);

            //deleteAll
            int? wordId = null, answer1Id = null, answer2Id = null, answer3Id = null, answer4Id = null, lexicId = null, wM = null, a1M = null, a2M = null, a3M = null, a4M = null;


            foreach (var x in th)
            {
                try
                {
                    context.themes.Remove(x);
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }
            }
            context.SaveChanges();
            try
            {
                lexicId = a.id_lexic;
                wordId = a.id_word;
                answer1Id = a.id_answer1;
                answer2Id = a.id_answer2;
                answer3Id = a.id_answer3;
                answer4Id = a.id_answer4;

                context.syll_mirror.Remove(a);
                context.SaveChanges();
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); }

            //lexicAll
            if (lexicId != null)
            {
                DatabaseFirst.lexicAll lexic = context.lexicAlls.Where(item => item.id == lexicId).FirstOrDefault();
                try
                {
                    context.lexicAlls.Remove(lexic);
                    context.SaveChanges();
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }
            }

            //word
            if (wordId != null)
            { try { Del(wordId); } catch (Exception ex) { Console.WriteLine(ex.Message); } }
            if (answer1Id != null)
            { try { Del(answer1Id); } catch (Exception ex) { Console.WriteLine(ex.Message); } }
            if (answer2Id != null)
            { try { Del(answer2Id); } catch (Exception ex) { Console.WriteLine(ex.Message); } }
            if (answer3Id != null)
            { try { Del(answer3Id); } catch (Exception ex) { Console.WriteLine(ex.Message); } }
            if (answer4Id != null)
            { try { Del(answer4Id); } catch (Exception ex) { Console.WriteLine(ex.Message); } }

            ////////////////////////

            //id_tr
            if (id_t == 0 && level == 0) return RedirectToAction("ExercisesListAll", "Teacher", new { id_t = id_t, level = level, id_tr = id_tr });
            else
                return RedirectToAction("ExercisesList", "Teacher", new { id_t = id_t, level = level, id_tr = id_tr });
        }

        public bool Del(int? id)
        {
            //morphol
            DatabaseFirst.word w = context.words.Where(item => item.id == id).FirstOrDefault();
            int? wM = w.id_morphology;
            try
            {
                context.words.Remove(w);
                context.SaveChanges();
                if (wM != null) DelMorph(wM);
            }
            catch (Exception) { return false; }
            return true;
        }
        public bool DelMorph(int? id)
        {
            DatabaseFirst.morphology m = context.morphologies.Where(item => item.id == id).FirstOrDefault();
            try
            {
                context.morphologies.Remove(m);
                context.SaveChanges();
            }
            catch (Exception) { return false; }
            return true;
        }

        public ActionResult Create(int id_tr)
        {
            ViewBag.NavClassManageTraining = "acctive1";
            IEnumerable<DatabaseFirst.part> _p = context.parts.AsQueryable().OrderBy(g => g.order_id);//OrderByDescending(x => x.id)
            ViewData["part"] = _p.ToList();
            ViewData["lexic"] = context.lexics.AsQueryable().ToList();
            ViewData["id_tr"] = id_tr;
            return View(context.trainings.AsQueryable().ToList());
        }

        public class WordModel
        {
            public string word { get; set; }
            public string primary_form { get; set; }
            public int id_morphology { get; set; }
            public string phonetic { get; set; }
            public string context { get; set; }
            public string morphems { get; set; }
        }

        public class AllLexicModel
        {
            public int? lexic_1_2 { get; set; }
            public int? lexic_2_3 { get; set; }
            public int? lexic_1_3 { get; set; }
            public int? lexic_3_4 { get; set; }
            public int? lexic_2_4 { get; set; }
            public int? lexic_1_4 { get; set; }
        }

        public class MorphologyModel
        {
            public int id_part { get; set; }
            public int? odush { get; set; }
            public int? naricat { get; set; }
            public int? rod { get; set; }
            public int? sklonen { get; set; }
            public int? chislo { get; set; }
            public int? padezh { get; set; }
            public int? razryad { get; set; }
            public int? forma { get; set; }
            public int? stepsrav { get; set; }
            public int? prost { get; set; }
            public int? kolich { get; set; }
            public int? drob { get; set; }
            public int? razryadznach { get; set; }
            public int? lico { get; set; }
            public int? vid { get; set; }
            public int? spryazh { get; set; }
            public int? vozvrat { get; set; }
            public int? perehod { get; set; }
            public int? naklon { get; set; }
            public int? vremya { get; set; }
            public int? deistvit { get; set; }
            public int? neizmen { get; set; }
            public int? znacobraz { get; set; }
            public int? proizvodnost { get; set; }
            public int? sochinit { get; set; }
            public int? upotrebls { get; set; }
            public int? razryadpoznach { get; set; }
            public int? podrazryad { get; set; }
        }
        public class SyllMirrorModel
        {
            public int id_word { get; set; }
            public int id_answer1 { get; set; }
            public int? id_answer2 { get; set; }
            public int? id_answer3 { get; set; }
            public int? id_answer4 { get; set; }

            public int level { get; set; }
            public int? id_lexic { get; set; }
        }

        public class ThemeModel
        {
            public int id_exercise { get; set; }
            public int id_part { get; set; }
            public int id_training { get; set; }

        }
        public ActionResult AddWord(WordModel names)
        {
            word w = new word
            {
                word1 = names.word,
                primary_form = names.primary_form,
                id_morphology = names.id_morphology,
                phonetic = names.phonetic,
                context = names.context,
                morphems = names.morphems
            };
            context.words.Add(w);
            context.SaveChanges();
            var a = context.words.OrderByDescending(z => z.id).FirstOrDefault().id;
            var b = a;
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(a, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditWord(int? id_w, WordModel names)
        {
            word book = context.words.Find(id_w);

            var a = id_w;
            if (id_w == null || book == null)
            {
                word w = new word
                {
                    word1 = names.word,
                    primary_form = names.primary_form,
                    id_morphology = names.id_morphology,
                    phonetic = names.phonetic,
                    context = names.context,
                    morphems = names.morphems
                };
                context.words.Add(w);
                context.SaveChanges();
                a = context.words.OrderByDescending(z => z.id).FirstOrDefault().id;
            }
            else if (book != null)
            {
                book.word1 = names.word;
                book.primary_form = names.primary_form;
                book.id_morphology = names.id_morphology;
                book.phonetic = names.phonetic;
                book.context = names.context;
                book.morphems = names.morphems;
                book.id = (int)a;
                try
                {
                    context.words.Attach(book);
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }
                try
                {
                    context.Entry(book).State = EntityState.Modified;
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }

                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }

            }
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(a, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddSyllMirror(SyllMirrorModel names)
        {
            try
            {
                syll_mirror product;

                product = context.syll_mirror.Create();
                product.id_word = names.id_word;
                product.id_answer1 = names.id_answer1;
                product.id_answer2 = names.id_answer2;
                product.id_answer3 = names.id_answer3;
                product.id_answer4 = names.id_answer4;
                product.level = names.level;
                product.id_lexic = names.id_lexic;

                context.syll_mirror.Add(product);

                context.SaveChanges();
            }
            catch (Exception ex) { ex.Message.ToString(); }
            var a = context.syll_mirror.OrderByDescending(z => z.id).FirstOrDefault().id;
            var b = a;
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(a, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditSyllMirror(int? id_s, SyllMirrorModel names)
        {
            syll_mirror book = context.syll_mirror.Find(id_s);

            var a = id_s;
            if (id_s == null || book == null)
            {
                try
                {
                    syll_mirror product;

                    product = context.syll_mirror.Create();
                    product.id_word = names.id_word;
                    product.id_answer1 = names.id_answer1;
                    product.id_answer2 = names.id_answer2;
                    product.id_answer3 = names.id_answer3;
                    product.id_answer4 = names.id_answer4;
                    product.level = names.level;
                    product.id_lexic = names.id_lexic;

                    context.syll_mirror.Add(product);
                    context.SaveChanges();
                }
                catch (Exception ex) { ex.Message.ToString(); }
                a = context.syll_mirror.OrderByDescending(z => z.id).FirstOrDefault().id;
            }
            else if (book != null)
            {
                book.id_word = names.id_word;
                book.id_answer1 = names.id_answer1;
                book.id_answer2 = names.id_answer2;
                book.id_answer3 = names.id_answer3;
                book.id_answer4 = names.id_answer4;
                book.level = names.level;
                book.id_lexic = names.id_lexic;
                book.id = (int)a;
                try
                {
                    context.syll_mirror.Attach(book);
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }
                try
                {
                    context.Entry(book).State = EntityState.Modified;
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }

                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }

            }
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(a, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddLexicAll(AllLexicModel names)
        {
            lexicAll w = new lexicAll
            {
                lexic_1_2 = names.lexic_1_2,
                lexic_1_3 = names.lexic_1_3,
                lexic_1_4 = names.lexic_1_4,
                lexic_2_3 = names.lexic_2_3,
                lexic_2_4 = names.lexic_2_4,
                lexic_3_4 = names.lexic_3_4
            };
            context.lexicAlls.Add(w);
            context.SaveChanges();
            var a = context.lexicAlls.OrderByDescending(z => z.id).FirstOrDefault().id;
            var b = a;
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(a, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditLexicAll(int? id_l, AllLexicModel names)
        {
            lexicAll book = context.lexicAlls.Find(id_l);

            var a = id_l;
            if (id_l == null || book == null)
            {
                lexicAll w = new lexicAll
                {
                    lexic_1_2 = names.lexic_1_2,
                    lexic_1_3 = names.lexic_1_3,
                    lexic_1_4 = names.lexic_1_4,
                    lexic_2_3 = names.lexic_2_3,
                    lexic_2_4 = names.lexic_2_4,
                    lexic_3_4 = names.lexic_3_4
                };
                context.lexicAlls.Add(w);
                context.SaveChanges();
                a = context.lexicAlls.OrderByDescending(z => z.id).FirstOrDefault().id;
            }
            else if (book != null)
            {
                book.lexic_1_2 = names.lexic_1_2;
                book.lexic_1_3 = names.lexic_1_3;
                book.lexic_1_4 = names.lexic_1_4;
                book.lexic_2_3 = names.lexic_2_3;
                book.lexic_2_4 = names.lexic_2_4;
                book.lexic_3_4 = names.lexic_3_4;
                book.id = (int)a;
                try
                {
                    context.lexicAlls.Attach(book);
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }
                try
                {
                    context.Entry(book).State = EntityState.Modified;
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }

                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }

            }
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(a, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddTheme(ThemeModel names)
        {
            theme w = new theme
            {
                id_exercise = names.id_exercise,
                id_part = names.id_part,
                id_training = names.id_training
            };
            context.themes.Add(w);
            context.SaveChanges();
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(w, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditTheme(int id_flag, int? id_e, ThemeModel names)
        {
            if (id_flag == 0)
            {
                IEnumerable<theme> th = context.themes.Where(item => item.id_exercise == id_e);

                foreach (var x in th)
                {
                    try
                    {
                        context.themes.Remove(x);
                    }
                    catch (Exception ex) { Console.WriteLine(ex.Message); }
                }
                context.SaveChanges();
            }

            theme w = new theme
            {
                id_exercise = names.id_exercise,
                id_part = names.id_part,
                id_training = names.id_training
            };
            context.themes.Add(w);
            context.SaveChanges();
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(w, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddMorphology(MorphologyModel names)
        {
            morphology w = new morphology
            {
                id_part = names.id_part,
                odush = names.odush,
                naricat = names.naricat,
                rod = names.rod,
                sklonen = names.sklonen,
                chislo = names.chislo,
                padezh = names.padezh,
                razryad = names.razryad,
                forma = names.forma,
                stepsrav = names.stepsrav,
                prost = names.prost,
                kolich = names.kolich,
                drob = names.drob,
                razryadznach = names.razryadznach,
                lico = names.lico,
                vid = names.vid,
                spryazh = names.spryazh,
                vozvrat = names.vozvrat,
                perehod = names.perehod,
                naklon = names.naklon,
                vremya = names.vremya,
                deistvit = names.deistvit,
                neizmen = names.neizmen,
                znacobraz = names.znacobraz,
                proizvodnost = names.proizvodnost,
                sochinit = names.sochinit,
                upotrebls = names.upotrebls,
                razryadpoznach = names.razryadpoznach,
                podrazryad = names.podrazryad
            };
            context.morphologies.Add(w);
            context.SaveChanges();
            var a = context.morphologies.OrderByDescending(z => z.id).FirstOrDefault().id;
            var b = a;
            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(a, null, jsSettings) }, JsonRequestBehavior.AllowGet);
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

        public ActionResult GetSyllMirrorWordsByLevel(int id, int level, int id_tr)
        {
            var syllMirrorWords = context.nextView1.Where(t => t.id_training == id_tr).Where(item => item.level == level).Where(item => item.id_exercise == id).Select(p => new
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

        public ActionResult Edit(int id, int level, int id_tr)
        {
            ViewBag.NavClassManageTraining = "acctive1";
            int? newLevel = context.wordsLists.Where(item => item.id_exercise == id).FirstOrDefault().level;

            ViewData["lexic"] = context.lexics.AsQueryable().ToList();

            if (newLevel == 1)
            {
                int i = 0;
                DatabaseFirst.syll_mirror exer;
                DatabaseFirst.Them _t = context.Thems.Where(t => t.id_training == id_tr).Where(t => t.level == newLevel).FirstOrDefault();
                try
                {
                    int id1 = _t.id_exercise;
                    exer = context.syll_mirror.Where(t => t.id == id1 && t.level == newLevel).FirstOrDefault();
                    while (exer == null)
                    {
                        id1++;
                        exer = context.syll_mirror.Where(t => t.id == id1 && t.level == newLevel).FirstOrDefault();
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
                    ViewData["realLevel"] = newLevel;
                    ViewData["morphemWord"] = w.morphems;
                    ViewData["morphemAnswer1"] = w2.morphems;
                    ViewData["id_tr"] = id_tr;
                    ViewData["id_e"] = id;
                    List<char> zz = w.word1.ToList();
                    return View(exer);
                }
                catch (System.Exception exc) { exer = null; return View(exer); }
            }
            if (newLevel == 2)
            {
                int i = 0;
                DatabaseFirst.syll_mirror exer;
                DatabaseFirst.Them _t = context.Thems.Where(t => t.id_training == id_tr).Where(t => t.level == newLevel).FirstOrDefault();
                try
                {
                    int id1 = _t.id_exercise;
                    exer = context.syll_mirror.Where(t => t.id == id1 && t.level == newLevel).FirstOrDefault();
                    while (exer == null)
                    {
                        id1++;
                        exer = context.syll_mirror.Where(t => t.id == id1 && t.level == newLevel).FirstOrDefault();
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
                    ViewData["realLevel"] = newLevel;
                    ViewData["morphemWord"] = w.morphems;
                    ViewData["morphemAnswer1"] = w2.morphems;
                    ViewData["morphemAnswer2"] = w3.morphems;

                    ViewData["id_e"] = id;


                    //3 ответ
                    ViewData["3answer"] = null;
                    try
                    {
                        word w4 = context.words.FirstOrDefault(n => n.id == exer.id_answer3);
                        ViewData["word4"] = w4.word1;
                        ViewData["morphemAnswer3"] = w4.morphems;
                        ViewData["3answer"] = "3answer";
                    }
                    catch (Exception ex) { Console.WriteLine(ex.Message); }

                    //4 ответ
                    ViewData["4answer"] = null;
                    try
                    {
                        word w5 = context.words.FirstOrDefault(n => n.id == exer.id_answer4);
                        ViewData["word5"] = w5.word1;
                        ViewData["morphemAnswer4"] = w5.morphems;
                        ViewData["4answer"] = "4answer";
                    }
                    catch (Exception ex) { Console.WriteLine(ex.Message); }


                    ViewData["id_tr"] = id_tr;
                    return View(exer);
                }
                catch (System.Exception exc) { exer = null; return View(exer); }
            }
            return null;
        }

        public ActionResult EditMorphology(int? id_m, MorphologyModel names)
        {
            morphology book = context.morphologies.Find(id_m);

            var a = id_m;
            if (id_m == null || book == null)
            {
                morphology w = new morphology
                {
                    id_part = names.id_part,
                    odush = names.odush,
                    naricat = names.naricat,
                    rod = names.rod,
                    sklonen = names.sklonen,
                    chislo = names.chislo,
                    padezh = names.padezh,
                    razryad = names.razryad,
                    forma = names.forma,
                    stepsrav = names.stepsrav,
                    prost = names.prost,
                    kolich = names.kolich,
                    drob = names.drob,
                    razryadznach = names.razryadznach,
                    lico = names.lico,
                    vid = names.vid,
                    spryazh = names.spryazh,
                    vozvrat = names.vozvrat,
                    perehod = names.perehod,
                    naklon = names.naklon,
                    vremya = names.vremya,
                    deistvit = names.deistvit,
                    neizmen = names.neizmen,
                    znacobraz = names.znacobraz,
                    proizvodnost = names.proizvodnost,
                    sochinit = names.sochinit,
                    upotrebls = names.upotrebls,
                    razryadpoznach = names.razryadpoznach,
                    podrazryad = names.podrazryad
                };

                context.morphologies.Add(w);
                context.SaveChanges();
                a = context.morphologies.OrderByDescending(z => z.id).FirstOrDefault().id;

            }
            else if (book != null)
            {
                book.id_part = names.id_part;
                book.odush = names.odush;
                book.naricat = names.naricat;
                book.rod = names.rod;
                book.sklonen = names.sklonen;
                book.chislo = names.chislo;
                book.padezh = names.padezh;
                book.razryad = names.razryad;
                book.forma = names.forma;
                book.stepsrav = names.stepsrav;
                book.prost = names.prost;
                book.kolich = names.kolich;
                book.drob = names.drob;
                book.razryadznach = names.razryadznach;
                book.lico = names.lico;
                book.vid = names.vid;
                book.spryazh = names.spryazh;
                book.vozvrat = names.vozvrat;
                book.perehod = names.perehod;
                book.naklon = names.naklon;
                book.vremya = names.vremya;
                book.deistvit = names.deistvit;
                book.neizmen = names.neizmen;
                book.znacobraz = names.znacobraz;
                book.proizvodnost = names.proizvodnost;
                book.sochinit = names.sochinit;
                book.upotrebls = names.upotrebls;
                book.razryadpoznach = names.razryadpoznach;
                book.podrazryad = names.podrazryad;

                book.id = (int)a;
                try
                {
                    context.morphologies.Attach(book);
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }
                try
                {
                    context.Entry(book).State = EntityState.Modified;
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }

                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex) { Console.WriteLine(ex.Message); }

            }

            JsonSerializerSettings jsSettings = new JsonSerializerSettings();
            jsSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return Json(new { Type = "Success", Data = JsonConvert.SerializeObject(a, null, jsSettings) }, JsonRequestBehavior.AllowGet);
        }
    }
}
