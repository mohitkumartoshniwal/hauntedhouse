import {
    SphereBufferGeometry,
    MeshStandardMaterial,
    Mesh

} from "three";


import {
    bushColor,
} from "../helper";


function createBushes(bushData) {
    let bushGeometry = new SphereBufferGeometry(1, 16, 16);
    let bushMaterial = new MeshStandardMaterial({ color: bushColor });

    let bushes = bushData.map(bush => {
        const newBush = new Mesh(bushGeometry, bushMaterial);
        newBush.scale.set(bush.scale.x, bush.scale.y, bush.scale.z)
        newBush.position.set(bush.position.x, bush.position.y, bush.position.z);
        newBush.castShadow = true;
        return newBush;
    });
    return bushes;


}

export { createBushes };