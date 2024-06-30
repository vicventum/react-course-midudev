import { Square } from './Square'

export default function WinnerModal({ winner, onResetGame }) {
	if (winner === null) return null
	const winnerText = !winner ? 'Empate' : 'Ganó:'

	return (
		<section className="winner">
			<div className="text">
				<h2>{winnerText}</h2>

				<header className="win">{winner && <Square>{winner}</Square>}</header>

				<footer>
					<button onClick={onResetGame}>Empezar de nuevo</button>
				</footer>
			</div>
		</section>
	)
}
