var bodyEl = document.querySelector('#body');
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
var hiScoreViewer = document.querySelector('#hiscore-viewer')
var hiScoreListDivEl = document.querySelector('#hiscore-list-div');
var mainEl = document.querySelector('#main');

var hiScoreArr = JSON.parse(localStorage.getItem('hiScoreArr'));

// varying blank arrays used to create the hiscore list.
var scoreSplice = [];
var scoreInOrder = [];
var scoreCompare = [];
var scoreList = [];
// new comment

// array of objects that hold the questions, their choices, and the correct answer
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
    if (event.target.innerHTML !== questionBank[i]['correct answer']){
        timer -= 5;
        timerEl.textContent = `${timer} seconds remaining`;
    }
    i++;
    displayQuestion();
}


  
// displays each new question and multiple choices and looks for the event listener 'click.' Also checks each run to make sure there is another question in questionBank to go to. 
 function displayQuestion() {
    // end the game if no more questions remain
    if (questionBank[i] === undefined) {
        endTrigger = 'time';
        gameEnd();
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

function quizStart() {

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

function gameEnd() {
    quizEl.setAttribute('style', 'display: none');
    timerEl.setAttribute('style', 'display: none');
    endDisplay();
}

function endDisplay() {
    h1El = document.createElement('h1');
    bodyEl.appendChild(h1El);
    var submitEl = document.querySelector('#formBtn');
    submitEl.setAttribute('style', 'display: inline')
    var score = timer;
    if (endTrigger === 'time') {
        h1El.innerHTML = `Congratulations!! You have completed the code quiz with time to spare! Your score is based on how many seconds you had remaining - which was: ${score}. Enter your initials to put it into your HiScores. Refresh the page to see updated HiScores, or to play again!`
    } else {
        h1El.innerHTML = 'Uh oh. You ran out of time. You can still record your score (which is a big \'ol goose egg unfortunately) and keep track of your progress. Refresh the page to see updated HiScores, or to play again!'
    }
    submitEl.addEventListener("submit", hiScore);
}

function hiScore(event) {
    event.preventDefault();
    // for first use on a machine -- creates an array to push to on the local storage.
    if(localStorage.getItem('hiScoreArr') === null){
        localStorage.setItem('hiScoreArr', JSON.stringify([]))
    }
    var hiScoreArr = JSON.parse(localStorage.getItem('hiScoreArr'));
    var score = timer;
    var initials = document.querySelector("#initials");

    hiScoreArr.push({initials: initials.value, score: score});
    initials.setAttribute('style', 'display: none');

    localStorage.setItem('hiScoreArr', JSON.stringify(hiScoreArr));
}

// pushes the score property of the questionBank objects into two arrays. one of those arrays serves as the map for the order of the lcoal storage array - the other gets run through a for loop, each loop finding the max number and splicing it into a new array. then compare the two arrays and find how to properly call the original object to have it list highest core to lowest.
function scoreGrab() {
    if(localStorage.getItem('hiScoreArr') === null){
        return;
    }
    for (let i = 0; i < hiScoreArr.length; i++) {
        const element = hiScoreArr[i].score;
        scoreSplice.push(element);
        scoreCompare.push(element);
    }

    for (let j = 0; j < hiScoreArr.length; j++) {
    var max = scoreSplice.reduce(function(a, b) {
            return Math.max(a, b);
        }, 0);
        scoreInOrder.push(max);
        var spliceIndex = scoreSplice.indexOf(max);
        scoreSplice.splice(spliceIndex, 1);
        }
        for (let k = 0; k < scoreInOrder.length; k++) {
            const element = scoreInOrder[k];
            scoreList.push(scoreCompare.indexOf(element)); 
        }
}

scoreGrab();

hiScoreViewer.addEventListener('mouseover', function () {
    var newList = document.createElement('ol')
    newList.id = 'hiscore-list';
    hiScoreListDivEl.appendChild(newList)
    for (let i = 0; i < scoreList.length; i++) {
        const element = scoreList[i];
        var listInitials = hiScoreArr[element].initials
        var listScore = hiScoreArr[element].score;
        var newLine = document.createElement('li');
        newLine.innerHTML = `${listInitials} - ${listScore}`
        newList.appendChild(newLine)
    }
  })

  hiScoreViewer.addEventListener('mouseleave', function () {
    var removeThis = document.querySelector('#hiscore-list')
    removeThis.remove()
})

