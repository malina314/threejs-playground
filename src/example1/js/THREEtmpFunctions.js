const createAxis = () => {
    const center = new THREE.Object3D();
    center.add(createBox(5, .1, .1, 0x00ff00), createBox(.1, 5, .1, 0xff0000), createBox(.1, .1, 5, 0x0000ff));
    return center;
}

const createBigBox = () => {
    const center = new THREE.Object3D();
    const up = createBox(100, .1, 100, 0x000000);
    const down = up.clone();
    up.position.y = 50;
    down.position.y = -50;

    const left = createBox(.1, 100, 100, 0xff0000);
    const right = left.clone();
    left.position.x = -50;
    right.position.x = 50;

    const front = createBox(100, 100, .1, 0x0000ff);
    const back = front.clone();
    front.position.z = 50;
    back.position.z = -50;

    center.add(up, down, left, right, front, back);
    return center;
}
