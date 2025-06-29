const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!isGameActive || gameBoard[index] !== "") return;

  gameBoard[index] = currentPlayer;

  // Optional: Use image instead of text
  // e.target.innerHTML = `<img src="assets/${currentPlayer.toLowerCase()}.png" alt="${currentPlayer}">`;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins!`;
    isGameActive = false;
  } else if (!gameBoard.includes("")) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Current Turn: ${currentPlayer}`;
  }
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Current Turn: ${currentPlayer}`;
  cells.forEach(cell => cell.innerHTML = "");
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
