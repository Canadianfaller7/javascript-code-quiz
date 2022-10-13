/* This is an array of objects that are going to be the questions we will ask the user */
let questions = [
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: [
            "alert('Hello World');",
            "msgBox('Hello World');",
            "msg('Hello World');", 
            "alertBox('Hello World');"
        ],
        answer: "alert('Hello World');"
    },
    {
        question: 'How do you create a function in JavaScript?',
        choices: [
            'function = myFunction()',
            'function myFunction()', 
            'function:myFunction()',
            'var function() = function'
        ],
        answer: 'function myFunction()'
    },
    {
        question: 'How do you write an IF statement in JavaScript?',
        choices: [
            'if i = 5',
            'if (i === 5)', 
            'if i == 5 then',
            'if i = 5 then', 
        ],
        answer: 'if (i === 5)'
    },
    {
        question: 'How does a FOR loop start?',
        choices: [
            'for (let i = 0; i <= 5++)',
            'for (i = 0; i <= 5)', 
            'for i = 1 to 5', 
            'for (i <= 5; i++)'
        ],
        answer: 'for (let i = 0; i <= 5++)'
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        choices: [
            'onmouseover',
            'onmouseclick',
            'onchange',
            'onclick'
        ],
        answer: 'onclick'
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Which built-in method removes the last element from an array and returns that element?",
        choices: ["last()", "get()", "pop()", "None of the Above"],
        answer: "pop()"
    },
    {
        question: "Which built-in method returns the calling string value converted to lower case?",
        choices: ["toLowerCase()", "toLower()", "changeCase(case)", "None of the Above"],
        answer: "toLowerCase()"
    },
    {
        question: "Which of the following function of Number object returns the number's value",
        choices: ["toString()", "valueOf()", "toLocaleString()", "toPrecision()"],
        answer: "valueOf()"
    },
    {
        question: "Which of the following function of Array object joins all elements of an array into a string?",
        choices: ["concat()", "join()", "pop()", "map()"],
        answer: "join()"
    }               
];



