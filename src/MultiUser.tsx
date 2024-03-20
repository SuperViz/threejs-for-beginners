import SuperVizRoom from '@superviz/sdk'
import { BaseComponent } from '@superviz/sdk/lib/components/base'
import { Presence3D } from '@superviz/threejs-plugin'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as THREE from 'three'

export default function EnableMultiuser({ scene, camera }: { scene: THREE.Scene; camera: THREE.PerspectiveCamera | undefined }) {
	const [searchParams] = useSearchParams()
	const participantName = searchParams.get('name') || 'blue'

	const [isSuperVizEnabled, setIsSuperVizEnabled] = useState(false)

	const initSuperViz = async () => {
		const DEVELOPER_KEY = ''

		const room = await SuperVizRoom(DEVELOPER_KEY, {
			roomId: 'my-first-room',
			group: {
				id: 'threejs-for-beginners',
				name: 'threejs-for-beginners',
			},
			participant: {
				id: participantName,
				name: participantName,
				avatar: {
					model3DUrl: `/models/${participantName}.glb`,
					imageUrl: '',
				},
			},
			debug: true,
		})

		if (camera) {
			console.log('camera', participantName)
			const threeJSPresence = new Presence3D(scene, camera, camera, {
				isAvatarsEnabled: true,
				isLaserEnabled: false,
				isNameEnabled: false,
				isMouseEnabled: false,
				renderLocalAvatar: false,
				avatarConfig: {
					height: 0,
					scale: 1,
					laserOrigin: { x: 0, y: 0, z: 0 },
				},
			})

			room.addComponent(threeJSPresence as unknown as BaseComponent)
			setIsSuperVizEnabled(true)
		}
	}
	if (isSuperVizEnabled) return null
	return <button onClick={() => initSuperViz()}>Enable Multiuser</button>
}
