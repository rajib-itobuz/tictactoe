const tictactoe = document.querySelectorAll(".item");
const outputDiv = document.querySelector(".output");
const resetButton = document.getElementById("reset");
const winning_chances = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let winner = "";
let currPlayer = 0;
const player1 = [];
const player2 = [];
const usedBoxes = [];
let blockMyMove = [];
let makeMyMove = [];


const checkWinning = () => {
    player1.sort((a, b) => a - b);
    winning_chances.forEach(winCriteria => {
        let countPlayer1inwinIndex = 0;
        let countPlayer2inwinIndex = 0;
        let parityIndex1 = null;
        let parityIndex2 = null;


        winCriteria.forEach((winIndex) => {
            if (player1.includes(winIndex))
                countPlayer1inwinIndex++;
            if (!player1.includes(winIndex))
                parityIndex1 = winIndex;

            if (player2.includes(winIndex))
                countPlayer2inwinIndex++;
            if (!player2.includes(winIndex))
                parityIndex2 = winIndex;
        })


        // winning status
        if (countPlayer1inwinIndex === 2) {
            blockMyMove.push(parityIndex1);
        }
        if (countPlayer1inwinIndex === 3) {
            outputDiv.innerHTML = `Player 1 Wins`;
            winner = "player 1";
        }


        // winning for player 2
        if (countPlayer2inwinIndex === 2) {
            makeMyMove.push(parityIndex2);
        }
        if (countPlayer2inwinIndex === 3) {
            outputDiv.innerHTML = `Player 2 Wins`;
            winner = "player 2";
        }


        if (!winner && [...player1, ...player2].length === 9) {
            outputDiv.innerHTML = `Game Draw`;
        }

    });
}

const playCompMove = () => {
    if (!winner && usedBoxes.length < 9) {

        let remainingBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(e => !usedBoxes.includes(e));

        makeMyMove = [...new Set(makeMyMove.filter(e => remainingBoxes.includes(e)))];
        blockMyMove = [...new Set(blockMyMove.filter(e => remainingBoxes.includes(e)))];
        const myStrategy = makeMyMove.length > 0 ? 0 : 1;
        // 0 offensive;
        // 1 defensive;
        if (makeMyMove.length != 0 || blockMyMove.length != 0) {
            if (myStrategy)
                remainingBoxes = remainingBoxes.filter(e => blockMyMove.includes(e));
            else
                remainingBoxes = remainingBoxes.filter(e => makeMyMove.includes(e));
        }


        const randomIndex = Math.floor(Math.random() * remainingBoxes.length);
        const compSelect = tictactoe[remainingBoxes[randomIndex]];
        compSelect.textContent = "0";
        player2.push(remainingBoxes[randomIndex]);
        usedBoxes.push(remainingBoxes[randomIndex]);

        makeMyMove = [];
        blockMyMove = [];
        checkWinning();
    }
}

const boxClicked = (e) => {
    if (!e.target.innerText && !winner) {
        const currMove = parseInt(e.target.dataset.id);
        e.target.innerText = "X";
        usedBoxes.push(currMove);
        player1.push(currMove);
        currPlayer = !currPlayer;
        outputDiv.innerHTML = `Player ${currPlayer + 1} Move`;
        checkWinning();
        setTimeout(playCompMove, 500);
    }

}


resetButton.addEventListener("click", () => {
    location.reload();
})
tictactoe.forEach((item, ind) => { item.setAttribute("onclick", "boxClicked(event);"); item.dataset.id = ind })