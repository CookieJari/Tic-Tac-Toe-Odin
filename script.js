const gameContainer = document.querySelector(".game-container");
const cellTemplate = gameContainer.querySelector(".cell");

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
  const board = gameBoard.board;
  const display = () => {
    // clears board
    gameContainer.innerHTML = "";
    console.log(board);
    //for ever row
    for (let i = 0; i < board.length; i++) {
      //Get the cell of each row
      board[i].forEach((element) => {
        const cell = cellTemplate.cloneNode(true);
        const symbol = (cell.querySelector(".symbol").innerText =
          element.getValue());
        gameContainer.appendChild(cell);
      });
    }
  };

  return { display };
})();

const Player = (sign) => {
  return { sign };
};

const gameManager = (() => {
  playerX = Player("X");
  playerO = Player("O");
  const board = gameBoard.board;

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

  const playGame = () => {
    while (!gameOver) {
      //get input
      playRound(activePlayer);
      gameOver = true;
    }
  };

  //---------------- FINISH THISS ------------------------
  const playRound = (player) => {
    let row = prompt("row");
    console.log("row");
    console.log(row);

    let column = prompt("column");
    console.log("column");
    console.log(column);
  };

  return { playGame };
})();

//console.log(gameBoard.board);

playerX = Player("X");
playerO = Player("O");
console.log(playerX.sign);
displayController.display();

gameManager.playGame();

cellTemplate.remove();
