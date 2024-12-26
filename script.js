let fields = [ 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null 
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    // HTML-Element mit der ID "content" auswählen
    const content = document.getElementById('content');

    // Starte mit leerem HTML-Code
    let html = '<div class="board-wrapper"><table>';

    // Iteriere durch das Array und erstelle Zeilen und Zellen
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j; // Berechne den Index im Array
            const field = fields[index];

            // Füge die passende Klasse und den Inhalt hinzu (Kreis, Kreuz oder leer)
            if (field === 'circle') {
                html += `<td class="circle">${createCircleSVG()}</td>`
            } else if (field === 'cross') {
                html += `<td class="cross">${generateCrossSVG()}</td>`;
            } else {
                html += `<td onclick="handleCellClick(${index}, this)"></td>`;
            }
        }
        html += '</tr>';
    }

    html += '</table></div>';

    // Setze den generierten HTML-Code in den Container ein
    content.innerHTML = html;
}

function handleCellClick(index, cell) {
    // Setze den aktuellen Spieler in das entsprechende Feld im Array
    fields[index] = currentPlayer;

    // Füge den entsprechenden SVG-Code in das angeklickte Element ein
    if (currentPlayer === 'circle') {
        cell.innerHTML = createCircleSVG();
        cell.className = 'circle';
    } else {
        cell.innerHTML = generateCrossSVG();
        cell.className = 'cross';
    }

    // Entferne das onclick-Attribut, damit das Feld nicht erneut angeklickt werden kann
    cell.onclick = null;

    // Überprüfe, ob das Spiel vorbei ist
    const winner = checkWinner();
    if (winner) {
        drawWinningLine(winner.line);
        return;
    }

    // Wechsel den Spieler
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}

function createCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="#00b0ef" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0, 188.4" to="188.4, 0" dur="0.5s" repeatCount="1" fill="freeze" />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#ffcc00" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="0.5s" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#ffcc00" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="0.5s" fill="freeze" />
            </line>
        </svg>
    `;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return { player: fields[a], line: combination };
        }
    }

    return null;
}

function drawWinningLine(line) {
    const content = document.getElementById('content');
    const boardWrapper = content.querySelector('.board-wrapper');

    const positions = [
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
        { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
        { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }
    ];

    const start = positions[line[0]];
    const end = positions[line[2]];

    const lineElement = document.createElement('div');
    lineElement.style.position = 'absolute';
    lineElement.style.backgroundColor = 'white';
    lineElement.style.height = '5px';

    const cellSize = 150; // Assuming each cell is 70px by 70px
    const x1 = start.x * cellSize + cellSize / 2;
    const y1 = start.y * cellSize + cellSize / 2;
    const x2 = end.x * cellSize + cellSize / 2;
    const y2 = end.y * cellSize + cellSize / 2;

    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    lineElement.style.width = `${length}px`;
    lineElement.style.transform = `rotate(${angle}deg)`;
    lineElement.style.transformOrigin = 'top left';
    lineElement.style.left = `${x1}px`;
    lineElement.style.top = `${y1}px`;

    boardWrapper.style.position = 'relative';
    boardWrapper.appendChild(lineElement);
}

function replayGame() {
    fields = [ 
        null, 
        null, 
        null, 
        null, 
        null, 
        null, 
        null, 
        null, 
        null 
    ];

    render()
}