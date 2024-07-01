import './App.css'
import { useEffect, useState } from 'react'

function App() {
	const [enabled, setEnabled] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const btnText = enabled ? 'Desactivar' : 'Activar'

	useEffect(() => {
		function handleMove(event) {
			const { clientX, clientY } = event
			setPosition({ x: clientX, y: clientY })
		}
		if (enabled) window.addEventListener('pointermove', handleMove)
		return () => window.removeEventListener('pointermove', handleMove)
	}, [enabled])

	useEffect(() => {
		document.body.classList.toggle('no-cursor', enabled)

		return () => {
			document.body.classList.remove('no-cursor')
		}
	}, [enabled])

	return (
		<>
			<div
				style={{
					position: 'absolute',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					border: '1px solid #fff',
					borderRadius: '50%',
					opacity: 0.8,
					pointerEvents: 'none',
					left: -25,
					top: -25,
					width: 50,
					height: 50,
					transform: `translate(${position.x}px, ${position.y}px)`,
				}}
			/>
			<button onClick={() => setEnabled(!enabled)}>{btnText}</button>
		</>
	)
}

export default App
