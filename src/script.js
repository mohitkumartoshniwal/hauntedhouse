import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */

// Colors
const fogColor = '#262837';
const wallColor = '#acae82';
const roofColor = '#b35f45';
const bushColor = '#89c854';
const graveColor = '#b2b6b1';
const floorColor = '#a9c388';
const lightColor = '#b9d5ff';
const doorLightColor = '#ff7d46'
const ghost1Color = '#ff00ff';
const ghost2Color = '#00ffff';
const ghost3Color = '#ffff00';

// Debug
const gui = new dat.GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
let fog = new THREE.Fog(fogColor, 1, 15)
scene.fog = fog;

//axes
// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

// walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 2.5 / 2
walls.castShadow = true

house.add(walls)

//roof
let roofMaterial = new THREE.MeshStandardMaterial({ color: roofColor })

let roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    roofMaterial
)
roof.position.y = 2.5 + (1 / 2);
roof.rotation.y = Math.PI / 4;

house.add(roof)


// door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture, // uv setting done for this
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture, // illusion that light is bouncing off those details
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
// why resetting same uv values???/
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))

door.position.y = 2 / 2
door.position.z = 4 / 2 + 0.01 // (0.01 because of z fighting)

house.add(door)


//bushes
let bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
let bushMaterial = new THREE.MeshStandardMaterial({ color: bushColor });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2);
bush1.castShadow = true


const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1);
bush2.castShadow = true

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(.4, .4, .4)
bush3.position.set(-.8, .1, 2.2);
bush3.castShadow = true

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(.15, .15, .15)
bush4.position.set(-.1, .05, 2.6);
bush4.castShadow = true

house.add(bush1, bush2, bush3, bush4)

//graves
const graves = new THREE.Group();
scene.add(graves)


let graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
let graveMaterial = new THREE.MeshStandardMaterial({ color: graveColor });
let gravesCount = 50;

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2 // range: [0,1) * 2 PI => [0,2PI);
    const radius = 3 + Math.random() * 6 // range: 3 + [0,1) * 6 => 3 + [0,6) => [3,9)
    const x = Math.cos(angle) * radius // range: [-radius,radius]
    const z = Math.sin(angle) * radius // range: [-radius,radius]

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, 0.8 / 2, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4; // range: [-0.5,0.5) * 0.4 => [-.20,0.20]
    grave.rotation.z = (Math.random() - 0.5) * 0.4; // range: [-0.5,0.5) * 0.4 => [-.20,0.20]
    grave.castShadow = true //cast shadow
    graves.add(grave)

}

//ghosts

let ghost1 = new THREE.PointLight(ghost1Color, 2, 1.5);
ghost1.castShadow = true
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7
scene.add(ghost1)

let ghost2 = new THREE.PointLight(ghost2Color, 2, 1.5);
ghost2.castShadow = true
ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7
scene.add(ghost2)

let ghost3 = new THREE.PointLight(ghost3Color, 2, 1.5);
ghost3.castShadow = true
ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7
scene.add(ghost3)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))

// beacuse the texture is too large
grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

// to aactivate the repeat
grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true

scene.add(floor)



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(lightColor, 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight(lightColor, 0.12)
moonLight.position.set(4, 5, - 2)

moonLight.castShadow = true
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door light
let doorLight = new THREE.PointLight(doorLightColor, 1, 7);
doorLight.position.set(0, 2.2, 2.7)

doorLight.castShadow = true
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

house.add(doorLight)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(fogColor)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // ghostAnimation
    const ghostAngle = elapsedTime * 0.5;

    ghost1.position.x = Math.cos(ghostAngle) * 4
    ghost1.position.z = Math.sin(ghostAngle) * 4
    ghost1.position.y = Math.sin(ghostAngle * 3)

    const ghost2Angle = - elapsedTime * 0.5;

    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle * 4) + Math.sin(elapsedTime)


    const ghost3Angle = - elapsedTime * 0.18

    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * .5))
    ghost3.position.y = Math.sin(ghost3Angle * 4) + Math.sin(elapsedTime * 2)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()