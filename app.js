let questions = [
  {
    question: 'Commonly used data types DO NOT include:',
    a1: 'strings',
    a2: 'booleans',
    a3: 'alerts',
    a4: 'numbers',
    correct: 'alerts'
  },
  {
    question: 'The condition in an if / else statement is enclosed within _____.',
    a1: 'quotes',
    a2: 'curly brackets',
    a3: 'parentheses',
    a4: 'square brackets',
    correct: 'parentheses'
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    a1: 'JavaScript',
    a2: 'terminal / bash',
    a3: 'for loops',
    a4: 'console.log()',
    correct: 'console.log()'
  },
  {
    question: 'Arrays in JavaScript can be used to store _____.',
    a1: 'numbers and strings',
    a2: 'other arrays',
    a3: 'booleans',
    a4: 'all of the above',
    correct: 'all of the above'
  },
  {
    question: 'String values must be enclosed within _____ when being assigned to variables.',
    a1: 'commas',
    a2: 'curly brackets',
    a3: 'quotes',
    a4: 'parentheses',
    correct: 'quotes'
  },
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    a1: '<js>',
    a2: '<scripting>',
    a3: '<script>',
    a4: '<javascript>',
    correct: '<script>'
  },
  {
    question: 'What is the correct JavaScript syntax to change the content of the HTML element: <p id="demo">This is a demonstration.</p>?',
    a1: '#demo.innerHTML = "Hello World!";',
    a2: 'document.getElementByName("p").innerHTML = "Hello World!";',
    a3: 'document.getElement("p").innerHTML = "Hello World!";',
    a4: 'document.getElementById("demo").innerHTML = "Hello World!";',
    correct: 'document.getElementById("demo").innerHTML = "Hello World!";'
  },
  {
    question: 'What is the correct syntax for referring to an external script called "app.js"?',
    a1: '<script src="app.js">',
    a2: '<script name="app.js">',
    a3: '<script href="app.js">',
    a4: '<script link="app.js">',
    correct: '<script src="app.js">'
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    a1: 'alert("Hello World");',
    a2: 'msg("Hello World");',
    a3: 'alertBox("Hello World");',
    a4: 'alertBox("Heloo World");',
    correct: 'alert("Hello World");'
  },
  {
    question: 'How do you call a function named "myFunction"?',
    a1: 'call function myFunction()',
    a2: 'myFunction()',
    a3: 'call myFunction()',
    a4: 'myFunction().call()',
    correct: 'myFunction()'
  }
]

// time left, decreases by 1 second, will decrease by 10 seconds if user answers incorrectly
let time = document.getElementById('counter').textContent

// current question number 
let questionNumber = 0

// initial score = 0, updates after a correct answer
let currentScore = 0

// countdown timer interval
let countdown


const checkEnd = () => {

  // check if there are still questions left
  if (questionNumber >= questions.length) {
    finishQuiz()
  } else {
    askQuestion()
  }
}

const startQuiz = () => {

  // start quiz when startBtn clicked
  document.getElementById('startBtn').addEventListener('click', () => {
    console.log('start')
    // start timer
    countdown = setInterval(() => {
      time--
      document.getElementById('counter').textContent = time

      if (time <= 0) {
        clearInterval(countdown);
        leaderboard();
      }
    }, 1000)

    // ask a new question at start of quiz
    askQuestion()
  })
}

const askQuestion = () => {

  // reset main#mainText to render questions
  document.getElementById('mainText').textContent = questions[questionNumber].question
  
  let answers = []
  answers.push(questions[questionNumber].a1)
  answers.push(questions[questionNumber].a2)
  answers.push(questions[questionNumber].a3)
  answers.push(questions[questionNumber].a4)

  // reset div for buttons from question to question, at start reset start buttton to answer buttons
  document.getElementById('buttons').innerHTML = ''

  // reset feedback
  document.getElementById('feedback').textContent = ''

  // render answer buttons to the screen
  for (let i = 0; i < answers.length; i++) {
    let choice = document.createElement('button')
    choice.className = 'btn btn-danger answerButtons'
    choice.dataset.answer = answers[i]
    choice.textContent = answers[i]

    document.getElementById('buttons').append(choice)
  }
}

const selectAnswer = answer => {

  // create variables for feedback on answers
  let line = document.createElement('hr')
  let message = document.createElement('p')

  line.classList.add('my-4')
  line.id = 'feedbackLine'

  message.id = 'feedbackMessage'

  // check if selected answer is correct
  if (questions[questionNumber].correct === answer) {

    // increase score and add time
    currentScore++
    time+=5

    message.textContent = 'Correct!'
    document.getElementById('feedback').append(line)
    document.getElementById('feedback').append(message)
    document.getElementById('mainContent').append(feedback)
  } else {

    // deduct time off when incorrect
    if (time - 10 === 0) {
      time = 0
    } else {
      time-=10
    }

    message.textContent = 'Incorrect!'
    document.getElementById('feedback').append(line)
    document.getElementById('feedback').append(message)
    document.getElementById('mainContent').append(feedback)
  }

  // go to next question
  questionNumber++

  // ask next question after 1.5 seconds or end the quiz
  setTimeout(checkEnd, 1500)
}

