/*

    1. We will want to be able to make a button start a timer and hide the original html and start asking questions 
    2. We will then need to answer the question and let the user know if the answer is right or wrong and if they are wrong then we will need to subtract some time from the overall timer. 
    3. When all questions are answered

*/

let questions = 
[
    {
        question: "How do you write 'Hello World' in an alert box?",
        buttons: ["msgBox('Hello World');","msg('Hello World');","alertBox('Hello World');","alert('Hello World');"],
        answer: "alert('Hello World');"
    },
    {
        question: "How do you create a function in JavaScript?",
        buttons: ["function = myFunction()","function myFunction()","function:myFunction()","var function() = function"],
        answer: "function myFunction()"
    },
    {
        question: "How do you write an IF statement in JavaScript?",
        buttons: ["if i = 5","if(i == 5)","if i == 5 then","if i = 5 then"],
        answer: "if(i == 5)" 
    },
    {
        question: "How does a FOR loop start?",
        buttons: ["for (i = 0; i <= 5; i++)","for (i = 0; i <= 5)","for i = 1 to 5","for (i <= 5; i++)"],
        answer: "for (i = 0; i &lt;= 5; i++)"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        buttons: ["onmouseover","onmouseclick","onchange","onclick"],
        answer: "onclick"
    }
];

let highscore = [];
let timeLeft = 60;
let timeStart = false;

let interval;

let questionNum = 0;
let score = 0;

let questionTitle;
let btn = [];
let btnDiv = [];
let btnHolder;

let answerValidate;

let card = document.getElementById('quiz-card');
let timeEl = document.getElementById('time-left');

timeEl.innerHTML = `Time Left: ${timeLeft}`;

const startButton = document.getElementById('start-quiz')

startButton.addEventListener('click', startQuiz())

const startQuiz = () => {
    console.log('started quiz');
}

const setNextQuestion = () => {

}

const selectAnswer = () => {

}