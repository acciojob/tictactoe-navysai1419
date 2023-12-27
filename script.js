let currentPlayer = 1;
  let player1Name, player2Name;
  let board = ['', '', '', '', '', '', '', '', ''];
  let gameOver = false;

  function startGame() {
    player1Name = document.getElementById('player-1').value;
    player2Name = document.getElementById('player-2').value;

    if (player1Name && player2Name) {
      document.getElementById('players').style.display = 'none';
      createBoard();
    } else {
      alert('Please enter names for both players.');
    }
  }

  function createBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = i + 1;
      cell.addEventListener('click', () => makeMove(i));
      boardElement.appendChild(cell);
    }

    updateMessage();
  }

  function makeMove(index) {
    if (!gameOver && board[index] === '') {
      board[index] = currentPlayer === 1 ? 'X' : 'O';
      document.getElementById(index + 1).innerText = board[index];
      
      if (checkWin()) {
        gameOver = true;
        document.querySelector('.message').innerText = `${getCurrentPlayerName()} congratulations, you won!`;
      } else if (board.every(cell => cell !== '')) {
        gameOver = true;
        document.querySelector('.message').innerText = 'It\'s a tie!';
      } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateMessage();
      }
    }
  }

  function checkWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern =>
      pattern.every(index => board[index] === board[pattern[0]] && board[index] !== '')
    );
  }

  function updateMessage() {
    document.querySelector('.message').innerText = `${getCurrentPlayerName()}, you're up!`;
  }

  function getCurrentPlayerName() {
    return currentPlayer === 1 ? player1Name : player2Name;
  }