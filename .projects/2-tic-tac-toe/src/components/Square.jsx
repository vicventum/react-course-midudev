export const Square = ({ children, isSelected, onUpdateBoard, index }) => {
	const className = `square ${isSelected ? 'is-selected' : ''}`

	function handleClick() {
		onUpdateBoard(index)
	}

	return (
		<div className={className} onClick={handleClick}>
			{children}
		</div>
	)
}
