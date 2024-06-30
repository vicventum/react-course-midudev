import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { checkWinnerFrom } from './logic/checkWinnerFrom'
import { checkEndGame } from './logic/checkEndGame'
import WinnerModal from './components/WinnerModal'
import Board from './components/Board'
import Turns from './components/Turns'
import {
	resetGameStorage,
	saveGameToStorage,
} from './logic/storage/localStorage'

function App() {
	//? Inicializando el estado condicionalmente
	const [board, setBoard] = useState(() => {
		const boardFromLocalStorage = window.localStorage.board
		if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage)
		return Array(9).fill(null)
		// return window.localStorage.board ? window.localStorage.board : Array(9).fill(null)
	})
	//? Inicializando el estado condicionalmente
	const [turn, setTurn] = useState(() => {
		const turnFromLocalStorage = window.localStorage.turn
		return turnFromLocalStorage ?? TURNS.X
	})
	const [winner, setWinner] = useState(null)

	const resetGame = () => {
		setBoard(Array(9).fill(null))
		setTurn(TURNS.X)
		setWinner(null)
		resetGameStorage()
	}

	function handleUpdateBoard(index) {
		// No actualizamos el tablero si ya está marcada la casilla o ya hay un ganador
		if (board[index] || winner) return null

		// Actualiza el tablero
		const newBoard = [...board]
		newBoard[index] = turn
		setBoard(newBoard)

		// Actualiza el turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
		setTurn(newTurn)
		// Revisa si hay ganador
		const newWinner = checkWinnerFrom(newBoard)
		// Guardando partida
		saveGameToStorage({
			board: newBoard,
			turn: newTurn,
		})
		// Comprueba si hay un ganador
		if (newWinner) {
			setWinner(newWinner)
			confetti()
			// Comprueba si hubo un empate
		} else if (checkEndGame(newBoard)) {
			setWinner(false)
		}
	}

	return (
		<main className="board">
			<h1 className="">Tic Tac Toe</h1>
			<button onClick={resetGame}>Empezar de nuevo</button>

			<Board board={board} onUpdateBoard={handleUpdateBoard} />

			<Turns turn={turn} />

			<WinnerModal winner={winner} onResetGame={resetGame} />
		</main>
	)
}

export default App
