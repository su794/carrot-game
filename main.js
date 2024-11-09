let timer = document.querySelector('.timer');
let time = 10;
let timeleft = time;
let downloadTimer;
let timeStr = timeleft.toString();

const playPauseBtn = document.querySelector('.play-pause');
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
const rePlayBtn = document.querySelectorAll('.re-try i');

const farmArea = document.querySelector('#farmArea');

const failedMsg = document.querySelector('.failed');
const winMsg = document.querySelector('.won');

function randomCorX(min, max) {
  return Math.floor(Math.random() * (max - min));
}

let results = [];

let carrotLength = document.querySelectorAll('.carrot').length;

farmArea.addEventListener('click', (e) => {
  
  if(e.target.classList.contains('bug')) {
    stopGame('bug');
  } else if (e.target.classList.contains('carrot')) {
    e.target.classList.add('hidden');
    let carrotLength = document.querySelectorAll('.carrot:not(.hidden)').length;
    document.querySelector('.carrotNum').innerText = carrotLength;
    
    if( carrotLength === 0 ) {
      stopGame('win');
    }
  }
})

function initGame(e) {
  console.log(e.target)
  timeleft = 10;
    downloadTimer = undefined;
    document.querySelector('body').classList.add('gameOn');
    pauseBtn.classList.remove('hidden');
    playBtn.classList.add('hidden');
    document.querySelector('.message').classList.add('hidden');
    document.querySelectorAll('.re-try').forEach( btn => btn.classList.remove('hidden') );
    document.querySelector('.carrotNum').innerText = carrotLength;
    timer.innerHTML = `00:${timeStr.padStart(2, '0')}`;
    startTimer();
  
    
    for (let i = 0; i < 17; i++) {
      let xCoor = randomCorX(farmArea.getBoundingClientRect().x, farmArea.getBoundingClientRect().width);
      let yCoor = randomCorX(farmArea.getBoundingClientRect().top, farmArea.getBoundingClientRect().bottom);
      
      let elemCoor = {xCoor, yCoor}
      results.push(elemCoor);
    
      document.querySelector(`.games[data-id="${i}"]`).style.left = `${xCoor - 50}px`;
      document.querySelector(`.games[data-id="${i}"]`).style.top = `${yCoor - 50}px`;
      document.querySelector(`.games[data-id="${i}"]`).classList.remove('hidden');
    }

  if(
      e.target.classList.contains('fa-play')
    ) {
    startTimer();
  } else if(e.target.classList.contains('fa-pause')) {
    playBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    clearInterval(downloadTimer);
  }
  

}
function stopGame(clicked) {

  if( clicked == 'bug' ) {
    document.querySelector('.message').classList.remove('hidden');
    winMsg.classList.add('hidden');
    clearInterval(downloadTimer);
    
  } else {
    document.querySelector('.message').classList.remove('hidden');
    failedMsg.classList.add('hidden');
    clearInterval(downloadTimer);
  }

  document.querySelector('body').classList.remove('gameOn');
  
}

function pauseGame() {
  playBtn.classList.remove('hidden');
  pauseBtn.classList.add('hidden');
  if( this.classList.contains('paused') ) {
    
    setInterval(function(){
      timeleft--;
      let timeStr = timeleft.toString();
      timer.innerHTML = `00:${timeStr.padStart(2, '0')}`;
      if(timeleft <= 0) {
        clearInterval(downloadTimer);
      }

      if( timeleft === 0 && carrotLength > 0 ) {
        stopGame('bug');
      }
      
    }, 1000);
    this.classList.remove('paused');
    
  } else {
    stopTimer();
    this.classList.add('paused');
  }
  
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

      if( timeleft === 0 && carrotLength > 0 ) {
        stopGame('bug');
      }
      
    }, 1000);

  }

  
  
}

function stopTimer() {
  clearInterval(downloadTimer);
}

playPauseBtn.addEventListener('click', initGame);
//pauseBtn.addEventListener('click', pauseBtn.classList.add('paused'));
rePlayBtn.forEach( btn => 
  btn.addEventListener('click', initGame )
);