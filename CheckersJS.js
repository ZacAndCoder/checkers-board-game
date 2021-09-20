var piece;

//If any checker piece is clicked, assign it to the "piece" variable//
document.querySelectorAll(".dot-1, .dot-2").forEach(item => {
  item.addEventListener("click", function() {
    piece = item;
    updateBoard();
  });
});

//Assign each square to a column and row//
const COLUMN = [
  [1, [1, 17, 33, 49]],
  [2, [10, 26, 42, 58]],
  [3, [3, 19, 35, 51]],
  [4, [12, 28, 44, 60]],
  [5, [5, 21, 37, 53]],
  [6, [14, 30, 46, 62]],
  [7, [7, 23, 39, 55]],
  [8, [16, 32, 48, 64]]
];

const ROW = [
  [1, [1, 3, 5, 7]],
  [2, [10, 12, 14, 16]],
  [3, [17, 19, 21, 23]],
  [4, [26, 28, 30, 32]],
  [5, [33, 35, 37, 39]],
  [6, [42, 44, 46, 48]],
  [7, [49, 51, 53, 55]],
  [8, [58, 60, 62, 64]]
];

var playerOneName,
    playerTwoName,
    gameHasStarted = false;

//Save and display username input and start game//
document.querySelector("#set-usernames").addEventListener("click", function() {
  gameHasStarted = true;
  playerOneName = document.querySelector("#username-1").value;
  playerTwoName = document.querySelector("#username-2").value;
  document.querySelector("#username-1").style.visibility = "hidden";
  document.querySelector("#username-2").style.visibility = "hidden";
  document.querySelector("#set-usernames").style.visibility = "hidden";
  document.querySelector("#forfeit").style.visibility = "visible";
  document.querySelector('#display-names').innerHTML = playerOneName + "'s" + " turn!";
});

var playerTurn = 1,
    square = document.querySelectorAll(".square"),
    prisonOne = document.querySelector("#prison-1"),
    prisonTwo = document.querySelector("#prison-2"),
    playerOnePieces = [],
    playerTwoPieces = [],
    allPieces = [],
    numOfCaptures = 0;

//Create arrays of each player's pieces whenever a player moves//
var updateBoard = function() {
  playerOnePieces = [];
  playerTwoPieces = [];
  allPieces = [];
  square.forEach(item => {
    for (let i = 0; i < item.childNodes.length; i++) {
      if (item.childNodes[i].className == "dot-1" || item.childNodes[i].className == "king-1") {
        playerOnePieces.push(parseInt(item.innerText));
        allPieces.push(parseInt(item.innerText));
      } else if (item.childNodes[i].className == "dot-2" || item.childNodes[i].className == "king-2") {
        playerTwoPieces.push(parseInt(item.innerText));
        allPieces.push(parseInt(item.innerText));
      }
    }
  });
  //When a piece makes it to the other side of the board, make it a king//
  if (piece.className == "dot-2" && ROW[0][1].includes(parseInt(piece.parentNode.innerText))) {
    piece.className = "king-2";
    numOfCaptures = 0;
    playerTurn = 1;
  }
  if (piece.className == "dot-1" && ROW[7][1].includes(parseInt(piece.parentNode.innerText))) {
    piece.className = "king-1";
    numOfCaptures = 0;
    playerTurn = 2;
  }
}

var redCanCapture = [],
    blueCanCapture = [],
    canMoveUpRight = [],
    canMoveUpLeft = [],
    canMoveDownRight = [],
    canMoveDownLeft = [],
    canMoveUpRight2 = [],
    canMoveUpLeft2 = [],
    canMoveDownRight2 = [],
    canMoveDownLeft2 = [],
    upRightSquare,
    upLeftSquare,
    downRightSquare,
    downLeftSquare,
    upRightSquare2,
    upLeftSquare2,
    downRightSquare2,
    downLeftSquare2,
    doNotRotate = true;

