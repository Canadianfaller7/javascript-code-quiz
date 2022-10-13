// Header Page Elements =====================================
const viewHScoresBtnEl = document.querySelector("#view-highscore");
const timerEl = document.querySelector("#time-left");

// Welcome Page Elements =====================================
const mainEl = document.querySelector("#main-text");
const startQuizBtnEl = document.querySelector("#start-quiz");

//Quiz Page Elements =========================================
const quizEl = document.querySelector("#quiz");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");

//Input Score Page Elements ==================================
const inputScoreEl = document.querySelector("#input-score");
const nameEl = document.querySelector("#users-name");
const userScoreEl = document.querySelector("#score");
const submitInitialsBtnEl = document.querySelector("#submit-name");

//View High Scores Page Elements =============================
const highScoresEl = document.querySelector("#high-scores");
const scoresEl = document.querySelector("#scores");
const goBackBtnEl = document.querySelector("#go-back");
const clearScoresBtnEl = document.querySelector("#clear-scores");

//Universal lets =============================================
let score = 0;
let currentQ = 0;
let highScores = [];
let timerInterval;
let startTime = 70;
let timePassed = 0;

//starts and updates timer
const startTimer = () => {
    timerEl.textContent = `Time left: ${startTime}`;
    timerInterval = setInterval(function () {
        timePassed++;
        timerEl.textContent = `Time left: ${startTime - timePassed}`;
        if (timePassed >= startTime) {
            currentQ = questions.length;
            nextQuestion();
        }
    }, 1000);
}

//stops timer
const stopTimer = () => {
    clearInterval(timerInterval);
}

//Clears current question and calls for display of next question
//Calls for input score display if last question
const nextQuestion = () => {
    // add 1 to the question count
    currentQ++;
    // check and make sure it is less than the questions length and if so call function to get next question
    if (currentQ < questions.length) {
        renderQuestion();
    // else stop timer, check if the time is greater than 0 and then get user score
    } else {
        stopTimer();
        if ((startTime - timePassed) > 0) {
             score += (startTime - timePassed);
        }
        userScoreEl.textContent = score;
        hide(quizEl);
        show(inputScoreEl);
        // giving us the time left
        timerEl.textContent = `Time left: ${startTime}`;
    }
}

//checks answer based on current question and updates the user score
const checkAnswer = answer => {
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {
        score += 45;
        // tell user they selected the correct answer
        displayMessage("Correct!");
    }
    // if question is wrong remove 9 seconds from timer and tell user they chose wrong
    else {
        timePassed += 9;
        displayMessage("Wrong...");
    }
}

//displays whether answer clicked is right or wrong
const displayMessage = m => {
    // making var to add break line and a new div element so we can then display correct or wrong to user
    let messageHr = document.createElement("hr");
    let messageEl = document.createElement("div");
    // setting color and font size of message
    messageEl.setAttribute("style", "color: var(--off-white-blue); font-size: 35px;")
    messageEl.textContent = m;
    // adding the variables to our element with class .main-container
    document.querySelector(".main-container").appendChild(messageHr);
    document.querySelector(".main-container").appendChild(messageEl);
    // setting a timeout function here to display the message for half a second and then remove them again
    setTimeout(() => {
            messageHr.remove();
            messageEl.remove();
    }, 500);

}

//hides element by setting the element inside the function to show display of none
const hide = element => {
    element.style.display = "none";
}

//displays element by setting the element inside the function to show display of block
const show = element => {
    element.style.display = "block";
}

//reset local variables all back to 0
const reset = () => {
    score = 0;
    currentQ = 0;
    timePassed = 0;
    timerEl.textContent = `Time left: ${startTime}`;
}


//Renders current question
const renderQuestion = () => {
    // this is getting the textContent of the html element and setting it equal to the question in our array object
    questionEl.textContent = questions[currentQ].question;
    // looping through the answers and setting them up to be in the buttons later on when the question is displayed
    for (i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }
}

//Renders high scores stored in local storage
const renderHighScores = () => {
    // Clear content
    scoresEl.innerHTML = "";
    show(highScoresEl);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (let i = 0; i < highScores.length; i++) {
        let scoreItem = document.createElement("div");
        console.log(scoreItem)
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        scoresEl.appendChild(scoreItem);
    }
}

//displays high scores by hiding other vars and then calling the render highscore function, stop timer function and reset function.
viewHScoresBtnEl.addEventListener("click", () => {
    hide(mainEl);
    hide(quizEl);
    hide(inputScoreEl);
    renderHighScores();
    stopTimer();
    reset();
});

//starts quiz when start quiz button is clicked and hides the main element, starts timer function and renders question and shows the quiz elements
startQuizBtnEl.addEventListener("click", () => {
    hide(mainEl);
    startTimer();
    renderQuestion();
    show(quizEl);
});

//checks to see if button for answer was selected and then calls to next question if button is clicked
answersEl.addEventListener("click", e => {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();
    }
});

//Creates a user score object to push to the local storage scores array calls to display high scores
//calls to render high scores
submitInitialsBtnEl.addEventListener("click", () => {
    let initValue = nameEl.value.trim();
    if (initValue) {
        let userScore = { username: initValue, userScore: score };
        nameEl.value = '';
        highScores = JSON.parse(localStorage.getItem("scores")) || [];
        highScores.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(inputScoreEl);
        renderHighScores();
        reset();
    }
});

//Goes back to Home page from High scores 
goBackBtnEl.addEventListener("click", () => {
    hide(highScoresEl);
    show(mainEl);
});

//Clears saved scores from local storage
clearScoresBtnEl.addEventListener("click", () => {
    highScores = [];
    localStorage.setItem("scores", JSON.stringify(highScores));
    renderHighScores();
});