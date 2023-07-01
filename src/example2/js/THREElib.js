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
const createBox = (x, y, z, color) => new THREE.Mesh(cubeGeo(x, y, z), Phong(color));

const createSphere = (r = 1, color = 0xffffff) => new THREE.Mesh(new THREE.SphereGeometry(r, 20, 20), Phong(color));


const createLightsSphere = (r = 10, density = 8, i = 1, color = 0xffffff) => {
    const center = new THREE.Object3D();

    const lightTop = new THREE.PointLight(color, i);
    lightTop.position.set(0, r, 0);
    center.add(lightTop);
    const lightBot = new THREE.PointLight(color, i);
    lightBot.position.set(0, -r, 0);
    center.add(lightBot);

    const stepsX = density;
    const stepsY = (density - 1) / 2;
    const angleX = 2 * Math.PI / stepsX;
    const angleY = Math.PI / stepsY;
    for (let i = 1; i <= stepsY; i++) {
        for (let j = 0; j < stepsX; j++) {
            const light = new THREE.PointLight(color, i);
            light.position.set(
                r * Math.sin(j * angleX) * Math.sin(i * angleY),
                r * Math.cos(i * angleY),
                r * Math.cos(j * angleX) * Math.sin(i * angleY));
            center.add(light);
        }
    }

    return center;
}


const createObjectsSphere = (object, r = 10, density = 8, i = 1, color = 0xffffff) => {
    const center = new THREE.Object3D();

    const lightTop = object.clone();
    lightTop.position.set(0, r, 0);
    center.add(lightTop);
    const lightBot = object.clone();
    lightBot.position.set(0, -r, 0);
    center.add(lightBot);

    const stepsX = density;
    const stepsY = (density - 1) / 2;
    const angleX = 2 * Math.PI / stepsX;
    const angleY = Math.PI / stepsY;
    for (let i = 1; i <= stepsY; i++) {
        for (let j = 0; j < stepsX; j++) {
            const light = object.clone();
            light.position.set(
                r * Math.sin(j * angleX) * Math.sin(i * angleY),
                r * Math.cos(i * angleY),
                r * Math.cos(j * angleX) * Math.sin(i * angleY));
            center.add(light);
        }
    }

    return center;
}


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




const onResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', onResize);

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.altKey) {
        // console.log(true);
        // camera.position.multiplyScalar(e.deltaY * 0.01);
        if (e.deltaY > 0)
            camera.position.add(camera.position.clone().normalize());
        else
            camera.position.sub(camera.position.clone().normalize());
    }
    else {
        camera.fov += e.deltaY * 0.05;
    }
    camera.updateProjectionMatrix();
});

window.addEventListener('keydown', (e) => {
    if (e.key == "+")
        camera.fov -= 5;
    else if (e.key == "-")
        camera.fov +=5;
    else if (e.key == "w" || e.key == "s" || e.key == "a" || e.key == "d")
        moveCamera(e.key);
    camera.updateProjectionMatrix();
});

let velocity = 0;

const moveCamera = (direction) => {
    ;
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
