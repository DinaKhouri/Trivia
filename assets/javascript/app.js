var count = 0;
var startQuestionaire;
var wrong = 0;
var right = 0;
//define sounds
var sorry = document.getElementById("sorry");
var bell = document.getElementById("bell");
var timeout = document.getElementById("timeout");
var play = document.getElementById("play");
//var background_play = document.getElementById("background");

//define questions and answers
var QuestionsArray = [
  (Q1 = {
    question:
      "Q1: What is the mathematical formula for Newton’s Second Law of Motion?",
    options: {
      a: "F=ma (Force equals mass times acceleration)",
      b: "F=ma*10 (Force equals mass times ten)",
      c: "a=ma (Acceleration equals mass times force)",
      d: "m=fa(Mass equals force times acceleration)"
    },
    answer: "option0"
  }),
  (Q2 = {
    question: "Q2: What are the first four digits of Pi",
    options: {
      a: "4.312",
      b: "3.141",
      c: "3.413",
      d: "1.14"
    },
    answer: "option1"
  }),
  (Q3 = {
    question: "Q3: What igneous rock has a density less than water?",
    options: {
      a: "Pumice",
      b: "Basalt",
      c: "Granite",
      d: "Obsidian"
    },
    answer: "option0"
  }),
  (Q4 = {
    question: "Q4: What gives red blood cells their color??",
    options: {
      a: "Hemoen",
      b: "Neophin",
      c: "Beloghrophin",
      d: "Hemoglobin"
    },
    answer: "option3"
  }),
  (Q5 = {
    question: "Q5: The adult human skeleton is made of up how many bones?",
    options: {
      a: "260",
      b: "301",
      c: "206",
      d: "602"
    },
    answer: "option2"
  }),
  (Q6 = {
    question: "Q6: Stratus, Cirrus and Cumulus are types of what??",
    options: {
      a: "Plants",
      b: "Clouds",
      c: "Flies",
      d: "Greek Gods"
    },
    answer: "option1"
  }),
  (Q7 = {
    question:
      "Q7: Which scientist is considered the father of modern genetics??",
    options: {
      a: "John Melo",
      b: "George Mondo",
      c: "Gregor Mendel",
      d: "Roger Mendel"
    },
    answer: "option2"
  }),
  (Q8 = {
    question: "Q8: What is the closest star to our own sun??",
    options: {
      a: "Apolo Xima",
      b: "Mixima Centura",
      c: "Mono Century",
      d: "Proxima Centauri"
    },
    answer: "option3"
  }),
  (Q9 = {
    question: "Q9: What is the most common blood type in humans?",
    options: {
      a: "O+",
      b: "AB-",
      c: "O-",
      d: "B+"
    },
    answer: "option0"
  }),
  (Q10 = {
    question: "Q10: In our solar system, which planet has the shortest day?",
    options: {
      a: "Mars",
      b: "Jupiter",
      c: "Moon",
      d: "Pluto"
    },
    answer: "option1"
  })
];

startGame();

//countDown function
function countDown(secs, elem) {
  $("#timer").show();
  $("#timer").html("You have " + secs + " left");

  secs--;
  timer = setTimeout("countDown(" + secs + ',"' + elem + '")', 1000);

  if (secs < 0) {
    timeout.play();
    clearTimeout(timer);
    $("#timer").html("Sorry TimeOut");
    wrong++;
    setTimeout(nextQuestion, 3000);
  }
}
//define stop function for timer
function stop() {
  clearTimeout(timer);
  console.log("timer stopped");
}
function HideQ$A() {
  $(".container, .myborder, .options, .question, .score, .wrong, .pickedAnswer, #timer, .playAgain").hide();
  
}
function startGame() {
  console.log("Starting Game");
  HideQ$A();
  $(".start").click(startQuestionaire);
}

//define on click functions for the playAgain
$(".playAgain").click(playAgain);

function pickAnswer() {
  $(".option").off("click");
  $(".option").on("click", function(event) {
    stop();
    console.log("ID is", event.currentTarget.id);
    if (event.currentTarget.id === QuestionsArray[count].answer) {
      $(".pickedAnswer").show();
      $(".pickedAnswer").html("Correct!");
      right++;
      bell.play();
      console.log(right);
      nextQuestion();
    } else {
      $(".pickedAnswer").show();
      $(".pickedAnswer").html("Sorry wrong answer!");
      wrong++;
      sorry.play();
      console.log(wrong);
      nextQuestion();
    }
  });
}

//define the startquestionaire function that is gonna show questions and set timer to load the next one
function startQuestionaire() {
  play.play();
  displayQuestion();
  pickAnswer();
}


//define the playagain function that is gonna reset timer
function playAgain() {
  count = 0;
  wrong = 0;
  right = 0;
  $(".myborder").attr("id", "");
  startQuestionaire();
}

//display question and options
function displayQuestion() {
  //$("body").css("background-image", "url(assets/images/background.jpg)");
  countDown(15, timer);
  $(".container, .myborder, .question, .options, .score, .wrong").show();
  $(".start").hide();
  $(".score").text("Right answers = " + right);
  $(".wrong").text("Wrong answers = " + wrong);
  $(".question").html(QuestionsArray[count].question);
  $("#option0").html(QuestionsArray[count].options.a);
  $("#option1").html(QuestionsArray[count].options.b);
  $("#option2").html(QuestionsArray[count].options.c);
  $("#option3").html(QuestionsArray[count].options.d);
  $(".pickedAnswer").html("");
}

// //define display results
function displayResults() {
  stop();
  play.play();
  $(".myborder").attr("id", "mycontainer");
  $("#timer").hide();
  $(".container").hide();
  $(".options").hide();
  $(".question").hide();
  $(".score").hide();
  $(".wrong").hide();
  $(".start").hide();
  $(".playAgain").show();
  $(".pickedAnswer").html(
    "You have " + right + " correct answers, and " + wrong + " wrong"
  );
}
//define next questions which displays next question after 1 second , and increases the count by one
function nextQuestion() {
  stop();
  count++;
  if (count > QuestionsArray.length - 1) {
    setTimeout(displayResults, 1000);
  } else {
    setTimeout(displayQuestion, 1000);
  }
}
