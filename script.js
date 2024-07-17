// 基本设置
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 控制器
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// 设置缩放限制
controls.minDistance = 7; // 最小缩放距离
controls.maxDistance = 12; // 最大缩放距离

// 取消旋转限制
controls.enablePan = false; // 禁用平移
controls.maxPolarAngle = Math.PI; // 设置最大极限角度为180度
controls.minPolarAngle = 0; // 设置最小极限角度为0度
controls.enableDamping = true; // 启用阻尼效果，使得旋转更平滑
controls.dampingFactor = 0.05; // 阻尼系数

// 添加光源
let light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// 加载地球纹理并创建球体
let loader = new THREE.TextureLoader();
loader.load('images/earth.jpg', function (texture) {
    let geometry = new THREE.SphereGeometry(5, 32, 32);
    let material = new THREE.MeshBasicMaterial({ map: texture });
    let earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
});

// 设置相机位置
camera.position.z = 12;

// 定义标志性模型的数组
let landmarks = [];

// 使用GLTFLoader加载标志性模型
const gltfLoader = new THREE.GLTFLoader();

gltfLoader.load('model/forest_house.glb', function (gltf) {
    const forestHouse = gltf.scene;
    forestHouse.position.set(5, 1, 0); // 设置模型位置
    forestHouse.scale.set(8, 8, 8); // 调整模型大小
    forestHouse.rotation.y = Math.PI / 1; // 旋转模型
    landmarks.push({
        mesh: forestHouse,
        info: '一个住着精灵的小房子，位于非洲西北，在这里，精灵们与自然和谐共处，生活在一个充满魔力与爱的世界中。他们的存在让这座小房子变得更加神奇，而这座小房子也成为了非洲草原上一道独特而迷人的风景。',
        position: { top: '40%', left: '20%' },
        size: { width: '250px', height: '50px' }
    });
    scene.add(forestHouse);
}, undefined, function (error) {
    console.error(error);
});

gltfLoader.load('model/tiny_house.glb', function (gltf) {
    const tinyHouse = gltf.scene;
    tinyHouse.position.set(1, 5, 0); // 设置模型位置
    tinyHouse.scale.set(0.15, 0.15, 0.15); // 调整模型大小
    tinyHouse.rotation.y = Math.PI / 1.1; // 旋转模型
    tinyHouse.rotation.x = Math.PI / 1.8; // 旋转模型
    tinyHouse.rotation.z = Math.PI / 0.29; // 旋转模型
    landmarks.push({
        mesh: tinyHouse,
        info: '一个温馨的小屋，位于北极附近，虽然寒冷，却充满了家的温暖与宁静。在这里，人们可以远离喧嚣，享受一段静谧的时光，与大自然亲密接触，感受那份纯粹的宁静与美好。',
        position: { top: '30%', left: '20%' },
        size: { width: '250px', height: '50px' }
    });
    scene.add(tinyHouse);
}, undefined, function (error) {
    console.error(error);
});

// 初始化按钮位置
function initButtonPositions() {
    const buttons = document.querySelectorAll('.control-button');
    buttons.forEach(button => {
        const offsetX = parseFloat(button.getAttribute('data-offset-x'));
        const offsetY = parseFloat(button.getAttribute('data-offset-y'));
        button.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    });
}

// 渲染函数
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    updateLandmarkInfo();
}

function updateLandmarkInfo() {
    let closestLandmark = null;
    let closestDistance = Infinity;

    landmarks.forEach(landmark => {
        let distance = camera.position.distanceTo(landmark.mesh.position);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestLandmark = landmark;
        }
    });

    if (closestLandmark && closestDistance < 7) { // 调整检测距离
        displayLandmarkInfo(closestLandmark);
    } else {
        hideAllLandmarkInfo();
    }
}

function displayLandmarkInfo(landmark) {
    hideAllLandmarkInfo();
    const infoContainer = document.getElementById('landmark-info-container');
    const infoElement = document.createElement('div');
    infoElement.className = 'landmark-info';
    infoElement.style.top = landmark.position.top;
    infoElement.style.left = landmark.position.left;
    infoElement.style.width = landmark.size.width;
    infoElement.style.height = landmark.size.height;
    infoElement.innerHTML = `
        <div>${landmark.info}</div>
    `;
    infoContainer.appendChild(infoElement);
    infoElement.style.display = 'block';
}

function hideAllLandmarkInfo() {
    const infoContainer = document.getElementById('landmark-info-container');
    infoContainer.innerHTML = '';
}

animate();
initButtonPositions();

// 处理窗口大小调整
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 添加按钮事件
document.getElementById('button1').addEventListener('click', () => {
    alert('敬请期待');
});

document.getElementById('button2').addEventListener('click', () => {
    alert('敬请期待');
});

document.getElementById('button3').addEventListener('click', () => {
    alert('敬请期待');
});

document.getElementById('button4').addEventListener('click', () => {
    alert('敬请期待');
});

// 自定义按钮样式
document.getElementById('button1').style.backgroundImage = 'url(images/button.png)';
document.getElementById('button2').style.backgroundImage = 'url(images/button.png)';
document.getElementById('button3').style.backgroundImage = 'url(images/button.png)';
document.getElementById('button4').style.backgroundImage = 'url(images/button.png)';
