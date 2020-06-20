function placeMark() {

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