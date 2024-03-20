import { useEffect } from 'react'

import './style.css'

function App() {
	useEffect(() => {
		const container = document.getElementById('canvas') as HTMLElement
		const width = container.clientWidth
		const height = container.clientHeight
	}, [])

	return <canvas id='canvas'></canvas>
}

export default App
