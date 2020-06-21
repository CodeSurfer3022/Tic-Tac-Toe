function checkForWin(turn) {
    console.log('hm');
}

function placeMark() {
    console.log(this);
    let p = this.firstChild;
    if(p.textContent) return;
    game.moves ++;
    p.textContent = game.turn.mark;
    game.turn = game.turn === playerOne ? playerTwo : playerOne;
    heading.textContent = heading.textContent === 'Player 1' ? 'Player 2' : "Player 1";
    console.log(game.turn.mark);
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
    let lines = []
    let name = "board";
    return {name, board};
})();

// main starts here
const boardContainer = document.querySelector('#board');
renderBoard(gameBoard.board);

const cells = document.querySelectorAll('#board div');
cells.forEach(cell => cell.addEventListener('click', placeMark));

const heading = document.querySelector('h1');
console.log(heading)