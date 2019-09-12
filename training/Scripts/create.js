var oh = null;
var id_tr = null;
var wordMorphem, wordMorphem0 = "", answerMorphem0 = "", answer1Morphem, answer2Morphem, answer3Morphem, answer4Morphem;
var morphemsRecords = [];
var radioRecords = [];
var partsLists = [];
var morphologyObj;
for (var x = 0; x < 5; x++)
    morphemsRecords[x] = "";
for (var i = 0; i < 20; i++)
    morphemsRecords[i] = "";
var themeFlag = 0;
var syllMirror = (function () {
    var self;
    var okElement = '.js-syllMirror-ok';
    var disabledClass = '.disabledClass';
    

    //3 ответ
    try {
        var answer3ML = '#answer3ML';
    } catch (exception) { 1 === 1; }

    morphologyObj = {
        perehod: '.js-syllMirror-perehod',
        chislo: '.js-syllMirror-chislo',
        deistvit: '.js-syllMirror-deistvit',
        drob: '.js-syllMirror-drob',
        forma: '.js-syllMirror-forma',
        kolich: '.js-syllMirror-kolich',
        lico: '.js-syllMirror-lico',
        naklon: '.js-syllMirror-naklon',
        naricat: '.js-syllMirror-naricat',
        neizmen: '.js-syllMirror-neizmen',
        odush: '.js-syllMirror-odush',
        padezh: '.js-syllMirror-padezh',
        proizvodnost: '.js-syllMirror-proizvodnost',
        prost: '.js-syllMirror-prost',
        razryad: '.js-syllMirror-razryad',
        razryadznach: '.js-syllMirror-razryadznach',
        rod: '.js-syllMirror-rod',
        sklonen: '.js-syllMirror-sklonen',
        sochinit: '.js-syllMirror-sochinit',
        spryazh: '.js-syllMirror-spryazh',
        stepsrav: '.js-syllMirror-stepsrav',
        vid: '.js-syllMirror-vid',
        vozvrat: '.js-syllMirror-vozvrat',
        vremya: '.js-syllMirror-vremya',
        znacobraz: '.js-syllMirror-znacobraz',
        upotrebls: '.js-syllMirror-upotrebls',
        razryadpoznach: '.js-syllMirror-razryadpoznach',
        podrazryad: '.js-syllMirror-podrazryad'
    };
    var wordML = '#wordML';
    var answerML = '#answerML';
    try { var answer2ML = '#answer2ML'; } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);  }

    //3 ответ
    try { blockAnswer3 = $('.js-word-answer-morphem3'); } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);  }
    //4 ответ
    try { blockAnswer4 = $('.js-word-answer-morphem4'); } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);  }
  
    return {
        initialize: function () {
            self = this;
            self.setUpListeners();
            self.getPartsLists();
        },
        getPartsLists: function () {
            $.ajax({
                type: 'GET',
                url: "/exercise/GetListParts",
                cache: false,
                success: function (response) {
                    partsLists = JSON.parse(response.Data);
                }
            });
        },
        setUpListeners: function () {
            var chInputs = $('.chooseInput');
            chInputs.slice(0, 13).on('click', self.clickRadioWord);
            chInputs.slice(13, 26).on('click', self.clickRadioAnswer);

            $('#proverka').on('click', save);
            $(document).on('click', lotte);
            $(document).on('input', lotte);
            $(disabledClass).off().on('input', lexicBuild);
            $(okElement).on('click', self.validateStep);
            try {
                chInputs.slice(26, 39).on('click', self.clickRadioAnswer2);
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            $(wordML).off().on('keyup', self.wordTest);
            $(answerML).off().on('keyup', self.answer1Test);
            try { $(answer2ML).off().on('keyup', self.answer2Test); } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            //3 ответ
            try {
                $(answer3ML).off().on('keyup', self.answer3Test);
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            try {
                chInputs.slice(39, 52).on('click', self.clickRadioAnswer3);
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            
            try {
                $(answer4ML).off().on('keyup', self.answer4Test);
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            try {
                chInputs.slice(52, 65).on('click', self.clickRadioAnswer4);
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
        },
        wordTest: function (e) {
            if ($("#wordML").val().replace(/\-/g, "") !== $("form:visible .wordInput").slice(0,1).val()) {
                redInput(document.getElementById("wordML"));
                document.getElementById("wordML").value = morphemsRecords[0];
            }
            else if ($("#wordML").val().replace(/\-/g, "") === $("form:visible .wordInput").slice(0, 1).val())
                morphemsRecords[0] = $("#wordML").val();
        },
       
        answer1Test: function (e) {
            if ($("#answerML").val().replace(/\-/g, "") !== $("form:visible .wordInput").slice(1, 2).val()) {
                redInput(document.getElementById("answerML"));
                document.getElementById("answerML").value = morphemsRecords[1];
            }
            else if ($("#answerML").val().replace(/\-/g, "") === $("form:visible .wordInput").slice(1,2).val())
                morphemsRecords[1] = document.getElementById("answerML").value;
        },
        answer2Test: function (e) {
            if ($("#answer2ML").val().replace(/\-/g, "") !== $("form:visible .wordInput").slice(2, 3).val()) {
                redInput(document.getElementById("answer2ML"));
                document.getElementById("answer2ML").value = morphemsRecords[2];
            }
            else if ($("#answer2ML").val().replace(/\-/g, "") === $("form:visible .wordInput").slice(2,3).val())
                morphemsRecords[2] = document.getElementById("answer2ML").value;
        },
       
        answer3Test: function (e) {
            if ($("#answer3ML").val().replace(/\-/g, "") !== $("form:visible .wordInput").slice(3,4).val()) {
                redInput(document.getElementById("answer3ML"));
                document.getElementById("answer3ML").value = morphemsRecords[3];
            }
            else if ($("#answer3ML").val().replace(/\-/g, "") === $("form:visible .wordInput").slice(3,4).val())
                morphemsRecords[3]= document.getElementById("answer3ML").value;
        },

        answer4Test: function (e) {
            if ($("#answer4ML").val().replace(/\-/g, "") !== $("form:visible .wordInput").slice(4,5).val()) {
                redInput(document.getElementById("answer4ML"));
                document.getElementById("answer4ML").value = morphemsRecords[4];
            }
            else if ($("#answer4ML").val().replace(/\-/g, "") === $("form:visible .wordInput").slice(4,5).val())
                morphemsRecords[4] = document.getElementById("answer4ML").value;
        },
        clickRadioWord: function (e) {
            displayParts(this, 0, 1);
        },
        clickRadioAnswer: function (e) {
            displayParts(this, 1, 2);
        },
        clickRadioAnswer2: function (e) {
            displayParts(this, 2, 3);
        },

        //3 ответ
        clickRadioAnswer3: function (e) {
            displayParts(this, 3, 4);
        },

        //4 ответ
        clickRadioAnswer4: function (e) {
            displayParts(this, 4, 5);
        },
        
        validateStep: function (e) {
            document.getElementsByClassName("disabledClass")[0].style['pointerEvents'] = "none";
            document.getElementsByClassName("disabledClass")[0].style.opacity = 0.7;
            $('.js-syllMirror-ok').prop("disabled", true);
            document.getElementsByClassName('js-syllMirror-ok')[0].style.display = 'none';
        }
    };
})();

$(function () {
    syllMirror.initialize();
});

$(function () {
    if ($('#proverka').attr('disabled') === undefined) {
        $('#proverka').on("click", function () {
        });
    }
});


function order(blockWord, property, morphologyObj, partId) {
    if (property === "znacobraz")
        blockWord.find(morphologyObj[property]).hide();
    var chisloOrder = blockWord.find(morphologyObj.chislo);
    var deistvitOrder = blockWord.find(morphologyObj.deistvit);
    var drobOrder = blockWord.find(morphologyObj.drob);
    var formaOrder = blockWord.find(morphologyObj.forma);
    var kolichOrder = blockWord.find(morphologyObj.kolich);
    var licoOrder = blockWord.find(morphologyObj.lico);
    var naklonOrder = blockWord.find(morphologyObj.naklon);
    var naricatOrder = blockWord.find(morphologyObj.naricat);
    var odushOrder = blockWord.find(morphologyObj.odush);
    var padezhOrder = blockWord.find(morphologyObj.padezh);
    var perehodOrder = blockWord.find(morphologyObj.perehod);
    var prostOrder = blockWord.find(morphologyObj.prost);
    var proizvodnostOrder = blockWord.find(morphologyObj.proizvodnost);
    var razryadOrder = blockWord.find(morphologyObj.razryad);
    var razryadznachOrder = blockWord.find(morphologyObj.razryadznach);
    var rodOrder = blockWord.find(morphologyObj.rod);
    var sklonenOrder = blockWord.find(morphologyObj.sklonen);
    var sochinitOrder = blockWord.find(morphologyObj.sochinit);
    var spryazhOrder = blockWord.find(morphologyObj.spryazh);
    var stepsravOrder = blockWord.find(morphologyObj.stepsrav);
    var vidOrder = blockWord.find(morphologyObj.vid);
    var vozvratOrder = blockWord.find(morphologyObj.vozvrat);
    var vremyaOrder = blockWord.find(morphologyObj.vremya);
    var znakobrazOrder = blockWord.find(morphologyObj.znacobraz);
    var izmenOrder = blockWord.find(morphologyObj.neizmen);
    var upotreblsOrder = blockWord.find(morphologyObj.upotrebls);
    var razryadpoznach = blockWord.find(morphologyObj.razryadpoznach);
    var podrazryad = blockWord.find(morphologyObj.podrazryad);
   
    if (partId === 0)//существительное
    {
        naricatOrder.insertBefore(odushOrder);
        odushOrder.insertBefore(rodOrder);
        rodOrder.insertBefore(sklonenOrder);
        sklonenOrder.insertBefore(chisloOrder);
        chisloOrder.insertBefore(padezhOrder);
    }
    if (partId === 1)//прилагательное
    {
        razryadOrder.insertBefore(formaOrder);
        formaOrder.insertBefore(stepsravOrder);
        stepsravOrder.insertBefore(chisloOrder);
        chisloOrder.insertBefore(rodOrder);
        rodOrder.insertBefore(padezhOrder);
    }
    if (partId === 2)//глагол
    {
        //licoOrder.hide();

        vidOrder.insertBefore(perehodOrder);
        perehodOrder.insertBefore(vozvratOrder);
        vozvratOrder.insertBefore(spryazhOrder);
        spryazhOrder.insertBefore(naklonOrder);
        naklonOrder.insertBefore(vremyaOrder);
        vremyaOrder.insertBefore(chisloOrder);
        chisloOrder.insertBefore(licoOrder);
        licoOrder.insertBefore(rodOrder);
    }
    if (partId === 4)//причастие
    {
        vidOrder.insertBefore(deistvitOrder);
        deistvitOrder.insertBefore(formaOrder);
        formaOrder.insertBefore(vozvratOrder);
        vozvratOrder.insertBefore(vremyaOrder);
        vremyaOrder.insertBefore(chisloOrder);
        chisloOrder.insertBefore(rodOrder);
        rodOrder.insertBefore(padezhOrder);
    }
    if (partId === 6)//числительное
    {
        kolichOrder.insertBefore(drobOrder);
        drobOrder.insertBefore(prostOrder);
        prostOrder.insertBefore(chisloOrder);
        chisloOrder.insertBefore(rodOrder);
        rodOrder.insertBefore(padezhOrder);
    }
    if (partId === 5)//деепричастие
    {
        izmenOrder.insertBefore(vidOrder);
        vidOrder.insertBefore(vozvratOrder);
    }
    if (partId === 7)//местоимение
    {
        razryadznachOrder.insertBefore(licoOrder);
        licoOrder.insertBefore(chisloOrder);
        chisloOrder.insertBefore(rodOrder);
        rodOrder.insertBefore(padezhOrder);
    }
    if (partId === 8)//предлог
    {
        proizvodnostOrder.insertBefore(prostOrder);
    }
    if (partId === 3)//наречие
    {
        izmenOrder.insertBefore(stepsravOrder);
    }
}

function properties(blockWord, partId, number) {
    var blockLabelChislo = document.getElementsByClassName("js-syllMirror-chislo")[number].getElementsByTagName("label")[0];
    var blockOptionChislo = document.getElementsByClassName("js-syllMirror-chislo")[number].getElementsByClassName("form-control")[0];
    var blockLabelLico = document.getElementsByClassName("js-syllMirror-lico")[number].getElementsByTagName("label")[0];
    var blockLabelRod = document.getElementsByClassName("js-syllMirror-rod")[number].getElementsByTagName("label")[0];
    var blockOptionVozvratnost = document.getElementsByClassName("js-syllMirror-vozvrat")[number].getElementsByClassName("form-control")[0];
    var blockOptionRodObscii = document.getElementsByClassName("js-syllMirror-rod")[number].getElementsByClassName("form-control")[0];
    var blockOptionVidDvyvidovoi = document.getElementsByClassName("js-syllMirror-vid")[number].getElementsByClassName("form-control")[0];
    var blockOptionPolozhit = document.getElementsByClassName("js-syllMirror-stepsrav")[number].getElementsByClassName("form-control")[0];
    var blockLabelNaklon = document.getElementsByClassName("js-syllMirror-naklon")[number].getElementsByTagName("label")[0];
    var blockLabelVremya = document.getElementsByClassName("js-syllMirror-vremya")[number].getElementsByTagName("label")[0];
    //род (option)
    if (partId === 2 || partId === 7 || partId === 1) {
        $('.js-syllMirror-rod select>option[value=1]').slice(number, number+1).text('В мужском');
        $('.js-syllMirror-rod select>option[value=2]').slice(number, number + 1).text('В женском');
        $('.js-syllMirror-rod select>option[value=3]').slice(number, number + 1).text('В среднем');
    }
    else {
        $('.js-syllMirror-rod select>option[value=1]').slice(number, number + 1).text('Мужской');
        $('.js-syllMirror-rod select>option[value=2]').slice(number, number + 1).text('Женский');
        $('.js-syllMirror-rod select>option[value=3]').slice(number, number + 1).text('Средний');
    }

    //наклонение (option)
    if (partId === 2) {
        $('.js-syllMirror-naklon select>option[value=1]').slice(number, number + 1).text('В изъявительном');
        $('.js-syllMirror-naklon select>option[value=2]').slice(number, number + 1).text('В условном');
        $('.js-syllMirror-naklon select>option[value=3]').slice(number, number + 1).text('В повелительном');
    }
    else {
        $('.js-syllMirror-naklon select>option[value=1]').slice(number, number + 1).text('Изъявительное');
        $('.js-syllMirror-naklon select>option[value=2]').slice(number, number + 1).text('Условное');
        $('.js-syllMirror-naklon select>option[value=3]').slice(number, number + 1).text('Повелительное');
    }

    //возвратность (option)
    if (partId === 5 || partId === 4) {
        $('.js-syllMirror-vozvrat select>option[value=1]').slice(number, number + 1).text('Возвратное');
        $('.js-syllMirror-vozvrat select>option[value=2]').slice(number, number + 1).text('Невозвратное');
    }
    else {
        $('.js-syllMirror-vozvrat select>option[value=1]').slice(number, number + 1).text('Возвратный');
        $('.js-syllMirror-vozvrat select>option[value=2]').slice(number, number + 1).text('Невозвратный');
    }


    //число (если есть)
    if (partId === 2 || partId === 6 || partId === 7) {
        blockLabelChislo.innerText = "Число (если есть)";
    }
    else blockLabelChislo.innerText = "Число";

    //число пропустить 
    if (partId === 0 || partId === 1 || partId === 4) {
        blockOptionChislo.querySelector('[id="propustit"]').style.display = 'none';
    }
    else blockOptionChislo.querySelector('[id="propustit"]').style.display = 'list-item';

    //степень сравнение положительная
    if (partId === 10) {
        blockOptionPolozhit.querySelector('[id="polozhit"]').style.display = 'none';
    }
    else blockOptionPolozhit.querySelector('[id="polozhit"]').style.display = 'list-item';

    //возвратность пропустить
    if (partId === 2 || partId === 5) {
        blockOptionVozvratnost.querySelector('[id="propustitVozvratnost"]').style.display = 'none';
    }
    else blockOptionVozvratnost.querySelector('[id="propustitVozvratnost"]').style.display = 'list-item';

    //род общий 
    if (partId === 0) {
        blockOptionRodObscii.querySelector('[id="obschii"]').style.display = 'list-item';
    }
    else blockOptionRodObscii.querySelector('[id="obschii"]').style.display = 'none';

    //вид двувидовой
    if (partId === 2) {
        blockOptionVidDvyvidovoi.querySelector('[id="dvyvidovoi"]').style.display = 'list-item';
    }
    else blockOptionVidDvyvidovoi.querySelector('[id="dvyvidovoi"]').style.display = 'none';

    //род (если есть)
    if (partId === 0 || partId === 1 || partId === 2 || partId === 7) {
        blockLabelRod.innerText = "Род (если есть)";
    }
    else blockLabelRod.innerText = "Род";

    //лицо (если есть)
    if (partId === 2) {
        blockLabelLico.innerText = "Лицо (если есть)";
    }
    else blockLabelLico.innerText = "Лицо";

    //наклонение (если есть)
    if (partId === 2) {
        blockLabelNaklon.innerText = "Наклонение (если есть)";
    }
    else blockLabelNaklon.innerText = "Наклонение";

    //время (если есть)
    if (partId === 2) {
        blockLabelVremya.innerText = "Время (если есть)";
    }
    else blockLabelVremya.innerText = "Время";
}

function clickDisabledButton() {
    $('#buttonNext').style.display = true;
}

function redInput(a) {
    a.style.borderColor = '#ff000a';
    a.style["boxShadow"] = "0 0 5px #ff000a";
    setTimeout(function () { a.style.borderColor = '#cfcfcf'; a.style["boxShadow"] = null; }, 1000);
}

function redInput1(a) {
    a.style.borderColor = '#ff000a';
    a.style["boxShadow"] = "0 0 5px #ff000a";
}

function greyInput(a) {
    a.style.borderColor = '#cfcfcf';
    a.style["boxShadow"] = null;
}

function chechedFalse(l) {
    $(l).prop('checked', false);
}

function exerciseDisplay() {
    if (document.getElementsByClassName("exercise3")[0].style.display === "none") {
        document.getElementsByClassName("exercise3")[0].style.display = "inline-block";
        document.getElementById("delbtnEx3").style.display = "inline-block";
    }
    else if (document.getElementsByClassName("exercise4")[0].style.display === "none") {
        document.getElementsByClassName("exercise4")[0].style.display = "inline-block";
        document.getElementById("delbtnEx4").style.display = "inline-block";
    }
    else if (document.getElementsByClassName("exercise5")[0].style.display === "none") {
        document.getElementsByClassName("exercise5")[0].style.display = "inline-block";
        document.getElementById("delbtnEx5").style.display = "inline-block";
    }
    if (document.getElementsByClassName("exercise3")[0].style.display !== "none" && document.getElementsByClassName("exercise4")[0].style.display !== "none" && document.getElementsByClassName("exercise5")[0].style.display !== "none")
        document.getElementById("btnEx").style.display = "none";
    morphemsShowing();
    document.getElementsByClassName("disabledClass")[0].style.marginRight = -10 + "%";
    allFunctions();
}

function allFunctions() {
    wordToBonus();
    contextToBonus();
    partsToBonus();
    lexicBuild();
}

function exercise3Delete() {
    document.getElementById("delbtnEx3").style.display = "none";
    resetMain(2,3);
    document.getElementsByClassName("exercise3")[0].style.display = "none";
    if (document.getElementsByClassName("exercise3")[0].style.display === "none" || document.getElementsByClassName("exercise4")[0].style.display === "none" || document.getElementsByClassName("exercise5")[0].style.display === "none")
        document.getElementById("btnEx").style.display = "inline-block";
    if (document.getElementsByClassName("exercise3")[0].style.display === "none" && document.getElementsByClassName("exercise4")[0].style.display === "none" && document.getElementsByClassName("exercise5")[0].style.display === "none")
        document.getElementsByClassName("disabledClass")[0].style.marginRight = -60 + "%";
    morphemsShowing();
    allFunctions();
}

function resetMain(from,to) {
    $('.morphologyDiv').slice(from, to).find('select').prop('selectedIndex', 0);
    $('.morphologyDiv').slice(from, to).css("display", "none");
    var inputs = $('.exercise'+to+' input[type="text"]');
    for (var a = 0; a < inputs.length; a++) {
        greyInput(inputs[a]);
        inputs[a].value = null;
    }
    var radioInputs = $('.exercise'+to+' input[type="radio"]');
    for (var c = 0; c < radioInputs.length; c++) {
        chechedFalse(radioInputs[c]);
        marmeladBack(radioInputs.slice(c, c + 1).parents('label'));
    }
    var cList = $('.lexicDiv:visible .forLexicText');
    for (var i = 0; i < cList.length; i++)
        cList.get(i).innerHTML = "";
    partsToBonus();
}

function exercise4Delete() {
    document.getElementById("delbtnEx4").style.display = "none";
    resetMain(3, 4);
    document.getElementsByClassName("exercise4")[0].style.display = "none";
    if (document.getElementsByClassName("exercise3")[0].style.display === "none" || document.getElementsByClassName("exercise4")[0].style.display === "none" || document.getElementsByClassName("exercise5")[0].style.display === "none")
        document.getElementById("btnEx").style.display = "inline-block";
    if (document.getElementsByClassName("exercise3")[0].style.display === "none" && document.getElementsByClassName("exercise4")[0].style.display === "none" && document.getElementsByClassName("exercise5")[0].style.display === "none")
        document.getElementsByClassName("disabledClass")[0].style.marginRight = -60 + "%";
    morphemsShowing();
    allFunctions();
}


function exercise5Delete() {
    document.getElementById("delbtnEx5").style.display = "none";
    resetMain(4, 5);
    document.getElementsByClassName("exercise5")[0].style.display = "none";
    if (document.getElementsByClassName("exercise3")[0].style.display === "none" || document.getElementsByClassName("exercise4")[0].style.display === "none" || document.getElementsByClassName("exercise5")[0].style.display === "none")
        document.getElementById("btnEx").style.display = "inline-block";
    if (document.getElementsByClassName("exercise3")[0].style.display === "none" && document.getElementsByClassName("exercise4")[0].style.display === "none" && document.getElementsByClassName("exercise5")[0].style.display === "none")
        document.getElementsByClassName("disabledClass")[0].style.marginRight = -60 + "%";
    morphemsShowing();
    allFunctions();
}

function morphemsShowing() {
    var morphems = $('.morphemBonusLi');
    morphems.get(0).style.display = 'inline-block';
    morphems.get(1).style.display = 'inline-block';
    //2 слова-ответа
    if (document.getElementsByClassName("exercise3")[0].style.display !== "none" && document.getElementsByClassName("exercise4")[0].style.display === "none" && document.getElementsByClassName("exercise5")[0].style.display === "none" || document.getElementsByClassName("exercise3")[0].style.display === "none" && document.getElementsByClassName("exercise4")[0].style.display !== "none" && document.getElementsByClassName("exercise5")[0].style.display === "none" || document.getElementsByClassName("exercise3")[0].style.display === "none" && document.getElementsByClassName("exercise4")[0].style.display === "none" &&  document.getElementsByClassName("exercise5")[0].style.display !== "none") {
        $('.lexicDiv').get(0).style.display = "block";
        $('.lexicDiv').get(1).style.display = "none";
        $('.lexicDiv').get(2).style.display = "none";
        morphems.get(2).style.display = 'inline-block';
        morphems.get(3).style.display = 'none';
        morphems.get(4).style.display = 'none';
        document.getElementById("disabledClassBtn").style.marginRight = 45 + "%";
        document.getElementById("morphems").style.marginLeft = 0 + "%";
        document.getElementById("morphems").style.marginRight = 0 + "%";
    }
    //3 слова-ответа
    if (document.getElementsByClassName("exercise3")[0].style.display !== "none" && document.getElementsByClassName("exercise4")[0].style.display !== "none" && document.getElementsByClassName("exercise5")[0].style.display === "none" || document.getElementsByClassName("exercise3")[0].style.display === "none" && document.getElementsByClassName("exercise4")[0].style.display !== "none" && document.getElementsByClassName("exercise5")[0].style.display !== "none" || document.getElementsByClassName("exercise3")[0].style.display !== "none" &&document.getElementsByClassName("exercise4")[0].style.display === "none" &&document.getElementsByClassName("exercise5")[0].style.display !== "none") {
        $('.lexicDiv').get(1).style.display = "block";
        $('.lexicDiv').get(0).style.display = "none";
        $('.lexicDiv').get(2).style.display = "none";
        morphems.get(2).style.display = 'inline-block';
        morphems.get(3).style.display = 'inline-block';
        morphems.get(4).style.display = 'none';
        document.getElementById("disabledClassBtn").style.marginRight = 33 + "%";
        document.getElementById("morphems").style.marginLeft = 3 + "%";
        document.getElementById("morphems").style.marginRight = -25 + "%";
    }
    //4 слова-ответа
    if (document.getElementsByClassName("exercise3")[0].style.display !== "none" && document.getElementsByClassName("exercise4")[0].style.display !== "none" && document.getElementsByClassName("exercise5")[0].style.display !== "none") {
        for (var x = 0; x < 2; x++) { $('.lexicDiv').get(x).style.display = "none"; }
        $('.lexicDiv').get(2).style.display = "block";
        morphems.get(2).style.display = 'inline-block';
        morphems.get(3).style.display = 'inline-block';
        morphems.get(4).style.display = 'inline-block';
        document.getElementById("disabledClassBtn").style.marginRight = 16 + "%";
        document.getElementById("morphems").style.marginLeft = 17 + "%";
        document.getElementById("morphems").style.marginRight = -47 + "%";
    }
    //1 слово-ответ
    if (document.getElementsByClassName("exercise3")[0].style.display === "none" && document.getElementsByClassName("exercise4")[0].style.display === "none" && document.getElementsByClassName("exercise5")[0].style.display === "none") {
        for (var a = 0; a < 3; a++) { $('.lexicDiv').get(a).style.display = "none"; }
        morphems.get(2).style.display = 'none';
        morphems.get(3).style.display = 'none';
        morphems.get(4).style.display = 'none';
        document.getElementById("disabledClassBtn").style.marginRight = 46 + "%";

        document.getElementById("morphems").style.marginLeft = 0 + "%";
        document.getElementById("morphems").style.marginRight = 0 + "%";
    }
}


function marmelad(th, event, number,x,y) {
    if (document.getElementsByClassName("wordInput")[number].value === '' || document.getElementsByClassName("phoneticInput")[number].value === '' || document.getElementsByClassName("primaryInput")[number].value === '') {
        th.style.background = "aliceblue";
    }
    else {
        var a = $(".chooseLabel").slice(x, y);
        a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
        th.style.background = "grey";
        partsToBonus();
    }
}

function marmeladBack(a) {
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
}

function wordToBonus() {
    var wList = $('form:visible .morphii');
    var bList = $(".morphemBonusLi:visible .forMorphii");
    var lList = $(".lexicDiv:visible .forLexic");
    for (var i = 0; i < wList.length; i++) {
        if (bList[i].value.replace(/\-/g, "") !== wList[i].value)
            morphemsRecords[i] = bList[i].value = wList[i].value;
        if (wList.length > 2&&i>0)
            lList[i-1].innerHTML = wList[i].value;
    }
}

function contextToBonus() {
    var cList = $('.morphemBonusLi:visible .morphContext');
    var aList = $('form:visible .contextInput');
    for (var y = 0; y < cList.length; y++) {
        if (aList[y].value !== "")
            cList[y].innerHTML = aList[y].value;
        else cList[y].innerHTML = "<br/>";
    }
}

function partsToBonus() {
    var cList = $('.lexicDiv:visible .forLexicText');
    var bList = $('form:visible .chooseInput').slice(13, 65);
    var aList = bList.filter('form:visible .chooseInput:checked');

    for (var i = 0, y = 0; i < bList.length; i++) {
        if (i > -1 && i < 13) y = 0;
        if (i > 12 && i < 26) y = 1;
        if (i > 25 && i < 39) y = 2;
        if (i > 38 && i < 52) y = 3;
        
        if (bList.slice(i, i + 1).prop("checked")) {
            var a = cList.slice(y, y + 1);
            var b = bList[i].closest('label').innerText.toString();
            try { cList.get(y).innerHTML = "(" + bList[i].closest('label').innerText.toString() + ")"; } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var hoh = $('.chooseLabel');
    hoh.slice(0, 13).bind('click', function () {
        marmelad(this, event || window.event, 0,0,13);
    });
    hoh.slice(13, 26).bind('click', function () {
        marmelad(this, event || window.event, 1,13,26);
    });
    hoh.slice(26, 39).bind('click', function () {
        marmelad(this, event || window.event, 2,26,39);
    });
    hoh.slice(39, 52).bind('click', function () {
        marmelad(this, event || window.event, 3,39,52);
    });
    hoh.slice(52, 65).bind('click', function () {
        marmelad(this, event || window.event, 4,52,65);
    });
});

function lotte() {
    var mainFlag = false;
    var formsVisible = $('form:visible');
    var morphVisible = $('[class ^= js-word-]:visible');
    if (formsVisible.length === morphVisible.length)
        mainFlag = true;

    var inputFlag = true;
    var inputVisible = $('input:visible[type="text"]:not(.contextInput)');
    for (var z = 0; z < inputVisible.length; z++) {
        if (inputVisible[z].value === "")
            inputFlag = false; 
    }

    var divs = $('.lotte');
    var divsVisible = {};
    var counter = 0;
    var y = 0;
    for (var i = 0; i < divs.length; i++) {
        if (divs.slice(i,i+1).is(":visible")) {
            divsVisible[y] = divs[i];
            y++;
        }
    }
    for (var a = 0; a < y; a++) {
        if (divsVisible[a].getElementsByTagName('select')[0].value.toString() !== "")
            counter++;
    }

    var radioFlag = true;
    var radioVisible = $('.chooseInput:visible[type="radio"]:checked');
    if (formsVisible.length !== radioVisible.length) radioFlag = false;

    var bonusFlag = true;
    var bonusVisible = $('.L:visible[type="radio"]');
    var bonusVisibleChecked = $('.L:visible[type="radio"]:checked');
    if (bonusVisibleChecked.length !== bonusVisible.length/4) bonusFlag = false;

    if (counter === y && mainFlag === true && inputFlag === true && radioFlag === true && bonusFlag === true) {
        $('#proverka').prop("disabled", false);
        $('#proverka').attr('title', null);
        $('#proverka').tooltip("destroy");
    }
    else {
        $('.js-syllMirror-ok').prop("disabled", true);
        $('[data-toggle="tooltip"]').tooltip();
        $('.js-syllMirror-ok').tooltip();
        $('#proverka').tooltip("toggleEnabled");
        $('#proverka').attr('title', "Нельзя добавить упражнение,пока все поля не заполнены");
    }
}

function displayParts(th, index, to) {
    if (document.getElementsByClassName("wordInput")[index].value !== '' && document.getElementsByClassName("phoneticInput")[index].value !== '' && document.getElementsByClassName("primaryInput")[index].value !== '') {
        var partId = parseInt($(th).val(), 10);
        showPropertiesByPart1(partId,index, index+1); 
        $('.morphologyDiv').slice(index, to).show();
        lexicParts(th,index);
    }
    else {
        if (document.getElementsByClassName("wordInput")[index].value === '') {
            redInput(document.getElementsByClassName("wordInput")[index]);
        }
        if (document.getElementsByClassName("phoneticInput")[index].value === '') {
            redInput(document.getElementsByClassName("phoneticInput")[index]);
        }
        if (document.getElementsByClassName("primaryInput")[index].value === '') {
            redInput(document.getElementsByClassName("primaryInput")[index]);
        }
    }
}

function showPropertiesByPart1(partId, from, to) {
    var blockWord = $('.morphologyDiv').slice(from,to);
    if (partId === 15 || partId === 16 || partId === 17) partId -= 4;
    partId--;
    if (partsLists[partId] === undefined) return false;

    var currentMorph1 = partsLists[partId];
    for (var property in morphologyObj) {
        if (morphologyObj.hasOwnProperty(property)) {
            if (currentMorph1[property] === null) {
                blockWord.find(morphologyObj[property]).hide();
            } else {
                blockWord.find(morphologyObj[property]).show();

                order(blockWord, property, morphologyObj, partId);
            }
        }
    }
    properties(blockWord, partId, from);
}
function lexicParts(th, index) {
    partsToBonus();
    lexicBuild();
}
function lexicBuild() {
    var aaaa = document.getElementById('answerL1');
    var bbbb = document.getElementById('answer2L1');
    var eeee = document.getElementById('answer3L1');
    var hhhh = document.getElementById('answer4L1');
    var cccc = $('.forLexicText').get(5);
    var dddd = $('.forLexicText').get(6);
    var ffff = $('.forLexicText').get(7);
    var gggg = $('.forLexicText').get(8);
    $(cccc).offset({ left: parseInt(aaaa.offsetLeft + aaaa.offsetWidth / 2 - cccc.offsetWidth / 2) });
    $(dddd).offset({ left: parseFloat(bbbb.offsetLeft + bbbb.offsetWidth / 2 - dddd.offsetWidth / 2) });
    $(ffff).offset({ left: parseFloat(eeee.offsetLeft + eeee.offsetWidth / 2 - ffff.offsetWidth / 2) });
    $(gggg).offset({ left: parseFloat(hhhh.offsetLeft + hhhh.offsetWidth / 2 - gggg.offsetWidth / 2) });

    var aaa = document.getElementById('answerL0');
    var bbb = document.getElementById('answer2L0');
    var eee = document.getElementById('answer3L0');
    var ccc = $('.forLexicText').get(2);
    var ddd = $('.forLexicText').get(3);
    var fff = $('.forLexicText').get(4);
    $(ccc).offset({ left: parseInt(aaa.offsetLeft + aaa.offsetWidth / 2 - ccc.offsetWidth / 2) });
    $(ddd).offset({ left: parseFloat(bbb.offsetLeft + bbb.offsetWidth / 2 - ddd.offsetWidth / 2) });
    $(fff).offset({ left: parseFloat(eee.offsetLeft + eee.offsetWidth / 2 - fff.offsetWidth / 2) });

    var aa = document.getElementById('answerL');
    var bb = document.getElementById('answer2L');
    var cc = $('.forLexicText').get(0);
    var dd = $('.forLexicText').get(1);
    $(cc).offset({ left: parseInt(aa.offsetLeft + aa.offsetWidth / 2 - cc.offsetWidth / 2) });
    $(dd).offset({ left: parseFloat(bb.offsetLeft + bb.offsetWidth / 2 - dd.offsetWidth / 2) });
}

//вопросик
$(document).mouseup(function (e) { // событие клика по веб-документу
    var div = $(".btn-light"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
        //div.hide(); // скрываем его
        var a = $(".btn-circle");
        for (var i = 0; i < a.length; i++)
            if ($(".btn-circle").slice(i, i + 1).siblings('.in').length !== 0) $(".btn-circle").slice(i, i + 1).popover('toggle');
    }
});


function testPrimary(event) {
    event = event || window.event;
    if (event.charCode && (event.charCode === 45 || event.charCode === 1025)) return true;
    else if (event.charCode && ((event.charCode < 1040) || (event.charCode > 1105) || (event.charCode === 1104))) { var obj = event.target || event.srcElement; redInput(obj); return false; }
}
function testAnswer(event) {
    event = event || window.event;
    if (event.charCode === 1025) return true;
    if (event.charCode && ((event.charCode < 1040) || (event.charCode > 1105) || (event.charCode === 1104))) { var obj = event.target || event.srcElement; redInput(obj); return false; }
}
function testPhonetic(event) {
    event = event || window.event;
    if (event.charCode && ((event.charCode === 45) || (event.charCode === 39) || (event.charCode === 1025))) return true;
    else if (event.key === '.' || event.key === ',' || event.key === '*' || event.key === '8') {
        setTimeout(function () {
            event.target.value += '\'';
        }, 4);
        event.preventDefault();
        return true;
    }
    else if (event.charCode && ((event.charCode < 1040) || (event.charCode > 1105) || (event.charCode === 1104))) { var obj = event.target || event.srcElement; redInput(obj); return false; }
}

var lexicAllId;
var morphologyId = [];
var wordId = [];
var syllMirrorId;
function save() {
    themeFlag = 1;
    var id_trs = document.getElementsByClassName("disabledClass")[0];
    id_tr = id_trs.getAttribute("data-id_tr");


    var radioVisible = $('.chooseInput:visible[type="radio"]');
    var parts = [];
    for (var a1 = 0, b1 = 0; a1 < radioVisible.length; a1++)
        if (radioVisible.slice(a1, a1 + 1).prop("checked")) {
            parts[b1] = radioVisible[a1].value;
            b1++;
        }
    
    var morph1 = [];
    for (var i0 = 0; i0 < parts.length; i0++) {
        morph1[i0] = [];
        for (var j0 = 0; j0 < morphologyObj.length; j0++) {
            morph1[i0][j0] = null;
        }
    }
    for (var ii = 0; ii < parts.length; ii++) {
        var blockWord = $('.morphologyDiv').slice(ii, ii + 1);
        for (var c1 = 0; c1 < parts.length; c1++) {
            for (var property in morphologyObj) {
                if (morphologyObj.hasOwnProperty(property)) {
                    if (blockWord.find('.js-syllMirror-' + property + '>select').is(":visible"))
                        morph1[ii][property] = blockWord.find('.js-syllMirror-' + property + '>select').val();
                }
            }
        }
    }
   

    var inputVisible = $('input:visible[type="text"].wordInput');
    var words = [];
    for (var i = 0; i < inputVisible.length; i++) {
        words.push(inputVisible[i].value);
    }

    inputVisible = $('input:visible[type="text"].primaryInput');
    var primaries = [];
    cycle(inputVisible, primaries);

    inputVisible = $('input:visible[type="text"].phoneticInput');
    var phonetics = [];
    cycle(inputVisible, phonetics);

    inputVisible = $('input:visible[type="text"].contextInput');
    var contexts = [];
    cycle(inputVisible, contexts);

    inputVisible = $('input:visible[type="text"].morphemBonusInputs');
    var morphems = [];
    cycle(inputVisible, morphems);

   // for (var x = 0; x < words.length; x++)
   //     addWord(x, words, primaries, phonetics, contexts, morphems, morphologyId);

    var bonusVisible = $('.L:visible[type="radio"]');
    if (bonusVisible.length / 4 !== 0) {
        var lexics = [];
        for (var jk = 0; jk < 6; jk++)
            lexics[jk] = null;
        for (var a = 0, b = 0; a < bonusVisible.length; a++)
            if (bonusVisible.slice(a,a+1).prop("checked")) {
                lexics[b] = a%4+1;
                b++;
            }
        //addLexicAll(lexics);
    }

    for (var yy = 0; yy < parts.length; yy++)
        addMorphology(yy, parts, morph1, words, primaries, phonetics, contexts, morphems, bonusVisible, lexics, id_tr);
}

function cycle(inputVisible,primaries) {
    for (var y = 0; y < inputVisible.length; y++) {
        primaries.push(inputVisible[y].value);
    }
}

function addWord(id, words, primaries, phonetics, contexts, morphems, morphologyId, bonusVisible, lexics, parts,tr) {
    $.ajax({
        type: 'POST',
        url: '/teacher/AddWord',
        data: {
            word: words[id],
            primary_form: primaries[id],
            phonetic: phonetics[id],
            context: contexts[id],
            morphems: morphems[id],
            id_morphology: morphologyId[id]
        },
        async:false,
        cache: false,
        success: function (response) {
            wordId[id] = JSON.parse(response.Data);
            if (wordId.length - 1 === id) {
                if (bonusVisible.length / 4 > 0)
                    addLexicAll(lexics, words, parts, wordId,tr,id);
                if (bonusVisible.length === 0)
                    addSyllMirror(words, null, wordId,parts,tr,id); 
            }
        }
    });
}

function addLexicAll(lexics, words,parts,wordId,tr,id) {
    $.ajax({
        type: 'POST',
        url: '/teacher/AddLexicAll',
        data: {
            lexic_1_2: lexics[0],
            lexic_1_3: lexics[2],
            lexic_1_4: lexics[5],
            lexic_2_3: lexics[1],
            lexic_2_4: lexics[4],
            lexic_3_4: lexics[3]
        },
        async:false,
        cache: false,
        success: function (response) {
            lexicAllId = JSON.parse(response.Data);
            if (id === parts.length-1)
            addSyllMirror(words, lexicAllId, wordId,parts,tr,id);
        }
    });
}
var level0;
function addSyllMirror(words, lexicAllId, wordId,parts,tr,id) {
    var l = 1;
    var lexicId = null;
    if (words.length > 2) {
        l = 2;
        lexicId = lexicAllId;
    }
    var words1 = [];
    for (var i = 0; i < 5; i++) {
        if (wordId[i] !== undefined)
            words1[i] = wordId[i];
        else words1[i] = null;
    }
   
    $.ajax({
        type: 'POST',
        url: '/teacher/AddSyllMirror',
        data: {
            id_word: words1[0],
            id_answer1: words1[1],
            id_answer2: words1[2],
            id_answer3:words1[3],
            id_answer4: words1[4],
            level: l,
            id_lexic:lexicId
        },
        async: false,
        cache: false,
        success: function (response) {
            themeFlag = 1;
            syllMirrorId = JSON.parse(response.Data);
            if (id === parts.length - 1)
                addTheme(syllMirrorId, parts, tr, l);
        }
    });
}

function uniqueArray(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
        var item = a[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    return out;
}


function addTheme(syllMirrorId, parts, tr,level) {
    var ii;
    var parts1=uniqueArray(parts);
    for (var i = 0; i < parts1.length; i++) {
        if (i === 0) ii = parts1[i];
        $.ajax({
            type: 'POST',
            url: '/teacher/AddTheme',
            data: {
                id_exercise: syllMirrorId,
                id_part: parts1[i],
                id_training: tr
            },
            async: false,
            cache: false,
            success: function (response) {
                if (i === parts1.length - 1 && themeFlag === 1) {
                    alert("Упражнение успешно добавлено.");
                    window.location.href = "http://localhost:48371/Teacher/ExercisesList?id_t=" + ii.toString() + "&level=" + level + "&id_tr=" + tr;
                }
            }
        });
    }
}


function addMorphology(id, parts, morph1, words, primaries, phonetics, contexts, morphems, bonusVisible, lexics,tr) {
    $.ajax({
        type: 'POST',
        url: '/teacher/AddMorphology',
        data: {
            id_part:parts[id],
            odush :morph1[id].odush,
            naricat:morph1[id].naricat,
            rod:morph1[id].rod,
            sklonen: morph1[id].sklonen,
            chislo: morph1[id].chislo,
            padezh: morph1[id].padezh,
            razryad: morph1[id].razryad,
            forma: morph1[id].forma,
            stepsrav: morph1[id].stepsrav,
            prost: morph1[id].prost,
            kolich: morph1[id].kolich,
            drob: morph1[id].drob,
            razryadznach: morph1[id].razryadznach,
            lico: morph1[id].lico,
            vid: morph1[id].vid,
            spryazh: morph1[id].spryazh,
            vozvrat: morph1[id].vozvrat,
            perehod: morph1[id].perehod,
            naklon: morph1[id].naklon,
            vremya: morph1[id].vremya,
            deistvit: morph1[id].deistvit,
            neizmen: morph1[id].neizmen,
            znacobraz: morph1[id].znacobraz,
            proizvodnost: morph1[id].proizvodnost,
            sochinit: morph1[id].sochinit,
            upotrebls: morph1[id].upotrebls,
            razryadpoznach: morph1[id].razryadpoznach,
            podrazryad: morph1[id].podrazryad
        },
        async:false,
        cache: false,
        success: function (response) {
            morphologyId[id] = JSON.parse(response.Data);
            addWord(id, words, primaries, phonetics, contexts, morphems, morphologyId, bonusVisible, lexics, parts,tr);
        }
    });
}