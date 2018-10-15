// window.onload = function() {
//     $("#s-remain").text(" "+trivia.timeRound+" Sec");
//     $("#b-start").on("click",trivia.start);
//     $(".answer-button").on("click",trivia.test);
//   };

var questions = [
    { q: "When did the Beatles form?", a:1 , r: ["1958","1960","1961","1968"] },
    { q: "Where did the Beatles form?", a:2, r: ["London","Portsmouth","Liverpool","Hanover"] }
  ];
// alert ("Go");
var timeQuestion = setTimeout( function() {
    $("#s-remain").text("Over 30 Sec");
}
,30000
); 

for (i=0;i<questions[0].r.length;i++)
{
    var answerText = $("<h2>");
    answerText.addClass("answer-button");
    answerText.text("");
    answerText.attr("answer-value", i);
    answerText.attr("id", "button"+i);
    $("#div-3").append(answerText);

    // console.log(questions[q].r);
}


var inter;
var isRunning = false;
var questionIdx = 0;

var trivia = {

    time: 0,
    timeRound: 30,
    questionNum: 0,

    test: function(o,q)
    {
    // console.log(o);
    console.log($(o).attr("answer-value"));
    console.log(q);
    var correctAnswer = questions[q].a;
    var userAnswer = parseInt($(o).attr("answer-value"));

    // if (q === parseInt($(o).attr("answer-value")))
    if (correctAnswer === userAnswer)
       {
           alert("You Win!");
       }
    else
       {
        alert("You Lose!");
       }
    },
    
    start: function() {
        // alert("Started!");
      // Use setInterval to start the count here and set the clock to running.
      if (!isRunning) {
        inter = setInterval(trivia.count, 1000);
        isRunning = true;
        $("#div-1").html("<h2 class='text-center'>Time Remaining <span id='s-remain'>"+" "+trivia.timeRound+" Sec</span><h2>");
        trivia.renderAnswers(trivia.questionNum);
        trivia.renderQuestion(trivia.questionNum);
       }
    },
    count: function() {
        trivia.time++;
        trivia.timeRound = trivia.timeRound - 1;
        // var timeConverted = trivia.convert(trivia.time);
        $("#s-remain").text(" "+trivia.timeRound+" Sec");
    },

    renderQuestion: function(q) {
    $("#div-2").html("");
        var questionText = $("<h2>");
        questionText.addClass("question-text");
        questionText.text(questions[q].q);
        questionText.attr("correct-answer", questions[q].a);
    
        $("#div-2").append(questionText);
        // console.log(questions[q].r);
    },

    renderAnswers: function(q) {
    // $("#div-3").html("");
        for (i=0;i<questions[q].r.length;i++)
        {
            $("#button"+i).text(questions[q].r[i]);
            // var answerText = $("<button>");
            // answerText.addClass("answer-button");
            // answerText.text(questions[q].r[i]);
            // answerText.attr("answer-value", i);
        
            // $("#div-3").append(answerText);

            // console.log(questions[q].r);
        }
    },

    convert: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
    }
  
  }

$(document).ready(function() {
    $("#s-remain").text(" "+trivia.timeRound+" Sec");
    $("#b-start").on("click",trivia.start);
    // $(".answer-button").on("click",trivia.test);
    $(".answer-button").on("click",function() {
        trivia.test(this,questionIdx);
    });

    // $("#div-3").on("click",trivia.test);
});



