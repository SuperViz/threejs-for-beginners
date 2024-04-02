import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

import EnableMultiuser from './MultiUser'
import './style.css'

function App() {
	const width = 1000
	const height = 500

	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 90)

	useEffect(() => {
		const container = document.getElementById('canvas') as HTMLElement

		const renderer = new THREE.WebGLRenderer({
			canvas: container,
		})
		renderer.setSize(width, height)

		scene.background = new THREE.Color(0xb6b7b8)

		const pmremGenerator = new THREE.PMREMGenerator(renderer)
		scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const material = new THREE.MeshBasicMaterial({ color: 0x2244ff, wireframe: true })
		const cube = new THREE.Mesh(geometry, material)

		scene.add(cube)

		const controls = new OrbitControls(camera, renderer.domElement)
		controls.enablePan = true

		camera.position.z = 5
		camera.position.y = -1
		camera.position.x = 2

		function animate() {
			requestAnimationFrame(animate)
			renderer.render(scene, camera)
		}

		animate()
	}, [])

	return (
		<>
			<EnableMultiuser scene={scene} camera={camera} />
			<canvas id='canvas'></canvas>
		</>
	)
}

export default App
