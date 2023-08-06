const gameContainer = document.querySelector(".game-container");
const cellTemplate = gameContainer.querySelector(".cell");
const resetButton = document.querySelector(".reset");

const Player = (sign) => {
  return { sign };
};

const Cell = () => {
  let value = "";
  const addToken = (player) => {
    value = player;
  };
  const getValue = () => {
    return value;
  };
  return { addToken, getValue };
};

const gameBoard = (() => {
  console.log("wow");
  let board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i][j] = Cell();
    }
  }

  return { board };
})();

const displayController = (() => {
  const display = (board) => {
    // clears board
    gameContainer.innerHTML = "";
    //for ever row
    for (let i = 0; i < board.length; i++) {
      //Get the cell of each row
      for (let j = 0; j < board[i].length; j++) {
        const element = board[i][j];
        const cell = cellTemplate.cloneNode(true);
        cell.addEventListener("click", () => {
          gameManager.playRound(i, j, board);
        });
        const symbol = cell.querySelector(".symbol");
        const sign = symbol.querySelector(".sign-holder");
        // check if we have a symbol to display
        if (element.getValue()) {
          sign.classList.add(element.getValue());
        }
        gameContainer.appendChild(cell);
      }
    }
  };

  return { display };
})();

const gameManager = (() => {
  playerX = Player("X");
  playerO = Player("O");
  const board = gameBoard.board;
  displayController.display(board);

  // TEMPORARY!
  // N is the board size
  // The board is n*n this means the board is 3x3
  let n = 3;

  let moveCount = 0;

  const players = [playerX, playerO];

  let activePlayer = players[0];

  // this will change the player by +1 to the index
  // if the +1 overflows the array we loop back
  // I did this so if we ever decided to add a third player
  // we can keep using this code.
  const switchPlayer = () => {
    if (players.length - 1 < players.indexOf(activePlayer) + 1) {
      activePlayer = players[0];
    } else {
      activePlayer = players[players.indexOf(activePlayer) + 1];
    }
  };

  //---------------- FINISH THISS ------------------------
  const playRound = (row, column) => {
    if (board[row][column].getValue()) {
      console.log("Invalid");
    } else {
      board[row][column].addToken(activePlayer.sign);

      moveCount++;

      //check if winner

      //check ROW
      for (let i = 0; i < n; i++) {
        if (board[row][i].getValue() !== activePlayer.sign) {
          console.log("notwin");
          break;
        }
        if (i === n - 1) {
          console.log("Win");
          console.log("The Winner is: " + activePlayer.sign);
        }
      }

      //check COLUMN
      for (let i = 0; i < n; i++) {
        if (board[i][column].getValue() !== activePlayer.sign) {
          console.log("notwin");
          break;
        }
        if (i === n - 1) {
          console.log("Win");
          console.log("The Winner is: " + activePlayer.sign);
        }
      }

      //check DIAGONAL

      for (let i = 0; i < n; i++) {
        if (board[i][n - 1 - i].getValue() !== activePlayer.sign) {
          console.log("notwin");
          break;
        }
        if (i === n - 1) {
          console.log("Win");
          console.log("The Winner is: " + activePlayer.sign);
        }
      }

      //check ANTI-DIAGONAL

      for (let i = 0; i < n; i++) {
        if (board[i][i].getValue() !== activePlayer.sign) {
          console.log("notwin");
          break;
        }
        if (i === n - 1) {
          console.log("Win");
          console.log("The Winner is: " + activePlayer.sign);
        }
      }

      //check DRAW

      if (moveCount === n * n) {
        console.log("draw");
      }
      console.log(board);
      switchPlayer();
    }

    displayController.display(board);
  };

  const resetBoard = () => {
    console.log("resetting");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j].addToken("");
      }
    }
    displayController.display(board);
  };

  return { playRound, resetBoard };
})();

function move(row, column, board) {
  gameManager.playRound(row, column, board);
}

// ----------------- GLOBAL ----------------

//console.log(gameBoard.board);

resetButton.onclick = () => {
  gameManager.resetBoard();
};
//gameManager.playRound();

cellTemplate.remove();
