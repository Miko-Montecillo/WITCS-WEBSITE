const quizContainer = document.getElementById("container");
const nextBtn = document.getElementById("next-button");
const countOfQuestion = document.querySelector(".number-of-question");
const displayContainer = document.getElementById("display-container");
const scoreContainer = document.querySelector(".CourseCategory-container");
const restart = document.getElementById("restart");
const userScore = document.getElementById("user-score");
const startScreen = document.querySelector(".start-screen");
const startButton = document.getElementById("start-button");

let questionCount = 0;
let userResponses = [];
let scores = {
    BSCS: 0,
    BSIT: 0,
    BSEMC: 0,
    BSIS: 0,
};

// Checker Function to check if option is correct or not
function checker(selectedOptionIndex, button) {
    const previousSelection = userResponses[questionCount];

    if (previousSelection === selectedOptionIndex) {
        userResponses[questionCount] = undefined;
        button.classList.remove("selected");
    } else {
        userResponses[questionCount] = selectedOptionIndex;

        const category = getCategory(selectedOptionIndex);
        scores[category]++;

        button.classList.add("selected");

        if (previousSelection !== undefined) {
            const previousButton = quizContainer.querySelector(`.option-div[data-index="${previousSelection}"]`);
            previousButton.classList.remove("selected");
        }
    }
}

// Function to get category based on selected option
function getCategory(selectedOptionIndex) {
    switch (selectedOptionIndex) {
        case 0:
            return 'BSCS';
        case 1:
            return 'BSIT';
        case 2:
            return 'BSEMC';
        case 3:
            return 'BSIS';
        default:
            return '';
    }
}


//Questions and Options
const quizArray = [
    {
        id: "0",
        question: "When explaining a technical concept, what is your preferred method?",
        options: ["A. Breaking down theoretical foundations, algorithms, and technical details.", 
                  "B. Providing a practical demonstration of real-world applications.", 
                  "C. Using visual aids and multimedia presentations to make concepts engaging.", 
                  "D. Relating the concept to organizational processes and information flow."],
                  correctIndex: 0
    },
    {
        id: "1",
        question: "In a team project, what role do you naturally gravitate towards?",
        options: ["A. Leading the development and optimization of complex code.", 
                  "B. Focusing on coding tasks and ensuring software meets practical requirements.", 
                  "C. Bringing creative ideas to the table, especially those involving multimedia elements.", 
                  "D. Analyzing and improving the efficiency of information flow within the team."],
                  correctIndex: 0
    },
    {
        id: "2",
        question: "When faced with a programming challenge, what aspect do you find most intriguing?",
        options: ["A. Optimizing algorithms and delving into the intricacies of data structures.",
                  "B. Coding practical solutions that meet specific functional requirements.", 
                  "C. Exploring creative ways to integrate multimedia elements into software.", 
                  "D. Analyzing and optimizing information flow within an organization."],
                  correctIndex: 0
    },
    {
        id: "3",
        question: "What excites you the most about developing a new software application?",
        options: ["A. Crafting elegant and efficient code with optimized algorithms.", 
                  "B. Building a functional and user-friendly application that meets specific needs.", 
                  "C. Designing an interactive and visually stunning interface.", 
                  "D. Ensuring seamless integration into existing organizational information systems."],
                  correctIndex: 0
    },
    {
        id: "4",
        question: "Hardware devices that are not part of the main computer system and are often added later to the system.",
        options: ["A. Theoretical understanding, algorithmic efficiency, and technical depth.", 
                  "B. Practical implementation, ensuring technology meets functional requirements.", 
                  "C. Creative design, multimedia integration, and visual appeal.", 
                  "D. Analyzing and optimizing information flow and data management."],
                  correctIndex: 0
    },
    {
        id: "5",
        question: "When choosing elective courses, what would be your top priority?",
        options: ["A. Advanced courses in algorithms, data structures, and theoretical foundations.", 
                  "B. Courses that enhance practical coding skills and real-world applications.", 
                  "C. Creative and multimedia courses exploring the artistic side of technology.", 
                  "D. Courses related to information systems, organizational processes, and data management."],
                  correctIndex: 0
    }, 
    {
        id: "6",
        question: "Your ideal work environment would be characterized by:",
        options: ["A. A focus on technical excellence and deep understanding of algorithms.", 
                  "B. A dynamic setting where you can code and develop practical solutions.", 
                  "C. A creative atmosphere that encourages innovative multimedia designs.", 
                  "D. An environment that emphasizes efficient information flow within the organization."],
                  correctIndex: 0
    },
    {
        id: "7",
        question: "How do you prefer to contribute to a team project?",
        options: ["A. Leading the development and optimization of complex code.", 
                  "B. Focusing on coding tasks and ensuring software meets practical requirements.", 
                  "C. Bringing creative ideas to the table, especially those involving multimedia elements.", 
                  "D. Analyzing and improving the efficiency of information flow within the team."],
                  correctIndex: 0
    },
    {
        id: "8",
        question: "When faced with a problem, what is your instinctive problem-solving approach?",
        options: ["A. Analyzing the problem systematically, identifying root causes.", 
                  "B. Diving into practical solutions, coding and testing for efficiency.", 
                  "C. Approaching the problem with creativity, exploring unconventional solutions.", 
                  "D. Evaluating the problem's impact on organizational information systems."],
                  correctIndex: 0
    },
    {
        id: "9",
        question: "What type of project would you find most fulfilling?",
        options: ["A. A project challenging your understanding of algorithms and coding skills.", 
                  "B. A project involving creating a practical and functional software solution.", 
                  "C. A project allowing you to explore innovative and visually captivating multimedia applications.", 
                  "D. A project focusing on optimizing information flow within an organization."],
                  correctIndex: 0
    },
];

