'use strict';

const farmArea = document.querySelector('#farmArea');
const farmAreaRect = farmArea.getBoundingClientRect();
const CARROT_SIZE = 50;
const CARROT_COUNT = 10;
const BUG_COUNT = 5;
let gameOn = false;

const playPauseBtn = document.querySelector('.play-pause');
const playBtn = document.querySelector('.fa-play');
const pauseBtn = document.querySelector('.fa-pause');
const failedRePlayBtn = document.querySelector('.failed:not(.hidden)');
const wonRePlayBtn = document.querySelector('.won:not(.hidden)');

let score = document.querySelector('.carrotNum');
let timer = document.querySelector('.timer');
let time = 10;
let timeleft = time;
let timeStr = timeleft.toString();
let downloadTimer;

const msgModal = document.querySelector('.message .modal');
const overlay = document.querySelector('.overlay');
const failedMsg = document.querySelector('.failed');
const winMsg = document.querySelector('.won');
const pausedMsg = document.querySelector('.paused');

const modalText = document.querySelector('.modal .modal-text');
const modalIcon = document.querySelector('.modal i')

function randomCor(min, max) {
  // this includes the min value ( + min at the end )
  return Math.floor(Math.random() * (max - min) + min);
}

farmArea.addEventListener('click', (e) => {
  
  if(e.target.classList.contains('bug')) {
    stopGame('lost');
  } else if (e.target.classList.contains('carrot')) {
    e.target.classList.add('hidden');
    let carrotLength = document.querySelectorAll('.carrot:not(.hidden)').length;
    score.innerText = carrotLength;
    
    if( carrotLength === 0 ) {
      stopGame('win');
    }
  }
})

function playGame() {
  handleOverlay('hide');
  farmArea.innerHTML = '';
  timer.innerHTML = `00:${time.toString()}`;
  score.innerText = CARROT_COUNT;
  
  console.log(downloadTimer);
  // timeleft = 10;
  //   downloadTimer = undefined;
  //   document.querySelector('body').classList.add('gameOn');
  //   pauseBtn.classList.remove('hidden');
  //   playBtn.classList.add('hidden');
  //   document.querySelector('.message').classList.add('hidden');
  //   document.querySelectorAll('.re-try').forEach( btn => btn.classList.remove('hidden') );
  //   document.querySelector('.carrotNum').innerText = carrotLength;
  //   timer.innerHTML = `00:${timeStr.padStart(2, '0')}`;
  //   startTimer();
  
    
    

  // if(
  //     e.target.classList.contains('fa-play')
  //   ) {
  //   startTimer();
  // } else if(e.target.classList.contains('fa-pause')) {
  //   playBtn.classList.remove('hidden');
  //   pauseBtn.classList.add('hidden');
  //   clearInterval(downloadTimer);
  // }

  placeImages('carrot', CARROT_COUNT, 'img/carrot.png');
  placeImages('bug', BUG_COUNT, 'img/bug.png');

  showStopButton();
  timer.classList.remove('hidden');
  score.classList.remove('hidden');
  startTimer();
}

function pauseGame() {
  console.log('pause');
  stopTimer();
  handleOverlay('show', 'Paused', 'fa-regular fa-face-smile-wink');
}

function resumeGame() {
  console.log('resume');
  handleOverlay('hide');
  startTimer();
}

function placeImages(className, count, imgPath) {
  for ( let i = 0; i < count; i++ ) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    // minus carrot size from the max value so it doesn't go over the farmArea
    const itemX = randomCor(farmAreaRect.x, farmAreaRect.width - CARROT_SIZE);
    // set min value of itemY same as Rect.x because then the start point will be (8, 8) from left top corner.
    const itemY = randomCor(farmAreaRect.x, farmAreaRect.height - CARROT_SIZE);
    item.style.left = `${itemX}px`;
    item.style.top = `${itemY}px`;
    farmArea.appendChild(item);
  }

}

function showStopButton() {
  let buttonIcon = playPauseBtn.querySelector('.fa-play');
  buttonIcon && buttonIcon.classList.add('fa-pause');
  buttonIcon && buttonIcon.classList.remove('fa-play');
  
}

function showPlayButton() {
  let buttonIcon = playPauseBtn.querySelector('.fa-pause');
  
  buttonIcon.classList.add('fa-play');
  buttonIcon.classList.remove('fa-pause');
}


