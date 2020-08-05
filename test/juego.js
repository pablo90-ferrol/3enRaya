const {ganador} = require('../src/app.js')
const assert = require('assert')

describe("Ganador del juego", function () {
    it("Victoria horizontal jugador 1", function () {
        const tablero = [
            [2, 0, 0],
            [1, 1, 1],
            [0, 0, 2]
        ]
        assert.equal(ganador(tablero), 1)
    })

    it("Victoria vertical jugador 2", function () {
        const tablero = [
            [2, 1, 0],
            [2, 1, 1],
            [2, 0, 0]
        ]
        assert.equal(ganador(tablero), 2)
    })

    it("No hay ganador con tablero vacío", function () {
        const tablero = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        assert.equal(ganador(tablero), 0)
    })

    it("No hay ganador con tablero lleno", function () {
        const tablero = [
            [1, 2, 1],
            [2, 1, 1],
            [2, 1, 2]
        ]
        assert.equal(ganador(tablero), 0)
    })
})