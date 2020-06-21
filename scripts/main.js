function checkDiags() {
    let diagsToCheck = gameBoard.diags.filter(diag => diag.every(value => value));
    if(!diagsToCheck.length) return;
    console.log(diagsToCheck);
}

function checkCols() {
    let colsToCheck = gameBoard.cols.filter(col => col.every(value => value));
    if(!colsToCheck.length) return;
    console.log(colsToCheck);
}

function checkRows() {
    let rowsToCheck = gameBoard.rows.filter(row => row.every(value => value));
    if(!rowsToCheck.length) return;
    console.log(rowsToCheck);
}

function checkForWin(turn) {
    console.log(gameBoard.board);
    checkRows();
    checkCols();
    checkDiags();
}

function placeMark() {
    let p = this.firstChild;
    if(p.textContent) return;

    let cell = this.id;
    let row = +cell[0];
    let col = +cell[1];

    game.moves ++;
    gameBoard.board[row][col] = game.turn.mark;
    p.textContent = game.turn.mark;
    game.turn = game.turn === playerOne ? playerTwo : playerOne;
    heading.textContent = heading.textContent === 'Player 1' ? 'Player 2' : "Player 1";
    if(game.moves > 4) checkForWin(game.turn);
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
const player = (mark) => {
    return {mark};
};

const playerOne = player('X');
const playerTwo = player('O');

const game = (() => {
    let moves = 0;
    let turn = playerOne;
    return {moves, turn};
})();

const gameBoard = (() => {
    let board = [['', '', ''],
                 ['', '', ''],
                 ['', '', '']];
    let rows = [...board]
    let cols = [];
    for(let j = 0; j < 3; j ++) {
        let col = board.map(row => row[j]);
        cols.push(col);
    }
    let diags = [[board[0][0], board[1][1], board[2][2]],
                 [board[0][2], board[1][1], board[2][0]]];
    let name = "board";
    return {name, board, rows, cols, diags};
})();

// main starts here
const boardContainer = document.querySelector('#board');
renderBoard(gameBoard.board);

const cells = document.querySelectorAll('#board div');
cells.forEach(cell => cell.addEventListener('click', placeMark));

const heading = document.querySelector('h1');