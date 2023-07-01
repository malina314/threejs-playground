const createTrunk = (h, r = 0.1) => {
    const center = new THREE.Object3D();
    const sphere = createSphere(r, 0x4d1f1c);
    for (let i = 1; i - 3 < h; i++) {
        const el = sphere.clone();
        el.position.set(0, -2.2 * r * i, 0);
        center.add(el);
    }
    center.position.y = 1.1 * r * h;
    return center;
}

const createRing = (R, r = 0.1) => {
    const center = new THREE.Object3D();

    let stepsX = Math.PI * R / r;
    const angleX = 2 * Math.PI / stepsX;
    const sphere = createSphere(r, 0x006633);
    for (let i = 0; i < stepsX; i++) {
        const el = sphere.clone();
        el.position.set(
            R * Math.cos(i * angleX),
            0,
            R * Math.sin(i * angleX));
        center.add(el);
    }

    return center;
}

const createChristmastree = (h, r = 0.1) => {
    const trunk = createTrunk(h, r);
    trunk.add(createSphere(r, 0x006633));
    for (let i = 1; i <= h; i++) {
        const el = createRing(i * r * 1.1, r);
        el.position.set(0, -2.2 * r * i, 0);
        trunk.add(el);
    }
    return trunk;
}