var checkMoves = function() {
  redCanCapture = [];
  blueCanCapture = [];
  
  canMoveUpRight = [];
  canMoveUpLeft = [];
  canMoveDownRight = [];
  canMoveDownLeft = [];
    
  canMoveUpRight2 = [];
  canMoveUpLeft2 = [];
  canMoveDownRight2 = [];
  canMoveDownLeft2 = [];

  //Loop through each checker piece and determine available moves//
  document.querySelectorAll(".dot-2, .king-2, .dot-1, .king-1").forEach(checker => {
    upRightSquare = parseInt(checker.parentNode.innerText) - 7;
    upLeftSquare = parseInt(checker.parentNode.innerText) - 9;
    downRightSquare = parseInt(checker.parentNode.innerText) + 9;
    downLeftSquare = parseInt(checker.parentNode.innerText) + 7;
    upRightSquare2 = parseInt(checker.parentNode.innerText) - 14;
    upLeftSquare2 = parseInt(checker.parentNode.innerText) - 18;
    downRightSquare2 = parseInt(checker.parentNode.innerText) + 18;
    downLeftSquare2 = parseInt(checker.parentNode.innerText) + 14;
    for (let i = 0; i < COLUMN.length; i++) {
      for (let j = 0; j < ROW.length; j++) {
        if (COLUMN[i][1].includes(parseInt(checker.parentNode.innerText)) && ROW[j][1].includes(parseInt(checker.parentNode.innerText))) {
          if (playerTurn == 2 && (checker.className == "dot-2" || checker.className == "king-2")) {
            if (upRightSquare > 2) {
              if (playerOnePieces.includes(upRightSquare) && upRightSquare2 > 2 && allPieces.indexOf(upRightSquare2) < 0 && ROW[j - 2][1].includes(upRightSquare2) && COLUMN[i + 2][1].includes(upRightSquare2)) {
                blueCanCapture.push(checker.parentNode.innerText);
                canMoveUpRight2.push(checker.parentNode.innerText);
              } else if (allPieces.indexOf(upRightSquare) < 0) {
                canMoveUpRight.push(checker.parentNode.innerText);
              } 
            }
            if (upLeftSquare > 0) {
              if (playerOnePieces.includes(upLeftSquare) && upLeftSquare2 > 0 && allPieces.indexOf(upLeftSquare2) < 0 && ROW[j - 2][1].includes(upLeftSquare2) && COLUMN[i - 2][1].includes(upLeftSquare2)) {
                blueCanCapture.push(checker.parentNode.innerText);
                canMoveUpLeft2.push(checker.parentNode.innerText);
              } else if (allPieces.indexOf(upLeftSquare) < 0) {
                canMoveUpLeft.push(checker.parentNode.innerText);
              }
            }
          } else if (playerTurn == 1 && (checker.className == "dot-1" || checker.className == "king-1")) {
            if (downRightSquare < 65) {
              if (playerTwoPieces.includes(downRightSquare) && downRightSquare2 < 65 && allPieces.indexOf(downRightSquare2) < 0 && ROW[j + 2][1].includes(downRightSquare2) && COLUMN[i + 2][1].includes(downRightSquare2)) {
                redCanCapture.push(checker.parentNode.innerText);
                canMoveDownRight2.push(checker.parentNode.innerText);
              } else if (allPieces.indexOf(downRightSquare) < 0) {
                canMoveDownRight.push(checker.parentNode.innerText);
              }
            }
            if (downLeftSquare < 63) {
              if (playerTwoPieces.includes(downLeftSquare) && downLeftSquare2 < 63 && allPieces.indexOf(downLeftSquare2) < 0 && ROW[j + 2][1].includes(downLeftSquare2) && COLUMN[i - 2][1].includes(downLeftSquare2)) {
                redCanCapture.push(checker.parentNode.innerText);
                canMoveDownLeft2.push(checker.parentNode.innerText);
              } else if (allPieces.indexOf(downLeftSquare) < 0) {
                canMoveDownLeft.push(checker.parentNode.innerText);
              }
            }
          }  
          if (playerTurn == 2 && checker.className == "king-2") {
            if (downRightSquare < 65) {
              if (playerOnePieces.includes(downRightSquare) && downRightSquare2 < 65 && allPieces.indexOf(downRightSquare2) < 0 && ROW[j + 2][1].includes(downRightSquare2) && COLUMN[i + 2][1].includes(downRightSquare2)) {
                blueCanCapture.push(checker.parentNode.innerText);
                canMoveDownRight2.push(checker.parentNode.innerText);
              } else if (allPieces.indexOf(downRightSquare) < 0) {
                canMoveDownRight.push(checker.parentNode.innerText);
              }
            }
            if (downLeftSquare < 63) {
              if (playerOnePieces.includes(downLeftSquare) && downLeftSquare2 < 63 && allPieces.indexOf(downLeftSquare2) < 0 && ROW[j + 2][1].includes(downLeftSquare2) && COLUMN[i - 2][1].includes(downLeftSquare2)) {
                blueCanCapture.push(checker.parentNode.innerText);
                canMoveDownLeft2.push(checker.parentNode.innerText);
              } else if (allPieces.indexOf(downLeftSquare) < 0) {
                canMoveDownLeft.push(checker.parentNode.innerText);
              }  
            }
          } else if (playerTurn == 1 && checker.className == "king-1") {
            if (upRightSquare > 2) {
              if (playerTwoPieces.includes(upRightSquare) && upRightSquare2 > 2 && allPieces.indexOf(upRightSquare2) < 0 && ROW[j - 2][1].includes(upRightSquare2) && COLUMN[i + 2][1].includes(upRightSquare2)) {
                redCanCapture.push(checker.parentNode.innerText);
                canMoveUpRight2.push(checker.parentNode.innerText);
              } else if (allPieces.indexOf(upRightSquare) < 0) {
                canMoveUpRight.push(checker.parentNode.innerText);
              }   
            }
            if (upLeftSquare > 0) {
              if (playerTwoPieces.includes(upLeftSquare) && upLeftSquare2 > 0 && allPieces.indexOf(upLeftSquare2) < 0 && ROW[j - 2][1].includes(upLeftSquare2) && COLUMN[i - 2][1].includes(upLeftSquare2)) {
                redCanCapture.push(checker.parentNode.innerText);
                canMoveUpLeft2.push(checker.parentNode.innerText);
              } else if (allPieces.indexOf(upLeftSquare) < 0) {
                canMoveUpLeft.push(checker.parentNode.innerText);
              }  
            }
          }
        }
      }
    }
  }); 
  //If a capture has been made and the capturing piece has no further moves available, end turn//
  if (numOfCaptures > 0) {
    if (playerTurn == 2) {
      if (blueCanCapture.length == 0 || blueCanCapture.indexOf(piece.parentNode.innerText) < 0) {
        numOfCaptures = 0;
        playerTurn = 1;
      }
    } else if (playerTurn == 1) {
      if (redCanCapture.length == 0 || redCanCapture.indexOf(piece.parentNode.innerText) < 0) {
        numOfCaptures = 0;
        playerTurn = 2;  
      }
    }
  }
  //Rotate board and display new username when turn changes//
  if (playerTurn == 1 && doNotRotate == false && gameHasStarted == true) {
    document.querySelector('#display-names').innerHTML = playerOneName + "'s" + " turn!";
    document.querySelector(".grid").classList.add("rotate-blue");
    document.querySelector(".grid").classList.remove("rotate-red");
  } else if (playerTurn == 2 && gameHasStarted == true) {
    document.querySelector('#display-names').innerHTML = playerTwoName + "'s" + " turn!";
    document.querySelector(".grid").classList.add("rotate-red");
    document.querySelector(".grid").classList.remove("rotate-blue");
    doNotRotate = false;
  }
  //End game if one player has no pieces left//
  if (document.querySelector("#prison-1").childNodes.length == 12) {
    document.querySelector('#display-names').innerHTML = playerOneName + " wins!";
    document.querySelector("#forfeit").style.visibility = "hidden";
    gameHasStarted = false;
  } else if (document.querySelector("#prison-2").childNodes.length == 12) {
    document.querySelector('#display-names').innerHTML = playerTwoName + " wins!";
    document.querySelector("#forfeit").style.visibility = "hidden";
    gameHasStarted = false;
  }
}

