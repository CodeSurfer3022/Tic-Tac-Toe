function renderBoard(board) {
    board.forEach(mark => console.log(mark));
}

const gameBoard = (() => {
    let board = ['X', 'O', 'X',
                 'O', 'X', 'O',
                 'X', 'O', 'X'];
    let name = "what";
    return {name, board};
})();

console.log(gameBoard.name);
renderBoard(gameBoard.board);