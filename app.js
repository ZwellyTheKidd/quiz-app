// init DOM elements
const introElment = document.getElementById('intro');
const scoresElement = document.getElementById('scores');
const quizElement = document.getElementById('quiz');
const errorElement = document.getElementById('error');

// questions sections
const questionOfElement = document.getElementById('questionOf')
const questionElement = document.getElementById('question')
const answersElement = document.getElementById('answers')


// current question index
let currentQuestionIndex = 0;

// init the current user data
let userState = {
    id: '',
    name: '',
    lastAnswered: 0,
    score: 0
}

// init score state
let scoreState = [
    { id: '', name: '', score: 0, aswered: 0 }
]


// hide zonke
function hideDivs() {
    scoresElement.classList.add('hidden')
    introElment.classList.add('hidden')
    quizElement.classList.add('hidden')
}

// show intro element
function showIntro() {
    document.getElementById('name').value = ""
    hideDivs()
    introElment.classList.remove('hidden')
}


// show intro element
function showScores() {
    hideDivs()
    scoresElement.classList.remove('hidden')
}

// show Quiz
function showQuiz() {
    hideDivs()
    quizElement.classList.remove('hidden')
}


function onError(text) {
    errorElement.classList.remove('hidden')
    errorElement.innerHTML = text
    setTimeout(() => errorElement.classList.add('hidden'), 3000)
}

function takeQuiz() {
    const name = document.getElementById('name')

    if (!name.value) {
        onError("Please provide your name")
        return;
    }

    showQuiz()

    getQuestionAndOptions(currentQuestionIndex)

}


function getQuestionAndOptions(i) {
    questionElement.innerHTML = questions[i].question

    answersElement.innerHTML = "";

    for (let w = 0; w < questions[i].options.length; w++) {

        let option = questions[i].options[w]

        answersElement.innerHTML += `
        <div class="option">
        <label for="${option.id}">
            <input type="radio" id="${option.id}" name="answer" onChange="onNextQuestion(${w})"> <span>${option.option}</span>
        </label>
        </div>
        `
    }

}


function onNextQuestion(index) {

    console.log(questions[currentQuestionIndex].options[index]);

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex = currentQuestionIndex + 1;

        setTimeout(() => {

            getQuestionAndOptions(currentQuestionIndex)
        }, 2000)
    } else {

        setTimeout(() =>  showScores(), 2000)
       
    }


}




// save data to storage
function saveUserState() {
    localStorage.setItem('userState', JSON.stringify(userState));
}

function saveScoreState() {
    localStorage.setItem('scoreState', JSON.stringify(scoreState));
}

// read data from storage
function getUserState() {
    if (localStorage.getItem('userState')) {
        userState = JSON.parse(localStorage.getItem('userState'));
    }
}

function getScoreState() {
    if (localStorage.getItem('scoreState')) {
        scoreState = JSON.parse(localStorage.getItem('scoreState'));
    }
}



// render
function render() {

}

render()


// run this only oce
document.addEventListener('DOMContentLoaded', function () {
    // hide everything
    hideDivs()

    // show the intro
    showIntro()

    getQuestionAndOptions(currentQuestionIndex)
}, false);