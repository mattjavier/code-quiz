let time = 100

document.getElementById('counter').textContent = time

// start timer when startBtn clicked
document.getElementById('startBtn').addEventListener('click', function() {
  setInterval(function() {
    if (time <= 0) {
      clearInterval();
    }
    time--
    document.getElementById('counter').textContent = time
  }, 1000)
})

let questions = [
  {
    question: 'Commonly used data types DO NOT include:',
    a1: 'strings',
    a2: 'booleans',
    a3: 'alerts',
    a4: 'numbers',
    correct: 'alerts',
    isCorrect: false
  },
  {
    question: 'The condition in an if / else statement is enclosed within _____.',
    a1: 'quotes',
    a2: 'curly brackets',
    a3: 'parentheses',
    a4: 'square brackets',
    correct: 'parantheses',
    isCorrect: false
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    a1: 'JavaScript',
    a2: 'terminal / bash',
    a3: 'for loops',
    a4: 'console.log()',
    correct: 'console.log()',
    isCorrect: false
  },
  {
    question: 'Arrays in JavaScript can be used to store _____.',
    a1: 'numbers and strings',
    a2: 'other arrays',
    a3: 'booleans',
    a4: 'all of the above',
    correct: 'all of the above',
    isCorrect: false
  },
  {
    question: 'String values must be enclosed within _____ when being assigned to variables.',
    a1: 'commas',
    a2: 'curly brackets',
    a3: 'quotes',
    a4: 'parentheses',
    correct: 'parentheses',
    isCorrect: false
  },
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    a1: '<js>',
    a2: '<scripting>',
    a3: '<script>',
    a4: '<javascript>',
    correct: '<script>',
    isCorrect: false
  },
  {
    question: 'What is the correct JavaScript syntax to change the content of the HTML element: <p id="demo">This is a demonstration.</p>?',
    a1: '#demo.innerHTML = "Hello World!";',
    a2: 'document.getElementByName("p").innerHTML = "Hello World!";',
    a3: 'document.getElement("p").innerHTML = "Hello World!";',
    a4: 'document.getElementById("demo").innerHTML = "Hello World!";',
    correct: 'document.getElementById("demo").innerHTML = "Hello World!";',
    isCorrect: false
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    a1: '<script src="xxx.js">',
    a2: '<script name="xxx.js">',
    a3: '<script href="xxx.js">',
    a4: '<script link="xxx.js">',
    correct: '<script src="xxx.js">',
    isCorrect: false
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    a1: 'alert("Hello World");',
    a2: 'msg("Hello World");',
    a3: 'alertBox("Hello World");',
    a4: 'alertBox("Heloo World");',
    correct: 'alert("Hello World");',
    isCorrect: false
  },
  {
    question: 'How do you call a function named "myFunction"?',
    a1: 'call function myFunction()',
    a2: 'myFunction()',
    a3: 'call myFunction()',
    a4: 'myFunction().call',
    correct: 'myFunction()',
    isCorrect: false
  }
]

let scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || []