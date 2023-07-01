const Phong = (color = 0xffffff, shi = 70) => {
    return new THREE.MeshPhongMaterial({
        color: color,
        shininess: shi,
    });
}

const Lambert = (color = 0xffffff) => new THREE.MeshLambertMaterial({
    color: color,
});


const cubeGeo = (x = 1, y = 1, z = 1) => new THREE.BoxGeometry(x, y, z);
const createBox = (x, y, z, color, shi) => new THREE.Mesh(cubeGeo(x, y, z), Phong(color, shi));

const createSphere = (r = 1, color = 0xffffff, polygonX = 16, polygonY = 16, shi = 70) => {
    return new THREE.Mesh(new THREE.SphereGeometry(r, polygonX, polygonY), Phong(color, shi));
};

const createPiontLight = (intensity = 1, color = 0xffffff) => new THREE.PointLight(color, intensity);


const createObjectsSphere = (object, r = 10, densityX = 8, densityY = 8) => {
    const center = new THREE.Object3D();

    const elementTop = object.clone();
    elementTop.position.set(0, r, 0);
    center.add(elementTop);
    const elementBot = object.clone();
    elementBot.position.set(0, -r, 0);
    center.add(elementBot);

    const stepsX = densityX;
    const stepsY = (densityY - 1) / 2;
    const angleX = 2 * Math.PI / stepsX;
    const angleY = Math.PI / stepsY;
    for (let i = 1; i <= stepsY; i++) {
        for (let j = 0; j < stepsX; j++) {
            const element = object.clone();
            element.position.set(
                r * Math.sin(j * angleX) * Math.sin(i * angleY),
                r * Math.cos(i * angleY),
                r * Math.cos(j * angleX) * Math.sin(i * angleY));
            center.add(element);
        }
    }

    return center;
}


const createShip = () => {
    const main = createBox(1, .6, 1, 0x5555ff, 100);
    const leftArm = createBox(.4, .3, 1, 0xdd0000);
    const rightArm = createBox(.4, .3, 1, 0x00dd00);
    const top = createBox(.2, .2, .2, 0x777777);
    leftArm.position.x = -0.7;
    rightArm.position.x = 0.7;
    top.position.y = 0.4;
    main.add(leftArm, rightArm, top);
    return main;
}



window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (!e.altKey) {
        if (e.deltaY > 0)
            camera.position.add(camera.position.clone().normalize());
        else if (camera.position.length() >= 2 * camera.position.clone().normalize().length())
            camera.position.sub(camera.position.clone().normalize());
    }
    else {
        camera.fov += e.deltaY * 0.05;
    }
    camera.updateProjectionMatrix();
}, {passive: false});

window.addEventListener('keydown', (e) => {
    if (e.key == "w" || e.key == "s" || e.key == "a" || e.key == "d")
        move(ship, e.key);
    camera.updateProjectionMatrix();
});

const move = (object, direction) => {
    if (direction == "w") {
        object.position.add(object.position.clone().normalize());
    }
    else if (direction == "s") {
        object.position.sub(object.position.clone().normalize());
    }
}


let r, g, b, dr, dg, db;
r = Math.random();
g = Math.random();
b = Math.random();
dr = dg = db = 0.004;

const setRandomColor = () => {
    r += dr;
    g += dg;
    b += db;
    if (r >= 1) dr = -0.004;
    if (g >= 1) dg = -0.004;
    if (b >= 1) db = -0.004;
    if (r <= 0) dr = 0.004;
    if (g <= 0) dg = 0.004;
    if (b <= 0) db = 0.004;
    return new THREE.Color(r, g, b);
}

const betterRound = (x, digits = 0) => Math.round(x * Math.pow(10, digits)) / Math.pow(10, digits);




////////////////////////////////

moveCameraAroundSphere = (direction, normalizeRoration = 1) => {

    alert("This function works incorrect");
    console.error("This function works incorrect");
    debugger;

    let deltaAngle = Math.PI / 180;

    let xAxis = new THREE.Vector3(1, 0, 0);
    let yAxis = new THREE.Vector3(0, 1, 0);
    let zAxis = new THREE.Vector3(0, 0, 1);

    // let rx = camera.rotation.x;
    // let ry = camera.rotation.y;
    // let rz = camera.rotation.z;
    let rx = camera.position.angleTo(xAxis)
    let ry = camera.position.angleTo(yAxis)
    let rz = camera.position.angleTo(zAxis)

    if (direction == "w") camera.position.applyAxisAngle(xAxis, deltaAngle);
    else if (direction == "s") camera.position.applyAxisAngle(xAxis, -deltaAngle);
    else if (direction == "a") camera.position.applyAxisAngle(yAxis, -deltaAngle);
    else if (direction == "d") camera.position.applyAxisAngle(yAxis, deltaAngle);

    if (normalizeRoration) {


        if (direction == "w" || direction == "s") {
            if (camera.position.y >= 0)
                camera.rotation.x += -camera.position.angleTo(zAxis) + rz;
            else
                camera.rotation.x += camera.position.angleTo(zAxis) - rz;
        }
        else if (direction == "a" || direction == "d") {
            if (camera.position.x >= 0)
                camera.rotation.y += camera.position.angleTo(zAxis) - rz;
            else
                camera.rotation.y += -camera.position.angleTo(zAxis) + rz;
        }
    }

    camera.updateProjectionMatrix();
}
