const options = document.querySelectorAll('.option');

options.forEach(option => {
  option.addEventListener('dragstart', dragStart);
});

function dragStart(event) {
  event.dataTransfer.setData('ship', event.target.dataset.ship);
  event.target.id = 'dragging';
}
const boardContainer = document.querySelector('.player-board');

boardContainer.addEventListener('dragover', dragOver);
boardContainer.addEventListener('drop', drop);

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const ship = document.getElementById('dragging');
  const shipType = event.dataTransfer.getData('ship');
  event.target.appendChild(ship);
  ship.removeAttribute('id');
}

//<audio id="explosion-sound" src="explosion.mp3"></audio>
//<audio id="hit-sound" src="hit.mp3"></audio>
//<audio id="miss-sound" src="miss.mp3"></audio>
//still need to find all this audio 
const cells = document.querySelectorAll('.board-cell');

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(event) {
  const audioElement = event.target.classList.contains('hit') ? document.getElementById('hit-sound') : document.getElementById('miss-sound');
  audioElement.currentTime = 0;
  audioElement.play();
  // handle player move
}
if (result === 'hit') {
      const audioElement = document.getElementById('explosion-sound');
      audioElement.currentTime = 0;
      audioElement.play();
    } else if (result === 'sink') {
      // play sinking sound effect
    }

    // all of the animation 


    if (result === 'hit') {
      const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
      cell.classList.add('explosion');
      setTimeout(() => {
        cell.classList.remove('explosion');
      }, 1000);
    } else if (result === 'sink') {
      // trigger sinking animation
    }


    //this will be for the game login 


    function initializeBoard() {
      // Create an empty 2D array to represent the game board
      const board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    
      // Place the ships randomly on the board
      placeShip(board, 'destroyer');
      placeShip(board, 'submarine');
      placeShip(board, 'cruiser');
      placeShip(board, 'battleship');
      placeShip(board, 'carrier');
    
      return board;
    }

    function handlePlayerMove(board, x, y) {
      const cell = board[x][y];
    
      if (cell === null) {
        // The player missed the target
        board[x][y] = 'miss';
        return 'miss';
      } else if (cell === 'miss' || cell === 'hit') {
        // The player already targeted this cell
        return null;
      } else {
        // The player hit a ship
        board[x][y] = 'hit';
        const ship = getShipByType(cell);
        ship.hits++;
    
        if (ship.hits === ship.size) {
          // The ship has been sunk
          return 'sink';
        } else {
          // The player hit a ship but did not sink it
          return 'hit';
        }
      }
    }

    //handling the comupters moves 

    function handleComputerMove(board) {
      let x, y, cell;
      
      do {
        // Generate random coordinates
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        cell = board[x][y];
      } while (cell === 'miss' || cell === 'hit');
    
      if (cell === null) {
        // The computer missed the target
        board[x][y] = 'miss';
        return 'miss';
      } else {
        // The computer hit a ship
        board[x][y] = 'hit';
        const ship = getShipByType(cell);
        ship.hits++;
    
        if (ship.hits === ship.size) {
          // The ship has been sunk
          return 'sink';
        } else {
          // The computer hit a ship but did not sink it
          return 'hit';
        }
      }
    }

    //check if the game is over section 

    function isGameOver(playerBoard, computerBoard) {
      const playerShips = getShips(playerBoard);
      const computerShips = getShips(computerBoard);
    
      return playerShips.every(ship =>ship.hits === ship.size) || computerShips.every(ship => ship.hits === ship.size);
}