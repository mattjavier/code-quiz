let time = 100

document.getElementById('counter').textContent = time


// start timer when startBtn clicked
document.getElementById('startBtn').addEventListener('click', setInterval(function() {
  if (time <= 0) {
    clearInterval();
  }
  time--
  document.getElementById('counter').textContent = time
}, 1000))

