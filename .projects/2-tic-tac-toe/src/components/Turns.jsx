import { TURNS } from '../constants'
import { Square } from './Square'

export default function Turns({ turn }) {
	return (
		<section className="turn">
			<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
			<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
		</section>
	)
}
