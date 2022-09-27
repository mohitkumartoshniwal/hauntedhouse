import { Fog } from 'three';
import { fogColor } from "../helper";

function createFog() {
    let fog = new Fog(fogColor, 1, 15)
    return fog;

}


export { createFog }