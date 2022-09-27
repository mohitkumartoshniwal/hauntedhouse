import {
    Group,
    Mesh,
    BoxGeometry,
    MeshStandardMaterial,
    Float32BufferAttribute,
    ConeBufferGeometry,
    PlaneGeometry,
    TextureLoader,
    PointLight

} from "three";


import {
    roofColor,
    doorLightColor
} from "../helper";

function createHouse(housePosition = {}) {
    const house = new Group()

    // walls
    const textureLoader = new TextureLoader();
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


    const walls = new Mesh(
        new BoxGeometry(4, 2.5, 4),
        new MeshStandardMaterial({
            map: bricksColorTexture,
            aoMap: bricksAmbientOcclusionTexture,
            normalMap: bricksNormalTexture,
            roughnessMap: bricksRoughnessTexture
        })
    )
    walls.geometry.setAttribute('uv2', new Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
    walls.position.y = 2.5 / 2
    walls.castShadow = true

    house.add(walls)

    //roof
    let roofMaterial = new MeshStandardMaterial({ color: roofColor })

    let roof = new Mesh(
        new ConeBufferGeometry(3.5, 1, 4),
        roofMaterial
    )
    roof.position.y = 2.5 + (1 / 2);
    roof.rotation.y = Math.PI / 4;

    house.add(roof)


    // door
    const door = new Mesh(
        new PlaneGeometry(2.2, 2.2, 100, 100),
        new MeshStandardMaterial({
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
    door.geometry.setAttribute('uv2', new Float32BufferAttribute(door.geometry.attributes.uv.array, 2))

    door.position.y = 2 / 2
    door.position.z = 4 / 2 + 0.01 // (0.01 because of z fighting)

    // Door light
    let doorLight = new PointLight(doorLightColor, 1, 7);
    doorLight.position.set(0, 2.2, 2.7)

    doorLight.castShadow = true
    doorLight.shadow.mapSize.width = 256
    doorLight.shadow.mapSize.height = 256
    doorLight.shadow.camera.far = 7

    house.add(doorLight)


    house.add(door)
    if (housePosition.x) {
        house.position.x = housePosition.x
    }
    if (housePosition.y) {
        house.position.y = housePosition.y
    }
    if (housePosition.z) {
        house.position.z = housePosition.z
    }

    return house;
}

export { createHouse }