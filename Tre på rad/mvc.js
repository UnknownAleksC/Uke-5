// MODEL
let mainDiv = document.getElementById('app');
let board = ['', '', '', '', '', '', '', '', ''];
let rank = 1;
let win = false;

// VIEW
showBoard();
function showBoard() {
    mainDiv.innerHTML = '';
    for (let i = 0; i < board.length; i++) {
        mainDiv.innerHTML += `<div class="inner" onclick="updateBoard(${i})">${board[i]}</div>`
    }
    mainDiv.innerHTML += '<button class="resetButton" onclick="reset()">😎RESET😎</button>' + `<img src="ranks/TFT_Rank${rank}.png"/>`
}

// CONTROLLER
function updateBoard(num) {
    if (!board[num]) {
        board[num] = 'X';
        checkWin();
        if (win === false) {
            setRandomO();
        }
        win = false;
    }
    showBoard();
}

function setRandomO() {
    let i = 0;
    let random = Math.round(Math.random() * (board.length - 1))
    if (!board[random]) board[random] = 'O';
    else {
        while (i < board.length) {
            if (!board[i]) return setRandomO();
            i++;
        }
    }
    checkWin();
}

function checkWin() {
    for (let i = 0; i < 8; ++i) {
        if (i === 0 || i === 1 || i === 2) {
            if (board[i] === 'X' && board[(i + 3)] === 'X' && board[(i + 6)] === 'X') {
                console.log('x win Vert');
                rank = rank < 36 ? rank += 1 : rank;
                board = ['', '', '', '', '', '', '', '', ''];
                showBoard();
                win = true;
            }
            else if (board[i] === 'O' && board[(i + 3)] === 'O' && board[(i + 6)] === 'O') {
                console.log('O win Vert');
                rank = rank > 1 ? rank -= 1 : rank;
                board = ['', '', '', '', '', '', '', '', ''];
                showBoard();
                win = true;
            }
        }
        else if (i === 0 || i === 3 || i === 6) {
            if (board[i] === 'X' && board[(i + 1)] === 'X' && board[(i + 2)] === 'X') {
                console.log('x win Hori');
                rank = rank < 36 ? rank += 1 : rank;
                board = ['', '', '', '', '', '', '', '', ''];
                showBoard();
                win = true;
            }
            else if (board[i] === 'O' && board[(i + 1)] === 'O' && board[(i + 2)] === 'O') {
                console.log('O win Hori');
                rank = rank > 1 ? rank -= 1 : rank;
                board = ['', '', '', '', '', '', '', '', ''];
                showBoard();
                win = true;
            }
        }
        else if (i === 4) {
            if (board[i] === 'X' && board[(i - 4)] === 'X' && board[(i + 4)] === 'X' ||
                board[i] === 'X' && board[(i - 2)] === 'X' && board[(i + 2)] === 'X') {
                console.log('x win Diagonal');
                rank = rank < 36 ? rank += 1 : rank;
                board = ['', '', '', '', '', '', '', '', ''];
                showBoard();
                win = true;
            }
            else if (board[i] === 'O' && board[(i - 4)] === 'O' && board[(i + 4)] === 'O' ||
                board[i] === 'O' && board[(i - 2)] === 'O' && board[(i + 2)] === 'O') {
                console.log('o win Diagonal');
                rank = rank > 1 ? rank -= 1 : rank;
                board = ['', '', '', '', '', '', '', '', ''];
                showBoard();
                win = true;
            }
        }
    }
}

function reset() {
    board = ['', '', '', '', '', '', '', '', ''];
    showBoard();
}