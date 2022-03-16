//Ancho y alto del tablero 
width = 11;
height = 11;


// 
var hasWon = false;

//
window.rollDice = () => {
  if (hasWon) {
    return;
  }
    // 
  let currentPlayer = players[currentPlayerTurn];
  //
  roll = Math.floor(Math.random()*5+1);
  //
  console.log(currentPlayer.name +", Tiraste", roll); 

  //
  currentPlayerTurn++;
  
  //
  if (currentPlayerTurn >= players.length) {
    currentPlayerTurn = 0;
  }
  
  
drawBoard();
};


//
players=[{name:"player1",position:0,color:"black"},{name:"player2",position:0,color:"green"}]

let currentPlayerTurn = 0;

board = [];
let position = 0;
let darkBox = false;

//
ladders = [{start: 2,end: 22},{start:99,end:90},{start: 10,end: 44},
  {start: 61,end: 19},{start: 70,end: 85},{start: 78,end: 4},{start:83, end:64},{start:93, end:75},
{start:59, end:67},{start:5, end:68},{start:20,end:34},{start:45, end:56},{start:30, end:60},
{start:80, end: 104},{start:11, end:50},{start:120,end:8},{start:6, end:23},{start:100,end:118},
{start:107, end:124}];

//
for (var y = height; y >= 0; y--) {
  let row = [];

  board.push(row);
  for (var x = 0; x < width; x++) {
    row.push({x,y,occupied: null,position,color: darkBox ? "#2B05F4" : "#FB040C"});
    darkBox = !darkBox; //next one is not dark box
    position++;
  }
}

boardSize = 55;
//
drawBoard = () => {
  let boardOnScreen = ``;
  board.forEach(row => {
    row.forEach(square => {
      boardOnScreen += `<div class=square style="top:${square.y *
        boardSize}px; left:${square.x *
        boardSize}px; background-color:${square.color}"></div>`;
    });
  });

  // 
  players.forEach(player => {
    let square = null;
    board.forEach(row => {
      row.forEach(square => {
        if (square.position === player.position) {
          boardOnScreen += `<div class=player style="top:${square.y *
            boardSize +
            5}px; left:${square.x * boardSize +
            5}px;background-color:${player.color}"></div>`;
        }
      });
    });
  });


  //
  ladders.forEach(ladder => {
    let startPos = { x: 0, y: 0 };
    let endPos = { x: 0, y: 0 };

    board.forEach(row => {
      row.forEach(square => {
        if (square.position === ladder.start) {
          startPos.x = square.x * boardSize;
          startPos.y = square.y * boardSize;
        }

        if (square.position === ladder.end) {
          endPos.x = square.x * boardSize;
          endPos.y = square.y * boardSize;
        }
      });
    });

    isLadder = ladder.end > ladder.start;

    //if it is a ladder then it is white, otherwise snake is green
    drawLine({color:isLadder ? "brown" : "white",startPos,endPos});
  });



  //
  document.getElementById("board").innerHTML = boardOnScreen;
};

//
function drawLine({color,startPos, endPos}){
  var canvas= document.getElementById("canvas");
  var diseño= canvas.getContext("2d");
  diseño.beginPath();
  diseño.moveTo(startPos.x + 35,startPos.y + 20);
  diseño.lineTo(endPos.x + 25,endPos.y + 25);
  diseño.lineWidth=17;
  diseño.strokeStyle=color;
  diseño.stroke();
 }

drawBoard();
