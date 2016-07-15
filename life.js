/**
 * CONWAY'S GAME OF LIFE
 */

// config
var width = 80;
var height = 25;
var delay = 100; // ms

// overrides
var qs = window.location.search.slice(1).split('&');
for (var i in qs) {
  var param = qs[i].split('=');
  if (param.length == 2) {
    var key = param[0];
    var value = param[1];
    if (key == 'width') width = parseInt(value);
    else if (key == 'height') height = parseInt(value);
    else if (key == 'delay') delay = parseInt(value);
  }
}

// run
game(width, height, delay);

// the game
function game(width, height, delay, id) {
	var element = document.getElementById(id) || document.body;
  element.style = "font-family: monospace; line-height: 50%; text-align: center;";
  var turns = 0;
  var board = init(width, height);
  print(element, board, turns);
  var game = setInterval(function() {
    board = step(board);
    if (!board) {
      clearInterval(game);
    } else {
      turns++;
      print(element, board, turns);
    }
  }, delay);
}

// initialize the board
function init(width, height) {
  var board = new Array(height);
  for (var y = 0; y < height; y++) {
    board[y] = new Array(width);
    for (var x = 0; x < width; x++) {
      board[y][x] = Math.floor(Math.random() * 2);
    }
  }
  return board;
}

// take a turn
function step(board) {
  var temp = board.slice();
  var changed = false;
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      var cell = board[y][x];
      var neighbors = 0 
      	+ (y > 1 && x > 1 ? board[y - 1][x - 1] : 0)
        + (y > 1 ? board[y - 1][x] : 0)
        + (y > 1 && x < board[y - 1].length - 1 ? board[y - 1][x + 1] : 0)
        + (x > 0 ? board[y][x - 1] : 0)
        + (x < board[y].length - 1 ? board[y][x + 1] : 0)
        + (y < board.length - 1 && x > 0 ? board[y + 1][x - 1] : 0)
        + (y < board.length - 1 ? board[y + 1][x] : 0)
        + (y < board.length - 1 && x < board[y + 1].length - 1 ? board[y + 1][x + 1] : 0)
        ;

      // rule 1 - die from underpopulation
      if (cell == 1 && neighbors < 2) {
        temp[y][x] = 0;
        changed = true;
      }
      // rule 2 - stay cool
      /*
      else if (cell == 1 & (neighbors == 2 || neighbors == 3)) {
      	temp[y][x] = temp[y][x];
      }
      */
      // rule 3 - die from overpopulation
      else if (cell == 1 && neighbors > 3) {
        temp[y][x] = 0;
        changed = true;
      }
      // rule 4 - be born
      else if (cell == 0 && neighbors == 3) {
        temp[y][x] = 1;
        changed = true;
      }
    }
  }
  if (!changed) return false;
  else return temp;
}

// print the board
function print(el, board, turns) {
  el.innerHTML = "<pre>";
  for (var y = 0; y < board.length; y++) {
    var line = "";
    for (var x = 0; x < board[y].length; x++) {
      line += (board[y][x] == 1 ? "*" : "&nbsp;");
    }
    el.innerHTML += line + "<br>";
  }
  el.innerHTML += "</pre>";
  //el.innerHTML += "<div style=\"text-align: center; font-size: 2em; line-height: 100%;\">" + turns + "</div>";
}
