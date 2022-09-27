const setSize = (camera, renderer) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
};

class Resizer {
    constructor(camera, renderer) {
        // set initial size
        setSize(camera, renderer);

        window.addEventListener('resize', () => {
            // set the size again if a resize occurs
            setSize(camera, renderer);
            // perform any custom actions
            this.onResize();
        });
    }

    onResize() { }
}

export { Resizer };
