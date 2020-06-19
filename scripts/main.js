function renderBoard(board) {
    board.forEach(value => {
        let p = document.createElement('p');
        p.textContent = value;
        boardDiv.appendChild(p);
        }
    );
}

const gameBoard = (() => {
    let board = ['X', 'O', 'X',
                 'O', 'X', 'O',
                 'X', 'O', 'X'];
    let name = "what";
    return {name, board};
})();

// main starts here
const boardDiv = document.querySelector('div[id="board"]');

console.log(gameBoard.name);
renderBoard(gameBoard.board);