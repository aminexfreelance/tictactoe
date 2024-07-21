const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const resetScoreButton = document.getElementById('resetScoreButton');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let playerXScore = 0;
let playerOScore = 0;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const cellIndex = clickedCell.getAttribute('data-cell-index');

  if (gameState[cellIndex] !== '' || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer);

  checkWin();
  checkDraw();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (gameActive) message.innerHTML = `Player ${currentPlayer}'s turn`;
};

const checkWin = () => {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      message.innerHTML = `Player ${gameState[a]} wins!`;
      gameActive = false;
      updateScore(gameState[a]);
      return;
    }
  }
};

const checkDraw = () => {
  if (gameState.every(cell => cell !== '') && gameActive) {
    message.innerHTML = `It\'s a draw!`;
    gameActive = false;
  }
};

const updateScore = (winner) => {
  if (winner === 'X') {
    playerXScore++;
    playerXScoreDisplay.textContent = playerXScore;
  } else if (winner === 'O') {
    playerOScore++;
    playerOScoreDisplay.textContent = playerOScore;
  }
};

const handleRestart = () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  message.innerHTML = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
};

const handleResetScore = () => {
  playerXScore = 0;
  playerOScore = 0;
  playerXScoreDisplay.textContent = playerXScore;
  playerOScoreDisplay.textContent = playerOScore;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestart);
resetScoreButton.addEventListener('click', handleResetScore);
