const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000033);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, 8);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

const material1 = Lambert(0x00aa00);
const material2 = Phong(0xee0000);

const cube1 = new THREE.Mesh(cubeGeo(), material1);
const cube2 = new THREE.Mesh(cubeGeo(), material2);

cube1.position.x = -3;
cube2.position.x = 3;

scene.add(cube1, cube2);


scene.add(createObjectsSphere(createPiontLight(0.1, 0xffffff), 20, 8, 12));
const spheresSphere = createObjectsSphere(createSphere(0.1, 0xffff00), 2, 16, 24);
scene.add(spheresSphere);

scene.add(createPiontLight(2, 0x0000ff)); // blue light at center

//scene.add(createAxis(), createBigBox()); // navigation axis and border walls

const ship = createShip();
ship.position.set(0, -1, 2);
ship.rotation.x = 0.5;
ship.add(camera);

scene.add(ship);

let debugIterator = 1;

const animate = () => {
    requestAnimationFrame(animate);
    
    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.015;
    
    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.015;
    
    spheresSphere.rotation.y += 0.01;   
    spheresSphere.rotation.z += 0.001;   
    
    
    renderer.render(scene, camera);
};

const init = () => {
    console.log("start");

    setTimeout( ()=>{
        document.body.appendChild(renderer.domElement);
        animate();
    }, 10);
    console.log("initialized correctly");
}
