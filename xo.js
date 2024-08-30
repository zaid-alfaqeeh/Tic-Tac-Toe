let arr = [];
let count = 0;
let head = document.getElementsByTagName('h3')[0];
let span = document.getElementsByTagName('span')[0];
let stopgame=true;
for (let i = 1; i < 10; i++) {
    arr[i] = document.getElementById(i);
}

function win() {
    if (arr[1].innerText === arr[2].innerText && arr[2].innerText === arr[3].innerText && arr[1].innerText !== '')
        finish(arr[1].innerText);
    else if (arr[4].innerText === arr[5].innerText && arr[5].innerText === arr[6].innerText && arr[4].innerText !== '')
        finish(arr[4].innerText);
    else if (arr[7].innerText === arr[8].innerText && arr[8].innerText === arr[9].innerText && arr[7].innerText !== '')
        finish(arr[7].innerText);
    else if (arr[1].innerText === arr[4].innerText && arr[4].innerText === arr[7].innerText && arr[1].innerText !== '')
        finish(arr[1].innerText);
    else if (arr[2].innerText === arr[5].innerText && arr[5].innerText === arr[8].innerText && arr[2].innerText !== '')
        finish(arr[2].innerText);
    else if (arr[3].innerText === arr[6].innerText && arr[6].innerText === arr[9].innerText && arr[3].innerText !== '')
        finish(arr[3].innerText);
    else if (arr[1].innerText === arr[5].innerText && arr[5].innerText === arr[9].innerText && arr[1].innerText !== '')
        finish(arr[1].innerText);
    else if (arr[3].innerText === arr[5].innerText && arr[5].innerText === arr[7].innerText && arr[3].innerText !== '')
        finish(arr[3].innerText);
    else {
        let count = 0;
        arr.forEach(item => {
            if (item.innerText !== '') count++;
        });
        if (count === 9) {
            finish("draw");
        }
    }
}

function finish(winner) {
    if (winner !== "draw") {
        span.innerText = winner + " Wins!";
    } else {
        span.innerText = "It's a draw!";
    }
    stopgame=false;
    setInterval(function () {
        span.innerText += '.';
    }, 200);
    setTimeout(function () { location.reload(); }, 1000);
}

function aiMove() {
    let move = findBestMove(arr);
    setTimeout(() => {  
        arr[move].innerText = "X";
        span.innerText = "O";
        count++;
        win();
    }, 500);  
}

function findBestMove(board) {
    for (let i = 1; i <= 9; i++) {
        if (board[i].innerText === '') {
            board[i].innerText = "X";
            if (checkWinner(board) === "X") {
                board[i].innerText = ''; 
                return i;
            }
            board[i].innerText = ''; 
        }
    }

    for (let i = 1; i <= 9; i++) {
        if (board[i].innerText === '') {
            board[i].innerText = "O";
            if (checkWinner(board) === "O") {
                board[i].innerText = '';
                return i;
            }
            board[i].innerText = ''; 
        }
    }

    return minimaxMove(board);
}

function minimaxMove(board) {
    let bestScore = -Infinity;
    let move;
    for (let i = 1; i <= 9; i++) {
        if (board[i].innerText === '') {
            board[i].innerText = "X";
            let score = minimax(board, 0, false, -Infinity, Infinity);
            board[i].innerText = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing, alpha, beta) {
    let result = checkWinner(board);
    if (result !== null) {
        if (result === "X") return 10 - depth;
        if (result === "O") return depth - 10;
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 1; i <= 9; i++) {
            if (board[i].innerText === '') {
                board[i].innerText = "X";
                let score = minimax(board, depth + 1, false, alpha, beta);
                board[i].innerText = '';
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break; 
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 1; i <= 9; i++) {
            if (board[i].innerText === '') {
                board[i].innerText = "O";
                let score = minimax(board, depth + 1, true, alpha, beta);
                board[i].innerText = '';
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);
                if (beta <= alpha) break;  
            }
        }
        return bestScore;
    }
}

function checkWinner(board) {
    const winConditions = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], 
        [1, 4, 7], [2, 5, 8], [3, 6, 9], 
        [1, 5, 9], [3, 5, 7]             
    ];
    
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a].innerText && board[a].innerText === board[b].innerText && board[a].innerText === board[c].innerText) {
            return board[a].innerText;
        }
    }
    return board.includes('') ? null : 'Draw';
}

function Click(i) {
    if (count == 0) {
        head.style.display = "none";
    }
    if (arr[i].innerText == '') {
        arr[i].innerText = "O";
        span.innerText = "X";
        count++;
        win();
        if (count < 9&&stopgame) {
            aiMove();  
        }
    }
}