// Option 
// - A: BS in Computer Science
// - B: BS in Information Technology
// - C: BS in Entertainment, Multimedia, and Computing
// - D: BS in Information Systems

// Function to determine the category
function determineCategory() {
    let dominantCategory = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    // Check if the category is BSCS, BSIT, BSEMC, or BSIS
    switch (dominantCategory) {
        case "BSCS":
            return "Computer Science";
        case "BSIT":
            return "Information Technology";
        case "BSEMC":
            return "Entertainment, Multimedia, and Computing";
        case "BSIS":
            return "Information Systems";
        default:
            return "Unknown";
    }
}

nextBtn.addEventListener("click", () => {
    if (userResponses[questionCount] !== undefined) {
        questionCount++;
        
        if (questionCount === quizArray.length) {
            let category = determineCategory();
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML = `<p>You are a BS in ${category} Student!</p>`;
            return;
        }
        
        countOfQuestion.textContent = `${questionCount + 1} of ${quizArray.length} Questions`;
        quizDisplay(questionCount);
    } else {
        alert("Please select an option before proceeding to the next question.");
    }
});


// Display quiz
function quizDisplay(questionCount) {
    const currentQuestion = quizArray[questionCount];
    const optionsHTML = currentQuestion.options.map((option, index) =>
        `<button class="option-div" data-index="${index}">${option}</button>`
    ).join('');
    quizContainer.innerHTML = `
        <p class="question">${currentQuestion.question}</p>
        ${optionsHTML}
    `;

    const options = quizContainer.querySelectorAll('.option-div');
    options.forEach(option => {
        option.addEventListener('click', function() {
            checker(parseInt(option.getAttribute('data-index')), option);
        });
    });
}

// Initial setup
function initial() {
    questionCount = 0;
    userResponses = [];
    scores = { BSCS: 0, BSIT: 0, BSEMC: 0, BSIS: 0 };
    countOfQuestion.textContent = `1 of ${quizArray.length} Questions`;
    quizDisplay(questionCount);
}

//start screen
startScreen.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

// Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});


//Home button
const homeButton = document.getElementById("home");
homeButton.addEventListener("click", () => {
    window.location.href = "index.html"; 
});


window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
}; 