var saveCapturingPiece;

//If a square is clicked and the move is legal, then move the clicked piece//
square.forEach(item => {
  item.addEventListener("click", function() {
    updateBoard();
    checkMoves();
    if (playerTurn == 1 && gameHasStarted == true) {
      upRightSquare = parseInt(piece.parentNode.innerText) - 7;
      upLeftSquare = parseInt(piece.parentNode.innerText) - 9;
      downRightSquare = parseInt(piece.parentNode.innerText) + 9;
      downLeftSquare = parseInt(piece.parentNode.innerText) + 7;
      if (redCanCapture.length == 0 && numOfCaptures == 0) {
        if (parseInt(item.innerText) == upRightSquare && canMoveUpRight.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          playerTurn = 2;
        } else if (parseInt(item.innerText) == upLeftSquare && canMoveUpLeft.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          playerTurn = 2;
        } else if (parseInt(item.innerText) == downRightSquare && canMoveDownRight.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          playerTurn = 2;
        } else if (parseInt(item.innerText) == downLeftSquare && canMoveDownLeft.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          playerTurn = 2;
        }
      } else if (redCanCapture.length > 0 && redCanCapture.includes(piece.parentNode.innerText)) {
        saveCapturingPiece = piece;
        upRightSquare2 = parseInt(piece.parentNode.innerText) - 14;
        upLeftSquare2 = parseInt(piece.parentNode.innerText) - 18;
        downRightSquare2 = parseInt(piece.parentNode.innerText) + 18;
        downLeftSquare2 = parseInt(piece.parentNode.innerText) + 14;
        if (parseInt(item.innerText) == upRightSquare2 && canMoveUpRight2.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          numOfCaptures++;
          document.querySelectorAll(".dot-2, .king-2").forEach(item => {
            if (parseInt(item.parentNode.innerText) == upRightSquare) {
              prisonOne.appendChild(item);
            }
          });
        } else if (parseInt(item.innerText) == upLeftSquare2 && canMoveUpLeft2.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          numOfCaptures++;
          document.querySelectorAll(".dot-2, .king-2").forEach(item => {
            if (parseInt(item.parentNode.innerText) == upLeftSquare) {
              prisonOne.appendChild(item);
            }
          });
        } else if (parseInt(item.innerText) == downRightSquare2 && canMoveDownRight2.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          numOfCaptures++;
          document.querySelectorAll(".dot-2, .king-2").forEach(item => {
            if (parseInt(item.parentNode.innerText) == downRightSquare) {
              prisonOne.appendChild(item);
            }
          });
        } else if (parseInt(item.innerText) == downLeftSquare2 && canMoveDownLeft2.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          numOfCaptures++;
          document.querySelectorAll(".dot-2, .king-2").forEach(item => {
            if (parseInt(item.parentNode.innerText) == downLeftSquare) {
              prisonOne.appendChild(item);
            }
          });
        }
      }
    } else if (playerTurn == 2 && gameHasStarted == true) {
      upRightSquare = parseInt(piece.parentNode.innerText) - 7;
      upLeftSquare = parseInt(piece.parentNode.innerText) - 9;
      downRightSquare = parseInt(piece.parentNode.innerText) + 9;
      downLeftSquare = parseInt(piece.parentNode.innerText) + 7;
      if (blueCanCapture.length == 0 && numOfCaptures == 0) {
        if (parseInt(item.innerText) == upRightSquare && canMoveUpRight.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          playerTurn = 1;
        } else if (parseInt(item.innerText) == upLeftSquare && canMoveUpLeft.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          playerTurn = 1;
        } else if (parseInt(item.innerText) == downRightSquare && canMoveDownRight.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          playerTurn = 1;
        } else if (parseInt(item.innerText) == downLeftSquare && canMoveDownLeft.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          playerTurn = 1;
        }
      } else if (blueCanCapture.length > 0 && blueCanCapture.includes(piece.parentNode.innerText)) {
        saveCapturingPiece = piece;
        upRightSquare2 = parseInt(piece.parentNode.innerText) - 14;
        upLeftSquare2 = parseInt(piece.parentNode.innerText) - 18;
        downRightSquare2 = parseInt(piece.parentNode.innerText) + 18;
        downLeftSquare2 = parseInt(piece.parentNode.innerText) + 14;
        if (parseInt(item.innerText) == upRightSquare2 && canMoveUpRight2.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          numOfCaptures++;
          document.querySelectorAll(".dot-1, .king-1").forEach(item => {
            if (parseInt(item.parentNode.innerText) == upRightSquare) {
              prisonTwo.appendChild(item);
            }
          });
        } else if (parseInt(item.innerText) == upLeftSquare2 && canMoveUpLeft2.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          numOfCaptures++;
          document.querySelectorAll(".dot-1, .king-1").forEach(item => {
            if (parseInt(item.parentNode.innerText) == upLeftSquare) {
              prisonTwo.appendChild(item);
            }
          });
        } else if (parseInt(item.innerText) == downRightSquare2 && canMoveDownRight2.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          numOfCaptures++;
          document.querySelectorAll(".dot-1, .king-1").forEach(item => {
            if (parseInt(item.parentNode.innerText) == downRightSquare) {
              prisonTwo.appendChild(item);
            }
          });
        } else if (parseInt(item.innerText) == downLeftSquare2 && canMoveDownLeft2.includes(piece.parentNode.innerText)) {
          item.appendChild(piece);
          numOfCaptures++;
          document.querySelectorAll(".dot-1, .king-1").forEach(item => {
            if (parseInt(item.parentNode.innerText) == downLeftSquare) {
              prisonTwo.appendChild(item);
            }
          });
        }
      }
    }
    updateBoard();
    checkMoves();
  });
});

//End game and display winner's name when the "forfeit" button is pressed//
document.querySelector("#forfeit").addEventListener("click", function() {
  if (playerTurn == 1) {
    document.querySelector('#display-names').innerHTML = playerTwoName + " wins!";
  } else {
    document.querySelector('#display-names').innerHTML = playerOneName + " wins!";
  }
  document.querySelector("#forfeit").style.visibility = "hidden";
  gameHasStarted = false;
});
