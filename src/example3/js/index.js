const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000033);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, 8);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

scene.add(createObjectsSphere(createPiontLight(0.105, 0xffffff), 50, 8, 12));

const h = prompt("Enter the height of the christmastree", "5");

const christmastree = createChristmastree(h, 0.1);
scene.add(christmastree);

const animate = () => {
    requestAnimationFrame(animate);


    christmastree.rotation.y += 0.01;
    
    
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


// const light = new THREE.PointLight(0xffffff, .51);
// light.position.set(5, 0, 15);
// scene.add(light);

// const light4 = new THREE.PointLight(0xffffff, 1);
// light4.position.set(8, 0, 4);
// scene.add(light4);

// const light2 = new THREE.PointLight(0x0000ff, 2);
// light2.position.set(-5, -5, 1);
// scene.add(light2);

// const light3 = new THREE.PointLight(0x00ff00, 3);
// light3.position.set(10, 30, 4);
// scene.add(light3);



// const mirrorGeo = new THREE.BoxGeometry(50, 50, 1);
// const mirrorMat = new THREE.MeshPhongMaterial({
    //     color: 0xee0000,
    //     shininess: 0,
    //     envMap: "reflection",
    // });
// const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);

// scene.add(mirror);
