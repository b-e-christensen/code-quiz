// psuedo: create an object that houses all the questions. shuffle that object at the beginning of each of quiz, then shuffle the choice of answers. attach the answers to the h2 value. probably use event.target to figure out selection --> container.addEventListener("click", function(event) {var element = event.target;} <-- if answer is correct award points, if wrong deduct points. if questions[i] === undefined then we display the ending message with score and allow person to add initials. Also, the whole thing will have to be set in an interval timer function
  

var quizEl = document.querySelector('#quiz')
var questionEl = document.querySelector('#question')
//answerEl.children to access the varying h2s??
var answerEl = document.querySelector('#answer')
var btnEL = document.querySelector('#btn')
// Create ordered list 
var listEl = document.createElement("ol");
// Create ordered list items
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");

quizEl.appendChild(listEl);
listEl.appendChild(li1);
listEl.appendChild(li2);
listEl.appendChild(li3);
listEl.appendChild(li4);

 

var questions = {
    hey : {
        question : 'What is 0?',
        //can use questions[index]choices.includes(answer)
        choices : ['8', '5', '6', 'hey'],
        'correct answer': '2'
    },
    hello : {
        question : 'What is 1?',
        choices : ['8', '5', '6', 'hello'],
        'correct answer': 2
    },
    heytheer : {
        question : 'What is 2?',
        choices : ['8', '5', '6', 'heytheer'],
        'correct answer': 2
    },
    howdy : {
        question : 'What is 3?',
        choices : ['8', '5', '6', 'howdu'],
        'correct answer': 2
    },
    aloha : {
        question : 'What is 4?',
        choices : ['8', '5', '6', 'aloha'],
        'correct answer': 2
    },
    bonjour : {
        question : 'What is 5?',
        choices : ['8', '5', '6', 'bonjour'],
        'correct answer': 2
    },
    dias : {
        question : 'What is 6?',
        choices : ['8', '5', '6', 'dias'],
        'correct answer': 2
    }
}

var questionsArr = Object.keys(questions)

var quest = questions.hey.question
li1.textContent = quest;

console.log(questionsArr);

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
//shuffles all the choices. 
for(let i = 0; i < questionsArr.length; i++){
    shuffleArray(questions[questionsArr[i]].choices)
}
  

// this works!!! the questionsArr keeps the shuffled order after being called through the function.
 shuffleArray(questionsArr);
 console.log(questionsArr);
 console.log(questions[questionsArr[0]].choices)

 questionEl.textContent = questions[questionsArr[0]].question

 //now just need to write an interval function that initiates after button click with a big 'ol for loop inside that'll take the shuffled order and display the question and options. Will the for loop wait to initialize its next loop until after the user has interacted with the questions? add if statement
 // if(event.target === questions[questionsArr[0]]['correct answer']){
     // points += 5
 //} else {
     // points -= 5
 //}
 //i think this should work!