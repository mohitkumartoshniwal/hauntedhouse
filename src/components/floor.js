import { PlaneGeometry, MeshStandardMaterial, Mesh, Float32BufferAttribute, RepeatWrapping, TextureLoader, Group, Matrix4 } from "three";

function createFloor() {
    const floor = new Group()
    const textureLoader = new TextureLoader()

    const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
    const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
    const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
    const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')


    const floorFront = new Mesh(
        new PlaneGeometry(25, 25),
        new MeshStandardMaterial({
            map: grassColorTexture,
            aoMap: grassAmbientOcclusionTexture,
            normalMap: grassNormalTexture,
            roughnessMap: grassRoughnessTexture
        })
    )
    floorFront.geometry.setAttribute('uv2', new Float32BufferAttribute(floorFront.geometry.attributes.uv.array, 2))

    // beacuse the texture is too large
    grassColorTexture.repeat.set(8, 8)
    grassAmbientOcclusionTexture.repeat.set(8, 8)
    grassNormalTexture.repeat.set(8, 8)
    grassRoughnessTexture.repeat.set(8, 8)

    // to aactivate the repeat
    grassColorTexture.wrapS = RepeatWrapping
    grassAmbientOcclusionTexture.wrapS = RepeatWrapping
    grassNormalTexture.wrapS = RepeatWrapping
    grassRoughnessTexture.wrapS = RepeatWrapping

    grassColorTexture.wrapT = RepeatWrapping
    grassAmbientOcclusionTexture.wrapT = RepeatWrapping
    grassNormalTexture.wrapT = RepeatWrapping
    grassRoughnessTexture.wrapT = RepeatWrapping

    floor.rotation.x = - Math.PI * 0.5
    floor.position.y = 0
    floor.receiveShadow = true;

    const floorBack = new Mesh(
        new PlaneGeometry(25, 25),
        new MeshStandardMaterial({
            color: 'black',
        })
    )

    floorBack.geometry.applyMatrix4(new Matrix4().makeRotationY(Math.PI));
    floorBack.position.z = -.2
    console.log({ floorBack })


    floor.add(floorFront)
    floor.add(floorBack)

    return floor;
}

export { createFloor }