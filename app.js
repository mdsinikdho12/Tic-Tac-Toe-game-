const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameIsActive = true;

const WinPatterns = [
  [0, 1, 2], //row
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  return WinPatterns.some(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function highligherWinningCells() {
  WinPatterns.forEach(([a, b, c]) => {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      cells[a].classList.add("winning");
      cells[b].classList.add("winning");
      cells[c].classList.add("winning");
    }
  });
}

function checkDrow() {
  return board.every((cell) => cell !== "");
}

function UpdatePlayerPosition(index) {
  board[index] = currentPlayer;
}

function PlayTurn(cell, index) {
  UpdatePlayerPosition(index);
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);
}

function showStausMassage(massage) {
  statusText.textContent = massage;
}

function switchPlyer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  showStausMassage(`It's ${currentPlayer}'s turn`);
}

function endGame(massage) {
  gameIsActive = false;
  showStausMassage(massage);
}

function checkGameResult() {
  if (checkWin()) {
    highligherWinningCells();
    endGame(`player ${currentPlayer} wins!`);
  } else if (checkDrow()) {
    endGame("It's a Draw");
  } else {
    switchPlyer();
  }
}

function isMoveAllowed(index) {
  return board[index] == "" && gameIsActive;
}

function onCellClick(e) {
  const index = parseInt(e.target.getAttribute("data-index"));
  if (!isMoveAllowed(index)) return;
  PlayTurn(e.target, index);
  checkGameResult();
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameIsActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winning");
  });
  showStausMassage(`It's ${currentPlayer}'s turn`);
}

function setUpEvenliseners() {
  cells.forEach((cell) => cell.addEventListener("click", onCellClick));
  resetButton.addEventListener("click", resetGame);
}

function startGame() {
  setUpEvenliseners();
  showStausMassage(`It's ${currentPlayer}'s turn`);
}

startGame();
