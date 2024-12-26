let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

function init(params) {
    render();
}

function render() {
    // HTML-Element mit der ID "content" auswählen
    const content = document.getElementById('content');

    // Starte mit leerem HTML-Code
    let html = '<table>';

    // Iteriere durch das Array und erstelle Zeilen und Zellen
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j; // Berechne den Index im Array
            const field = fields[index];

            // Füge die passende Klasse und den Inhalt hinzu (Kreis, Kreuz oder leer)
            if (field === 'circle') {
                html += '<td class="circle">O</td>';
            } else if (field === 'cross') {
                html += '<td class="cross">X</td>';
            } else {
                html += '<td></td>';
            }
        }
        html += '</tr>';
    }

    html += '</table>';

    // Setze den generierten HTML-Code in den Container ein
    content.innerHTML = html;
}