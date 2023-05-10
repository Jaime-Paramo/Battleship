// Drag and drop functionality for ship placement
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

// Game sounds
//<audio id="explosion-sound" src="explosion.mp3"></audio>
//<audio id="hit-sound" src="hit.mp3"></audio>
//<audio id="miss-sound" src="miss.mp3"></audio>

// Cell click functionality
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

// Animations
if (result === 'hit') {
  const audioElement = document.getElementById('explosion-sound');
  audioElement.currentTime = 0;
  audioElement.play();
} else if (result === 'sink') {
  // play sinking sound effect
}

if (result === 'hit') {
  const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
  cell.classList.add('explosion');
  setTimeout(() => {
    cell.classList.remove('explosion');
  }, 1000);
} else if (result === 'sink') {
  // trigger sinking animation
}

if (result === 'hit') {
  const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
  cell.classList.add('explosion');
  setTimeout(() => {
    cell.classList.remove('explosion');
  }, 1000);
} else if (result === 'sink') {
  // trigger sinking animation
}

// Game logic
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
      // The player hit a ship but did not

      const options = document.querySelectorAll('.option');
const cells = document.querySelectorAll('.cell');

options.forEach(option => {
  option.addEventListener('dragstart', dragStart);
  option.addEventListener('dragend', dragEnd);
});

cells.forEach(cell => {
  cell.addEventListener('dragover', dragOver);
  cell.addEventListener('drop', drop);
});

function dragStart(event) {
  event.dataTransfer.setData('ship', event.target.dataset.ship);
}

function dragEnd(event) {
  // clear the data transfer
  event.dataTransfer.clearData();
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const shipType = event.dataTransfer.getData('ship');
  event.target.dataset.ship = shipType;
}

let isHorizontal = true;
document.getElementById('flip-button').addEventListener('click', () => {
      isHorizontal = isHorizontal;
      ships.forEach(ship => ship.classList.toggle('vertical'));
});