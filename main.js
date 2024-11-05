let timer = document.querySelector('.timer');
let time = 10;
let timeleft = time;
let downloadTimer;

const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');


const farmArea = document.querySelector('#farmArea');

const failedMsg = document.querySelector('.failed');
const winMsg = document.querySelector('.won');

function randomCorX(min, max) {
  return Math.floor(Math.random() * (max - min));
}

let results = [];

let carrotLength = document.querySelectorAll('.carrot').length;

document.querySelector('.carrotNum').innerText = carrotLength;


farmArea.addEventListener('click', (e) => {
  
  if(e.target.classList.contains('bug')) {
    stopGame('bug');
  } else if (e.target.classList.contains('carrot')) {
    e.target.remove();
    let carrotLength = document.querySelectorAll('.carrot').length;
    document.querySelector('.carrotNum').innerText = carrotLength;
    console.log(carrotLength);
    if( carrotLength === 0 ) {
      stopGame('win');
    }
  }
})

function initGame() {
  document.querySelector('body').classList.add('gameOn');
  pauseBtn.classList.remove('hidden');
  playBtn.classList.add('hidden');
  document.querySelector('.message').classList.add('hidden');

  startTimer();

  for (let i = 0; i < 17; i++) {
    let xCoor = randomCorX(farmArea.getBoundingClientRect().x, farmArea.getBoundingClientRect().width);
    let yCoor = randomCorX(farmArea.getBoundingClientRect().top, farmArea.getBoundingClientRect().bottom);
    
    let elemCoor = {xCoor, yCoor}
    results.push(elemCoor);
  
    document.querySelector(`.games[data-id="${i}"]`).style.left = `${xCoor - 50}px`;
    document.querySelector(`.games[data-id="${i}"]`).style.top = `${yCoor - 50}px`;
  }
}
function stopGame(clicked) {
  let replayBtn = document.querySelector('i');

  if( clicked == 'bug' ) {
    document.querySelector('.message').classList.remove('hidden');
    winMsg.classList.add('hidden');
    console.log(replayBtn);
    stopTimer();
    replayBtn.addEventListener('click', initGame);
    
  } else {
    document.querySelector('.message').classList.remove('hidden');
    failedMsg.classList.add('hidden');
    stopTimer();
    replayBtn.addEventListener('click', initGame);
    
  }

  document.querySelector('body').classList('gameOn');
  
}

function pauseGame() {
  stopTimer();
}

function startTimer() {
  if(!downloadTimer) {
    downloadTimer = setInterval(function(){
      timeleft--;
      let timeStr = timeleft.toString();
      timer.innerHTML = `00:${timeStr.padStart(2, '0')}`;
      if(timeleft <= 0) {
        clearInterval(downloadTimer);
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(downloadTimer);
  console.log(timeleft);
  //downloadTimer = null;
}

//console.log(timeleft);


// function handleTimer(handle) {
  
//   if( handle == 'play' ) {
    
//   } else if(handle == 'pause' ) {

//   } else if( handle == 'stop' ) {
//     clearInterval(downloadTimer);
//   }
  
// }

playBtn.addEventListener('click', initGame);

pauseBtn.addEventListener('click', pauseGame);

