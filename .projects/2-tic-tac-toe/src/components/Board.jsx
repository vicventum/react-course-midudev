import { Square } from './Square'

export default function Board({ board, onUpdateBoard }) {
	return (
		<section className="game">
			{board.map((square, index) => (
				<Square key={index} index={index} onUpdateBoard={onUpdateBoard}>
					{square}
				</Square>
			))}
		</section>
	)
}
