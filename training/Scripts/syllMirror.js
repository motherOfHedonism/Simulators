// "use strict";
var oh = null;
var id_tr = null;

var result = 0;
var trueResult = 0;
var mainResult = 0;
var itogResult = 0;
var mark = 0;

var syllMirror = (function () {
    var self, exercises, step = 0, currentExercise;
    var flag = 0;
    var realLevel;
    var nextStepElement = '.js-syllMirror-next-step';
    var bonusCheck = '.js-syllMirror-bonusCheck';
    var okElement = '.js-syllMirror-ok';
    var wordPhoneticElement = '.js-syllMirror-word-phonetic';
    var wordAnswerElement = '.js-syllMirror-word-answer';
    var wordAnswerPhoneticElement = '.js-syllMirror-word-answer-phonetic';
    var wordAnswer2Element = '.js-syllMirror-word-answer2';
    var wordAnswerPhonetic2Element = '.js-syllMirror-word-answer-phonetic2';
    var exerciseWordEl = '.js-syllMirror-word';
    var wordRadioEl = '.js-radio-word';
    var wordAnswerRadioEl = '.js-radio-word-answer';
    var wordAnswer2RadioEl = '.js-radio-word-answer2';
    var disabledClass = '.disabledClass';
    //3 ответ
    try {
        var wordAnswer3Element = '.js-syllMirror-word-answer3';
        var wordAnswerPhonetic3Element = '.js-syllMirror-word-answer-phonetic3';
        var wordAnswer3RadioEl = '.js-radio-word-answer3';
        var contextAnswer3 = '#contextAnswer3';
        var answerPrimary3Input = '#answerPrimary3Input';
        var answer3ML = '#answer3ML';
    } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

    //4 ответ
    try {
        var wordAnswer4Element = '.js-syllMirror-word-answer4';
        var wordAnswerPhonetic4Element = '.js-syllMirror-word-answer-phonetic4';
        var wordAnswer4RadioEl = '.js-radio-word-answer4';
        var answerPrimary4Input = '#answerPrimary4Input';
        var answer4ML = '#answer4ML';
    } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

    var wordPrimaryInput = '#wordPrimaryInput';
    var answerPrimaryInput = '#answerPrimaryInput';
    var answerPrimary2Input = '#answerPrimary2Input';
    var btnBonus = '#btnBonus';
    var morphologyObj = {
        naricat: '.js-syllMirror-naricat',
        proizvodnost: '.js-syllMirror-proizvodnost',
        kolich: '.js-syllMirror-kolich',
        drob: '.js-syllMirror-drob',
        prost: '.js-syllMirror-prost',
        razryadpoznach: '.js-syllMirror-razryadpoznach',
        razryadznach: '.js-syllMirror-razryadznach',
        podrazryad: '.js-syllMirror-podrazryad',
        upotrebls: '.js-syllMirror-upotrebls',
        odush: '.js-syllMirror-odush',
        sklonen: '.js-syllMirror-sklonen',
        razryad: '.js-syllMirror-razryad',
        lico: '.js-syllMirror-lico',
        neizmen: '.js-syllMirror-neizmen',
        vid: '.js-syllMirror-vid',
        stepsrav: '.js-syllMirror-stepsrav',
        perehod: '.js-syllMirror-perehod',
        deistvit: '.js-syllMirror-deistvit',
        forma: '.js-syllMirror-forma',
        vozvrat: '.js-syllMirror-vozvrat',
        spryazh: '.js-syllMirror-spryazh',
        naklon: '.js-syllMirror-naklon',
        vremya: '.js-syllMirror-vremya',
        chislo: '.js-syllMirror-chislo',
        rod: '.js-syllMirror-rod',
        padezh: '.js-syllMirror-padezh',
        sochinit: '.js-syllMirror-sochinit',
        znacobraz: '.js-syllMirror-znacobraz'
    };
    var morphologyObj0 = { naricat: '.js-syllMirror-naricat', odush: '.js-syllMirror-odush', rod: '.js-syllMirror-rod', sklonen: '.js-syllMirror-sklonen', chislo: '.js-syllMirror-chislo', padezh: '.js-syllMirror-padezh', proizvodnost: '.js-syllMirror-proizvodnost', kolich: '.js-syllMirror-kolich', drob: '.js-syllMirror-drob', prost: '.js-syllMirror-prost', razryadpoznach: '.js-syllMirror-razryadpoznach', razryadznach: '.js-syllMirror-razryadznach', podrazryad: '.js-syllMirror-podrazryad', upotrebls: '.js-syllMirror-upotrebls', razryad: '.js-syllMirror-razryad', forma: '.js-syllMirror-forma', stepsrav: '.js-syllMirror-stepsrav', lico: '.js-syllMirror-lico', neizmen: '.js-syllMirror-neizmen', vid: '.js-syllMirror-vid', perehod: '.js-syllMirror-perehod', deistvit: '.js-syllMirror-deistvit', vozvrat: '.js-syllMirror-vozvrat', spryazh: '.js-syllMirror-spryazh', naklon: '.js-syllMirror-naklon', vremya: '.js-syllMirror-vremya', sochinit: '.js-syllMirror-sochinit', znacobraz: '.js-syllMirror-znacobraz' };
    var morphologyObj1 = { vid: '.js-syllMirror-vid', perehod: '.js-syllMirror-perehod', vozvrat: '.js-syllMirror-vozvrat', spryazh: '.js-syllMirror-spryazh', naklon: '.js-syllMirror-naklon', vremya: '.js-syllMirror-vremya', razryad: '.js-syllMirror-razryad', forma: '.js-syllMirror-forma', stepsrav: '.js-syllMirror-stepsrav', chislo: '.js-syllMirror-chislo', lico: '.js-syllMirror-lico', rod: '.js-syllMirror-rod', naricat: '.js-syllMirror-naricat', proizvodnost: '.js-syllMirror-proizvodnost', kolich: '.js-syllMirror-kolich', drob: '.js-syllMirror-drob', prost: '.js-syllMirror-prost', razryadpoznach: '.js-syllMirror-razryadpoznach', razryadznach: '.js-syllMirror-razryadznach', podrazryad: '.js-syllMirror-podrazryad', upotrebls: '.js-syllMirror-upotrebls', odush: '.js-syllMirror-odush', sklonen: '.js-syllMirror-sklonen', neizmen: '.js-syllMirror-neizmen', deistvit: '.js-syllMirror-deistvit', padezh: '.js-syllMirror-padezh', sochinit: '.js-syllMirror-sochinit', znacobraz: '.js-syllMirror-znacobraz' };

    var blockWord = $('.js-word-morphem');
    var blockAnswer = $('.js-word-answer-morphem');
    var blockAnswer2 = $('.js-word-answer-morphem2');
    //3 ответ
    //4 ответ
    var blockAnswer3, blockAnswer4;
    var wordMorphem, answer1Morphem, answer2Morphem, answer3Morphem, answer4Morphem;
    var wordML = '#wordML';
    var answerML = '#answerML';
    try { var answer2ML = '#answer2ML'; } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

    //3 ответ
    try { blockAnswer3 = $('.js-word-answer-morphem3'); } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
    //4 ответ
    try { blockAnswer4 = $('.js-word-answer-morphem4'); } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

    var partsLists = [];
    var morphologyWord = {}, morphologyAnswer = {}, morphologyAnswer2 = {}, morphologyAnswer3 = {}, morphologyAnswer4 = {}, lexicList = {}; //3 ответ //4 ответ
    var w1, w2;
    var showPropertiesByPart1 = function (partId) {
        var blockWord = $('.js-word-morphem');
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

        properties(blockWord, partId, 0);
        return true;
    };

    var showPropertiesByPart2 = function (partId) {
        var blockAnswer = $('.js-word-answer-morphem');
        if (partId === 15 || partId === 16 || partId === 17) partId -= 4;
        partId--;
        if (partsLists[partId] === undefined) return false;

        var currentMorph2 = partsLists[partId];
        for (var property in morphologyObj) {
            if (morphologyObj.hasOwnProperty(property)) {
                if (currentMorph2[property] === null) {
                    blockAnswer.find(morphologyObj[property]).hide();
                } else {
                    blockAnswer.find(morphologyObj[property]).show();

                    order(blockAnswer, property, morphologyObj, partId);
                }
            }
        }
        properties(blockAnswer, partId, 1);

        return true;
    };
    var showPropertiesByPart3 = function (partId) {
        var blockAnswer2 = $('.js-word-answer-morphem2');
        if (partId === 15 || partId === 16 || partId === 17) partId -= 4;
        partId--;
        if (partsLists[partId] === undefined) return false;

        var currentMorph3 = partsLists[partId];
        for (var property in morphologyObj) {
            if (morphologyObj.hasOwnProperty(property)) {
                if (currentMorph3[property] === null) {
                    blockAnswer2.find(morphologyObj[property]).hide();
                } else {
                    blockAnswer2.find(morphologyObj[property]).show();

                    order(blockAnswer2, property, morphologyObj, partId);
                }
            }
        }
        properties(blockAnswer2, partId, 2);

        return true;
    };

    //3 ответ
    var showPropertiesByPart4 = function (partId) {
        var blockAnswer3 = $('.js-word-answer-morphem3');
        if (partId === 15 || partId === 16 || partId === 17) partId -= 4;
        partId--;
        if (partsLists[partId] === undefined) return false;
        var currentMorph4 = partsLists[partId];
        for (var property in morphologyObj) {
            if (morphologyObj.hasOwnProperty(property)) {
                if (currentMorph4[property] === null) {
                    blockAnswer3.find(morphologyObj[property]).hide();
                } else {
                    blockAnswer3.find(morphologyObj[property]).show();
                    order(blockAnswer3, property, morphologyObj, partId);
                }
            }
        }
        properties(blockAnswer3, partId, 3);
        return true;
    };

    //4 ответ
    var showPropertiesByPart5 = function (partId) {
        var blockAnswer4 = $('.js-word-answer-morphem4');
        if (partId === 15 || partId === 16 || partId === 17) partId -= 4;
        partId--;
        if (partsLists[partId] === undefined) return false;
        var currentMorph5 = partsLists[partId];
        for (var property in morphologyObj) {
            if (morphologyObj.hasOwnProperty(property)) {
                if (currentMorph5[property] === null) {
                    blockAnswer4.find(morphologyObj[property]).hide();
                } else {
                    blockAnswer4.find(morphologyObj[property]).show();
                    order(blockAnswer4, property, morphologyObj, partId);
                }
            }
        }
        properties(blockAnswer4, partId, 4);
        return true;
    };

    var sendMarkToServer = function (mark, id_exercise) {
        $.ajax({
            type: 'POST',
            url: '/exercise/sendMarkToServer',
            data: {
                mark: mark, 
                id_exercise: id_exercise 
            },
            cache: false,
            success: function (response) {
                //console.log(response);
            }
        });
    };

    return {
        initialize: function () {
            self = this;
            self.setUpListeners();
            self.loadLevel($('.exercise1').data('id'));
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
            $(okElement).on('click', self.validateStep);
            $(bonusCheck).on('click', self.validateBonus);

            $(wordAnswerElement).off().on('keyup', self.replaceWords);
            $(wordAnswer2Element).off().on('keyup', self.replaceWords);
            $(wordAnswer3Element).off().on('keyup', self.replaceWords);
            $(wordAnswer4Element).off().on('keyup', self.replaceWords);


            $(nextStepElement).off().on('click', self.clickNextStep);
            $(btnBonus).off().on('click', self.morphemsDisplay);
            $(wordRadioEl).on('click', self.clickRadioWord);
            $(wordAnswerRadioEl).on('click', self.clickRadioAnswer);
            $(disabledClass).off().on('click', self.lotte);
            $(disabledClass).off().on('input', self.lotte);
            $(wordAnswerElement).on('input', self.contextFunction);
            $(wordAnswerElement).on('keyup', self.contextFunction);
            //2 ответ
            try {
                $(wordAnswer2Element).on('input', self.contextFunction);
                $(wordAnswer2Element).on('keyup', self.contextFunction);
                $(wordAnswer2RadioEl).on('click', self.clickRadioAnswer2);
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            $(wordML).off().on('keyup', self.wordTest);
            $(answerML).off().on('keyup', self.answer1Test);
            try { $(answer2ML).off().on('keyup', self.answer2Test); } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            //3 ответ
            try {
                $(answer3ML).off().on('keyup', self.answer3Test);
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            try {
                $(wordAnswer3Element).on('input', self.contextFunction);
                $(wordAnswer3Element).on('keyup', self.contextFunction);
                $(wordAnswer3RadioEl).on('click', self.clickRadioAnswer3);
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            //4 ответ
            try {
                $(answer4ML).off().on('keyup', self.answer4Test);
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            try {
                $(wordAnswer4Element).on('input', self.contextFunction);
                $(wordAnswer4Element).on('keyup', self.contextFunction);
                $(wordAnswer4RadioEl).on('click', self.clickRadioAnswer4);
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
        },
        lotte: function (e) {

            var mainFlag = false;
            var formsVisible = $('form:visible');
            var morphVisible = $('[class ^= js-word-]:visible');
            if (formsVisible.length === morphVisible.length)
                mainFlag = true;

            var inputFlag = true;
            var inputVisible = $('input:visible[type="text"]');
            for (var z = 0; z < inputVisible.length; z++)
                if (inputVisible[z].value === "")
                    inputFlag = false;

            var divs = document.getElementsByClassName("lotte");
            var divsVisible = {};
            var counter = 0;
            for (var i = 0, y = 0; i < divs.length; i++) {
                if (divs[i].style.display !== "none") {
                    divsVisible[y] = divs[i];
                    y++;
                }
            }
            for (var a = 0; a < y; a++)
                if (divsVisible[a].getElementsByTagName('select')[0].value.toString() !== "")
                    counter++;
            if (counter === y && mainFlag === true && inputFlag === true) {
                $('#proverka').prop("disabled", false);
                $('#proverka').attr('title', null);
                $('#proverka').tooltip("destroy");
                $('.js-syllMirror-next-step').prop("disabled", false);
            }
            else {
                $('.js-syllMirror-ok').prop("disabled", true);
                $('[data-toggle="tooltip"]').tooltip();
                $('.js-syllMirror-ok').tooltip();
                $('.js-syllMirror-next-step').prop("disabled", true);
                $('#proverka').tooltip("toggleEnabled");
                $('#proverka').attr('title', "Нельзя проверить работу,пока все поля не заполнены");
            }
        },
        replaceWords: function (e) {
            var a = e.target.value;
            if (a === morphologyAnswer.word || a === morphologyAnswer2.word || a === morphologyAnswer3.word || a === morphologyAnswer4.word) e.target.value = "";
            if (a === morphologyAnswer.word) {
                $(wordAnswerElement).get(0).value = a;
                $(wordAnswerElement).get(0).focus();
                if (localStorage.getItem('replaceWords') !== "true")
                    fnOpenNormalDialog();
            }
            if (a === morphologyAnswer2.word) {
                $(wordAnswer2Element).get(0).value = a;
                $(wordAnswer2Element).get(0).focus();
                if (localStorage.getItem('replaceWords') !== "true")
                    fnOpenNormalDialog();
            }
            if (a === morphologyAnswer3.word) {
                $(wordAnswer3Element).get(0).value = a;
                $(wordAnswer3Element).get(0).focus();
                if (localStorage.getItem('replaceWords') !== "true")
                    fnOpenNormalDialog();
            }
            if (a === morphologyAnswer4.word) {
                $(wordAnswer4Element).get(0).value = a;
                $(wordAnswer4Element).get(0).focus();
                if (localStorage.getItem('replaceWords') !== "true")
                    fnOpenNormalDialog();
            }
        },
        wordTest: function (e) {
            if ($("#wordML").val().replace(/\-/g, "") !== morphologyWord.word) {
                redInput(document.getElementById("wordML"));
                document.getElementById("wordML").value = wordMorphem;
            }
            else if ($("#wordML").val().replace(/\-/g, "") === morphologyWord.word)
                wordMorphem = document.getElementById("wordML").value;
        },
        answer1Test: function (e) {
            if ($("#answerML").val().replace(/\-/g, "") !== morphologyAnswer.word) {
                redInput(document.getElementById("answerML"));
                document.getElementById("answerML").value = answer1Morphem;
            }
            else if ($("#answerML").val().replace(/\-/g, "") === morphologyAnswer.word)
                answer1Morphem = document.getElementById("answerML").value;
        },
        answer2Test: function (e) {
            if ($("#answer2ML").val().replace(/\-/g, "") !== morphologyAnswer2.word) {
                redInput(document.getElementById("answer2ML"));
                document.getElementById("answer2ML").value = answer2Morphem;
            }
            else if ($("#answer2ML").val().replace(/\-/g, "") === morphologyAnswer2.word)
                answer2Morphem = document.getElementById("answer2ML").value;
        },
        //3 ответ
        answer3Test: function (e) {
            if ($("#answer3ML").val().replace(/\-/g, "") !== morphologyAnswer3.word) {
                redInput(document.getElementById("answer3ML"));
                document.getElementById("answer3ML").value = answer3Morphem;
            }
            else if ($("#answer3ML").val().replace(/\-/g, "") === morphologyAnswer3.word)
                answer3Morphem = document.getElementById("answer3ML").value;
        },

        //4 ответ
        answer4Test: function (e) {
            if ($("#answer4ML").val().replace(/\-/g, "") !== morphologyAnswer4.word) {
                redInput(document.getElementById("answer4ML"));
                document.getElementById("answer4ML").value = answer4Morphem;
            }
            else if ($("#answer4ML").val().replace(/\-/g, "") === morphologyAnswer4.word)
                answer4Morphem = document.getElementById("answer4ML").value;
        },

        contextFunction: function (e) {
            if (morphologyAnswer.context !== null && morphologyAnswer.context !== undefined && morphologyAnswer.word === ($(wordAnswerElement).val().replace(/\s/g, '').toLowerCase()))
                document.getElementById("contextAnswer").innerHTML = morphologyAnswer.context;
            else document.getElementById("contextAnswer").innerText = null;

            try {
                if (morphologyAnswer2.context !== null && morphologyAnswer2.context !== undefined && morphologyAnswer2.word === ($(wordAnswer2Element).val().replace(/\s/g, '').toLowerCase()))
                    document.getElementById("contextAnswer2").innerHTML = morphologyAnswer2.context;
                else document.getElementById("contextAnswer2").innerText = "";
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            try {
                if (morphologyAnswer3.context !== null && morphologyAnswer3.context !== undefined && morphologyAnswer3.word === ($(wordAnswer3Element).val().replace(/\s/g, '').toLowerCase()))
                    document.getElementById("contextAnswer3").innerHTML = morphologyAnswer3.context;
                else document.getElementById("contextAnswer3").innerText = "";
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            try {
                if (morphologyAnswer4.context !== null && morphologyAnswer4.context !== undefined && morphologyAnswer4.word === ($(wordAnswer4Element).val().replace(/\s/g, '').toLowerCase()))
                    document.getElementById("contextAnswer4").innerHTML = morphologyAnswer4.context;
                else document.getElementById("contextAnswer4").innerText = null;
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
        },

        clickRadioWord: function (e) {
            if (document.getElementById("phonetic1").value !== '' && (($(wordPrimaryInput).val() !== '' && (morphologyWord.primary_form !== null || morphologyWord.primary_form !== undefined)) || ($(wordPrimaryInput.value === '') && (morphologyWord.primary_form === null || morphologyWord.primary_form === undefined)))) {
                var partId = parseInt($(this).val(), 10);
                showPropertiesByPart1(partId);
                $('.js-word-morphem').show();
            }
            else {
                if (document.getElementById("phonetic1").value === '') {
                    var a = document.getElementById("phonetic1");
                    a.style.borderColor = '#ff000a';
                    a.style["boxShadow"] = "0 0 5px #ff000a";
                    setTimeout(function () { a.style.borderColor = '#cfcfcf'; a.style["boxShadow"] = null; }, 1000);
                }
                if ($(wordPrimaryInput).val() === '') {
                    var b = document.getElementById("wordPrimaryInput");
                    b.style.borderColor = '#ff000a';
                    b.style["boxShadow"] = "0 0 5px #ff000a";
                    setTimeout(function () { b.style.borderColor = '#cfcfcf'; b.style["boxShadow"] = null; }, 1000);
                }
            }
        },
        clickRadioAnswer: function (e) {
            if (morphologyAnswer.context !== null && morphologyAnswer.context !== undefined && morphologyAnswer.word === ($(wordAnswerElement).val().replace(/\s/g, '').toLowerCase()))
                document.getElementById("contextAnswer").innerHTML = morphologyAnswer.context;
            if ((document.getElementsByName("secondInput")[0].value !== '' && document.getElementById("answer").value !== '') && ((($(answerPrimaryInput).val() !== '' && (morphologyAnswer.primary_form !== null || morphologyAnswer.primary_form !== undefined)) || ($(answerPrimaryInput.value === '') && (morphologyAnswer.primary_form === null || morphologyAnswer.primary_form === undefined))))) {
                var partId = parseInt($(this).val(), 10);
                showPropertiesByPart2(partId);
                $('.js-word-answer-morphem').show();
            }
            if (document.getElementsByName("secondInput")[0].value === '' || document.getElementById("answer").value === '') {
                var a = document.getElementsByName("secondInput")[0];
                var b = document.getElementById("answer");

                if (document.getElementsByName("secondInput")[0].value === '') {
                    a.style.borderColor = '#ff000a';
                    a.style["boxShadow"] = "0 0 5px #ff000a";
                    setTimeout(function () { a.style.borderColor = '#cfcfcf'; a.style["boxShadow"] = null; }, 1000);
                }
                if (document.getElementById("answer").value === '') {
                    // b.style.backgroundColor = '#ff000a';
                    b.style.borderColor = '#ff000a';
                    b.style["boxShadow"] = "0 0 5px #ff000a";
                    setTimeout(function () { b.style.borderColor = '#cfcfcf'; b.style["boxShadow"] = null; }, 1000);
                }
            }
            var c = document.getElementById("answerPrimaryInput");
            if (($(answerPrimaryInput).val() === '' && (morphologyAnswer.primary_form !== null || morphologyAnswer.primary_form !== undefined))) {
                c.style.borderColor = '#ff000a';
                c.style["boxShadow"] = "0 0 5px #ff000a";
                setTimeout(function () { c.style.borderColor = '#cfcfcf'; c.style["boxShadow"] = null; }, 1000);

            }
        },
        clickRadioAnswer2: function (e) {
            if (morphologyAnswer2.context !== null && morphologyAnswer2.context !== undefined && morphologyAnswer2.word === ($(wordAnswer2Element).val().replace(/\s/g, '').toLowerCase()))
                document.getElementById("contextAnswer2").innerHTML = morphologyAnswer2.context;
            if ((document.getElementsByName("thirdInput")[0].value !== '' && document.getElementById("answer2").value !== '') && ((($(answerPrimary2Input).val() !== '' && (morphologyAnswer2.primary_form !== null || morphologyAnswer2.primary_form !== undefined)) || ($(answerPrimary2Input.value === '') && (morphologyAnswer2.primary_form === null || morphologyAnswer2.primary_form === undefined))))) {
                var partId = parseInt($(this).val(), 10);
                showPropertiesByPart3(partId);
                $('.js-word-answer-morphem2').show();
            }
            if (document.getElementsByName("thirdInput")[0].value === '' || document.getElementById("answer2").value === '') {
                var a = document.getElementsByName("thirdInput")[0];
                var b = document.getElementById("answer2");

                if (document.getElementsByName("thirdInput")[0].value === '') {
                    a.style.borderColor = '#ff000a';
                    a.style["boxShadow"] = "0 0 5px #ff000a";
                    setTimeout(function () { a.style.borderColor = '#cfcfcf'; a.style["boxShadow"] = null; }, 1000);
                }
                if (document.getElementById("answer2").value === '') {
                    b.style.borderColor = '#ff000a';
                    b.style["boxShadow"] = "0 0 5px #ff000a";
                    setTimeout(function () { b.style.borderColor = '#cfcfcf'; b.style["boxShadow"] = null; }, 1000);
                }
            }
            var c = document.getElementById("answerPrimary2Input");
            if (($(answerPrimary2Input).val() === '' && (morphologyAnswer2.primary_form !== null || morphologyAnswer2.primary_form !== undefined))) {
                c.style.borderColor = '#ff000a';
                c.style["boxShadow"] = "0 0 5px #ff000a";
                setTimeout(function () { c.style.borderColor = '#cfcfcf'; c.style["boxShadow"] = null; }, 1000);

            }
        },

        //3 ответ
        clickRadioAnswer3: function (e) {
            if (morphologyAnswer3.context !== null && morphologyAnswer3.context !== undefined && morphologyAnswer3.word === ($(wordAnswer3Element).val().replace(/\s/g, '').toLowerCase()))
                document.getElementById("contextAnswer3").innerHTML = morphologyAnswer3.context;

            if ((document.getElementsByName("fourInput")[0].value !== '' && document.getElementById("answer3").value !== '') && ((($(answerPrimary3Input).val() !== '' && (morphologyAnswer3.primary_form !== null || morphologyAnswer3.primary_form !== undefined)) || ($(answerPrimary3Input.value === '') && (morphologyAnswer3.primary_form === null || morphologyAnswer3.primary_form === undefined))))) {
                var partId = parseInt($(this).val(), 10);
                showPropertiesByPart4(partId);
                $('.js-word-answer-morphem3').show();
            }
            if (document.getElementsByName("fourInput")[0].value === '' || document.getElementById("answer3").value === '') {
                var aa = document.getElementsByName("fourInput")[0];
                var bb = document.getElementById("answer3");

                if (document.getElementsByName("fourInput")[0].value === '') {
                    aa.style.borderColor = '#ff000a';
                    aa.style["boxShadow"] = "0 0 5px #ff000a";
                    setTimeout(function () { aa.style.borderColor = '#cfcfcf'; aa.style["boxShadow"] = null; }, 1000);
                }
                if (document.getElementById("answer3").value === '') {
                    bb.style.borderColor = '#ff000a';
                    bb.style["boxShadow"] = "0 0 5px #ff000a";
                    setTimeout(function () { bb.style.borderColor = '#cfcfcf'; bb.style["boxShadow"] = null; }, 1000);
                }
            }
            var cc = document.getElementById("answerPrimary3Input");
            if (($(answerPrimary3Input).val() === '' && (morphologyAnswer3.primary_form !== null || morphologyAnswer3.primary_form !== undefined))) {
                cc.style.borderColor = '#ff000a';
                cc.style["boxShadow"] = "0 0 5px #ff000a";
                setTimeout(function () { cc.style.borderColor = '#cfcfcf'; cc.style["boxShadow"] = null; }, 1000);

            }
        },

        //4 ответ
        clickRadioAnswer4: function (e) {
            if (morphologyAnswer4.context !== null && morphologyAnswer4.context !== undefined && morphologyAnswer4.word === ($(wordAnswer4Element).val().replace(/\s/g, '').toLowerCase()))
                document.getElementById("contextAnswer4").innerHTML = morphologyAnswer4.context;

            if ((document.getElementsByName("fiveInput")[0].value !== '' && document.getElementById("answer4").value !== '') && ((($(answerPrimary4Input).val() !== '' && (morphologyAnswer4.primary_form !== null || morphologyAnswer4.primary_form !== undefined)) || ($(answerPrimary4Input.value === '') && (morphologyAnswer4.primary_form === null || morphologyAnswer4.primary_form === undefined))))) {
                var partId = parseInt($(this).val(), 10);
                showPropertiesByPart5(partId);
                $('.js-word-answer-morphem4').show();
            }
            if (document.getElementsByName("fiveInput")[0].value === '' || document.getElementById("answer4").value === '') {
                var aaa = document.getElementsByName("fiveInput")[0];
                var bbb = document.getElementById("answer4");

                if (document.getElementsByName("fiveInput")[0].value === '') {
                    aaa.style.borderColor = '#ff000a';
                    aaa.style["boxShadow"] = "0 0 5px #ff000a";
                    setTimeout(function () { aaa.style.borderColor = '#cfcfcf'; aaa.style["boxShadow"] = null; }, 1000);
                }
                if (document.getElementById("answer4").value === '') {
                    bbb.style.borderColor = '#ff000a';
                    bbb.style["boxShadow"] = "0 0 5px #ff000a";
                    setTimeout(function () { bbb.style.borderColor = '#cfcfcf'; bbb.style["boxShadow"] = null; }, 1000);
                }
            }
            var ccc = document.getElementById("answerPrimary4Input");
            var cccVal = document.getElementById("answerPrimary4Input").value;
            if ((cccVal === '' && (morphologyAnswer4.primary_form !== null || morphologyAnswer4.primary_form !== undefined))) {
                ccc.style.borderColor = '#ff000a';
                ccc.style["boxShadow"] = "0 0 5px #ff000a";
                setTimeout(function () { ccc.style.borderColor = '#cfcfcf'; ccc.style["boxShadow"] = null; }, 1000);

            }
        },

        resetFields: function () {
            document.getElementById("ozenkaResult").style.marginRight = '-15' + 'px';
            document.getElementById("ozenka").style.marginLeft = '50' + '%';
            document.getElementById("ozenkaBonus").style.marginLeft = '-15' + 'px';//50

            var bonusInputs = $('input[type="text"]');
            for (var a = 0; a < bonusInputs.length; a++) {
                greyInput(bonusInputs[a]);
                bonusInputs[a].value = null;
            }

            var lexicDivs = $('div[class="forLexic"]');
            for (var b = 0; b < lexicDivs.length; b++) {
                bonusInputs[b].innerHTML = null;
            }

            var lexicTexts = $('div[class="forLexicText"]');
            for (var xx = 0; xx < lexicTexts.length; xx++) {
                lexicTexts[xx].innerHTML = null;
            }

            var blockWord = $('.js-word-morphem');
            var blockAnswer = $('.js-word-answer-morphem');
            if (realLevel === '2') {
                var blockAnswer2 = $('.js-word-answer-morphem2');
                //3 ответ
                if (morphologyAnswer3.word !== undefined)
                    var blockAnswer3 = $('.js-word-answer-morphem3');

                //4 ответ
                if (morphologyAnswer4.word !== undefined)
                    var blockAnswer4 = $('.js-word-answer-morphem4');
            }

            // document.getElementsByClassName("row")[0].attr("disabled")=false;
            document.getElementById('buttonNext').style.display = 'none';
            document.getElementById('btnBonus').style.display = 'none';
            document.getElementById('btnBonusCheck').style.display = 'none';
            document.getElementsByClassName("disabledClass")[0].style['pointerEvents'] = "auto";
            document.getElementsByClassName("disabledClass")[0].style.opacity = 1;
            document.getElementById("ozenka").style.display = 'none';
            document.getElementById("ozenka").innerHTML = null;
            document.getElementById("ozenkaBonus").style.display = 'none';
            document.getElementById("ozenkaBonus").innerHTML = null;
            document.getElementById("ozenkaResult").style.display = 'none';
            document.getElementById("ozenkaResult").innerHTML = null;

            try { document.getElementById('morphems').style.display = 'none'; } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            var lexicDiv = $('.lexicDiv');
            for (var x = 0; x < lexicDiv.length; x++)
                lexicDiv[x].style.display = "none";

            var li = $('.morphemBonusLi');
            for (var i = 0; i < li.length; i++)
                li[i].style.display = "none";

            var mC = $('.morphContext');
            for (var z = 0; z < mC.length; z++)
                mC[z].innerHTML = "";

            $('.js-syllMirror-ok').prop("disabled", true);
            $('[data-toggle="tooltip"]').tooltip();
            $('.js-syllMirror-ok').tooltip();
            $('.js-syllMirror-next-step').prop("disabled", true);
            $('#proverka').attr('title', "Нельзя проверить работу,пока все поля не заполнены");//jj

            if (realLevel !== 1) {
                $('#proverkaBonus').tooltip();
                $('#proverkaBonus').prop("disabled", true);
                $('#proverkaBonus').attr('title', "Нельзя проверить дополнительное задание,пока введены не все ответы");
            }
            document.getElementById("contextWord").innerHTML = '';
            document.getElementById("contextAnswer").innerHTML = '';
            document.getElementsByClassName('js-word-morphem')[0].style.display = 'none';
            document.getElementsByClassName('js-word-answer-morphem')[0].style.display = 'none';
            try {
                document.getElementById("contextAnswer2").innerHTML = '';
                document.getElementsByClassName('js-word-answer-morphem2')[0].style.display = 'none';
            } catch (exception) { 1 === 1; }
            //3 ответ
            try {
                document.getElementById("contextAnswer3").innerHTML = '';
                document.getElementsByClassName('js-word-answer-morphem3')[0].style.display = 'none';
            } catch (exception) { 1 === 1; }

            //4 ответ
            try {
                document.getElementById("contextAnswer4").innerHTML = '';
                document.getElementsByClassName('js-word-answer-morphem4')[0].style.display = 'none';
            } catch (exception) { 1 === 1; }

            var radioInputs = $('input[type="radio"]');
            for (var c = 0; c < radioInputs.length; c++)
                chechedFalse(radioInputs[c]);

            marmeladBack();
            marmelad2Back();
            try {
                marmelad3Back();
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            //3 ответ
            try {
                marmelad4Back();
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            //4 ответ
            try {
                marmelad5Back();
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            //3 ответ
            //4 ответ
            for (var property in morphologyObj) {
                blockWord.find(morphologyObj[property]).find('select').prop('selectedIndex', 0);
                $(blockWord.find(morphologyObj[property])).find('select').css('background', 'none');
                $(blockWord.find(morphologyObj[property])).find('select').css('border-color', '#ccc');
                $(blockWord.find(morphologyObj[property])).find('select').css('box-shadow', 'none');
                blockAnswer.find(morphologyObj[property]).find('select').prop('selectedIndex', 0);
                $(blockAnswer.find(morphologyObj[property])).find('select').css('background', 'none');
                $(blockAnswer.find(morphologyObj[property])).find('select').css('border-color', '#ccc');
                $(blockAnswer.find(morphologyObj[property])).find('select').css('box-shadow', 'none');
                try {
                    blockAnswer2.find(morphologyObj[property]).find('select').prop('selectedIndex', 0);
                    $(blockAnswer2.find(morphologyObj[property])).find('select').css('background', 'none');
                    $(blockAnswer2.find(morphologyObj[property])).find('select').css('border-color', '#ccc');
                    $(blockAnswer2.find(morphologyObj[property])).find('select').css('box-shadow', 'none');
                } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
                try {
                    blockAnswer3.find(morphologyObj[property]).find('select').prop('selectedIndex', 0);
                    $(blockAnswer3.find(morphologyObj[property])).find('select').css('background', 'none');
                    $(blockAnswer3.find(morphologyObj[property])).find('select').css('border-color', '#ccc');
                    $(blockAnswer3.find(morphologyObj[property])).find('select').css('box-shadow', 'none');
                } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
                try {
                    blockAnswer4.find(morphologyObj[property]).find('select').prop('selectedIndex', 0);
                    $(blockAnswer4.find(morphologyObj[property])).find('select').css('background', 'none');
                    $(blockAnswer4.find(morphologyObj[property])).find('select').css('border-color', '#ccc');
                    $(blockAnswer4.find(morphologyObj[property])).find('select').css('box-shadow', 'none');
                } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            }
        },
        clickNextStep: function (e) {
            try { document.getElementById('formBonus').style.display = 'none'; } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            try { document.getElementById('formBonusA').style.display = 'none'; } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            try { document.getElementById('formBonusB').style.display = 'none'; } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            try { document.getElementById('formBonusC').style.display = 'none'; } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
            self.initialize();
            step++;
            if (step > exercises.length - 1) {
                alert('Упражнений больше нет. После нажатия кнопки "ОК" вы будете перенаправлены на страницу с выбором упражнений.');
                if (id_tr === '1') setTimeout('location.replace("http://localhost:48371/Training/ViewTraining?id_tr=1")', 1000);
                else if (id_tr === '2') setTimeout('location.replace("http://localhost:48371/Training/ViewTraining?id_tr=2")', 1000);
                else if (id_tr === '1007') setTimeout('location.replace("http://localhost:48371/Training/ViewTraining?id_tr=1007")', 1000);
            }
            else {
                $(exerciseWordEl).innerHTML = morphologyWord.word;//раскоммент
                flag = 0;
            }
        },
        morphemsDisplay: function (e) {

            var li = $('.morphemBonusLi');
            document.getElementById('morphems').style.display = 'block';
            if (realLevel === "2") self.loadLexic(oh);

            var allLexicRadio = $(".L");
            for (var i = 0; i < allLexicRadio.length; i++) {
                allLexicRadio[i].onclick = function () {
                    bonusBtnDisplay(morphologyAnswer2.word, morphologyAnswer3.word, morphologyAnswer4.word);
                };
            }

            if (realLevel === '1') {
                for (var a = 0; a < 2; a++) {
                    li[a].style.display = "inline-block";
                }
                for (var b = 2; b < 5; b++) {
                    li[b].style.display = "none";
                }
            }
            document.getElementById('btnBonus').style.display = 'none';
            document.getElementById('btnBonusCheck').style.display = 'block';
            wordMorphem = morphologyWord.word;
            answer1Morphem = morphologyAnswer.word;
            if (realLevel === '2') {

                //3 ответ
                //4 ответ
                if (morphologyAnswer3.word !== undefined && morphologyAnswer4.word !== undefined) {
                    answer3Morphem = morphologyAnswer3.word;
                    answer4Morphem = morphologyAnswer4.word;
                    answer2Morphem = morphologyAnswer2.word;
                    for (var x = 0; x < 5; x++) {
                        li[x].style.display = "inline-block";
                    }
                    $('.lexicDiv').get(2).style.display = "block";

                    var aaaa = document.getElementById('answerL1');
                    var bbbb = document.getElementById('answer2L1');
                    var eeee = document.getElementById('answer3L1');
                    var hhhh = document.getElementById('answer4L1');
                    var cccc = $('.forLexicText').get(5); cccc.innerHTML = "(" + morphologyAnswer.name.toString() + ")";
                    var dddd = $('.forLexicText').get(6); dddd.innerHTML = "(" + morphologyAnswer2.name.toString() + ")";
                    var ffff = $('.forLexicText').get(7); ffff.innerHTML = "(" + morphologyAnswer3.name.toString() + ")";
                    var gggg = $('.forLexicText').get(8); gggg.innerHTML = "(" + morphologyAnswer4.name.toString() + ")";
                    $(cccc).offset({ left: parseInt(aaaa.offsetLeft + aaaa.offsetWidth / 2 - cccc.offsetWidth / 2) });
                    $(dddd).offset({ left: parseFloat(bbbb.offsetLeft + bbbb.offsetWidth / 2 - dddd.offsetWidth / 2) });
                    $(ffff).offset({ left: parseFloat(eeee.offsetLeft + eeee.offsetWidth / 2 - ffff.offsetWidth / 2) });
                    $(gggg).offset({ left: parseFloat(hhhh.offsetLeft + hhhh.offsetWidth / 2 - gggg.offsetWidth / 2) });
                }
                else if (morphologyAnswer3.word !== undefined && morphologyAnswer4.word === undefined) {
                    answer3Morphem = morphologyAnswer3.word;
                    answer2Morphem = morphologyAnswer2.word;
                    for (var c = 0; c < 4; c++) {
                        li[c].style.display = "inline-block";
                    }
                    li[4].style.display = "none";
                    $('.lexicDiv').get(1).style.display = "block";

                    var aaa = document.getElementById('answerL0');
                    var bbb = document.getElementById('answer2L0');
                    var eee = document.getElementById('answer3L0');
                    var ccc = $('.forLexicText').get(2); ccc.innerHTML = "(" + morphologyAnswer.name.toString() + ")";
                    var ddd = $('.forLexicText').get(3); ddd.innerHTML = "(" + morphologyAnswer2.name.toString() + ")";
                    var fff = $('.forLexicText').get(4); fff.innerHTML = "(" + morphologyAnswer3.name.toString() + ")";
                    $(ccc).offset({ left: parseInt(aaa.offsetLeft + aaa.offsetWidth / 2 - ccc.offsetWidth / 2) });
                    $(ddd).offset({ left: parseFloat(bbb.offsetLeft + bbb.offsetWidth / 2 - ddd.offsetWidth / 2) });
                    $(fff).offset({ left: parseFloat(eee.offsetLeft + eee.offsetWidth / 2 - fff.offsetWidth / 2) });
                }
                else {
                    answer2Morphem = morphologyAnswer2.word;
                    for (var y = 0; y < 3; y++) {
                        li[y].style.display = "inline-block";
                    }
                    for (var z = 3; z < 5; z++) {
                        li[z].style.display = "none";
                    }
                    $('.lexicDiv').get(0).style.display = "block";

                    var aa = document.getElementById('answerL');
                    var bb = document.getElementById('answer2L');
                    var cc = $('.forLexicText').get(0); cc.innerHTML = "(" + morphologyAnswer.name.toString() + ")";
                    var dd = $('.forLexicText').get(1); dd.innerHTML = "(" + morphologyAnswer2.name.toString() + ")";
                    $(cc).offset({ left: parseInt(aa.offsetLeft + aa.offsetWidth / 2 - cc.offsetWidth / 2) });
                    $(dd).offset({ left: parseFloat(bb.offsetLeft + bb.offsetWidth / 2 - dd.offsetWidth / 2) });
                }
            }
        },
        validateStep: function (e) {
            mark = 0;
            trueResult = 0;
            result = 0;
            itogResult = 0;

            if (morphologyWord.phonetic !== $(wordPhoneticElement).val().replace(/\s/g, '').toLowerCase()) {
                redInput2($(wordPhoneticElement));
                result++;
            }
            else {
                trueResult++;
            }

            if (morphologyWord.primary_form !== $(wordPrimaryInput).val().replace(/\s/g, '').toLowerCase() && (morphologyWord.primary_form !== null || morphologyWord.primary_form !== undefined)) {
                redInput2($(wordPrimaryInput));
                result++;
            }
            else {
                if (morphologyWord.primary_form !== null || morphologyWord.primary_form !== undefined)
                    trueResult++;
            }

            if (morphologyAnswer.primary_form !== $(answerPrimaryInput).val().replace(/\s/g, '').toLowerCase() && (morphologyAnswer.primary_form !== null || morphologyAnswer.primary_form !== undefined)) {
                redInput2($(answerPrimaryInput));
                result++;
            }
            else {
                if (morphologyAnswer.primary_form !== null || morphologyAnswer.primary_form !== undefined)
                    trueResult++;
            }
            //////////////////////////////////////

            if (morphologyAnswer.word === ($(wordAnswerElement).val().replace(/\s/g, '').toLowerCase())) {
                trueResult++;
            } else {
                redInput2($(wordAnswerElement));
                result++;
            }

            if (morphologyAnswer.phonetic === ($(wordAnswerPhoneticElement).val().replace(/\s/g, '').toLowerCase())) {
                trueResult++;
            } else {
                redInput2($(wordAnswerPhoneticElement));
                result++;
            }

            if (morphologyAnswer2.word !== undefined) {
                if (morphologyAnswer2.primary_form !== $(answerPrimary2Input).val().replace(/\s/g, '').toLowerCase() && (morphologyAnswer2.primary_form !== null || morphologyAnswer2.primary_form !== undefined)) {
                    redInput2($(answerPrimary2Input));
                    result++;
                }
                else {
                    if (morphologyAnswer2.primary_form !== null || morphologyAnswer2.primary_form !== undefined)
                        trueResult++;
                }

                if (morphologyAnswer2.word === ($(wordAnswer2Element).val().replace(/\s/g, '').toLowerCase())) {
                    trueResult++;
                } else {
                    redInput2($(wordAnswer2Element));
                    result++;
                }

                if (morphologyAnswer2.phonetic === ($(wordAnswerPhonetic2Element).val().replace(/\s/g, '').toLowerCase())) {
                    trueResult++;
                } else {
                    redInput2($(wordAnswerPhonetic2Element));
                    result++;
                }
            }

            //3 ответ
            if (morphologyAnswer3.word !== undefined) {
                if (morphologyAnswer3.primary_form !== $(answerPrimary3Input).val().replace(/\s/g, '').toLowerCase() && (morphologyAnswer3.primary_form !== null || morphologyAnswer3.primary_form !== undefined)) {
                    redInput2($(answerPrimary3Input));
                    result++;
                }
                else {
                    if (morphologyAnswer3.primary_form !== null || morphologyAnswer3.primary_form !== undefined)
                        trueResult++;
                }
                if (morphologyAnswer3.word === ($(wordAnswer3Element).val().replace(/\s/g, '').toLowerCase())) {
                    trueResult++;
                } else {
                    redInput2($(wordAnswer3Element));
                    result++;
                }

                if (morphologyAnswer3.phonetic === ($(wordAnswerPhonetic3Element).val().replace(/\s/g, '').toLowerCase())) {
                    trueResult++;
                } else {
                    redInput2($(wordAnswerPhonetic3Element));
                    result++;
                }
            }


            //4 ответ
            if (morphologyAnswer4.word !== undefined) {
                if (morphologyAnswer4.primary_form !== document.getElementById("answerPrimary4Input").value.toString().replace(/\s/g, '').toLowerCase() && (morphologyAnswer4.primary_form !== undefined)) {
                    redInput2($(answerPrimary4Input));
                    result++;
                }
                else {
                    if (morphologyAnswer4.primary_form !== null || morphologyAnswer4.primary_form !== undefined)
                        trueResult++;
                }
                if (morphologyAnswer4.word === ($(wordAnswer4Element).val().replace(/\s/g, '').toLowerCase())) {
                    trueResult++;
                } else {
                    redInput2($(wordAnswer4Element));
                    result++;
                }

                if (morphologyAnswer4.phonetic === ($(wordAnswerPhonetic4Element).val().replace(/\s/g, '').toLowerCase())) {
                    trueResult++;
                } else {
                    redInput2($(wordAnswerPhonetic4Element));
                    result++;
                }
            }

            {
                var blockWord = $('.js-word-morphem');
                var blockAnswer = $('.js-word-answer-morphem');
                if (realLevel === '2') {
                    var blockAnswer2 = $('.js-word-answer-morphem2');
                    //3 ответ
                    if (morphologyAnswer3.word !== undefined)
                        var blockAnswer3 = $('.js-word-answer-morphem3');

                    //4 ответ
                    if (morphologyAnswer4.word !== undefined)
                        var blockAnswer4 = $('.js-word-answer-morphem4');
                }

                for (var property in morphologyObj) {
                    if (morphologyObj.hasOwnProperty(property)) {
                        if (morphologyWord[property] !== null) {
                            if (parseInt(blockWord.find(morphologyObj[property]).find('select').val(), 10) === parseInt(morphologyWord[property], 10)) { trueResult++; }
                            else { redInput2($(blockWord.find(morphologyObj[property])).find('select')); result++; }
                            if (property === "znacobraz") result--;
                        }
                    }
                }
                for (var property1 in morphologyObj) {
                    if (morphologyObj.hasOwnProperty(property1)) {
                        if (morphologyAnswer[property1] !== null) {
                            if (parseInt(blockAnswer.find(morphologyObj[property1]).find('select').val(), 10) === parseInt(morphologyAnswer[property1], 10)) { trueResult++; }
                            else { redInput2($(blockAnswer.find(morphologyObj[property1])).find('select')); result++; }
                            if (property1 === "znacobraz") result--;
                        }
                    }
                }
                if (morphologyAnswer2.word !== undefined) {
                    for (var property20 in morphologyObj) {
                        if (morphologyObj.hasOwnProperty(property20)) {
                            if (morphologyAnswer2[property20] !== null) {
                                if (parseInt(blockAnswer2.find(morphologyObj[property20]).find('select').val(), 10) === parseInt(morphologyAnswer2[property20], 10)) { trueResult++; }
                                else { redInput2($(blockAnswer2.find(morphologyObj[property20])).find('select')); result++; }
                                if (property20 === "znacobraz") result--;
                            }
                        }
                    }
                }
                //3 ответ
                if (morphologyAnswer3.word !== undefined) {
                    for (var property30 in morphologyObj) {
                        if (morphologyObj.hasOwnProperty(property30)) {
                            if (morphologyAnswer3[property30] !== null) {
                                if (parseInt(blockAnswer3.find(morphologyObj[property30]).find('select').val(), 10) === parseInt(morphologyAnswer3[property30], 10)) { trueResult++; }
                                else { redInput2($(blockAnswer3.find(morphologyObj[property30])).find('select')); result++; }
                                if (property30 === "znacobraz") result--;
                            }
                        }
                    }
                }

                //4 ответ
                if (morphologyAnswer4.word !== undefined) {
                    for (var property40 in morphologyObj) {
                        if (morphologyObj.hasOwnProperty(property40)) {
                            if (morphologyAnswer4[property40] !== null) {
                                if (parseInt(blockAnswer4.find(morphologyObj[property40]).find('select').val(), 10) === parseInt(morphologyAnswer4[property40], 10)) { trueResult++; }
                                else { redInput2($(blockAnswer4.find(morphologyObj[property40])).find('select')); result++; }
                                if (property40 === "znacobraz") result--;
                            }
                        }
                    }
                }
            }


            mark = rating(trueResult, result);

            var string;
            if (morphologyWord.id_part === 15 || morphologyWord.id_part === 16 || morphologyWord.id_part === 17)
                string = morphologyWord.word.toUpperCase() + ' \n ' + "<br>" + morphologyWord.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyWord.primary_form + ' \n' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyWord.id_part - 5].name + ' \n' + "<br>";
            else
                string = morphologyWord.word.toUpperCase() + ' \n ' + "<br>" + morphologyWord.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyWord.primary_form + ' \n' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyWord.id_part - 1].name + ' \n' + "<br>";
            var obj;
            if (morphologyWord.id_part === 1) obj = morphologyObj0;
            else if (morphologyWord.id_part === 2 || morphologyWord.id_part === 3) obj = morphologyObj1;
            else obj = morphologyObj;
            string = resultString(morphologyWord, obj, string);

            var string2;
            if (morphologyAnswer.id_part === 15 || morphologyAnswer.id_part === 16 || morphologyAnswer.id_part === 17)
                string2 = morphologyAnswer.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer.id_part - 5].name + '\n ' + "<br>";
            else string2 = morphologyAnswer.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer.id_part - 1].name + '\n ' + "<br>";
            if (morphologyAnswer.id_part === 1) obj = morphologyObj0;
            else if (morphologyAnswer.id_part === 2 || morphologyAnswer.id_part === 3) obj = morphologyObj1;
            else obj = morphologyObj;
            string2 = resultString(morphologyAnswer, obj, string2);

            var ball;
            if (morphologyAnswer3.word === undefined || morphologyAnswer3.word === null) {
                try {
                    var string3;
                    if (morphologyAnswer2.id_part === 15 || morphologyAnswer2.id_part === 16 || morphologyAnswer2.id_part === 17)
                        string3 = morphologyAnswer2.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer2.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer2.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer2.id_part - 5].name + '\n ' + "<br>";
                    else string3 = morphologyAnswer2.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer2.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer2.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer2.id_part - 1].name + '\n ' + "<br>";
                    if (morphologyAnswer2.id_part === 1) obj = morphologyObj0;
                    else if (morphologyAnswer2.id_part === 2 || morphologyAnswer2.id_part === 3) obj = morphologyObj1;
                    else obj = morphologyObj;
                    string3 = resultString(morphologyAnswer2, obj, string3);

                    document.getElementById('formEtalonResultA').innerHTML = 'Оценка '.bold() + mark + '\r\n';//было innerText
                    document.getElementById('formEtalonWordA').innerHTML = string;//было innerText
                    document.getElementById('formEtalonAnswerA').innerHTML = string2;//было innerText
                    document.getElementById('formEtalonAnswer2A').innerHTML = string3;

                    ball = document.getElementById('formEtalonA');
                }
                catch (e) {
                    document.getElementById('formEtalonResult').innerHTML = 'Оценка '.bold() + mark + '\r\n';//было innerText
                    document.getElementById('formEtalonWord').innerHTML = string;
                    document.getElementById('formEtalonAnswer').innerHTML = string2;
                    ball = document.getElementById('formEtalon');
                }
            }
            else if (morphologyAnswer3.word !== undefined) {
                //3 ответ
                try {
                    var string4;
                    if (morphologyAnswer3.id_part === 15 || morphologyAnswer3.id_part === 16 || morphologyAnswer3.id_part === 17)
                        string4 = morphologyAnswer3.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer3.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer3.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer3.id_part - 5].name + '\n ' + "<br>";
                    else string4 = morphologyAnswer3.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer3.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer3.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer3.id_part - 1].name + '\n ' + "<br>";
                    if (morphologyAnswer3.id_part === 1) obj = morphologyObj0;
                    else if (morphologyAnswer3.id_part === 2 || morphologyAnswer3.id_part === 3) obj = morphologyObj1;
                    else obj = morphologyObj;
                    string4 = resultString(morphologyAnswer3, obj, string4);

                    var string0;
                    if (morphologyWord.id_part === 15 || morphologyWord.id_part === 16 || morphologyWord.id_part === 17)
                        string0 = morphologyWord.word.toUpperCase() + ' \n ' + "<br>" + morphologyWord.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyWord.primary_form + ' \n' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyWord.id_part - 5].name + ' \n' + "<br>";
                    else string0 = morphologyWord.word.toUpperCase() + ' \n ' + "<br>" + morphologyWord.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyWord.primary_form + ' \n' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyWord.id_part - 1].name + ' \n' + "<br>";
                    if (morphologyWord.id_part === 1) obj = morphologyObj0;
                    else if (morphologyWord.id_part === 2 || morphologyWord.id_part === 3) obj = morphologyObj1;
                    else obj = morphologyObj;
                    string0 = resultString(morphologyWord, obj, string0);

                    var string2000;
                    if (morphologyAnswer.id_part === 15 || morphologyAnswer.id_part === 16 || morphologyAnswer.id_part === 17)
                        string2000 = morphologyAnswer.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer.id_part - 5].name + '\n ' + "<br>";
                    else string2000 = morphologyAnswer.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer.id_part - 1].name + '\n ' + "<br>";
                    if (morphologyAnswer.id_part === 1) obj = morphologyObj0;
                    else if (morphologyAnswer.id_part === 2 || morphologyAnswer.id_part === 3) obj = morphologyObj1;
                    else obj = morphologyObj;
                    string2000 = resultString(morphologyAnswer, obj, string2000);

                    var string3000;
                    if (morphologyAnswer2.id_part === 15 || morphologyAnswer2.id_part === 16 || morphologyAnswer2.id_part === 17)
                        string3000 = morphologyAnswer2.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer2.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer2.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer2.id_part - 5].name + '\n ' + "<br>";
                    else string3000 = morphologyAnswer2.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer2.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer2.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer2.id_part - 1].name + '\n ' + "<br>";
                    if (morphologyAnswer2.id_part === 1) obj = morphologyObj0;
                    else if (morphologyAnswer2.id_part === 2 || morphologyAnswer2.id_part === 3) obj = morphologyObj1;
                    else obj = morphologyObj;
                    string3000 = resultString(morphologyAnswer2, obj, string3000);

                    if (morphologyAnswer4.word === undefined) {
                        document.getElementById('formEtalonResultB').innerHTML = 'Оценка '.bold() + mark + '\r\n';//было innerText
                        document.getElementById('formEtalonWordB').innerHTML = string0;
                        document.getElementById('formEtalonAnswerB').innerHTML = string2000;
                        document.getElementById('formEtalonAnswer2B').innerHTML = string3000;
                        document.getElementById('formEtalonAnswer3B').innerHTML = string4;

                        ball = document.getElementById('formEtalonB');
                    }
                    //4 ответ
                    else if (morphologyAnswer4.word !== undefined) {
                        var string9000;
                        if (morphologyAnswer4.id_part === 15 || morphologyAnswer4.id_part === 16 || morphologyAnswer4.id_part === 17)
                            string9000 = morphologyAnswer4.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer4.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer4.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer4.id_part - 5].name + '\n ' + "<br>";
                        else string9000 = morphologyAnswer4.word.toUpperCase() + ' \n ' + "<br>" + morphologyAnswer4.phonetic + ' \n' + "<br>" + ' начальная форма '.bold() + '- ' + morphologyAnswer4.primary_form + '\n ' + "<br>" + 'часть речи '.bold() + '- ' + partsLists[morphologyAnswer4.id_part - 1].name + '\n ' + "<br>";
                        if (morphologyAnswer4.id_part === 1) obj = morphologyObj0;
                        else if (morphologyAnswer4.id_part === 2 || morphologyAnswer4.id_part === 3) obj = morphologyObj1;
                        else obj = morphologyObj;
                        string9000 = resultString(morphologyAnswer4, obj, string9000);

                        document.getElementById('formEtalonResultC').innerHTML = 'Оценка '.bold() + mark + '\r\n';//было innerText
                        document.getElementById('formEtalonWordC').innerHTML = string0;
                        document.getElementById('formEtalonAnswerC').innerHTML = string2000;
                        document.getElementById('formEtalonAnswer2C').innerHTML = string3000;
                        document.getElementById('formEtalonAnswer3C').innerHTML = string4;
                        document.getElementById('formEtalonAnswer4C').innerHTML = string9000;
                        ball = document.getElementById('formEtalonC');
                    }

                }
                catch (exception) {
                    document.getElementById('formEtalonResult').innerHTML = 'Оценка '.bold() + mark + '\r\n';//было innerText
                    document.getElementById('formEtalonWord').innerHTML = string;//было innerText
                    document.getElementById('formEtalonAnswer').innerHTML = string2;//было innerText
                    ball = document.getElementById('formEtalon');
                }
            }
            document.getElementById("ozenka").style.display = 'block';
            document.getElementById("ozenka").innerHTML = mark.toString();

            document.getElementById("wordML").value = morphologyWord.word.toLowerCase().toString();
            document.getElementById("answerML").value = morphologyAnswer.word.toLowerCase().toString();
            if (morphologyWord.context !== null && morphologyWord.context !== undefined) $('.morphContext').get(0).innerHTML = morphologyWord.context.toLowerCase().toString();
            else $('.morphContext').get(0).innerHTML = "<br/>";
            if (morphologyAnswer.context !== null && morphologyAnswer.context !== undefined) $('.morphContext').get(1).innerHTML = morphologyAnswer.context.toLowerCase().toString();
            else $('.morphContext').get(1).innerHTML = "<br/>";
            try {
                if (realLevel === "2") {
                    document.getElementById("answer2ML").value = morphologyAnswer2.word.toLowerCase().toString();
                    if (morphologyAnswer2.context !== null && morphologyAnswer2.context !== undefined) $('.morphContext').get(2).innerHTML = morphologyAnswer2.context.toLowerCase().toString();
                    else $('.morphContext').get(2).innerHTML = "<br/>";

                    document.getElementById("answerL").innerHTML = morphologyAnswer.word.toLowerCase().toString();
                    document.getElementById("answer2L").innerHTML = morphologyAnswer2.word.toLowerCase().toString();
                }
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            //3 ответ
            try {
                if (morphologyAnswer3.word !== undefined) {
                    if (morphologyAnswer4.word === undefined) {
                        try {
                            document.getElementById("answer2ML").value = morphologyAnswer2.word.toLowerCase().toString();
                            if (morphologyAnswer2.context !== null && morphologyAnswer2.context !== undefined) $('.morphContext').get(2).innerHTML = morphologyAnswer2.context.toLowerCase().toString();
                            else $('.morphContext').get(2).innerHTML = "<br/>";

                            document.getElementById("answer3ML").value = morphologyAnswer3.word.toLowerCase().toString();
                            if (morphologyAnswer3.context !== null && morphologyAnswer3.context !== undefined) $('.morphContext').get(3).innerHTML = morphologyAnswer3.context.toLowerCase().toString();
                            else $('.morphContext').get(3).innerHTML = "<br/>";

                            document.getElementById("answerL0").innerHTML = morphologyAnswer.word.toLowerCase().toString();
                            document.getElementById("answer2L0").innerHTML = morphologyAnswer2.word.toLowerCase().toString();
                            document.getElementById("answer3L0").innerHTML = morphologyAnswer3.word.toLowerCase().toString();
                        } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
                    }
                    //4 ответ
                    else if (morphologyAnswer4.word !== undefined) {
                        try {
                            document.getElementById("answer2ML").value = morphologyAnswer2.word.toLowerCase().toString();
                            if (morphologyAnswer2.context !== null && morphologyAnswer2.context !== undefined) $('.morphContext').get(2).innerHTML = morphologyAnswer2.context.toLowerCase().toString();
                            else $('.morphContext').get(2).innerHTML = "<br/>";

                            document.getElementById("answer3ML").value = morphologyAnswer3.word.toLowerCase().toString();
                            if (morphologyAnswer3.context !== null && morphologyAnswer3.context !== undefined) $('.morphContext').get(3).innerHTML = morphologyAnswer3.context.toLowerCase().toString();
                            else $('.morphContext').get(3).innerHTML = "<br/>";

                            document.getElementById("answer4ML").value = morphologyAnswer4.word.toLowerCase().toString();
                            if (morphologyAnswer4.context !== null && morphologyAnswer4.context !== undefined) $('.morphContext').get(4).innerHTML = morphologyAnswer4.context.toLowerCase().toString();
                            else $('.morphContext').get(4).innerHTML = "<br/>";

                            document.getElementById("answerL1").innerHTML = morphologyAnswer.word.toLowerCase().toString();
                            document.getElementById("answer2L1").innerHTML = morphologyAnswer2.word.toLowerCase().toString();
                            document.getElementById("answer3L1").innerHTML = morphologyAnswer3.word.toLowerCase().toString();
                            document.getElementById("answer4L1").innerHTML = morphologyAnswer4.word.toLowerCase().toString();
                        } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
                    }
                }
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            document.getElementById('buttonNext').style.display = 'block';
            document.getElementsByClassName("disabledClass")[0].style['pointerEvents'] = "none";
            document.getElementsByClassName("disabledClass")[0].style.opacity = 0.7;
            $('.js-syllMirror-next-step').prop("disabled", true);
            $('.js-syllMirror-ok').prop("disabled", true);
            document.getElementsByClassName('js-syllMirror-ok')[0].style.display = 'none';
            ballMove(ball, realLevel, morphologyAnswer3);

            try { sendMarkToServer(mark, $('form').data('id')); } catch (exc) { 1 === 1; }
        },
        validateBonus: function (e) {
            var flag4W = false, flag3W = false, flag2W = false, flag1W = false;
            var w4 = 0, w3 = 0, w2 = 0, w1 = 0;
            if ($('#proverkaBonus').attr('disabled') !== "disabled") {
                document.getElementById("btnBonusCheck").style.display = 'none';
                if (realLevel === '1') {
                    flag1W = true;
                    var bonusResult = 0;
                    if (document.getElementById("wordML").value.toString() === morphologyWord.morphems)
                        bonusResult++;
                    else redInput1(document.getElementById("wordML"));
                    if (document.getElementById("answerML").value.toString() === morphologyAnswer.morphems)
                        bonusResult++;
                    else redInput1(document.getElementById("answerML"));
                    var markB = 0;
                    if (bonusResult === 2) { document.getElementById("formBonusResult").innerHTML = 'Бонусные баллы 0.25'; markB = 'Бонусные баллы 0.25'; w1 = 0.05; }
                    else { document.getElementById("formBonusResult").innerHTML = 'Бонусные баллы 0'; markB = 'Бонусные баллы 0'; w1 = 0; }
                    document.getElementById("formBonusWord").innerHTML = morphologyWord.morphems.toString();
                    if (morphologyWord.context !== null) document.getElementById("formBonusWord").innerHTML += " (" + morphologyWord.context.toString() + ") ";
                    document.getElementById("formBonusAnswer").innerHTML = morphologyAnswer.morphems.toString();
                    if (morphologyAnswer.context !== null) document.getElementById("formBonusAnswer").innerHTML += " (" + morphologyAnswer.context.toString() + ") ";
                    var ball = document.getElementById('formBonus');
                    ballMove(ball, realLevel, morphologyAnswer3);
                    document.getElementById("ozenkaBonus").style.display = 'block';
                    document.getElementById("ozenkaBonus").innerHTML = markB.toString();
                }
                if (realLevel === "2") {
                    var i = 0;
                    //4 ответ
                    if (morphologyAnswer4.word !== undefined) {
                        flag4W = true;
                        var bonusResult1 = 0.0;
                        var markB1 = 0;
                        var flag5 = true;
                        var flag6 = true;
                        var l12 = l13 = l23 = l34 = l24 = l14 = 0;
                        var lexic4_12 = document.getElementsByClassName("lexic4_12");
                        for (i = 0; i < lexic4_12.length; i++) {
                            if (lexic4_12[i].checked === true && i + 1 === lexicList[0].lexic12)
                                bonusResult1 += 0.1;
                            else if (lexic4_12[i].checked === true && i + 1 !== lexicList[0].lexic12) {
                                redInput1(lexic4_12[i]);
                                flag5 = false;
                            }
                            if (lexic4_12[i].checked === false) l12++;
                        }
                        if (l12 === 4) {
                            for (i = 0; i < lexic4_12.length; i++) {
                                redInput1(lexic4_12[i]);
                                flag5 = false;
                            }
                            l12 = 0;
                        }
                        var lexic4_23 = document.getElementsByClassName("lexic4_23");
                        for (i = 0; i < lexic4_23.length; i++) {
                            if (lexic4_23[i].checked === true && i + 1 === lexicList[0].lexic23)
                                bonusResult1 += 0.1;
                            else if (lexic4_23[i].checked === true && i + 1 !== lexicList[0].lexic23) {
                                redInput1(lexic4_23[i]); flag5 = false;
                            }
                            if (lexic4_23[i].checked === false) l23++;
                        }
                        if (l23 === 4) {
                            for (i = 0; i < lexic4_23.length; i++) {
                                redInput1(lexic4_23[i]);
                                flag5 = false;
                            }
                            l23 = 0;
                        }
                        var lexic4_13 = document.getElementsByClassName("lexic4_13");
                        for (i = 0; i < lexic4_13.length; i++) {
                            if (lexic4_13[i].checked === true && i + 1 === lexicList[0].lexic13)
                                bonusResult1 += 0.1;
                            else if (lexic4_13[i].checked === true && i + 1 !== lexicList[0].lexic13) {
                                redInput1(lexic4_13[i]); flag5 = false;
                            }
                            if (lexic4_13[i].checked === false) l13++;
                        }
                        if (l13 === 4) {
                            for (i = 0; i < lexic4_13.length; i++) {
                                redInput1(lexic4_13[i]);
                                flag5 = false;
                            }
                            l13 = 0;
                        }
                        var lexic4_34 = document.getElementsByClassName("lexic4_34");
                        for (i = 0; i < lexic4_34.length; i++) {
                            if (lexic4_34[i].checked === true && i + 1 === lexicList[0].lexic34)
                                bonusResult1 += 0.1;
                            else if (lexic4_34[i].checked === true && i + 1 !== lexicList[0].lexic34) {
                                redInput1(lexic4_34[i]); flag5 = false;
                            }
                            if (lexic4_34[i].checked === false) l34++;
                        }
                        if (l34 === 4) {
                            for (i = 0; i < lexic4_34.length; i++) {
                                redInput1(lexic4_34[i]);
                                flag5 = false;
                            }
                            l34 = 0;
                        }
                        var lexic4_24 = document.getElementsByClassName("lexic4_24");
                        for (i = 0; i < lexic4_24.length; i++) {
                            if (lexic4_24[i].checked === true && i + 1 === lexicList[0].lexic24)
                                bonusResult1 += 0.1;
                            else if (lexic4_24[i].checked === true && i + 1 !== lexicList[0].lexic24) {
                                redInput1(lexic4_24[i]); flag5 = false;
                            }
                            if (lexic4_24[i].checked === false) l24++;
                        }
                        if (l24 === 4) {
                            for (i = 0; i < lexic4_24.length; i++) {
                                redInput1(lexic4_24[i]);
                                flag5 = false;
                            }
                            l24 = 0;
                        }

                        var lexic4_14 = document.getElementsByClassName("lexic4_14");
                        for (i = 0; i < lexic4_14.length; i++) {
                            if (lexic4_14[i].checked === true && i + 1 === lexicList[0].lexic14)
                                bonusResult1 += 0.1;
                            else if (lexic4_14[i].checked === true && i + 1 !== lexicList[0].lexic14) {
                                redInput1(lexic4_14[i]); flag5 = false;
                            }
                            if (lexic4_14[i].checked === false) l14++;
                        }
                        if (l14 === 4) {
                            for (i = 0; i < lexic4_14.length; i++) {
                                redInput1(lexic4_14[i]);
                                flag5 = false;
                            }
                            l14 = 0;
                        }

                        if (document.getElementById("wordML").value.toString() === morphologyWord.morphems)
                            bonusResult1 += 0.1;
                        else {
                            redInput1(document.getElementById("wordML")); flag6 = false;
                        }
                        if (document.getElementById("answerML").value.toString() === morphologyAnswer.morphems)
                            bonusResult1 += 0.1;
                        else {
                            redInput1(document.getElementById("answerML")); flag6 = false;
                        }
                        if (document.getElementById("answer2ML").value.toString() === morphologyAnswer2.morphems)
                            bonusResult1 += 0.1;
                        else {
                            redInput1(document.getElementById("answer2ML")); flag6 = false;
                        }
                        if (document.getElementById("answer3ML").value.toString() === morphologyAnswer3.morphems)
                            bonusResult1 += 0.1;
                        else {
                            redInput1(document.getElementById("answer3ML")); flag6 = false;
                        }
                        if (document.getElementById("answer4ML").value.toString() === morphologyAnswer4.morphems)
                            bonusResult1 += 0.1;
                        else {
                            redInput1(document.getElementById("answer4ML")); flag6 = false;
                        }
                        if (flag5 === true && flag6 === true) { document.getElementById("formBonusResultC").innerHTML = 'Бонусные баллы 0.5'; markB1 = 'Бонусные баллы 0.5'; w4 = 0.1; }
                        else if (flag5 === true && flag6 === false || flag5 === false && flag6 === true) { document.getElementById("formBonusResultC").innerHTML = 'Бонусные баллы 0.25'; markB1 = 'Бонусные баллы 0.25'; w4 = 0.05; }
                        else { document.getElementById("formBonusResultC").innerHTML = 'Бонусные баллы 0'; markB1 = 'Бонусные баллы 0'; w4 = 0; }
                        document.getElementById("formBonusWordC").innerHTML = morphologyWord.morphems.toString();
                        if (morphologyWord.context !== null) document.getElementById("formBonusWordC").innerHTML += " (" + morphologyWord.context.toString() + ") ";
                        document.getElementById("formBonusAnswerC").innerHTML = morphologyAnswer.morphems.toString();
                        if (morphologyAnswer.context !== null) document.getElementById("formBonusAnswerC").innerHTML += " (" + morphologyAnswer.context.toString() + ") ";
                        document.getElementById("formBonusAnswer2C").innerHTML = morphologyAnswer2.morphems.toString();
                        if (morphologyAnswer2.context !== null) document.getElementById("formBonusAnswer2C").innerHTML += " (" + morphologyAnswer2.context.toString() + ") ";
                        document.getElementById("formBonusAnswer3C").innerHTML = morphologyAnswer3.morphems.toString();
                        if (morphologyAnswer3.context !== null) document.getElementById("formBonusAnswer3C").innerHTML += " (" + morphologyAnswer3.context.toString() + ") ";
                        document.getElementById("formBonusAnswer4C").innerHTML = morphologyAnswer4.morphems.toString();
                        if (morphologyAnswer4.context !== null) document.getElementById("formBonusAnswer4C").innerHTML += " (" + morphologyAnswer4.context.toString() + ") ";
                        var ls = morphologyAnswer.word.toString() + " (" + morphologyAnswer.name.toString() + ")" + " , " + morphologyAnswer2.word.toString() + " (" + morphologyAnswer2.name.toString() + ")" + " - " + lexicList[0].name12.toString() + "<br/>";
                        ls += morphologyAnswer2.word.toString() + " (" + morphologyAnswer2.name.toString() + ")" + " , " + morphologyAnswer3.word.toString() + " (" + morphologyAnswer3.name.toString() + ")" + " - " + lexicList[0].name23.toString() + "<br/>";
                        ls += morphologyAnswer3.word.toString() + " (" + morphologyAnswer3.name.toString() + ")" + " , " + morphologyAnswer4.word.toString() + " (" + morphologyAnswer4.name.toString() + ")" + " - " + lexicList[0].name34.toString() + "<br/>";
                        ls += morphologyAnswer.word.toString() + " (" + morphologyAnswer.name.toString() + ")" + " , " + morphologyAnswer3.word.toString() + " (" + morphologyAnswer3.name.toString() + ")" + " - " + lexicList[0].name13.toString() + "<br/>";
                        ls += morphologyAnswer2.word.toString() + " (" + morphologyAnswer2.name.toString() + ")" + " , " + morphologyAnswer4.word.toString() + " (" + morphologyAnswer4.name.toString() + ")" + " - " + lexicList[0].name24.toString() + "<br/>";
                        ls += morphologyAnswer.word.toString() + " (" + morphologyAnswer.name.toString() + ")" + " , " + morphologyAnswer4.word.toString() + " (" + morphologyAnswer4.name.toString() + ")" + " - " + lexicList[0].name14.toString() + "<br/>";
                        document.getElementById("lexicResultC").innerHTML = ls;
                        var ball1 = document.getElementById('formBonusC');
                        ballMove(ball1, realLevel, morphologyAnswer3);
                        document.getElementById("ozenkaBonus").style.display = 'block';
                        document.getElementById("ozenkaBonus").innerHTML = markB1.toString();
                        ls = "";
                    }
                    //3 ответ
                    else if (morphologyAnswer3.word !== undefined && morphologyAnswer4.word === undefined) {
                        flag3W = true;
                        var markB2 = 0;
                        var bonusResult2 = 0.0;
                        var flag3 = true;
                        var flag4 = true;
                        l12 = l13 = l23 = l34 = l24 = l14 = null;
                        var lexic3_12 = document.getElementsByClassName("lexic3_12");
                        for (i = 0; i < lexic3_12.length; i++) {
                            if (lexic3_12[i].checked === true && i + 1 === lexicList[0].lexic12)
                                bonusResult2 += 0.1;
                            else if (lexic3_12[i].checked === true && i + 1 !== lexicList[0].lexic12) {
                                redInput1(lexic3_12[i]);
                                flag3 = false;
                            }
                            if (lexic3_12[i].checked === false) l12++;
                        }
                        if (l12 === 4) {
                            for (i = 0; i < lexic3_12.length; i++) {
                                redInput1(lexic3_12[i]);
                                flag3 = false;
                            }
                            l12 = 0;
                        }
                        var lexic3_23 = document.getElementsByClassName("lexic3_23");
                        for (i = 0; i < lexic3_23.length; i++) {
                            if (lexic3_23[i].checked === true && i + 1 === lexicList[0].lexic23)
                                bonusResult2 += 0.1;
                            else if (lexic3_23[i].checked === true && i + 1 !== lexicList[0].lexic23) {
                                redInput1(lexic3_23[i]);
                                flag3 = false;
                            }
                            if (lexic3_23[i].checked === false) l23++;
                        }
                        if (l23 === 4) {
                            for (i = 0; i < lexic3_23.length; i++) {
                                redInput1(lexic3_23[i]);
                                flag3 = false;
                            }
                            l23 = 0;
                        }
                        var lexic3_13 = document.getElementsByClassName("lexic3_13");
                        for (i = 0; i < lexic3_13.length; i++) {
                            if (lexic3_13[i].checked === true && i + 1 === lexicList[0].lexic13)
                                bonusResult2 += 0.1;
                            else if (lexic3_13[i].checked === true && i + 1 !== lexicList[0].lexic13) {
                                redInput1(lexic3_13[i]); flag3 = false;
                            }
                            if (lexic3_13[i].checked === false) l13++;
                        }
                        if (l13 === 4) {
                            for (i = 0; i < lexic3_13.length; i++) {
                                redInput1(lexic3_13[i]);
                                flag3 = false;
                            }
                            l13 = 0;
                        }

                        if (document.getElementById("wordML").value.toString() === morphologyWord.morphems)
                            bonusResult2 += 0.1;
                        else {
                            redInput1(document.getElementById("wordML"));
                            flag4 = false;
                        }
                        if (document.getElementById("answerML").value.toString() === morphologyAnswer.morphems)
                            bonusResult2 += 0.1;
                        else {
                            redInput1(document.getElementById("answerML")); flag4 = false;
                        }
                        if (document.getElementById("answer2ML").value.toString() === morphologyAnswer2.morphems)
                            bonusResult2 += 0.1;
                        else {
                            redInput1(document.getElementById("answer2ML")); flag4 = false;
                        }
                        if (document.getElementById("answer3ML").value.toString() === morphologyAnswer3.morphems)
                            bonusResult2 += 0.1;
                        else {
                            redInput1(document.getElementById("answer3ML")); flag4 = false;
                        }
                        if (flag3 === true && flag4 === true) { document.getElementById("formBonusResultB").innerHTML = 'Бонусные баллы 0.5'; markB2 = 'Бонусные баллы 0.5'; w3 = 0.1; }
                        else if (flag3 === true && flag4 === false || flag3 === false && flag4 === true) { document.getElementById("formBonusResultB").innerHTML = 'Бонусные баллы 0.25'; markB2 = 'Бонусные баллы 0.25'; w3 = 0.05; }
                        else { document.getElementById("formBonusResultB").innerHTML = 'Бонусные баллы 0'; markB2 = 'Бонусные баллы 0'; w3 = 0; }
                        document.getElementById("formBonusWordB").innerHTML = morphologyWord.morphems.toString();
                        if (morphologyWord.context !== null) document.getElementById("formBonusWordB").innerHTML += " (" + morphologyWord.context.toString() + ") ";

                        document.getElementById("formBonusAnswerB").innerHTML = morphologyAnswer.morphems.toString();
                        if (morphologyAnswer.context !== null) document.getElementById("formBonusAnswerB").innerHTML += " (" + morphologyAnswer.context.toString() + ") ";

                        document.getElementById("formBonusAnswer2B").innerHTML = morphologyAnswer2.morphems.toString();
                        if (morphologyAnswer2.context !== null) document.getElementById("formBonusAnswer2B").innerHTML += " (" + morphologyAnswer2.context.toString() + ") ";

                        document.getElementById("formBonusAnswer3B").innerHTML = morphologyAnswer3.morphems.toString();
                        if (morphologyAnswer3.context !== null) document.getElementById("formBonusAnswer3B").innerHTML += " (" + morphologyAnswer3.context.toString() + ") ";

                        var ls2 = morphologyAnswer.word.toString() + " (" + morphologyAnswer.name.toString() + ")" + " , " + morphologyAnswer2.word.toString() + " (" + morphologyAnswer2.name.toString() + ")" + " - " + lexicList[0].name12.toString() + "<br/>";
                        ls2 += morphologyAnswer2.word.toString() + " (" + morphologyAnswer2.name.toString() + ")" + " , " + morphologyAnswer3.word.toString() + " (" + morphologyAnswer3.name.toString() + ")" + " - " + lexicList[0].name23.toString() + "<br/>";
                        ls2 += morphologyAnswer.word.toString() + " (" + morphologyAnswer.name.toString() + ")" + " , " + morphologyAnswer3.word.toString() + " (" + morphologyAnswer3.name.toString() + ")" + " - " + lexicList[0].name13.toString() + "<br/>";
                        document.getElementById("lexicResultB").innerHTML = ls2;
                        var ball2 = document.getElementById('formBonusB');
                        ballMove(ball2, realLevel, morphologyAnswer3);
                        document.getElementById("ozenkaBonus").style.display = 'block';
                        document.getElementById("ozenkaBonus").innerHTML = markB2.toString();
                        ls2 = "";
                    }

                    else if (morphologyAnswer2.word !== undefined && morphologyAnswer3.word === undefined) {
                        flag2W = true;
                        var markB3 = 0;
                        var flag1 = true;
                        var flag2 = true;
                        var bonusResult3 = 0;
                        l12 = l13 = l23 = l34 = l24 = l14 = null;
                        var lexic2_12 = document.getElementsByClassName("lexic2_12");
                        for (i = 0; i < lexic2_12.length; i++) {
                            if (lexic2_12[i].checked === true && i + 1 === lexicList[0].lexic12)
                                bonusResult3++;
                            else if (lexic2_12[i].checked === true && i + 1 !== lexicList[0].lexic12) {
                                redInput1(lexic2_12[i]);
                                flag1 = false;
                            }
                            if (lexic2_12[i].checked === false) l12++;
                        }
                        if (l12 === 4) {
                            for (i = 0; i < lexic2_12.length; i++) {
                                redInput1(lexic2_12[i]);
                                flag1 = false;
                            }
                            l12 = 0;
                        }
                        if (document.getElementById("wordML").value.toString() === morphologyWord.morphems)
                            bonusResult3++;
                        else {
                            redInput1(document.getElementById("wordML"));
                            flag2 = false;
                        }
                        if (document.getElementById("answerML").value.toString() === morphologyAnswer.morphems)
                            bonusResult3++;
                        else {
                            redInput1(document.getElementById("answerML"));
                            flag2 = false;
                        }
                        if (document.getElementById("answer2ML").value.toString() === morphologyAnswer2.morphems)
                            bonusResult3++;
                        else {
                            redInput1(document.getElementById("answer2ML"));
                            flag2 = false;
                        }
                        if (flag1 === true && flag2 === true) { document.getElementById("formBonusResultA").innerHTML = 'Бонусные баллы 0.5'; markB3 = 'Бонусные баллы 0.5'; w2 = 0.1; }
                        else if (flag1 === true && flag2 === false || flag1 === false && flag2 === true) { document.getElementById("formBonusResultA").innerHTML = 'Бонусные баллы 0.25'; markB3 = 'Бонусные баллы 0.25'; w2 = 0.05; }
                        else { document.getElementById("formBonusResultA").innerHTML = 'Бонусные баллы 0'; markB3 = 'Бонусные баллы 0'; s2 = 0; }
                        document.getElementById("formBonusWordA").innerHTML = morphologyWord.morphems.toString();
                        if (morphologyWord.context !== null) document.getElementById("formBonusWordA").innerHTML += " (" + morphologyWord.context.toString() + ") ";

                        document.getElementById("formBonusAnswerA").innerHTML = morphologyAnswer.morphems.toString();
                        if (morphologyAnswer.context !== null) document.getElementById("formBonusAnswerA").innerHTML += " (" + morphologyAnswer.context.toString() + ") ";

                        document.getElementById("formBonusAnswer2A").innerHTML = morphologyAnswer2.morphems.toString();
                        if (morphologyAnswer2.context !== null) document.getElementById("formBonusAnswer2A").innerHTML += " (" + morphologyAnswer2.context.toString() + ") ";

                        var ls3 = morphologyAnswer.word.toString() + " (" + morphologyAnswer.name.toString() + ")" + " , " + morphologyAnswer2.word.toString() + " (" + morphologyAnswer2.name.toString() + ")" + " - " + lexicList[0].name12.toString();
                        document.getElementById("lexicResultA").innerHTML = ls3;
                        var ball3 = document.getElementById('formBonusA');
                        ballMove(ball3, realLevel, morphologyAnswer3);
                        document.getElementById("ozenkaBonus").style.display = 'block';
                        document.getElementById("ozenkaBonus").innerHTML = markB3.toString();
                        ls3 = "";
                    }
                }


                if (flag1W) {
                    itogResult = rating(trueResult, result, w1);
                }
                if (flag2W) {
                    itogResult = rating(trueResult, result, w2);
                }
                else if (flag3W) {
                    itogResult = rating(trueResult, result, w3);
                }
                else if (flag4W) {
                    itogResult = rating(trueResult, result, w4);
                }
                var itogResultString = "";
                if (itogResult === 5) itogResultString = "Итоговая оценка:5. Умница!";
                else if (itogResult === 4) itogResultString = "Итоговая оценка:4. Можешь и лучше!";
                else if (itogResult === 3) itogResultString = "Итоговая оценка:3. Надо бы поработать!";
                else if (itogResult === 2) itogResultString = "Итоговая оценка:2. Как это возможно?!";
                document.getElementById("ozenkaResult").style.display = 'block';
                document.getElementById("ozenkaResult").innerHTML = itogResultString.toString();
            }
        },
        nextStep: function (step) {
            try {
                var ballEnd = document.getElementById('formEtalon');
                ballEnd.style.display = 'none';
                ballEnd = document.getElementById('formEtalonA');
                ballEnd.style.display = 'none';
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            //3 ответ
            try {
                var ballEnd2 = document.getElementById('formEtalonB');
                ballEnd2.style.display = 'none';
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

            //4 ответ
            try {
                var ballEnd3 = document.getElementById('formEtalonC');
                ballEnd3.style.display = 'none';
            } catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }


            if (step <= exercises.length - 1) {
                if (step > 0) self.resetFields();
                currentExercise = exercises[step];
                document.getElementsByClassName('js-syllMirror-ok')[0].style.display = 'block';
                $(exerciseWordEl).text(morphologyWord.word);
                $(exerciseWordEl).innerHTML = morphologyWord.word;//раскомментировать

                //3 ответ
                if (realLevel === "2") {
                    if (morphologyAnswer3.word === undefined) {
                        document.getElementsByClassName("exercise4")[0].style.display = 'none';
                        document.getElementsByClassName("exercise5")[0].style.display = 'none';

                        document.getElementById("disabledClassBtn").style.marginRight = '0' + '%';
                        document.getElementById("ozenka").style.marginLeft = '50' + '%';
                        document.getElementById("ozenkaBonus").style.marginLeft = '32' + '%';//50
                    }
                    else if (morphologyAnswer3.word !== undefined) {
                        //4 ответ
                        if (morphologyAnswer4.word === undefined) {
                            document.getElementsByClassName("exercise4")[0].style.display = 'inline-block';
                            document.getElementById("disabledClassBtn").style.marginRight = '-30' + '%';
                            document.getElementById("morphems").style.marginRight = '-26' + '%';
                            document.getElementById("ozenkaResult").style.marginRight = '-26' + '%';//80
                            document.getElementById("ozenka").style.marginLeft = '63' + '%';
                            document.getElementById("ozenkaBonus").style.marginLeft = '45' + '%';//63
                            document.getElementsByClassName("exercise5")[0].style.display = 'none';
                        }
                        else if (morphologyAnswer4.word !== undefined) {
                            document.getElementsByClassName("exercise4")[0].style.display = 'inline-block';
                            document.getElementsByClassName("exercise5")[0].style.display = 'inline-block';
                            document.getElementById("disabledClassBtn").style.marginRight = '-60' + '%';
                            document.getElementById("morphems").style.marginRight = '-60' + '%';
                            document.getElementById("ozenkaResult").style.marginRight = '-60' + '%';//80
                            document.getElementById("ozenka").style.marginLeft = '80' + '%';
                            document.getElementById("ozenkaBonus").style.marginLeft = '60' + '%';//80
                        }
                    }
                }

                if (morphologyWord.context !== null && morphologyWord.context !== undefined)
                    document.getElementById("contextWord").innerHTML = morphologyWord.context;

                if (morphologyWord.primary_form !== null && morphologyWord.primary_form !== undefined) {
                    document.getElementById("wordPrimary").style.display = "block";
                    document.getElementById("wordPrimaryLabel").style.display = "block";
                }

                if (morphologyAnswer.primary_form !== null && morphologyAnswer.primary_form !== undefined) {
                    document.getElementById("answerPrimary").style.display = "block";
                    document.getElementById("answerPrimaryLabel").style.display = "block";
                }
            }
        },
        loadMorphologyWord: function (id_word) {
            $.ajax({
                type: 'GET',
                url: '/exercise/loadMorphologyWord',
                data: {
                    id_word: id_word
                },
                cache: false,
                success: function (response) {
                    morphologyWord = JSON.parse(response.Data);
                    self.nextStep(step);
                }
            });
        },
        loadMorphologyAnswer: function (id_answer) {
            $.ajax({
                type: 'GET',
                url: '/exercise/loadMorphologyAnswer',
                data: {
                    id_answer: id_answer
                },
                cache: false,
                success: function (response) {
                    morphologyAnswer = JSON.parse(response.Data);
                    self.nextStep(step);
                }
            });
        },
        loadMorphologyAnswer2: function (id_answer) {
            $.ajax({
                type: 'GET',
                url: '/exercise/loadMorphologyAnswer',
                data: {
                    id_answer: id_answer
                },
                cache: false,
                success: function (response) {
                    morphologyAnswer2 = JSON.parse(response.Data);
                    self.nextStep(step);
                }
            });
        },

        //3 ответ

        loadMorphologyAnswer3: function (id_answer) {
            $.ajax({
                type: 'GET',
                url: '/exercise/loadMorphologyAnswer',
                data: {
                    id_answer: id_answer
                },
                cache: false,
                success: function (response) {
                    morphologyAnswer3 = JSON.parse(response.Data);
                    self.nextStep(step);
                }
            });
        },

        //4 ответ
        loadMorphologyAnswer4: function (id_answer) {
            $.ajax({
                type: 'GET',
                url: '/exercise/loadMorphologyAnswer',
                data: {
                    id_answer: id_answer
                },
                cache: false,
                success: function (response) {
                    morphologyAnswer4 = JSON.parse(response.Data);
                    self.nextStep(step);
                }
            });
        },
        loadLexic: function (id_e) {
            $.ajax({
                type: 'GET',
                url: '/exercise/loadLexic',
                data: {
                    id_e: oh
                },
                cache: false,
                success: function (response) {
                    lexicList = JSON.parse(response.Data);
                }
            });
        },
        loadLevel: function (level) {
            var partsIds = document.getElementsByClassName("exercise1")[0];
            var pId = partsIds.getAttribute("data-pId");
            var realLevels = document.getElementsByClassName("exercise1")[0];
            realLevel = realLevels.getAttribute("data-realLevel");
            var id_trs = document.getElementsByClassName("exercise1")[0];
            id_tr = id_trs.getAttribute("data-id_tr");
            $.ajax({
                type: 'GET',
                url: '/exercise/GetSyllMirrorWordsByLevel',
                data: {
                    // level: level,
                    level: realLevel,
                    pId: pId,
                    id_tr: id_tr
                },
                cache: false,
                success: function (response) {
                    //step = 0;
                    exercises = JSON.parse(response.Data);
                    oh = null;
                    oh = exercises[step].id_exercise;
                    self.loadMorphologyWord(exercises[step].id_word);
                    self.loadMorphologyAnswer(exercises[step].id_answer1);
                    morphologyAnswer2.word = undefined;
                    try {
                        //var st = step+1;
                        if (exercises[step].id_answer2 !== undefined && exercises[step].id_answer2 !== null)
                            self.loadMorphologyAnswer2(exercises[step].id_answer2);
                    }
                    catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

                    //3 ответ
                    morphologyAnswer3.word = undefined;
                    try {
                        // var st1 = step + 1;
                        if (exercises[step].id_answer3 !== undefined && exercises[step].id_answer3 !== null)
                            self.loadMorphologyAnswer3(exercises[step].id_answer3);
                    }
                    catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }

                    //4 ответ
                    morphologyAnswer4.word = undefined;
                    try {
                        if (exercises[step].id_answer4 !== undefined && exercises[step].id_answer4 !== null)
                            self.loadMorphologyAnswer4(exercises[step].id_answer4);
                    }
                    catch (e) { alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); }
                }
            });

            //3 ответ
            //try {
            if (morphologyAnswer3.word !== undefined) {
                document.getElementsByClassName("exercise4")[0].style.display = 'inline-block';
            }
           
            //4 ответ
            if (morphologyAnswer4.word !== undefined) {
                document.getElementsByClassName("exercise5")[0].style.display = 'inline-block';
            }
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
    var spryazhOrder = blockWord.find(morphologyObj.spryazh);
    var stepsravOrder = blockWord.find(morphologyObj.stepsrav);
    var vidOrder = blockWord.find(morphologyObj.vid);
    var vozvratOrder = blockWord.find(morphologyObj.vozvrat);
    var vremyaOrder = blockWord.find(morphologyObj.vremya);
    var izmenOrder = blockWord.find(morphologyObj.neizmen);

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
        $('.js-syllMirror-rod select>option[value=1]').slice(number, number + 1).text('В мужском');
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

function marmelad(event) {
    var a = $(".rb1 div label");
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
    this.style.background = "grey";

    if ((document.getElementsByName("firstInput")[0].value === '') ||
        (($(wordPrimaryInput).val() === '' && (morphologyWord.primary_form !== null || morphologyWord.primary_form !== undefined)))) {
        this.style.background = "aliceblue";
    }
}

function marmeladBack() {
    var a = $(".rb1 div label");
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
}
function marmelad2Back() {
    var a = $(".rb2 div label");
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
}
function marmelad3Back() {
    var a = $(".rb3 div label");
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
}
//3 ответ
function marmelad4Back() {
    var a = $(".rb4 div label");
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
}

//4 ответ
function marmelad5Back() {
    var a = $(".rb5 div label");
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
}

function marmelad2(event) {
    var a = $(".rb2 div label");
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
    this.style.background = "grey";


    if ((document.getElementsByName("secondInput")[0].value === '') || (document.getElementById("answer").value === '') ||
        (($(answerPrimaryInput).val() === '' && (morphologyAnswer.primary_form !== null || morphologyAnswer.primary_form !== undefined)))) {
        this.style.background = "aliceblue";
    }

}

function marmelad3(event) {
    var a = $(".rb3 div label");
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
    this.style.background = "grey";

    if ((document.getElementsByName("thirdInput")[0].value === '') || (document.getElementById("answer2").value === '') ||
        (($(answerPrimary2Input).val() === '' && (morphologyAnswer2.primary_form !== null || morphologyAnswer2.primary_form !== undefined)))) {
        this.style.background = "aliceblue";
    }
}

//3 ответ
function marmelad4(event) {
    var a = $(".rb4 div label");
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
    this.style.background = "grey";

    if ((document.getElementsByName("fourInput")[0].value === '') || (document.getElementById("answer3").value === '') ||
        (($(answerPrimary3Input).val() === '' && (morphologyAnswer3.primary_form !== null || morphologyAnswer3.primary_form !== undefined)))) {
        this.style.background = "aliceblue";
    }
}


//4 ответ
function marmelad5(event) {
    var a = $(".rb5 div label");
    a.css("background", "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)");
    this.style.background = "grey";

    if ((document.getElementsByName("fiveInput")[0].value === '') || (document.getElementById("answer4").value === '') ||
        (($(answerPrimary4Input).val() === '' && (morphologyAnswer4.primary_form !== null || morphologyAnswer4.primary_form !== undefined)))) {
        this.style.background = "aliceblue";
    }
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

function redInput2(a) {
    a.css('borderColor', '#ff000a');
    a.css('boxShadow', '0 0 20px #ff000a');
}

function greyInput(a) {
    a.style.borderColor = '#cfcfcf';
    a.style["boxShadow"] = null;
}

function chechedFalse(l) {
    $(l).prop('checked', false);
}

function bonusBtnDisplay(a3, a4, a5) {
    if (a3 !== undefined && a4 === undefined && a5 === undefined) {
        prBonus();
    }
    if (a3 !== undefined && a4 !== undefined && a5 === undefined) {
        var L3 = 0;
        var l3 = document.getElementsByClassName("L3");
        for (i = 0; i < l3.length; i++) {
            if (l3[i].checked === true)
                L3++;
        }
        if (L3 === 3) prBonus();
    }
    if (a3 !== undefined && a4 !== undefined && a5 !== undefined) {
        var L4 = 0;
        var l4 = document.getElementsByClassName("L4");
        for (i = 0; i < l4.length; i++) {
            if (l4[i].checked === true)
                L4++;
        }
        if (L4 === 6) prBonus();
    }
}

function prBonus() {
    $('#proverkaBonus').prop("disabled", false);
    $('#proverkaBonus').attr('title', null);
    $('#proverkaBonus').tooltip("destroy");
}

function ballMove(ball, realLevel, morphologyAnswer3) {
    ball.style.display = 'block';
    var flagBall = false;
    ball.style.top = parseInt(document.documentElement.scrollTop + ball.offsetHeight / 2) + "px";
    ball.style.left = parseInt(document.body.clientWidth / 2 + document.documentElement.scrollLeft - ball.offsetWidth / 2) + "px";
    ball.onmousedown = function (e) {
        ball.style.position = 'absolute';
        moveAt(e);
        document.body.appendChild(ball);

        ball.style.zIndex = 999999;
        function moveAt(e) {
            ball.style.left = e.pageX - ball.offsetWidth / 2 + 'px';
            ball.style.top = e.pageY - ball.offsetHeight / 2 + 'px';
        }

        document.onmousemove = function (e) {
            moveAt(e);
        };

        ball.onmouseup = function () {
            document.onmousemove = null;
            ball.onmouseup = null;
        };
    };


    ball.ondragstart = function () {
        return false;
    };
}

function rating(trueResult, result, hafu = 0) {
    if ((trueResult / (result + trueResult) + hafu) > 0.9 || ((trueResult / (result + trueResult)) + hafu === 0.9)) return 5;
    else if (((trueResult / (result + trueResult) + hafu) > 0.75) && ((trueResult / (result + trueResult)) + hafu < 0.9) || ((trueResult / (result + trueResult) + hafu) === 0.75)) return 4;
    else if (((trueResult / (result + trueResult) + hafu) > 0.51) && ((trueResult / (result + trueResult) + hafu) < 0.75) || ((trueResult / (result + trueResult) + hafu) === 0.51)) return 3;
    else return 2;
}

function resultString(morphologyWord, morphologyObj, string) {
    for (var property2 in morphologyObj) {
        if (morphologyObj.hasOwnProperty(property2)) {
            if (morphologyWord[property2] !== null) {
                if (property2 !== "znacobraz") {
                    var block1 = document.getElementsByClassName("js-syllMirror-" + property2)[0].getElementsByClassName("form-control")[0];
                    string += block1.name.charAt(0).toLowerCase().bold() + block1.name.slice(1).bold() + ' - ' + block1.options[morphologyWord[property2]].text.charAt(0).toLowerCase() + block1.options[morphologyWord[property2]].text.slice(1) + ' \n' + "<br>";
                }
            }
        }
    }
    return string;
}

//вопросик
$(document).mouseup(function (e) {
    var div = $(".btn-light"); // ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
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

function fnOpenNormalDialog() {
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        height: 200,
        width: 420,
        create: function (e, ui) {
            var pane = $(this).dialog("widget").find(".ui-dialog-buttonpane");
            $("<label class='shut-up' ><input id='checkReplaceWords' type='checkbox'/> Больше не показывать это сообщение </label>").prependTo(pane);
        },
        buttons: {
            "OK": function () {
                if (document.getElementById("checkReplaceWords").checked === true) localStorage.setItem('replaceWords', true);
                $(this).dialog('close');
            }
        }
    });
    $(".ui-dialog-titlebar").hide();
}
