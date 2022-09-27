import { createCamera } from '../systems/camera'
import { createLights } from '../systems/lights.js';
import { createScene } from '../systems/scene.js';

import { createControls } from '../systems/controls.js';
import { createRenderer } from '../systems/renderer.js';
import { Resizer } from '../systems/Resizer.js';
import { Loop } from '../systems/Loop.js';
import { createHouse } from '../components/house.js';
import { createFloor } from '../components/floor.js';
import { createFog } from '../components/fog.js';
import { createGhosts } from '../components/ghosts.js';
import { createGraves } from '../components/graves';
import * as dat from 'lil-gui'
import { createBushes } from '../components/bush';
import { bushData } from '../helper';
import { Vector3 } from 'three';

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
    constructor(container) {
        camera = createCamera();
        renderer = createRenderer(container);
        scene = createScene();
        loop = new Loop(camera, scene, renderer);
        controls = createControls(camera, renderer.domElement);
        const house = createHouse();
        const house2 = createHouse({ x: 7, z: 3 })
        const house3 = createHouse({ x: -7, z: -5 })
        const graves = createGraves();
        const floor = createFloor()
        const fog = createFog()
        const { ghost1, ghost2, ghost3 } = createGhosts();
        const { ambientLight, moonLight } = createLights();
        const bushes = createBushes(bushData)
        const gui = new dat.GUI();

        gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
        gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)


        scene.add(ambientLight, moonLight);
        scene.add(house);
        scene.add(house2);
        scene.add(house3);
        scene.add(graves);
        scene.add(floor);
        scene.add(ghost1);
        scene.add(ghost2);
        scene.add(ghost3);
        bushes.forEach(bush => {
            scene.add(bush)
        });

        // scene.add(gui)



        scene.fog = fog;

        loop.updatables.push(controls, ghost1, ghost2, ghost3);


        const resizer = new Resizer(camera, renderer);
    }

    async init() {
        this.render()
    }

    render() {
        renderer.render(scene, camera);
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export { World };
