const gameBoard = (() => {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  return { board };
})();

const Player = (sign) => {
  return { sign };
};

playerX = Player("X");
console.log(playerX.sign);
console.log(gameBoard.board);
