let time = 100

document.getElementById('counter').textContent = time

let interval

function startTimer() {
  interval = setInterval(timer, 1000)
}

function timer() {
  if (time <= 0) {
    interval.clearInterval(interval);
  }
  time--
  document.getElementById('counter').textContent = time
}

// start timer when startBtn clicked
document.getElementById('startBtn').addEventListener('click', function() {
  startTimer()
})

