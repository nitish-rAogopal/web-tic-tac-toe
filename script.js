const ganeCells = document.querySelectorAll('.cell')
const player1 = document.querySelector('.payer1')
const player2 = document.querySelector('.payer2')
const restartBtn = document.querySelector('.restartBtn')
const alertBox = document.querySelector('.alertBox')

//making variables
let currentPlayer = 'X'
let nextPlayer = 'O'
let playerTurn = currentPlayer

// player1.textContent = `Player 1: ${currentPlayer}`;
// player2.textContent = `Player 2:  ${nextPlayer}`;

//function to start your game
const startgame = function () {
    ganeCells.forEach(cell => {
        cell.addEventListener('click', handleClick)
    })
}

//function to handle click
const handleClick = function (e) {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn
        if (checkWin()) {
            //console.log(`${playerTurn} is a winner`)
            showAlert(`${playerTurn} is a winner!`)
            disableCells()
        }
        else if (checkTie()) {
            //console.log(`It's a tie`)
            showAlert(`It's a tie!`)
            disableCells()
        }
        else {
            changeplayerTurn()
            showAlert(`Turn for player: ${playerTurn}`)
        }
    }

}

//function to change player turn
const changeplayerTurn = function () {
    // if(playerTurn===currentPlayer)
    //     playerTurn=nextPlayer
    // else playerTurn=currentPlayer

    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer
}
//function to check win
const checkWin = function () {
    const winningConditons = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < winningConditons.length; i++) {
        const [pos1, pos2, pos3] = winningConditons[i]
        //console.log(`${pos1}, ${pos2}, ${pos3}`)
        if (ganeCells[pos1].textContent !== '' &&
            ganeCells[pos1].textContent === ganeCells[pos2].textContent &&
            ganeCells[pos2].textContent === ganeCells[pos3].textContent)
            return true
    }
    return false
}

//function to check tie
const checkTie = function () {
    let emptyCellsCount = 0;
    ganeCells.forEach(cell => {
        if (cell.textContent === '')
            emptyCellsCount++
    })
    return emptyCellsCount === 0 && !checkWin()
}
//function to disable game-board cells after a win or tie
const disableCells = function () {
    ganeCells.forEach(cell => {
        cell.removeEventListener('click', handleClick)
        cell.classList.add('disabled')
    })
}


//restart button
const restartGame = function () {
    ganeCells.forEach(cell => {
        cell.textContent = ''
        cell.classList.remove('disabled')
    })
    startgame()
}

const showAlert = function (msg) {
    alertBox.style.display = 'block'
    alertBox.textContent = msg
    setTimeout(() => {
        alertBox.style.display = 'none'
    }, 3000)
}

//adding event listener to restart button
restartBtn.addEventListener('click', restartGame)
//calling start game Function
startgame()