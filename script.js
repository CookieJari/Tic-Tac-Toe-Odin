const gameContainer = document.querySelector(".game-container");
const cellTemplate = gameContainer.querySelector(".cell");

const gameBoard = (() => {
  console.log("wow");
  const board = [];
  for (let i = 0; i < 9; i++) {
    if (Math.round(Math.random()) === 0) board.push("X");
    else board.push("O");
  }

  return { board };
})();

const displayController = (() => {
  const board = gameBoard.board;
  const display = () => {
    // clears board
    gameContainer.innerHTML = "";
    board.forEach((element) => {
      const cell = cellTemplate.cloneNode(true);
      console.log(element);
      const symbol = (cell.querySelector(".symbol").innerText = element);
      gameContainer.appendChild(cell);
    });
  };

  return { display };
})();

const Player = (sign) => {
  return { sign };
};

playerX = Player("X");
console.log(playerX.sign);
displayController.display();
//console.log(gameBoard.board);

cellTemplate.remove();
