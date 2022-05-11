let player;
let selectedPlayer;
start();

function start() {
    player = 'X';
    selectedPlayer = document.getElementById('selectedPlayer');
    selectedPlayer.innerHTML = player;
    resetWinner();
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X';
    selectedPlayer.innerHTML = player;
}

function resetWinner() {
    const winner = document.getElementById('winner');
    winner.innerHTML = null;
}

function selectBox(id) {
    const box = document.getElementById(id);
    const content = box.innerHTML;
    if (content != '-') return;
    box.innerHTML = player;
    if (hasWinner().result) {
        const winner = player.valueOf();
        const selectedWinner = document.getElementById('winner');
        selectedWinner.innerHTML = winner;
        changeColorBoxWinner(hasWinner().sequence);
        setTimeout(() => {
            window.alert(`Fim de Jogo! \n Vencedor: ${winner}`);
            restart();
        }, 100);
    } else if(endGame()) {
        changeColorEndGame();
        setTimeout(() => {
            window.alert(`Fim de Jogo! Não houve vencedor.`);
            restart();
        }, 100);
    }
    changePlayer();
}

function endGame() {
    const boxes = document.getElementsByClassName('box');
    const boxesArray = Array.from(boxes);
    const endGame = !boxesArray.some((box) => box.innerHTML == '-');
    return endGame;
}

function hasWinner() {
    const boxes = document.getElementsByClassName('box');
    const map = mapFromHtmlCollection(boxes);
    return checkSequence(map);
}

function checkSequence(map) {
    if (map.get(1).valueOf() != '-' &&
        map.get(1).valueOf() == map.get(2).valueOf() &&
        map.get(2).valueOf() == map.get(3).valueOf()
    ) return { result: true, sequence: [1, 2, 3] };
    if (map.get(4).valueOf() != '-' &&
        map.get(4).valueOf() === map.get(5) &&
        map.get(5).valueOf() === map.get(6).valueOf()
    ) return { result: true, sequence: [4, 5, 6] };
    if (map.get(7).valueOf() != '-' &&
        map.get(7).valueOf() === map.get(8) &&
        map.get(8).valueOf() === map.get(9).valueOf()
    ) return { result: true, sequence: [7, 8, 9] };
    if (map.get(1).valueOf() != '-' &&
        map.get(1).valueOf() === map.get(4) &&
        map.get(4).valueOf() === map.get(7).valueOf()
    ) return { result: true, sequence: [1, 4, 7] };
    if (map.get(2).valueOf() != '-' &&
        map.get(2).valueOf() === map.get(5) &&
        map.get(5).valueOf() === map.get(8).valueOf()
    ) return { result: true, sequence: [2, 5, 8] };
    if (map.get(3).valueOf() != '-' &&
        map.get(3).valueOf() === map.get(6) &&
        map.get(6).valueOf() === map.get(9).valueOf()
    ) return { result: true, sequence: [3, 6, 9] };
    if (map.get(1).valueOf() != '-' &&
        map.get(1).valueOf() === map.get(5) &&
        map.get(5).valueOf() === map.get(9).valueOf()
    ) return { result: true, sequence: [1, 5, 9] };
    if (map.get(3).valueOf() != '-' &&
        map.get(3).valueOf() === map.get(5) &&
        map.get(5).valueOf() === map.get(7).valueOf()
    ) return { result: true, sequence: [3, 5, 7] };

    return { result: false, sequence: [] };
}

function changeColorBoxWinner(arr) {
    for (let id of arr) {
        const box = document.getElementById(id);
        box.classList.add('winnerBox');
    }
}

function changeColorEndGame() {
    const boxes = document.getElementsByClassName('box');
    for(let box of boxes) {
        box.classList.add('endGameBox');
    }
}

function restart() {
    const boxes = document.getElementsByClassName('box');
    for (let box of boxes) {
        box.innerHTML = '-';
        box.classList.remove('winnerBox');
        box.classList.remove('endGameBox');
        start();
    }
}

function mapFromHtmlCollection(htmlCollection) {
    const map = new Map();
    for (let box of htmlCollection) {
        map.set(parseInt(box.id), box.innerHTML);
    }
    return map;
}