const finishQuiz = () => {

  // reset html in #mainContent
  document.getElementById('mainContent').innerHTML = ''

  let finished = document.createElement('h2')
  finished.id = 'finished'
  finished.classList.add('text-left')
  finished.textContent = 'All Done!'

  let finalScore = document.createElement('p')
  finalScore.id = 'finalScore'
  finalScore.classList.add('text-left')
  finalScore.textContent = `Your final score is ${currentScore}.`

  // create submission form for score leaderboard
  let submissionForm = document.createElement('form')
  submissionForm.innerHTML = `
    <div class="form-group text-left">
      <label for="initials" id="initialsLabel">Enter Initials: </label>
      <input type="text" class="form-control" id="initials">
      <button id="submission" class="btn btn-danger">Submit</button>
    </div>
  `

  // render new #mainContent
  document.getElementById('mainContent').append(finished)
  document.getElementById('mainContent').append(finalScore)
  document.getElementById('mainContent').append(submissionForm)
}

const submission = (name, score) => {

  // check local storage for high scores array
  let highScores = JSON.parse(localStorage.getItem('highscores')) || []

  // add new high score to local storage
  highScores.push({initials: name, finalScore: score})
  localStorage.setItem('highScores', JSON.stringify(highScores))

  // sort in descending order
  highScores.sort((a, b) => {
    return b.finalScore - a.finalScore
  })

  // render leaderboard
  leaderboard()
}

const leaderboard = () => {

  // reset #mainContent to render leaderboard
  document.getElementById('mainContent').innerHTML = ''

  // check local storage for array, if it doesn't exist render empty leaderboard
  let scores = JSON.parse(localStorage.getItem('highscores')) || []

  // create leaderboard table
  let leaderboardContent = document.createElement('section')

  let leaderboardTitle = document.createElement('h2')
  leaderboardTitle.textContent = 'High Scores'
  leaderboardContent.append(leaderboardTitle)

  // render leaderboard to screen, nothing if leaderboard is empty
  for (let i = 0; i < scores.length; i++) {
    let elem = document.createElement('p')
    elem.classList.add('rankings')
    elem.textContent = `${i + 1}. ${scores[i].initials} — ${scores[i].finalScore}`

    leaderboardContent.append(elem)
  }

  document.getElementById('mainContent').append(leaderboardContent)

  let restartBtn = document.createElement('button')
  let clearBtn = document.createElement('button')

  restartBtn.className = 'btn btn-danger'
  clearBtn.className = 'btn btn-danger'

  restartBtn.id = 'restart'
  clearBtn.id = 'clear'

  restartBtn.textContent = 'Restart'
  clearBtn.textContent = 'Clear Scores'

  document.getElementById('mainContent').append(restartBtn)
  document.getElementById('mainContent').append(clearBtn)
}

const clearHighScores = () => {

  // create empty array to store in local storage in place of high scores
  let newScores = []

  localStorage.setItem('highScores', JSON.stringify(newScores))

}

const restartQuiz = () => {

  clearInterval(countdown)

  // reset variables
  time = 120
  currentScore = 0
  questionNumber = 0

  // reset timer
  document.getElementById('counter').textContent = time

  // reset body of html
  document.getElementById('mainContent').innerHTML = `
    <div id="mainText">
      <h1 id="start" class="text-center">Coding Quiz Challenge</h1>
        <p id="directions" class="text-center">Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>
    </div>
    <div id="buttons" class="text-center">
      <button id="startBtn" class="btn btn-danger btn-lg">Start Quiz</button>
    </div>
    <aside id="feedback"></aside>
  `

  startQuiz()
}

startQuiz()

// click event handler
document.addEventListener('click', event => {

  // handle score submission
  if (event.target.id === 'submission') {
    event.preventDefault()

    let initials = document.getElementById('inititals')
  
    submission(initials, currentScore)

  } else if (event.target.id === 'highScores') {

    // go to high scores leaderboard
    leaderboard()

  } else if (event.target.classList.contains('answerButtons')) {
    selectAnswer(event.target.dataset.answer)
  } else if (event.target.id === 'restart') {

    // restart quiz to initial state
    restartQuiz()

  } else if (event.target.id === 'clear') {
    
    // delete scores from local storage
    clearHighScores()
  }
})