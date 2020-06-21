function placeMark() {
    console.log(this);
    mark = this.firstChild.textContent;
    if(mark) return;
    this.firstChild.textContent = game.turn.mark;
    game.turn = game.turn === playerOne ? playerTwo : playerOne;
    heading.textContent = heading.textContent === 'Player 1' ? 'Player 2' : "Player 1";
    console.log(game.turn.mark);
}

function renderBoard(board) {
    board.forEach(value => {
        let div = document.createElement('div');
        let p = document.createElement('p');
        p.textContent = value;
        div.appendChild(p);
        boardContainer.appendChild(div);
        }
    );
}

//////////////////////////////
const player = (mark) => {
    return {mark};
};

const playerOne = player('X');
const playerTwo = player('O');

const game = (() => {
    let turn = playerOne;
    return {turn};
})();

const gameBoard = (() => {
    let board = ['', '', '',
                 '', '', '',
                 '', '', ''];
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