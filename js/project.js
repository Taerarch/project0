$(document).ready(function(){
// Confetti
//


let markerX = 'X';
let markerO = 'O';
let turnSwap = 'X';
let win = false;
let board = [];
let firstWins = 0;
let secondWins = 0;
let togglePVP = true;


const change = function() {
  if ($(this).text() === '') {
    if (turnSwap === 'X') {
      $(this).text(markerX).addClass('X');
      turnSwap = 'O';
    } else {
      $(this).text(markerO).addClass('O');
      turnSwap = 'X';
    }
    checkWin();
    if (togglePVP === false) { bot() };
    board = [];
  }
}


const horizontalWin = function() {
  for (let i = 0; i < 3; i++) {
    if (board[0 + (i*3)] === board[2 + (i*3)] && board[0 + (i*3)] === board[1 + (i*3)] && board[0 + (i*3)] != '') {
      $(`.Row${i+1} button`).addClass('win');
      winMessage(($(`.Row${i+1} button`).text())[0]);
    }
  }
}


const verticalWin = function() {
  for (let i = 0; i < 3; i++) {
    if (board[0 + (i)] === board[6 + (i)] && board[0 + (i)] === board[3 + (i)] && board[i] != '') {
      $(`.Col${i+1}`).addClass('win');
      winMessage(($(`.Col${i+1}`).text())[0]);
    }
  }
}


const diagonalWin = function() {
  if (board[0] === board[4] && board[0] === board[8] && board[0] != '') {
    $(`.Row1 .Col1`).addClass('win');
    $(`.Row2 .Col2`).addClass('win');
    $(`.Row3 .Col3`).addClass('win');
    winMessage(($(`.Row1 button`).text())[0]);
  } else if (board[2] === board[4] && board[2] === board[6] && board[2] != '') {
    $(`.Row1 .Col3`).addClass('win');
    $(`.Row2 .Col2`).addClass('win');
    $(`.Row3 .Col1`).addClass('win');
    winMessage(($(`.Row3 button`).text())[0]);
  }
}


const winMessage = function(input) {
  $('.winOutput').append(`<li>${input} wins! Congratulations!</li>`);
  win = true;
  if (turnSwap === 'X') { secondWins += 1} else { firstWins += 1};
  $('#left').text(firstWins);
  $('#right').text(secondWins);
}


const checkWin = function() {
  if (win === false) {
    for (let x = 0; x < 3; x++) {
      for (let i = 0; i < 3; i++) {
        board.push($(`.Row${x+1} button`)[i].innerHTML);
      }
    }
    horizontalWin();
    verticalWin();
    diagonalWin();
  }
}



//Remove all the text inside the buttons and all the classes attached.
const reset = function() {
  $('.Col1,.Col2,.Col3').removeClass('win').removeClass('X').removeClass('O').text('');
  turnSwap = 'X'; // Needs to set the turns back to baseline.
  win = false;
}



$('button').on('click', change);
$('.reset').on('click', reset);

$('#scores').on('click', function() {
  firstWins = 0;
  secondWins = 0;
  $('#left').text(firstWins);
  $('#right').text(secondWins);
});


$('#changeXOne').on('click', function() { markerX = 'X'});
$('#changeXTwo').on('click', function() { markerX = '$'});
$('#changeXThree').on('click', function() { markerX = 'V'});
$('#changeXFour').on('click', function() { markerX = 'T'});

$('#changeXFive').on('click', function() { markerO = 'O'});
$('#changeXSix').on('click', function() { markerO = 'S'});
$('#changeXSeven').on('click', function() { markerO = 'G'});
$('#changeXEight').on('click', function() { markerO = '#'});

$('#pvp').on('click', function() { togglePVP = true})
$('#pve').on('click', function() { togglePVP = false})





const saveGameState = function() {
  localStorage["playerOne"] = markerX;
  localStorage["playerTwo"] = markerO;
  localStorage["turnKeep"] = turnSwap;
  localStorage["storeFirstWins"] = firstWins;
  localStorage["storeSecondWins"] = secondWins;
  localStorage["storePVP"] = togglePVP;

  for (let x = 0; x < 3; x++) {
    for (let i = 0; i < 3; i++) {
      localStorage[`square${i+1+(x*3)}`] = $(`.Row${x+1} .Col${i+1}`).text();
    }
  }
}

// $('window').on("unload", saveGameState())

const resumeGameData = function() {
  togglePVP = localStorage.storePVP;
  markerX = localStorage.playerOne;
  markerO = localStorage.playerTwo;
  turnSwap = localStorage.turnKeep;
  firstWins = parseInt(localStorage.storeFirstWins);
  secondWins = parseInt(localStorage.storeSecondWins);
  $('#left').text(firstWins);
  $('#right').text(secondWins);
}


const resumeGameState = function() {
  resumeGameData();

  $('.Row1 .Col1').text(localStorage.square1);
  $('.Row1 .Col2').text(localStorage.square2);
  $('.Row1 .Col3').text(localStorage.square3);
  $('.Row2 .Col1').text(localStorage.square4);
  $('.Row2 .Col2').text(localStorage.square5);
  $('.Row2 .Col3').text(localStorage.square6);
  $('.Row3 .Col1').text(localStorage.square7);
  $('.Row3 .Col2').text(localStorage.square8);
  $('.Row3 .Col3').text(localStorage.square9);

  for (let x = 0; x < 3; x++) {
    for (let i = 0; i < 3; i++) {
      if ($(`.Row${x+1} .Col${i+1}`).text() === markerX) {
        $(`.Row${x+1} .Col${i+1}`).addClass('X');
      } else if ($(`.Row${x+1} .Col${i+1}`).text() === markerO) {
        $(`.Row${x+1} .Col${i+1}`).addClass('O');
      }
    }
  }
}


// Used for debugging
// const clearGameState = function() {
//   for (let x = 0; x < 3; x++) {
//     for (let i = 0; i < 3; i++) {
//       localStorage.removeItem(`square${i+1+(x*3)}`);
//     }
//   }
// }


$(window).on( "unload", saveGameState);
$(window).on( "load", resumeGameState);





const testClick = function() {
  $('.Row2 .Col2').trigger('click');
}



const bot = function() {
  switch (true) {
//Starting move
  case board[4] === '':
    $('.Row2 .Col2').trigger('click');
    break;

// Horizontal Offense
  case board[0] === markerO && board[1] === markerO && board[2] === '':
    $('.Row1 .Col3').trigger('click');
    break;
  case board[1] === markerO && board[2] === markerO && board[1] === '':
    $('.Row1 .Col1').trigger('click');
    break;
  case board[0] === markerO && board[2] === markerO && board[1] === '':
    $('.Row1 .Col2').trigger('click');
    break;

  case board[3] === markerO && board[4] === markerO && board[5] === '':
    $('.Row2 .Col3').trigger('click');
    break;
  case board[4] === markerO && board[5] === markerO && board[3] === '':
    $('.Row2 .Col1').trigger('click');
    break;
  case board[3] === markerO && board[5] === markerO && board[4] === '':
    $('.Row2 .Col2').trigger('click');
    break;

  case board[6] === markerO && board[7] === markerO && board[8] === '':
    $('.Row3 .Col3').trigger('click');
    break;
  case board[7] === markerO && board[8] === markerO && board[6] === '':
    $('.Row3 .Col1').trigger('click');
    break;
  case board[6] === markerO && board[8] === markerO && board[7] === '':
    $('.Row3 .Col2').trigger('click');
    break;

// Vertical Offense

  case board[0] === markerO && board[3] === markerO && board[6] === '':
    $('.Row3 .Col1').trigger('click');
    break;
  case board[3] === markerO && board[6] === markerO && board[0] === '':
    $('.Row1 .Col1').trigger('click');
    break;
  case board[0] === markerO && board[6] === markerO && board[3] === '':
    $('.Row2 .Col1').trigger('click');
    break;

  case board[1] === markerO && board[4] === markerO && board[7] === '':
    $('.Row3 .Col2').trigger('click');
    break;
  case board[4] === markerO && board[7] === markerO && board[1] === '':
    $('.Row1 .Col2').trigger('click');
    break;
  case board[1] === markerO && board[7] === markerO && board[4] === '':
    $('.Row2 .Col2').trigger('click');
    break;

  case board[2] === markerO && board[5] === markerO && board[8] === '':
    $('.Row3 .Col3').trigger('click');
    break;
  case board[5] === markerO && board[8] === markerO && board[2] === '':
    $('.Row1 .Col3').trigger('click');
    break;
  case board[2] === markerO && board[8] === markerO && board[5] === '':
    $('.Row2 .Col3').trigger('click');
    break;

// Diagonal Offense
  case board[0] === markerO && board[4] === markerO && board[8] === '':
    $('.Row3 .Col3').trigger('click');
    break;
  case board[4] === markerO && board[8] === markerO && board[0] === '':
    $('.Row1 .Col1').trigger('click');
    break;

  case board[2] === markerO && board[4] === markerO && board[6] === '':
    $('.Row3 .Col1').trigger('click');
    break;
  case board[4] === markerO && board[6] === markerO && board[2] === '':
    $('.Row1 .Col3').trigger('click');
    break;



//Horizontal Defense
  case board[0] === markerX && board[1] === markerX && board[2] === '':
    $('.Row1 .Col3').trigger('click');
    break;
  case board[1] === markerX && board[2] === markerX && board[0] === '':
    $('.Row1 .Col1').trigger('click');
    break;
  case board[0] === markerX && board[2] === markerX && board[1] === '':
    $('.Row1 .Col2').trigger('click');
    break;

  case board[3] === markerX && board[4] === markerX && board[5] === '':
    $('.Row2 .Col3').trigger('click');
    break;
  case board[4] === markerX && board[5] === markerX && board[3] === '':
    $('.Row2 .Col1').trigger('click');
    break;
  case board[3] === markerX && board[5] === markerX && board[4] === '':
    $('.Row2 .Col2').trigger('click');
    break;

  case board[6] === markerX && board[7] === markerX && board[8] === '':
    $('.Row3 .Col3').trigger('click');
    break;
  case board[7] === markerX && board[8] === markerX && board[6] === '':
    $('.Row3 .Col1').trigger('click');
    break;
  case board[6] === markerX && board[8] === markerX && board[7] === '':
    $('.Row3 .Col2').trigger('click');
    break;


//Vertical Defense
  case board[0] === markerX && board[3] === markerX && board[6] === '':
    $('.Row3 .Col1').trigger('click');
    break;
  case board[3] === markerX && board[6] === markerX && board[0] === '':
    $('.Row1 .Col1').trigger('click');
    break;
  case board[0] === markerX && board[6] === markerX && board[3] === '':
    $('.Row2 .Col1').trigger('click');
    break;

  case board[1] === markerX && board[4] === markerX && board[7] === '':
    $('.Row3 .Col2').trigger('click');
    break;
  case board[4] === markerX && board[7] === markerX && board[1] === '':
    $('.Row1 .Col2').trigger('click');
    break;
  case board[1] === markerX && board[7] === markerX && board[4] === '':
    $('.Row2 .Col2').trigger('click');
    break;

  case board[2] === markerX && board[5] === markerX && board[8] === '':
    $('.Row3 .Col3').trigger('click');
    break;
  case board[5] === markerX && board[8] === markerX && board[2] === '':
    $('.Row1 .Col3').trigger('click');
    break;
  case board[2] === markerX && board[8] === markerX && board[5] === '':
    $('.Row2 .Col3').trigger('click');
    break;



//Diagonal Defense
  case board[0] === markerX && board[4] === markerX && board[8] === '':
    $('.Row3 .Col3').trigger('click');
    break;
  case board[4] === markerX && board[8] === markerX && board[0] === '':
    $('.Row1 .Col1').trigger('click');
    break;

  case board[2] === markerX && board[4] === markerX && board[6] === '':
    $('.Row3 .Col1').trigger('click');
    break;
  case board[4] === markerX && board[6] === markerX && board[2] === '':
    $('.Row1 .Col3').trigger('click');
    break;



// Back up moves
  case board[0] === '':
    $('.Row1 .Col1').trigger('click');
    break;
  case board[1] === '':
    $('.Row1 .Col2').trigger('click');
    break;
  case board[2] === '':
    $('.Row1 .Col3').trigger('click');
    break;
  case board[3] === '':
    $('.Row2 .Col1').trigger('click');
    break;
  case board[5] === '':
    $('.Row2 .Col3').trigger('click');
    break;
  case board[6] === '':
    $('.Row3 .Col1').trigger('click');
    break;
  case board[7] === '':
    $('.Row3 .Col2').trigger('click');
    break;
  case board[8] === '':
    $('.Row3 .Col3').trigger('click');
    break;

  default:
    $('.winOutput').append(`<li id="draw">It's a Draw. Play again!</li>`);

  }
  checkWin();
}





});

//
