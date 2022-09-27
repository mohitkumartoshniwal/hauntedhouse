import { PerspectiveCamera } from 'three'

function createCamera() {
    // todo can refacto size
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(-1.5, 1.5, 10.8);

    return camera;
}

export { createCamera };
