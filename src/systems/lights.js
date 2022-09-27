import { DirectionalLight, AmbientLight } from 'three';

function createLights() {
    const lightColor = '#b9d5ff';

    const ambientLight = new AmbientLight(lightColor, 0.12)

    // Directional light
    const moonLight = new DirectionalLight(lightColor, 0.12)
    moonLight.position.set(4, 5, - 2)

    moonLight.castShadow = true
    moonLight.shadow.mapSize.width = 256
    moonLight.shadow.mapSize.height = 256
    moonLight.shadow.camera.far = 15

    return { ambientLight, moonLight };
}

export { createLights };
