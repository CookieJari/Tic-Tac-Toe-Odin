const gameContainer = document.querySelector(".game-container");
const cellTemplate = gameContainer.querySelector(".cell");
const resetButton = document.querySelector(".reset");

const scoreBoard = document.querySelector(".score-container");
const restartWindow = document.querySelector(".restart-modal");

const sc = scoreBoard.querySelector("span .score-X");
console.log(sc);

const Player = (sign, score) => {
  return { sign, score };
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
  playerX = Player("X", 0);
  playerO = Player("O", 0);

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
          activePlayer.score += 1;
          win(activePlayer.sign, activePlayer.score);
          moveCount = 0;
        }
      }

      //check COLUMN
      for (let i = 0; i < n; i++) {
        if (board[i][column].getValue() !== activePlayer.sign) {
          console.log("notwin");
          break;
        }
        if (i === n - 1) {
          activePlayer.score += 1;
          win(activePlayer.sign, activePlayer.score);
          moveCount = 0;
        }
      }

      //check DIAGONAL

      for (let i = 0; i < n; i++) {
        if (board[i][n - 1 - i].getValue() !== activePlayer.sign) {
          console.log("notwin");
          break;
        }
        if (i === n - 1) {
          activePlayer.score += 1;
          win(activePlayer.sign, activePlayer.score);
          moveCount = 0;
        }
      }

      //check ANTI-DIAGONAL

      for (let i = 0; i < n; i++) {
        if (board[i][i].getValue() !== activePlayer.sign) {
          console.log("notwin");
          break;
        }
        if (i === n - 1) {
          activePlayer.score += 1;
          win(activePlayer.sign, activePlayer.score);
          moveCount = 0;
        }
      }

      //check DRAW

      if (moveCount === n * n) {
        win("n", 0);
        moveCount = 0;
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

const resetController = (() => {
  const noButton = restartWindow.querySelector(".no-button");
  const yesButton = restartWindow.querySelector(".yes-button");
  noButton.onclick = () => {
    restartWindow.style.display = "none";
  };
  yesButton.onclick = () => {
    gameManager.resetBoard();
    restartWindow.style.display = "none";
  };
  restartWindow.style.display = "none";
})();

function win(sign, score) {
  if (sign === "X") {
    scoreBoard.querySelector(".score-X").innerText = score;
  } else if (sign === "O") {
    scoreBoard.querySelector(".score-O").innerText = score;
  }
  restartWindow.style.display = "flex";
}
function move(row, column, board) {
  gameManager.playRound(row, column, board);
}

// ----------------- GLOBAL ----------------

//console.log(gameBoard.board);

resetButton.onclick = () => {
  gameManager.resetBoard();
};

cellTemplate.remove();
