import {
    Group,
    Mesh, MeshStandardMaterial, BoxBufferGeometry
} from "three";

import {
    graveColor
} from "../helper";

function createGraves() {
    const graves = new Group();

    let graveGeometry = new BoxBufferGeometry(0.6, 0.8, 0.2);
    let graveMaterial = new MeshStandardMaterial({ color: graveColor });
    let gravesCount = 50;

    for (let i = 0; i < gravesCount; i++) {
        const angle = Math.random() * Math.PI * 2 // range: [0,1) * 2 PI => [0,2PI);
        const radius = 3 + Math.random() * 6 // range: 3 + [0,1) * 6 => 3 + [0,6) => [3,9)
        const x = Math.cos(angle) * radius // range: [-radius,radius]
        const z = Math.sin(angle) * radius // range: [-radius,radius]

        const grave = new Mesh(graveGeometry, graveMaterial);
        grave.position.set(x, 0.8 / 2, z);
        grave.rotation.y = (Math.random() - 0.5) * 0.4; // range: [-0.5,0.5) * 0.4 => [-.20,0.20]
        grave.rotation.z = (Math.random() - 0.5) * 0.4; // range: [-0.5,0.5) * 0.4 => [-.20,0.20]
        grave.castShadow = true //cast shadow
        graves.add(grave)

    }

    return graves
}

export { createGraves }