




let markerX = 'X';
let markerO = 'O';
let turnSwap = 'X';
// let winValue = ''
let win = false;
let board = [];


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
  }
}


// play again button?
// change color of winning line


const horizontalWin = function() {
  for (let i = 0; i < 3; i++) {
    if (board[0 + (i*3)] === board[2 + (i*3)] && board[0 + (i*3)] === board[1 + (i*3)] && board[0 + (i*3)] != '') {
      console.log('You win!');
      $(`.Row${i+1} button`).addClass('win');
      // winValue = $(`.Row${i+1} button`).text(); // That mess of code checks the text of the first
      // $('.winOutput').append(`<li>${winValue[0]} wins! Congratulations!</li>`);
      // win = true;
      winMessage(($(`.Row${i+1} button`).text())[0]);
    }
  }
}

const verticalWin = function() {
  for (let i = 0; i < 3; i++) {
    if (board[0 + (i)] === board[6 + (i)] && board[0 + (i)] === board[3 + (i)] && board[i] != '') {
      console.log('You win!');
      $(`.Col${i+1}`).addClass('win');
      winMessage(($(`.Col${i+1}`).text())[0])
    }
  }
}

const diagonalWin = function() {
  if (board[0] === board[4] && board[0] === board[8] && board[0] != '') {
    console.log("You win!");
    $(`.Row1 .Col1`).addClass('win');
    $(`.Row2 .Col2`).addClass('win');
    $(`.Row3 .Col3`).addClass('win');
    winMessage(($(`.Row1 button`).text())[0]);
  } else if (board[2] === board[4] && board[2] === board[6] && board[2] != '') {
    console.log("You win!");
    $(`.Row1 .Col3`).addClass('win');
    $(`.Row2 .Col2`).addClass('win');
    $(`.Row3 .Col1`).addClass('win');
    winMessage(($(`.Row3 button`).text())[0]);
  }
}


const winMessage = function(input) {
  $('.winOutput').append(`<li>${input} wins! Congratulations!</li>`);
  win = true;
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
    board = [];
  }
}



//Remove all the text inside the buttons and all the classes attached.
const reset = function() {
  $('.Col1,.Col2,.Col3').removeClass('win').removeClass('X').removeClass('O').text('');
  turnSwap = 'X'; // Needs to set the turns back to baseline.
  win = false;
}




$('button').on('click', change);
$('#reset').on('click', reset);


$('#changeXOne').on('click', function() { markerX = 'X'});
$('#changeXTwo').on('click', function() { markerX = '$'});
$('#changeXThree').on('click', function() { markerX = 'V'});
$('#changeXFour').on('click', function() { markerX = 'T'});

$('#changeXFive').on('click', function() { markerO = 'O'});
$('#changeXSix').on('click', function() { markerO = 'S'});
$('#changeXSeven').on('click', function() { markerO = '&'});
$('#changeXEight').on('click', function() { markerO = '#'});
