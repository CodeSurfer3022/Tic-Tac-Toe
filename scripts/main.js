function restartGame() {
    clearBoard(gameBoard.board);
    resultsContainer.style.display = 'none';
}

function endGame(player, result) {
    if(result === 'tie') {
        resultMsg.textContent = "It's a tie";
    }
    else {
        resultMsg.textContent = `${player} won the game`
    }
    game.turn = playerOne;
    playerName.textContent = player;
    game.moves = 0;
    resultsContainer.style.display = 'flex';
}

function checkBothDiagonals(mark) {
    return checkLeftDiagonal(mark) || checkRightDiagonal(mark);
}

function checkLeftDiagonal(mark) {
    let i = 0;
    let leftDiag = gameBoard.board.map(row => row[i ++])
    console.log(leftDiag);
    return leftDiag.every(value => value === mark);
}

function checkRightDiagonal(mark) {
    let i = 2;
    let rightDiag = gameBoard.board.map(row => row[i --])
    console.log(rightDiag);
    return rightDiag.every(value => value === mark);

}

function checkForWin(mark, rowNumber, colNumber) {
    // we only need to check the row, col and diagonal that contains the cell
    console.log(rowNumber, colNumber);

    let row = gameBoard.board[rowNumber];
    if(row.every(value => value === mark)) return true;

    let col = gameBoard.board.map(row => row[colNumber]);
    if(col.every(value => value === mark)) return true;

    // we need to check diagonals if the latest mark was in a diagonal cell
    let rowColDiff = Math.abs(rowNumber - colNumber);
    if(rowColDiff === 2 || rowColDiff === 0) {
        if(rowNumber === colNumber) {
            if(rowNumber + colNumber === 2) {
                if(checkBothDiagonals(mark)) return true;
            }
            else {
                if (checkLeftDiagonal(mark)) return true;
            }
        } else {
            if(checkRightDiagonal(mark)) return true;
        }
    }

    console.log(row, col);
    return false;
}

function placeMark() {
    let p = this.firstChild;
    console.log(p)
    if(p.textContent) return;

    let cell = this.id;
    let row = +cell[0];
    let col = +cell[1];

    // Keep track of number of moves to check for end of game
    game.moves ++;
    let currentMark = game.turn.mark;

    // Update mark in gameBoard and display
    gameBoard.board[row][col] = currentMark;
    p.textContent = currentMark;

    // Check if the current player won after placing the current mark
    let playerWon;
    if(game.moves > 4) {
        playerWon = checkForWin(game.turn.mark, row, col);
        if(playerWon) {
            endGame(game.turn.name, ' won');
            return;
        } else {
            if(game.moves === 9) {
                endGame(game.turn.name, 'tie');
                return;
            }
        }
    }

    // Update the turn for next player
    game.turn = game.turn === playerOne ? playerTwo : playerOne;
    playerName.textContent = game.turn.name;
}

function updatePlayerNames(event) {
    event.preventDefault();
    playerOne.name = document.playerInfo.player1.value;
    playerTwo.name = document.playerInfo.player2.value;
    playerName.textContent = playerOne.name;
    popupContainer.style.display = 'none';
}

function clearBoard(board) {
    for(let i = 0; i < 3; i ++) {
        for(let j = 0; j < 3; j ++) {
            let cell = document.querySelector(`div[id="${i}${j}"]`);
            let p = cell.querySelector('p');
            board[i][j] = '';
            p.textContent = board[i][j];
        }
    }
}

function renderBoard(board) {
    for(let i = 0; i < 3; i ++) {
        for(let j = 0; j < 3; j ++) {
            let div = document.createElement('div');
            div.id = `${i}${j}`;
            let p = document.createElement('p');
            p.textContent = board[i][j];
            div.appendChild(p);
            boardContainer.appendChild(div);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Factories and modules
////////////////////////////////////////////////////////////////////////////////////////////////////
const player = (name, mark) => {
    return {name, mark};
};

const playerOne = player('player 1', 'X');
const playerTwo = player('player 2', 'O');

const game = (() => {
    let moves = 0;
    let turn = playerOne;
    return {moves, turn};
})();

const gameBoard = (() => {
    let board = [['', '', ''],
                 ['', '', ''],
                 ['', '', '']];
    let name = "board";
    return {name, board};
})();

// main starts here
const boardContainer = document.querySelector('#board');
renderBoard(gameBoard.board);

const popupContainer = document.querySelector('#popup-container');

const save = document.querySelector('button');
save.addEventListener('click', updatePlayerNames);

const playerName = document.querySelector('#current-player p');

const cells = document.querySelectorAll('#board div');
cells.forEach(cell => cell.addEventListener('click', placeMark));

const resultsContainer = document.querySelector('#results-container');
const resultMsg = resultsContainer.querySelector('p');

const restart = document.querySelector('button[value="restart"]');
restart.addEventListener('click', restartGame);