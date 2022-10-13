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
function startTimer() {
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
function stopTimer() {
    clearInterval(timerInterval);
}

//Clears current question and calls for display of next question
//Calls for input score display if last question
function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        stopTimer();
        if ((startTime - timePassed) > 0)
            score += (startTime - timePassed);
        userScoreEl.textContent = score;
        hide(quizEl);
        show(inputScoreEl);
        timerEl.textContent = `Time left: ${startTime}`;
    }
}

//checks answer based on current question and updates the user score
function checkAnswer(answer) {
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {
        score += 45;
        displayMessage("Correct!");
    }
    else {
        timePassed += 9;
        displayMessage("Wrong...");
    }
}

//displays a message for 2 seconds
function displayMessage(m) {
    let messageHr = document.createElement("hr");
    let messageEl = document.createElement("div");
    messageEl.setAttribute("style", "color: let(--off-white-blue); font-size: 25px")
    messageEl.textContent = m;
    document.querySelector(".main-container").appendChild(messageHr);
    document.querySelector(".main-container").appendChild(messageEl);
    setTimeout(function () {
            messageHr.remove();
            messageEl.remove();
    }, 1000);

}

//hides element
const hide = element => {
    element.style.display = "none";
}

//displays element
const show = element => {
    element.style.display = "block";
}

//reset local letiables
const reset = () => {
    score = 0;
    currentQ = 0;
    timePassed = 0;
    timerEl.textContent = `Time left: ${startTime}`;
}

//=================== Rendering ================================

//Renders current question
const renderQuestion = () => {
    questionEl.textContent = questions[currentQ].question;
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


//=========================EVENTS================================

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