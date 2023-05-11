let playerBoard = Array(10).fill(null).map(() +> Array(10).fill(null));
let computerBoard = Array(10).fill(null).map(() => Array(10).fill(null));

//Get all the cell elements 
let cells = document.querySelectorAll('.cell');

cells.forEach((cell) => {
      cell.addEventListener('click', (event) => {
            //Get the x and y cordinates from the cell's data attributes
            let x = event.target.getAttibute('data-x');
            let y = event.target.getAttibute('data-y');
            //Place a ship at the clicked cordinates
            placeShip(x,y);
      });
});

function placeShip(x,y) {
      if(playerBoard[x][y] === null) {
            //If it is empty, place a ship 
            playerBoard[x][y] = 'ship';

            let cell = document.querySelector(`.cell[data-x='${y}']`)
            cell.classList.add('ship');

            console.log('Ship places at ${x}, ${y}');
      }
}


let shipOrientation = 'horizontal';

//Rotate the ships 
rotateButton.addEventListener('click', () => {
      isHorizontal = !isHorizontal;
      toggleShipOrientation();
});

function toggleShipOrientation() {
      const ships = document.querySelectorAll('.option');
      ships.forEach((ship) => {
            ship.classList.toggle('vertical');
      });
}