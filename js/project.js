
let board = [];


for (let x = 0; x < 3; x++) {
  let line = [];
  for (let i = 0; i < 3; i++) {
    line.push('_');
  }
  board.push(line);
}








// 
// board[1][0] = 'x'
// board[1][2] = 'x'
// board[1][1] = 'x'




for (let i = 0; i < board.length; i++) {
  board[i] = board[i].join(' ') + '<br>'
}


$('body').append(board)
