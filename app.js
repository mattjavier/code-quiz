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


const checkEnd = () => {

  // check if there are still questions left
  if (questionNumber >= questions.length) {
    finishQuiz()
  } else {
    askQuestion()
  }
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
    time-=10

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
  finished.classList.add('text-center')
  finished.textContent = 'All Done!'
}

// start quiz when startBtn clicked
document.getElementById('startBtn').addEventListener('click', () => {

  // start timer
  setInterval(() => {
    if (time <= 0) {
      clearInterval();
    }

    time--
    document.getElementById('counter').textContent = time
  }, 1000)

  // ask a new question at start of quiz
  askQuestion()
})

// click event handler
document.addEventListener('click', event => {

  // handle score submission
  if (event.target.id === 'submission') {
    event.preventDefault()

    let initials = document.getElementById('inititals')
  
    submission(initials, currentScore)
  } else if (event.target.classList.contains('answerButtons')) {
    selectAnswer(event.target.dataset.answer)
  }

})

let scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || []