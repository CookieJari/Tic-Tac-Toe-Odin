const gameContainer = document.querySelector(".game-container");
const cellTemplate = gameContainer.querySelector(".cell");

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
    console.log("DISPLAY: ");
    console.log(board);
    //for ever row
    for (let i = 0; i < board.length; i++) {
      //Get the cell of each row
      for (let j = 0; j < board[i].length; j++) {
        const element = board[i][j];
        const cell = cellTemplate.cloneNode(true);
        cell.addEventListener("click", () => {
          move(i, j, board);
        });
        const symbol = (cell.querySelector(".symbol").innerText =
          element.getValue());
        gameContainer.appendChild(cell);
      }
    }
  };

  return { display };
})();

const gameManager = (() => {
  playerX = Player("X");
  playerO = Player("O");

  let gameOver = false;

  const players = [playerX, playerO];

  let activePlayer = players[0];

  // this will change the player by +1 to the index
  // if the +1 overflows the array we loop back
  // I did this so if we ever decided to add a third player
  // we can keep using this code.
  const switchPlayer = () => {
    if (players.length - 1 < players.indexOf(activePlayer) + 1) {
      console.log("true");
      activePlayer = players[0];
    } else {
      console.log("normal transfer");
      activePlayer = players[players.indexOf(activePlayer) + 1];
    }
  };

  //---------------- FINISH THISS ------------------------
  const playRound = (row, column, board) => {
    board[row][column].addToken(activePlayer.sign);
    console.log(board[row][column].getValue());

    console.log(board);
    switchPlayer();
    displayController.display(board);

    //check if winner
  };

  return { playRound };
})();

function move(row, column, board) {
  gameManager.playRound(row, column, board);
}

// ----------------- GLOBAL ----------------

//console.log(gameBoard.board);

playerX = Player("X");
playerO = Player("O");
const board = gameBoard.board;
displayController.display(board);

//gameManager.playRound();

cellTemplate.remove();
