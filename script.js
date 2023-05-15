const gamesBoardContainer = document.querySelector("#gamesboard-container");
const optionContainer = document.querySelector(".option-container");
const flipButton = document.querySelector("#flip-button");

//Game state. Use this object to keep track of where the ships are on each board
let state = {
      playerBoard: {
        ships: {
          destroyer: {
            shipType: 'destroyer',
            length: 2,
            coordinates: []  // example: [0, 1]
          },
          submarine: {
            shipType: 'submarine',
            length: 3,
            coordinates: []  // example: [2, 3, 4]
          },
          cruiser: {
            shipType: 'cruiser',
            length: 3,
            coordinates: []  // example: [5, 6, 7]
          },
          battleship: {
            shipType: 'battleship',
            length: 4,
            coordinates: []  // example: [8, 9, 10, 11]
          },
          carrier: {
            shipType: 'carrier',
            length: 5,
            coordinates: []  // example: [12, 13, 14, 15, 16]
          }
        }
      },
      //grabbing destroyer coordinates: state.computerBoard.ships.destroyer.coordinates
      computerBoard: { 
        ships: {
          destroyer: {
            shipType: 'destroyer',
            length: 2,
            coordinates: []  // example: [17, 18]
          },
          submarine: {
            shipType: 'submarine',
            length: 3,
            coordinates: []  // example: [19, 20, 21]
          },
          cruiser: {
            shipType: 'cruiser',
            length: 3,
            coordinates: []  // example: [22, 23, 24]
          },
          battleship: {
            shipType: 'battleship',
            length: 4,
            coordinates: []  // example: [25, 26, 27, 28]
          },
          carrier: {
            shipType: 'carrier',
            length: 5,
            coordinates: []  // example: [29, 30, 31, 32, 33]
          }
        }
      }
    }
    

// Flip the ships
let angle = 0;
function flip() {
      const optionShips = Array.from(optionContainer.children);
      angle = angle === 0 ? 90 : 0;
      optionShips.forEach(optionShip => {
          optionShip.style.transform = `rotate(${angle}deg)`;
          if (angle === 90) {
              optionShip.classList.add("rotate90");
          } else {
              optionShip.classList.remove("rotate90");
          }
      });
  }
  

  let isHorizontal = true;

  flipButton.addEventListener("click", () => {
      isHorizontal = !isHorizontal;
      flip();
  });
  

flipButton.addEventListener("click", flip);

// Creating Boards
const width = 10;

function createBoard(color, user) {
      const gameBoardContainer = document.createElement('div')
      gameBoardContainer.classList.add('game-board')
      gameBoardContainer.style.backgroundColor = color
      gameBoardContainer.id = user

      for (let i = 0; i < width * width; i++) {
          const block = document.createElement('div')
          block.classList.add('block')
          block.id = i
          gameBoardContainer.append(block)
      }

      gamesBoardContainer.append(gameBoardContainer)
}
createBoard('yellow', 'player')
createBoard('pink', 'computer')

// Creating Ships
class ship {
      constructor(name, length) {
            this.name = name
            this.length = length
      }
}

const destroyer = new ship('destroyer', 2)
const submarine = new ship('submarine', 3)
const cruiser = new ship('cruiser', 3)
const battleship = new ship('battleship', 4)
const carrier = new ship('carrier', 5)

const ships = [destroyer, submarine, cruiser, battleship, carrier]

function addshipPlace(ship) {
      const allBoardBlocks = Array.from(document.querySelectorAll('#computer div'));
      let randomBoolean = Math.random() < 0.5; // horizontal or vertical
      let randomStartIndex;
  
      do {
          randomStartIndex = Math.floor(Math.random() * width * width); // random starting position
      } while (!isValidPosition(ship, randomStartIndex, randomBoolean, allBoardBlocks));
  
      for(let i = 0; i < ship.length; i++) {
          if(randomBoolean) { // if horizontal
              allBoardBlocks[randomStartIndex + i].classList.add(ship.name);
          } else { // if vertical
              allBoardBlocks[randomStartIndex + i * width].classList.add(ship.name);
          }
      }
  }
  
  function isValidPosition(ship, startIndex, isHorizontal, boardBlocks) {
      for(let i = 0; i < ship.length; i++) {
          if (isHorizontal) {
              if (startIndex % width < width - ship.length + 1 && boardBlocks[startIndex + i].className === "block") {
                  continue;
              } else {
                  return false;
              }
          } else { // vertical
              if (startIndex < width * (width - ship.length + 1) && boardBlocks[startIndex + i * width].className === "block") {
                  continue;
              } else {
                  return false;
              }
          }
      }
      return true;
  }
  
  ships.forEach(ship => addshipPlace(ship));
  


// Drag and Drop
  const playerBoard = document.querySelector("#player");

// Add event listeners to the ships
const draggableShips = document.querySelectorAll("[draggable='true']");
draggableShips.forEach(ship => {
    ship.addEventListener("dragstart", dragStart);
});

// Add event listeners to the player's board
playerBoard.addEventListener("dragover", dragOver);
playerBoard.addEventListener("drop", drop);

// Define drag event handlers
function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.ship);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
      e.preventDefault();
      const shipName = e.dataTransfer.getData("text/plain");
      const ship = ships.find(s => s.name === shipName);
  
      if (ship) {
          const blockIndex = parseInt(e.target.id, 10);
          if (isValidPosition(ship, blockIndex, isHorizontal, Array.from(playerBoard.children))) {
              for (let i = 0; i < ship.length; i++) {
                  const newBlock = document.createElement("div");
                  newBlock.classList.add("block", ship.name);
                  if (isHorizontal) {
                      newBlock.style.width = "20px";
                      newBlock.style.height = "10px";
                      playerBoard.children[blockIndex + i].replaceWith(newBlock);
                  } else {
                      newBlock.style.width = "10px";
                      newBlock.style.height = "20px";
                      playerBoard.children[blockIndex + i * width].replaceWith(newBlock);
                  }
              }
  
              // Remove the ship from the options container
              const shipToRemove = document.querySelector(`.${shipName}-preview`);
              if (shipToRemove) {
                  shipToRemove.remove();
              }
          }
      }
  }
  
  
  
  