//GET A RANDOM NUMBER FUNCTION
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var renderer,
    scene,
    camera,
    mesh,
    myCanvas = document.getElementById('myCanvas'),
    cassies = [],

    //RENDERER

    renderer = new THREE.WebGLRenderer({
        canvas: myCanvas,
        antialias: true,
        alpha: true
    });
renderer.setClearColor(0xffffff, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//SCENE
scene = new THREE.Scene();

//CAMERA

camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 100;

// var camera = new THREE.OrthographicCamera(100 / -2, 50 / 2, 100 / 2, 100 / -2, 1, 1000);


// camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 0, 10);
scene.add(camera);



//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);

var material = new THREE.MeshNormalMaterial({
    wireframe: true,
    wireframeLinewidth: 6,
    transparent: false,
    opacity: 1,

});

//ORBIT CONTROL
// controls = new THREE.OrbitControls(camera, renderer.domElement);


//GEOMETRIES

//LOADING THE CASSIE

var loader = new THREE.JSONLoader();
loader.load('https://res.cloudinary.com/dilgjzsjl/raw/upload/v1513016147/cassietutorial_ipuvym.json', handle_load);

//ONE CASSIE
// function handle_load(geometry, materials) {

//     var material = new THREE.MeshNormalMaterial();
//     mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);
//     mesh.position.z = -30;
//     mesh.position.y = -4;
//     console.log(mesh);

// }

function handle_load(geometry, materials) {

    for (var i = 0; i < 100; i++) {

        var material = new THREE.MeshNormalMaterial();
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = getRandomArbitrary(-40, 50);
        mesh.position.y = getRandomArbitrary(-30, 30);
        mesh.position.z = getRandomArbitrary(-100, 0);
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;
        scene.add(mesh);
        cassies.push(mesh);
    }
}




// var geometry2 = new THREE.SphereGeometry(50, 20, 20);
// var mesh2 = new THREE.Mesh(geometry2, material);
// mesh2.position.z = -200;
// mesh2.position.x = 100;
// scene.add(mesh2);

// var geometry3 = new THREE.PlaneGeometry(10000, 10000, 100, 100);
// var mesh3 = new THREE.Mesh(geometry3, material);
// mesh3.rotation.x = -90 * Math.PI / 180;
// mesh3.position.y = -40;
// scene.add(mesh3);






//RENDER LOOP

render();



function render() {


    camera.position.z = Math.sin(Date.now() * 0.0001) * 35;

    camera.position.x = Math.sin(Date.now() * 0.0006) * 3;
    camera.position.y = Math.sin(Date.now() * 0.0006) * 5;
    // camera.lookAt(mesh2.position);
    

    /*
    for (var i = 0; mesh && i < 50; i++) {
        mesh.rotation.x += (0.5 / 300 * Math.PI);
    }
    */
    for (var i = 0; i < cassies.length; i++) {
        cassies[i].rotation.x += (0.5 / 300 * Math.PI);
    }
    // console.log(mesh.length);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
    // controls.update();
}