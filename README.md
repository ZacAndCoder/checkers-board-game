
# Checkers

To view this project, click [here](https://zacandcoder.github.io/checkers-board-game/). 

To reference the rules of the game, click [here](http://www.chesslab.com/rules/CheckerComments2.html).

## Description

Using plain HTML, CSS, and JavaScript, I built the board game "Checkers."

There are two boxes displaying "Player 1" and "Player 2" on the right-hand side of the page. Users can enter their own custom names here. Below these boxes is a button that starts the game. Note that pieces cannot be moved on the board until this button is pressed. When the game starts, the current player's name will be shown to the right of the board. This player can then make any legal moves available. If a player clicks on a square that they cannot legally move to, nothing will happen, and they must choose another square. This version of Checkers forces jumps, so if a player can capture an enemy piece, then they *must* do so. Captured pieces are moved to one of two rectangles sitting above and below the game board. 

Once a move has been made, the board will rotate, and the next player's name will be displayed on the page. If the **Forfeit** button at the bottom of the page is pressed, the game will end. Otherwise, the game will end when one player has no pieces left on the board. 

## GIF

![CheckersGIF](https://user-images.githubusercontent.com/91081344/160467598-6f4e012c-520c-4ae7-9f5b-3563d02eaa4f.gif)

## Example Code

```
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
```

This function essentially saves the layout of the board after every move. It loops through each square on the board, additionally looping through each square's child nodes to check for elements contained within the given square. 

An "if statement" determines whether a square is occupied by a player's piece by matching the child node’s class name to the checker piece’s class name. I could not simply use the **hasChildNodes** function because each square already has one child node in the form of an invisible number; I numbered each square from one to sixty-four. The square numbers are useful because I can push them to arrays to represent each player’s occupied squares on the board.

The class names **dot-1** and **king-1** correspond to Player 1, so if a square contains one of these pieces, the square number is pushed to an array called **playerOnePieces**. The class names **dot-2** and **king-2** correspond to Player 2, so *these* square numbers are pushed to an array called **playerTwoPieces**. Anytime a square number is pushed to one of these arrays, it is also pushed to **allPieces**, which is simply an array of all occupied squares on the board. Each time the function is called, it first clears all three arrays.

After the **forEach** loop, there are two simple "if statements" that check the first and last rows on the board. If either player has a piece on the opposite end of the board, that piece is given a new class name: either **king-1** or **king-2**. This class name allows the piece to make moves in any direction. Because players cannot move after making a king, the turn immediately changes.

## License

This project uses the MIT License.
