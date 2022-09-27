import { WebGLRenderer, PCFSoftShadowMap } from 'three';
import { fogColor } from "../helper";

function createRenderer(canvas) {
    const renderer = new WebGLRenderer({
        canvas
    });

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(fogColor)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap

    return renderer;
}

export { createRenderer };
