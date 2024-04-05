const startBtn = document.querySelector('.start-button');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box')
const goHomeBtn = document.querySelector('.goHome-btn')

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);   
    questionCounter(1);
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    scores = {
        BSCS: 0,
        BSIT: 0,
        BSEMC: 0,
        BSIS: 0
    };
}

let questionCount = 0;
let questionNumb = 1;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active')
    } else {
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;
    
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    console.log(userAnswer);
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-count');
    questionTotal.textContent = `Question ${index} of ${questions.length}`;
}

let scores = {
    BSCS: 0,
    BSIT: 0,
    BSEMC: 0,
    BSIS: 0
};

function optionSelected(answer) {
    let userAnswer = answer.textContent.trim();
    let currentQuestion = questions[questionCount];

    switch (userAnswer) {
        case currentQuestion.options[0]:
            answer.classList.add('BSCS')
            answer.classList.add('clicked')
            scores.BSCS++;
            break;
        case currentQuestion.options[1]:
            answer.classList.add('BSIT')
            answer.classList.add('clicked')
            scores.BSIT++;
            break;
        case currentQuestion.options[2]:
            answer.classList.add('BSEMC')
            answer.classList.add('clicked')
            scores.BSEMC++;
            break;
        case currentQuestion.options[3]:
            answer.classList.add('BSIS')
            answer.classList.add('clicked')
            scores.BSIS++;
            break;
        default:
            break;
    }

    let allOptions = optionList.children.length;

    for (let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled');
    }
    
    nextBtn.classList.add('active')
}

function determineHighestCategory(scores) {
    let maxScore = Math.max(...Object.values(scores));
    let highestCategories = [];

    for (let category in scores) {
        if (scores[category] === maxScore) {
            highestCategories.push(category);
        }
    }

    if (highestCategories.length === 1) {
        switch (highestCategories[0]) {
            case "BSCS":
                return "BSCS";
            case "BSIT":
                return "BSIT";
            case "BSEMC":
                return "BSEMC";
            case "BSIS":
                return "BSIS";
            default:
                return "Undetermined";
        }
    } else {
        let tiedCategories = highestCategories.join(', ');
        let lastIndex = tiedCategories.lastIndexOf(', ');
        tiedCategories = tiedCategories.substring(0, lastIndex) + ' or' + tiedCategories.substring(lastIndex + 1);
        return tiedCategories;
    }
}


function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    

    const courseResult = document.querySelector('.course-result');
    courseResult.textContent = determineHighestCategory(scores);
}
