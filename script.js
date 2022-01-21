var bodyEl = document.querySelector('#body');
// element that houses both the question and the answer
var quizEl = document.querySelector('#quiz');
var questionEl = document.querySelector('#question');
var answerEl = document.querySelector('#answer');
var btnEL = document.querySelector('#btn');
var timerEl = document.querySelector('#timer');
// Create ordered list 
var listEl = document.querySelector("#list");
// Create ordered list items
var li1 = document.querySelector("#li1");
var li2 = document.querySelector("#li2");
var li3 = document.querySelector("#li3");
var li4 = document.querySelector("#li4");
// variable to iterate through questionBank
let i = 0;
// countdown timer for quiz
var timer = 60;
timerEl.textContent = `${timer} seconds remaining`;
var endTrigger = '';
// var hiScoreArr = [];


 

var questionBank = [
    {
        question : 'In JavaScript, what is a block of code called that is used to perform a specific task?',
        choices : ['Variable', 'Declaration', 'String', 'Function'],
        'correct answer': 'Function'
    },
    {
        question : 'What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?',
        choices : ['Conditional Loop ', 'For Loop', 'While Loop', 'Else Loop'],
        'correct answer': 'While Loop'
    },
    {
        question : 'What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?',
        choices : ['Scope', 'Range', 'Output Level', 'Restriction'],
        'correct answer': '8'
    },
    {
        question : 'What is the element used (and hidden) in code that explains things and makes the content more readable?',
        choices : ['Comments', 'Comparisons', 'Quotations', 'Notes'],
        'correct answer': 'Comments'
    },
    {
        question : 'What kind of statement is used to execute actions based on a trigger or condition?',
        choices : ['Regular Expression', 'Conditional Statement', 'Fired Event', 'Boolean Variable'],
        'correct answer': 'Conditional Statement'
    },
    {
        question : 'What is the name of the statement that is used to exit or end a loop?',
        choices : ['Break statement', 'Falter statement', 'Close statement', 'Conditional statement'],
        'correct answer': 'Break statement'
    },
    {
        question : 'What is the object called that lets you work with both dates and time-related data?',
        choices : ['Dates', 'Time-warp', 'Time field', 'Clock'],
        'correct answer': 'Dates'
    },
    {
        question : 'In JavaScript, what is used in conjunction with HTML to “react” to certain elements?',
        choices : ['Boolean', 'RegExp', 'Condition', 'Events'],
        'correct answer': 'Events'
    },
    {
        question : 'What is the format called that is used for storing and transporting data?',
        choices : ['JSON', 'Font', 'HTML', 'Syntax'],
        'correct answer': 'JSON'
    },
    {
        question : 'This is what you call the guide that defines coding conventions for all projects.',
        choices : ['Style guide', 'Coding dictionary', 'Main textbook', 'Developer\'s reference'],
        'correct answer': 'Style guide'
    }
]
// shuffles the array thats passsed as the parameter. 
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

// shuffles the keys of questionBank. 
shuffleArray(questionBank);

// shuffles the 'choices' property of the varying questions objects. 
for(let i = 0; i < questionBank.length; i++){
    shuffleArray(questionBank[i].choices)
}

// takes the mouse click of the user as the answer to the question and matches it against 'correct answer' value
function answerQuestion(event){
    if (event.target.innerHTML === questionBank[i]['correct answer']) {
        console.log(event.target.innerHTML);
        console.log('true');
    } else {
        timer -= 5;
        timerEl.textContent = `${timer} seconds remaining`;
        console.log('false');
        console.log(event.target.innerHTML);
    }
    i++;
    displayQuestion();
}


  
// displays each new question and multiple choices and looks for the event listener 'click.' Also checks each run to make sure there is another question in questionBank to go to. 

 var displayQuestion = () => {

    if (questionBank[i] === undefined) {
        endTrigger = 'time';
        gameEnd();
        // will want to run a function that displays the end here and then sets up how to input initials for hi score.
        return;
    }    
    listEl.setAttribute('style', 'display: inline-block')
    questionEl.innerHTML = questionBank[i].question;
    li1.innerHTML = questionBank[i].choices[0];
    li2.innerHTML = questionBank[i].choices[1];
    li3.innerHTML = questionBank[i].choices[2];
    li4.innerHTML = questionBank[i].choices[3]; 

    listEl.addEventListener('click', answerQuestion)
 }

var quizStart = () => {

timerEl.setAttribute('style', 'display: inline-block');
btnEL.setAttribute('style', 'display: none');

var quizTimer = setInterval(function () {
    
    if (questionBank[i] === undefined) {
        clearInterval(quizTimer);
    } else if (timer > 0) {
        timer--;
        timerEl.textContent = `${timer} seconds remaining`;
    } else {
        clearInterval(quizTimer);
        timer = 0;
        gameEnd();
    }
      }, 1000)

      displayQuestion();
}

 btnEL.addEventListener('click', quizStart)

// all that is left (aside from maybe a bit more styling) is the end of game function -- displaying that they have finished, their score, and a submit(??) button for their hiscore. will need to localStorage.getItem at the beginning of the function to have it display all the old hiscores, as well as localStorage.setItem at the end to add the new entry to the hiscores board.

var gameEnd = () => {
    quizEl.setAttribute('style', 'display: none');
    timerEl.setAttribute('style', 'display: none');
    endDisplay();
}

var endDisplay = () => {
    h1El = document.createElement('h1');
    bodyEl.appendChild(h1El);
    var submitEl = document.querySelector('#formBtn');
    submitEl.setAttribute('style', 'display: inline')
    console.log(endTrigger)
    if (endTrigger === 'time') {
        h1El.innerHTML = 'Congratulations!! You have completed the code quiz with time to spare! Your score is based on how many seconds you had remaining.'
    } else {
        h1El.innerHTML = 'Uh oh. You ran out of time. You can still record your score and keep track of your progress.'
    }
    submitEl.addEventListener("submit", hiScore);
}

var hiScore = (event) => {
    event.preventDefault();
    //need to check if the variable in local storage is 'null.' if so, need to 
    var hiScoreArr = JSON.parse(localStorage.getItem('hiScoreArr'));
    if (!hiScoreArr) {
        return;
    }

    var score = timer;
    var initials = document.querySelector("#initials");

    hiScoreArr.push(initials.value + ' - ' + score)
    initials.setAttribute('style', 'display: none')
    console.log(hiScoreArr)

    localStorage.setItem('hiscoreArr', JSON.stringify(hiScoreArr));

    // push the hiscores variables into an array to not overwrite each hiscore everytime


}

