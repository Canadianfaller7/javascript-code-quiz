/*

1. We will want to be able to make a button start a timer and hide the original html and start asking questions 
2. We will then need to answer the question and let the user know if the answer is right or wrong and if they are wrong then we will need to subtract some time from the overall timer. 
3. When all questions are answered

*/

const questions = [
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "alert('Hello World');", correct: true },
            { text: "msgBox('Hello World');", correct: false},
            { text: "msg('Hello World');", correct: false },
            { text: "alertBox('Hello World');", correct: false }
        ]
    }//,
    // {
    //     question: "How do you create a function in JavaScript?",
    //     answers: [
    //         {
    //             text:  "function = myFunction()", correct: false
    //         },
    //         {
    //             text: "function myFunction()", correct: true
    //         },
    //         {
    //             text: "function:myFunction()", correct: false
    //         },
    //         {
    //             text: "var function() = function", correct: false
    //         }
    //     ]
    // },
    // {
    //     question: "How do you write an IF statement in JavaScript?",
    //     answers: [
    //         {
    //             text: "if i = 5", correct: false
    //         },
    //         {
    //             text: "if(i === 5)", correct: true
    //         },
    //         {
    //             text: "if i == 5 then", correct: false
    //         },
    //         {
    //             text: "if i = 5 then", correct: false
    //         },
    //     ]
    // },
    // {
    //     question: "How does a FOR loop start?",
    //     answers: [
    //         {
    //             text: "for (let i = 0; i <= 5; i++)", correct: true
    //         },
    //         {
    //             text: "for (i = 0; i <= 5)", correct: false
    //         },
    //         {
    //             text: "for i = 1 to 5", correct: false
    //         },
    //         {
    //             text: "for (i <= 5; i++)", correct: false
    //         }
    //     ]
    // },
    // {
    //     question: "Which event occurs when the user clicks on an HTML element?",
    //     answers: [
    //         {
    //             text: "onmouseover", correct: false
    //         },
    //         {
    //             text: "onmouseclick", correct: false
    //         },
    //         {
    //             text: "onchange", correct: false
    //         },
    //         {
    //             text: "onclick", correct: true
    //         }
    //     ]
    // }
];

let highscore = [];
let timeLeft = 60;
let score = 0;
let timeEl = document.getElementById('time-left');
let ranQuestion;
let currentQuestionIndex;


const startButton = document.getElementById('start-quiz');
const questionData = document.getElementById('question-container')
const mainText = document.getElementById('main-text');
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-btn')


timeEl.innerHTML = `Time Left: ${timeLeft}`;
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    // score = 0;
    mainText.classList.add('hide');
    startButton.classList.add('hide');
    ranQuestion = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionData.classList.remove('hide');
    nextQuestion()
    startTimer();
}

const nextQuestion = () => {
    getQuestion(ranQuestion[currentQuestionIndex])
}

const getQuestion = questionQ => {
    questionEl.innerText = questionQ.question
    questionQ.answers.forEach(answer => {
        const buttons = document.createElement('button')
        buttons.innerText = answer.text 
        buttons.classList.add('btn')
        if (answer.correct) {
            buttons.dataset.correct = answer.correct
        }
        buttons.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(buttons)
    })
}

const selectAnswer = e => {
    console.log('object');
}

function startTimer() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = `Time Left: ${timeLeft}`;
        
        if(timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            
            return;
        }
        
    }, 1000);
}
