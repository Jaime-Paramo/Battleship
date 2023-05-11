document.addEventListener('DOMContentLoaded', () => {
      const playerBoard = document.getElementById('player-board');
      const computerBoard = document.getElementById('computer-board');
      const startButton = document.getElementById('start-button');
      const rotateButton = document.getElementById('flip-button');
      const turnDisplay = document.getElementById('turn-display');
      const infoDisplay = document.getElementById('info');
      const userSquares = [];
      const computerSquares = [];
      let isHorizontal = true;
      let isGameOver = false;
      let currentPlayer = 'user';
      const width = 10;
      let ready = false;
      let enemyReady = false;
      let allShipsPlaced = false;
      let shotFired = -1;
    
      createBoard(playerBoard);
      createBoard(computerBoard);
    
      // Generate game boards
      function createBoard(board) {
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < width; y++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-x', x);
            cell.setAttribute('data-y', y);
            board.appendChild(cell);
          }
        }
      }
    
      // Rotate the ships
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
    
      // Place ships on the board
      const options = document.querySelectorAll('.option');
    
      options.forEach((option) => {
        option.addEventListener('dragstart', dragStart);
        option.addEventListener('dragover', dragOver);
        option.addEventListener('dragenter', dragEnter);
        option.addEventListener('dragleave', dragLeave);
        option.addEventListener('drop', dragDrop);
        option.addEventListener('dragend', dragEnd);
      });
    
      let selectedShipNameWithIndex = '';
      let draggedShip = null;
      let draggedShipLength = 0;
    
      function dragStart() {
        selectedShipNameWithIndex = this.dataset.ship;
        draggedShip = this;
        draggedShipLength = this.childNodes.length;
      }
    
      function dragOver(e) {
        e.preventDefault();
      }
    
      function dragEnter(e) {
        e.preventDefault();
      }
    
      function dragLeave() {
        // console.log('drag leave');
      }
    
      function dragDrop() {
            const shipNameWithLastId = draggedShip.lastChild.id;
            const shipClass = shipNameWithLastId.slice(0, -2);
            const lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
            let shipLastId = lastShipIndex + parseInt(this.dataset.x);
          
            if (isHorizontal) {
              for (let i = 0; i < draggedShipLength; i++) {
                const directionClass = getDirectionClass(i, draggedShipLength);
                userSquares[parseInt(this.dataset.x) + i + parseInt(this.dataset.y) * width].classList.add(
                  'taken',
                  'horizontal',
                  directionClass,
                  shipClass
                );
                userSquares[parseInt(this.dataset.x) + i + parseInt(this.dataset.y) * width].setAttribute(
                  'data-ship',
                  shipNameWithLastId
                );
              }
            } else {
              for (let i = 0; i < draggedShipLength; i++) {
                const directionClass = getDirectionClass(i, draggedShipLength);
                userSquares[
                  parseInt(this.dataset.x) + parseInt(this.dataset.y) * width + i * width
                ].classList.add('taken', 'vertical', directionClass, shipClass);
                userSquares[
                  parseInt(this.dataset.x) + parseInt(this.dataset.y) * width + i * width
                ].setAttribute('data-ship', shipNameWithLastId);
              }
            }
          
            // Check if all ships are placed
            const placedShips = document.querySelectorAll('.option.taken');
            if (placedShips.length === totalNumberOfShips) {
              allShipsPlaced = true;
              // Perform additional actions when all ships are placed
              startButton.disabled = false; // Enable the start button when all ships are placed
              infoDisplay.innerHTML = 'All ships are placed. Click "Start" to begin the game.';
            }
          }

      function dragEnd() {
            // Reset variables and styles
            selectedShipNameWithIndex = '';
            draggedShip = null;
            draggedShipLength = 0;
          
            // Add a delay before allowing the computer to start its turn
            setTimeout(() => {
              if (!isGameOver) {
                if (currentPlayer === 'user') {
                  // Call a function to start the computer's turn
                  startComputerTurn();
                } else {
                  // Call a function to start the user's turn
                  startUserTurn();
                }
              }
            }, 1000);
          }
          //fix the ternery
      function getDirectionClass(i, draggedShipLength) {
            return i === 0 ? 'start': i === draggedShipLength;
      }

        //Start the game 
      startButton.addEventListener('click', startGame);
      if (allShipsPlaced) {
            startButton.disabled = true; // Disable the start button once the game starts
            rotateButton.disabled = true; // Disable the rotate button once the game starts
            turnDisplay.innerHTML = 'Your Turn'; // Display the initial turn as the user's turn
        
            // Add event listeners for firing shots
            computerSquares.forEach((square) => {
              square.addEventListener('click', () => {
                if (currentPlayer === 'user' && !isGameOver && square.classList.contains('cell')) {
                  processUserShot(square);
                }
              });
            });
        
            generateComputerShips();
        
            startComputerTurn();
          } else {
            infoDisplay.innerHTML = 'Please place all your ships on the board.';
          }
        });

        // Event listener for firing shots
      computerSquares.forEach((square) => {
            square.addEventListener('click', () => {
            if (currentPlayer === 'user' && !isGameOver && square.classList.contains('cell')) {
            processUserShot(square);
            }
            });
      });
      
      // Function to handle user's shot
      function processUserShot(square) {
            if (square.classList.contains('hit') || square.classList.contains('miss')) {
            return; // Ignore if the square has already been shot
            }
      
            const cell = square.dataset.x + square.dataset.y;
            const isHit = // Add your logic to determine if it's a hit or a miss
      
            // Add classes to the square based on the result of the shot
            square.classList.add(isHit ? 'hit' : 'miss');
      
            // Check if the game is over (e.g., all ships are sunk)
            const isUserWin = computerSquares.every((squares) => 
            square.classList.contains('taken') && square.classList.contains('hit')
            );
            const isComputerWin = userSquares.every((square) =>
            square.classList.contains('taken') && square.classList.contains('hit')
            );
      
            if (isUserWin || isComputerWin) {
            endGame(isUserWin ? 'user' : 'computer');
            } else {
            // Switch turns between user and computer
            currentPlayer = 'computer';
      
            // Update turn display
            turnDisplay.innerHTML = "Computer's Turn";
      
            // Call function to process the computer's shot after a delay
            setTimeout(processComputerShot, 1000);
            }
      }
      
      // Function to handle computer's shot
      function processComputerShot() {
            // Add your logic to determine the square to fire at
            const randomIndex = Math.floor(Math.random() * computerSquares.length);
            const square = computerSquares[randomIndex];
            
            if (square.classList.contains('hit') || square.classList.contains('miss')) {
            processComputerShot(); // Retry if the square has already been shot
            return;
            }
      
            const cell = square.dataset.x + square.dataset.y;
            const isHit = // Add your logic to determine if it's a hit or a miss
      
            // Add classes to the square based on the result of the shot
            square.classList.add(isHit ? 'hit' : 'miss');
      
            // Check if the game is over (e.g., all ships are sunk)
            const isUserWin = // Add your logic to determine if the user has won
            const isComputerWin = // Add your logic to determine if the computer has won
      
            if (isUserWin || isComputerWin) {
            endGame(isUserWin ? 'user' : 'computer');
            } else {
            // Switch turns between user and computer
            currentPlayer = 'user';
      
            // Update turn display
            turnDisplay.innerHTML = 'Your Turn';
            }
      }
      
      // Function to end the game and declare the winner
      function endGame(winner) {
            isGameOver = true;
            turnDisplay.innerHTML = '';
            infoDisplay.innerHTML = `Game Over! The ${winner === 'user' ? 'User' : 'Computer'} wins!`;
            // Additional actions to perform when the game ends
      }
      
      // Restart button event listener
      restartButton.addEventListener('click', ()) => {
            // Reset game state and board
            isGameOver = false;
            currentPlayer = 'user';
            allShipsPlaced = false;
            userSquares.forEach((square) => square.classList.remove('taken', 'horizontal', 'vertical', 'start', 'hit', 'miss'));
            computerSquares.forEach((square) => square.classList.remove('taken', 'horizontal'));
      }