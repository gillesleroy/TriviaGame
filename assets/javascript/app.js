// window.onload = function() {
//     $("#s-remain").text(" "+trivia.timeRound+" Sec");
//     $("#b-start").on("click",trivia.start);
//     $(".answer-button").on("click",trivia.test);
//   };

var questions = [
    { q: "When did the Beatles form?", a:1 , r: ["1958","1960","1961","1968"] },
    { q: "Where did the Beatles form?", a:2, r: ["London","Hamburg","Liverpool","Hanover"] },
    { q: "What was the Beatles first Hit Record in the US?", a:3, r: ["Let it Be","Hey Jude","Please Please Me","Love Me Do"] },
    { q: "When did the Beatles have their first hit record?", a:1, r: ["1960","1962","1963","1964"] },
    { q: "When did the Beatles break up?", a:0, r: ["1970","1978","1980","1985"] },
    { q: "Who left the Beatles first?", a:2, r: ["John Lennon ","Paul Mc Cartney","Ringo Starr","Georges Harrison"] }
];

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

// var countU= 0;

var trivia = {

    // time: 0,
    timeRound: 10,
    // questionNum: 0,
    countW: 0,
    countL: 0,
    countU: 0,

    test: function(o,q,t)
    {
    // console.log(o);
    if (isRunning)
    {
    clearInterval(inter);
    isRunning = false;
    // console.log($(o).attr("answer-value"));
    // console.log(q);
    var correctAnswer = questions[q].a;

    if (t === -1) {
        trivia.countU++;
        var line1 = "<h2 class='question-text' >Time has run out.</h2>";
        var line2 = "<h2 class='question-text' >The Correct Answer was: "+questions[q].r[correctAnswer]+"</h2>";
        $("#button"+correctAnswer).css("border","solid 3px green");
        $("#div-2").html(line1+line2);
    }
    else
    {
    var userAnswer = parseInt($(o).attr("answer-value"));

    if (correctAnswer === userAnswer)
       {
           trivia.countW++;
        //    alert("You Win!");
           $("#div-2").html("<h2 class='question-text' >Your Answer is Correct!</h2>");
           $("#button"+correctAnswer).css("border","solid 3px green");
        }
    else
       {
        // alert("You Lose!");
        trivia.countL++;
        var line1 = "<h2 class='question-text' >Nope!</h2>";
        var line2 = "<h2 class='question-text' >The Correct Answer was: "+questions[q].r[correctAnswer]+"</h2>";
//   alert(questions[q].r[correctAnswer]);
        // $("#button1").css("border","solid 2px green");
        $("#button"+correctAnswer).css("border","solid 3px green");
        $("#div-2").html(line1+line2);
         }
    }
       
     var timeNext = setTimeout( function() 
        {
        trivia.timeRound = 10; 
        questionIdx++;
            if (questionIdx < questions.length)
               {
                trivia.start();
               }
            else
            {
                trivia.clearAnswers(0);
                $("#div-1").html("<h2>End of the Game</h2>");
                $("#div-2").html("");
                $("#div-3").html("<h2>Correct answers: "+trivia.countW+"</h2>"
                +"<h2>Incorrect answers: "+trivia.countL+"</h2>"
                +"<h2>Unanswered: "+trivia.countU+"</h2>");

                var timeRestart = setTimeout( function()
                {
                    $("#div-3").html("");
                    trivia.countW = 0;
                    trivia.countL = 0;
                    trivia.countU = 0; 
                    questionIdx = 0;
                    isRunning = false;
                    var newButton = $("<button>");
                    newButton.attr("id","b-start");
                    newButton.addClass("button");
                    newButton.text("Start");
                    newButton.attr("onClick","trivia.start()");
                    $("#div-1").empty(); 
                    $("#div-1").append(newButton);  
                    
                    for (i=0;i<questions[0].r.length;i++)
                        {
                            var answerText = $("<h2>");
                            answerText.addClass("answer-button");
                            answerText.text("");
                            answerText.attr("answer-value", i);
                            answerText.attr("id", "button"+i);
                            // newButton.attr("onClick","trivia.test("+this+","+questionIdx+",0)");
                            $("#div-3").append(answerText);
                            $(".answer-button").on("click",function() {
                                trivia.test(this,questionIdx,0);
                            });
                            $(".answer-button").hover(function() {
                                // alert("Hovering");
                                // $(this).css("border","solid 1px #1d534c");
                                $(this).css("cursor","pointer");
                                $(this).css("background-color","aqua");
                                }
                                ,function() {
                                    // alert("Hovering");
                                    // $(this).css("border","solid 0px");
                                    $(this).css("cursor","default");
                                    $(this).css("background-color","");
                                }
                            );
                            // console.log(questions[q].r);
                        }
                },
                3000
            );

            }
        }
        ,3000
        ); 
      }
    },
    
    start: function() {
        // alert("Started!");
      // Use setInterval to start the count here and set the clock to running.
      if (!isRunning) {
        inter = setInterval(trivia.count, 1000);
        isRunning = true;
        $("#div-1").html("<h2 class='text-center'>Time Remaining <span id='s-remain'>"+" "+trivia.timeRound+" Sec</span><h2>");
        trivia.renderAnswers(questionIdx);
        trivia.renderQuestion(questionIdx);
       }
    },

    count: function() {
        trivia.time++;
        trivia.timeRound = trivia.timeRound - 1;
        if (trivia.timeRound < 1) {
            // alert("Time has run out!");
            // trivia.test(this,questionIdx,1);
            // alert("question Idx="+questionIdx);
            trivia.test(this,questionIdx,-1);
        }
        else{
            $("#s-remain").text(" "+trivia.timeRound+" Sec");
        }

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
            $("#button"+i).css("border","solid 0px");
        }
    },

    clearAnswers: function(q) {
        // $("#div-3").html("");
            for (i=0;i<questions[q].r.length;i++)
            {
                $("#button"+i).text("");
            }
        },
  
  }

// $(document).ready(function() {
    // $("#s-remain").text(" "+trivia.timeRound+" Sec");
     $(document).on("click", "#b-start", trivia.start);
    //  $("#b-start").on("click",trivia.start);

    // $(".answer-button").on("click",trivia.test);
    $(".answer-button").on("click",function() {
        trivia.test(this,questionIdx,0);
    });
    $(".answer-button").hover(function() {
        // alert("Hovering");
        // $(this).css("border","solid 1px #1d534c");
        $(this).css("cursor","pointer");
        $(this).css("background-color","aqua");
        }
        ,function() {
            // alert("Hovering");
            // $(this).css("border","solid 0px");
            $(this).css("cursor","default");
            $(this).css("background-color","");
        }

);

    // $("#div-3").on("click",trivia.test);
// });



