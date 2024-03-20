import { useEffect } from 'react'

import './style.css'

function App() {
	const width = 1000
	const height = 500

	useEffect(() => {
		const container = document.getElementById('canvas') as HTMLElement
	}, [])

	return (
		<>
			<canvas id='canvas'></canvas>
		</>
	)
}

export default App
