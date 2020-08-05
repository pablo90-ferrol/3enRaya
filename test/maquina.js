const {mejorJugada} = require('../src/app.js')
const assert = require('assert')

describe("Mejor jugada", function () {
    it ("Con tablero ocupado en el centro", function () {
        const tablero = [
            [0,0,0],
            [0,1,0],
            [0,0,0]
        ];
        let {fila, columna} = mejorJugada(tablero);
        assert.ok(!(fila == 1 && columna == 1));
    })

    it ("Con fila central ocupada", function () {
        const tablero = [
            [0,0,0],
            [1,1,2],
            [0,0,0]
        ];
        let {fila, columna} = mejorJugada(tablero);
        assert.ok(fila != 1);
    })

    it ("Con todo ocupado menos el (1,1)", function () {
        const tablero = [
            [2,1,1],
            [1,0,2],
            [1,2,2]
        ];
        let {fila, columna} = mejorJugada(tablero);
        assert.equal(fila == 1)
        assert.equal(columna == 1);
    })
}) 