function stopGame(clicked) {
  if( clicked == 'bug' ) {
    // msgModal.classList.remove('hidden');
    // failedMsg.classList.remove('hidden');
    // winMsg.classList.add('hidden');
    //clearInterval(downloadTimer);
    
  } else {
    // msgModal.classList.remove('hidden');
    // failedMsg.classList.add('hidden');
    // winMsg.classList.remove('hidden');
    //clearInterval(downloadTimer);
  }

  if( clicked == 'win' ) {
    handleOverlay('show', clicked, 'fa-solid fa-thumbs-up');
    time = 10;
  } else if( clicked == 'lost' ) {
    handleOverlay('show', clicked, 'fa-solid fa-fan');
    time = 10;
  }

  document.querySelector('body').classList.remove('gameOn');
  stopTimer();
  
}

function handleOverlay(status, modalMsg, iconClass) {
  

  if( status === 'show' && ( modalMsg && iconClass ) ) {
    console.log('overlay add');
    
    overlay.classList.remove('hidden');
    modalText.innerHTML = modalMsg;
    modalIcon.setAttribute('class', iconClass);

  } else if( status === 'hide' ) {

    console.log('overlay clear');

    overlay.classList.add('hidden');
    modalText.innerHTML = '';
    modalIcon.setAttribute('class', '');
  }
  
  
  
}

//function pauseGame() {
  //playBtn.classList.remove('hidden');
  //pauseBtn.classList.add('hidden');
  //if( this.classList.contains('paused') ) {
    
    // setInterval(function(){
    //   timeleft--;
    //   let timeStr = timeleft.toString();
    //   timer.innerHTML = `00:${timeStr.padStart(2, '0')}`;
    //   if(timeleft <= 0) {
    //     clearInterval(downloadTimer);
    //   }

    //   if( timeleft === 0 && carrotLength > 0 ) {
    //     stopGame('bug');
    //   }
      
    // }, 1000);
    //this.classList.remove('paused');
    
  //} else {
    ///stopTimer();
    //this.classList.add('paused');
  //}
  
//}

function startTimer() {
  
  let carrotLength = document.querySelectorAll('.carrot').length;
  // if(!downloadTimer) {
    
  //   downloadTimer = setInterval(function(){
  //     time--;
  //     console.log(time, carrotLength);
  //     let timeStr = time.toString();
  //     timer.innerHTML = `00:${timeStr.padStart(2, '0')}`;

  //     // if( time === 0 && carrotLength > 0 ) {
  //     //   stopGame('bug');
  //     // }

  //     if(time <= 0) {
  //       stopTimer();
  //       carrotLength > 0 && stopGame('lost');
  //     }
      
  //   }, 1000);
  // } else {
  //   downloadTimer;
  // }

  downloadTimer = setInterval(function(){
    time--;
    console.log(time, carrotLength);
    let timeStr = time.toString();
    timer.innerHTML = `00:${timeStr.padStart(2, '0')}`;

    // if( time === 0 && carrotLength > 0 ) {
    //   stopGame('bug');
    // }

    if(time <= 0) {
      stopTimer();
      carrotLength > 0 && stopGame('lost');
    }
    
  }, 1000);

  downloadTimer;
  
}

function stopTimer() {
  clearInterval(downloadTimer);
}

function restartGame(e) {

  // if(e.target.classList.contains('fa-reply')) {
  //   farmArea.innerHTML = '';
  //   msgModal.classList.add('hidden');
  //   playGame();
  // }

}

playPauseBtn.addEventListener('click', (e) => {
  if( e.target.classList.contains('fa-play') ) {
    playGame();
  } else if( e.target.classList.contains('fa-pause') ) {
    pauseGame();
  }
  
  // gameOn = !gameOn;

});

// pauseBtn.addEventListener('click', () => {
  
// });

// failedRePlayBtn.addEventListener('click', (e) => {
  
//   restartGame(e);
// });

// wonRePlayBtn.addEventListener('click', (e) => {
//   restartGame(e);
// })

msgModal.addEventListener('click', (e) => {
  if( e.target.classList.contains('fa-face-smile-wink')) {
    resumeGame();
  } else {
    playGame();
  }
});