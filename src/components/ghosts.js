
import { PointLight } from "three";
import { ghost1Color, ghost2Color, ghost3Color } from "../helper";
function createGhosts() {


    let ghost1 = new PointLight(ghost1Color, 2, 1.5);
    ghost1.castShadow = true
    ghost1.shadow.mapSize.width = 256
    ghost1.shadow.mapSize.height = 256
    ghost1.shadow.camera.far = 7

    let ghost2 = new PointLight(ghost2Color, 2, 1.5);
    ghost2.castShadow = true
    ghost2.shadow.mapSize.width = 256
    ghost2.shadow.mapSize.height = 256
    ghost2.shadow.camera.far = 7

    let ghost3 = new PointLight(ghost3Color, 2, 1.5);
    ghost3.castShadow = true
    ghost3.shadow.mapSize.width = 256
    ghost3.shadow.mapSize.height = 256
    ghost3.shadow.camera.far = 7

    ghost1.tick = (elapsedTime) => {
        const ghostAngle = elapsedTime * 0.5;

        ghost1.position.x = Math.cos(ghostAngle) * 4
        ghost1.position.z = Math.sin(ghostAngle) * 4
        ghost1.position.y = Math.sin(ghostAngle * 3)
    }

    ghost2.tick = (elapsedTime) => {

        const ghost2Angle = - elapsedTime * 0.5;

        ghost2.position.x = Math.cos(ghost2Angle) * 5
        ghost2.position.z = Math.sin(ghost2Angle) * 5
        ghost2.position.y = Math.sin(ghost2Angle * 4) + Math.sin(elapsedTime)

    }

    ghost3.tick = (elapsedTime) => {

        const ghost3Angle = - elapsedTime * 0.18

        ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
        ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * .5))
        ghost3.position.y = Math.sin(ghost3Angle * 4) + Math.sin(elapsedTime * 2)

    }

    return { ghost1, ghost2, ghost3 };
}

export { createGhosts }