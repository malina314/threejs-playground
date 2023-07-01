const init = () => {
    console.log("start");
}
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x003366);
    scene.background = new THREE.Color(0x000033);
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    setTimeout( ()=>{
        document.body.appendChild(renderer.domElement);
    }, 150);


    const material1 = Lambert(0x00aa00);
    const material2 = Phong(0xee0000);

    const cube1 = new THREE.Mesh(cubeGeo(), material1);
    const cube2 = new THREE.Mesh(cubeGeo(), material2);

    cube1.position.x = -3;
    cube2.position.x = 3;

    // scene.add(cube1, cube2);
    cube1.add(cube2);
    scene.add(cube1);
    cube2.add(camera);


    scene.add(createLightsSphere(20, 8, 0.05, 0xffff00));
    const spheresSphere = createObjectsSphere(createSphere(0.1), 2, 32, 0.3, 0xffff00);
    scene.add(spheresSphere);

    scene.add(new THREE.PointLight(0x0000ff, 0.8));

    scene.add(createAxis(), createBigBox());

    let i = 1;
    // let globalAngleX = 0;
    // const obj1 = new THREE.Object3D();
    // const obj2 = new THREE.Object3D();
    // obj1.add(obj2);
    // scene.add(obj1);

    // animate();
// }

const animate = () => {
    requestAnimationFrame(animate);
    
    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.015;
    
    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.015;
    
    spheresSphere.rotation.y += 0.01;   
    spheresSphere.rotation.z += 0.001;   
    // scene.background = setRandomColor();
    
    // camera.rotation.y -= Math.PI / 180;
    // if (camera.rotation.y <= -Math.PI)
    //     camera.rotation.y = 0;
    // console.log(camera.rotation.y);
    //move("w", 1);
    // move("s", 1);

    // obj1.rotation.y += 0.005;
    // obj1.rotation.x += 0.002;
    // console.log(cube1.position);
    // scene.add(cube2);
    // renderer.render(scene, camera);

    // console.log(cube2.position);
    // cube1.add(cube2);

    // camera.matrix=cube2.matrix;
    // camera.updateProjectionMatrix();
    // camera.lookAt(cube2);
        
    renderer.render(scene, camera);


    // if (++i >= 18)
    //     debugger;
};

setTimeout( ()=>{
    animate();
}, 160);



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

console.log("executed");
