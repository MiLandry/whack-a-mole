// Globals
let timer // stores the timer intervalId
let moleSpawner // stores the mole spawning timeoutId

const moleNodes = document.querySelectorAll('div.mole')
// These arrays are used to track which moles are visible,
// but do not actually drive the state.
const visibleMoles = []
const hiddenMoles = [
  'mole1', 'mole2', 'mole3',
  'mole4', 'mole5', 'mole6',
  'mole7', 'mole8', 'mole9',
]

// helper stuff

function stopTimer() {
  window.clearInterval(timer)
}

function setScore(score) {
  document.getElementById('score').innerHTML = 'Score: ' + score.toString()
}

function setTimer(time) {
  document.getElementById('timer').innerHTML = 'Time: ' + time.toString()
}

function resetMoles() {
  // hide all moles
  for(var i =0; i < moleNodes.length; i++){
    moleNodes[i].classList.add('hidden')
}
}

function incrementScore() {
  const scoreElement = document
    .getElementById('score')
    .innerHTML
  const currentScore = parseInt(
    scoreElement
      .substring(7) // remove "score: " prefix
  )
  const newScore = currentScore + 1
  document.getElementById('score').innerHTML = 'Score: ' + newScore.toString()
}
function getRandomInt(min, max) {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt
}

function disableControlButton(controlId) {
  const control = document.getElementById(controlId)
  control.classList.remove('enabled-control')
  control.classList.add('disabled-control')
}

function enableControlButton(controlId) {
  const control = document.getElementById(controlId)
  control.classList.add('enabled-control')
  control.classList.remove('disabled-control')
}

function pauseGame() {
  // enable start button
  enableControlButton('start')
  // enable stop button
  disableControlButton('stop')
  // enable reset
  enableControlButton('reset')
  stopTimer()

  // reset moles to starting position
  resetMoles()

  // stop spawning moles
  window.clearTimeout(moleSpawner)
}

function gameOver() {
  pauseGame()
  disableControlButton('start')
}

function startTimer() {
  timer = setInterval(function () {
    const timerElement = document
      .getElementById('timer')
      .innerHTML
    const currentTime = parseInt(
      timerElement
        .substring(6) // remove "time: " prefix
    )
    const newTime = currentTime - 1

    if (newTime === 0) {
      gameOver()
    }
    setTimer(newTime)
  }, 1000)
}

function showRandomMole() {
  // get a random mole id from the set of hiding moles
  const spawnIndex = Math.floor(Math.random() * hiddenMoles.length)
  const moleId = hiddenMoles[spawnIndex]
  // update the tracking arrays
  hiddenMoles.splice(spawnIndex, 1)
  visibleMoles.push(moleId)

  document
    .getElementById(moleId)
    .classList.remove('hidden')

  return moleId
}

function hideMole(moleId, delay) {
  setTimeout(function () {
    document
      .getElementById(moleId)
      .classList.add('hidden')
      // update the tracking arrays
    visibleMoles.splice(visibleMoles.indexOf(moleId), 1)
    hiddenMoles.push(moleId)
  }, delay)
}

function spawnMole() {
  // When called, A mole will spawn in no less than 2 seconds
  const timeToSpawn = getRandomInt(1000, 2000)
  moleSpawner = setTimeout(function () {
    const spawnedMoleId = showRandomMole()

    // hide the mole after a random delay between 1-4 seconds
    const hideDelay = getRandomInt(1000, 4000)
    hideMole(spawnedMoleId, hideDelay)

    // After spawning a mole, start a new spawn.
    spawnMole()
  }, timeToSpawn)
}

// control handlers

function handleStartClick(e) {
  e.preventDefault()

  // disable start button
  disableControlButton('start')
  // enable stop button
  enableControlButton('stop')
  // disable reset
  disableControlButton('reset')

  startTimer()
  spawnMole()
}

function handleStopClick(e) {
  e.preventDefault()

  pauseGame()
}

function handleResetClick(e) {
  e.preventDefault()

  resetMoles()
  setTimer(20)
  setScore(0)
  enableControlButton('start')
  disableControlButton('stop')
  disableControlButton('reset')
}

function handleGameContainerClick(e) {
  const target = e.target || e.srcElement
  const id = target.id.toString()

  if (id.substring(0, id.length - 1) === 'mole-img-') {
    // a mole was clicked!
    incrementScore()

    // hide the clicked mole
    const moleId = 'mole' + id.substring(id.length - 1)
    hideMole(moleId, 0)
  }
}

// configure  controls
document
  .getElementById('start')
  .addEventListener('click', handleStartClick)

document
  .getElementById('stop')
  .addEventListener('click', handleStopClick)

document
  .getElementById('reset')
  .addEventListener('click', handleResetClick)

document
  .getElementById('game-container')
  .addEventListener('click', handleGameContainerClick)
