document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.board');
  const cells = document.querySelectorAll('.cell');
  const restartButton = document.getElementById('restart-button');
  const winnerPopup = document.getElementById('winner-popup');
  const popupMessage = document.getElementById('popup-message');
  const startNewGameButton = document.getElementById('start-new-game-button');

  let currentPlayer = 'X';
  let gameEnded = false;

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  restartButton.addEventListener('click', restartGame);

  function handleCellClick() {
    if (!gameEnded && this.innerHTML === '') {
      this.innerHTML = currentPlayer;
      this.style.backgroundColor = currentPlayer === 'X' ? '#fcd462' : '#77dd77';
      this.style.color = currentPlayer === 'X' ? '#1f2735' : '#1f2735';
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

      setTimeout(() => {
        checkWin();
      }, 1000);
    }
  }

  function checkWin() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    winningCombinations.forEach(combination => {
      const [a, b, c] = combination;
      const cellA = cells[a].innerHTML;
      const cellB = cells[b].innerHTML;
      const cellC = cells[c].innerHTML;

      if (cellA === cellB && cellB === cellC && cellA !== '') {
        cells[a].classList.add('win');
        cells[b].classList.add('win');
        cells[c].classList.add('win');
        gameEnded = true;

        // Display the winner's popup message
        popupMessage.textContent = `Player ${cellA} wins!`;
        winnerPopup.style.display = 'flex';
      }
    });
  }

  startNewGameButton.addEventListener('click', () => {
    // Hide the winner's popup
    winnerPopup.style.display = 'none';

    // Restart the game
    restartGame();
  });

  function restartGame() {
    cells.forEach(cell => {
      cell.innerHTML = '';
      cell.style.backgroundColor = '#303b4a';
      cell.style.color = '#fff';
      cell.classList.remove('win');
    });

    currentPlayer = 'X';
    gameEnded = false;
  }
});
