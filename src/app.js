/**
 * Tablero de juego, inicialmente vacío.
 */
var tablero = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

/**
 * Variable que controla el final del juego. Inicialmente vale false, lo
 * que significa que el juego aún no ha acabado.
 */
var finalJuego = false


/**
 * Función para colocar una ficha en la posición
 * indicada para el jugador en cuestión.
 * @param {*} fila 
 * @param {*} columna 
 * @param {*} jugador (puede ser 1 ó 2)
 */
function ponerFicha(fila, columna, jugador) {
    if (finalJuego)
        throw new Error("El juego ya ha terminado");
    if (tablero[fila][columna] == 0)
        tablero[fila][columna] = jugador;
    else
        throw new Error("Casilla ya ocupada");

    redibujarTablero();
}



const imagenes = [
    "img/hueco.svg",
    "img/circulo.svg",
    "img/cruz.svg"
];

/**
 * Redibuja el tablero, actualizando su aspecto según el estado reflejado
 * en tablero.
 */
function redibujarTablero() {
    for (let fila = 0; fila < tablero.length; fila++) {
        for (let columna = 0; columna < tablero[fila].length; columna++) {            
            document
                .getElementById("c-"+fila+"-"+columna)
                .setAttribute("src", imagenes[tablero[fila][columna]])
        }        
    }
}


/**
 * Acción de jugar lanzada por el usuario. Coloca la ficha en el tablero,
 * invoca la jugada de la máquina y actualiza el estado.
 * @param {*} fila Fila donde coloca su ficha.
 * @param {*} columna Columna donde coloca su ficha.
 */
function jugar(fila, columna) {
    try {
        ponerFicha(fila, columna, 1)
        if (ganador(tablero)) {
            alert("Enhorabuena! Has ganado!")
            finalizarJuego()
            return
        }
        jugarMaquina()
        if (ganador(tablero)) {
            alert("Lo siento, has perdido.")
            finalizarJuego()
        } 
    } catch(err) {
        alert(err.message)
    }
}


function finalizarJuego() {
    finalJuego = true
}

/**
 * Jugada hecha por la máquina.
 */
function jugarMaquina() {
    let {fila, columna} = mejorJugada(tablero);
    ponerFicha(fila, columna, 2);
    redibujarTablero();
}



/**
 * Calcula la mejor jugada y retorna un objeto {fila, columna} con
 * la posición resultante.
 * @param {*} t Estado del tablero.
 */
function mejorJugada(t) {
    for (let fila = 0; fila < 3; fila++) {
        for (let columna = 0; columna < 3; columna++) {
            if (t[fila][columna] == 0)
                return {fila, columna}
        }
    }
}

/**
 * Comprueba si en el tablero t hay un ganador. Esta función devolverá
 * 1 ó 2 dependiendo de si gana el usuario o la máquina, o 0 si todavía
 * no ha ganado nadie.
 * @param {*} tablero Estado del tablero.
 */
function ganador(tablero) {
    for (let i = 0; i < tablero.length; i++) {

        // Comprobar fila (horizontal)
        if(tablero[i][0]!=0 && tablero[i][0]==tablero[i][1] && tablero[i][0]==tablero[i][2])
            return tablero[i][0];
            
        // Comprobar columna (vertical)
        if(tablero[0][i]!=0 && tablero[0][i]==tablero[1][i] && tablero[0][i]==tablero[2][i])
            return tablero[0][i];   
    }

    // Comprobar diagonal
    if(tablero[0][0]!=0 && tablero[0][0]==tablero[1][1] && tablero[0][0]==tablero[2][2])
        return tablero[0][0];
    
    // Comprobar diagonal cruzada
    if(tablero[0][2]!=0 && tablero[0][2]==tablero[1][1] && tablero[0][2]==tablero[2][0])
        return tablero[0][2]; 

    return 0 
}

/**
 * Reinicia el juego, vaciando todo el tablero y volviendo a activar
 * el juego.
 */
function reset() {
    if (confirm("Está a punto de reiniciar la partida.")) {
        tablero = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
        ]

        finalJuego = false

        redibujarTablero()
    }   
}


module.exports = {
    ponerFicha,
    mejorJugada,
    jugar,
    ganador,
    reset
}