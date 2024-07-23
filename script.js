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
controls.minDistance = 9; // 最小缩放距离
controls.maxDistance = 15; // 最大缩放距离

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

function addLandmark(position, info, modelPath, color = 0xff0000, scale = 0.1, label = '', landmarkModelPath = null, labelOffset = { x: 0, y: 0 }) {
    // 默认的圆球模型
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const landmark = new THREE.Mesh(geometry, material);

    landmark.position.copy(position);
    landmark.scale.set(scale, scale, scale); // 设置点位的缩放比例

    // 创建标签元素
    const labelElement = document.createElement('div');
    labelElement.className = 'label';
    labelElement.innerText = label;
    labelElement.style.position = 'absolute';
    labelElement.style.display = 'none'; // 初始时隐藏标签
    document.body.appendChild(labelElement);

    landmark.userData = { info, modelPath, color, scale, isVisible: false, labelElement, labelOffset };
    landmarks.push(landmark);
    scene.add(landmark);
}

// 更新点位属性的函数
function updateLandmarkProperties(index, color, scale) {
    if (index >= 0 && index < landmarks.length) {
        const landmark = landmarks[index];
        landmark.material.color.set(color);
        landmark.scale.set(scale, scale, scale);
        landmark.userData.color = color; // 更新userData中的颜色
        landmark.userData.scale = scale; // 更新userData中的大小
    }
}

addLandmark(
    new THREE.Vector3(5, 1, 0), 
    '住着精灵的小房子，非洲西北的茂密森林深处，仿佛与自然融为一体。这是一个充满爱与和平的地方，仿佛童话中的仙境，让人流连忘返。', 
    'model/forest_house.glb',
    0x00ff00, 
    0.2, 
    '精灵之家', 
    { x: -50, y: -20 } // 设置标签偏移
);

addLandmark(
    new THREE.Vector3(1, 5, 0), 
    '一个神奇的温馨小屋，位于北极附近，虽然寒冷，却充满了家的温暖与宁静。在这里可以享受静谧，与大自然亲密接触，感受宁静与美好。', 
    'model/tiny_house.glb', 
    0x0000ff, 
    0.15, 
    '温馨小屋', 
    { x: 0, y: -30 } // 设置标签偏移
);

addLandmark(
    new THREE.Vector3(-5.05, 0, 0.7), 
    '太平洋中央一座神秘的方尖碑,它的四面墙壁上布满了古老而复杂的符文和图案，闪烁着淡淡的光辉，似乎在述说着一个尘封已久的传说。', 
    'model/stylized_egyptian_pillar.glb', 
    0xffff00, 
    0.25, 
    '神秘方尖碑', 
    { x: 10, y: -40 } // 设置标签偏移
);

addLandmark(
    new THREE.Vector3(-1, 2.2, -4.5), 
    '在中国云南省的苍翠山脉之间，有一座外星科技造就的神秘悬浮商店，独特的外形和神奇的悬浮能力，吸引了无数探险者和游客前来一探究竟。', 
    'model/guest_house.glb', 
    0xffff00, 
    0.25, 
    '反重力商店', 
    { x: 10, y: -40 } // 设置标签偏移
);

addLandmark(
    new THREE.Vector3(-1, 4, 3), 
    '在一尊温柔的女性天使雕像，静静的站立在在美国中部一个隐秘角落，散发着宁静而祥和的气息，她不仅是一件艺术品，更是一种精神的象征。', 
    'model/graveyard_angel_statue.glb', 
    0xffff00, 
    0.25, 
    '静谧天使', 
    { x: 10, y: -40 } // 设置标签偏移
);


addLandmark(
    new THREE.Vector3(-3.15, -2.4, -3.2), 
    '澳大利亚沙漠的天空中，高悬着一座令人望而生畏的魔法浮空监狱，它展示魔法力量与技术的奇迹，象征着无尽的威严与神秘。', 
    'model/cube_world_ethereal_prison.glb', 
    0xffff00, 
    0.25, 
    '浮空监狱', 
    { x: 10, y: -40 } // 设置标签偏移
);

updateLandmarkProperties(0, 0x00ffff, 0.15);
updateLandmarkProperties(1, 0x00ffff, 0.15);
updateLandmarkProperties(2, 0x00ffff, 0.15);
updateLandmarkProperties(3, 0x00ffff, 0.15);
updateLandmarkProperties(4, 0x00ffff, 0.15);
updateLandmarkProperties(5, 0x00ffff, 0.15);

// 初始化按钮位置
function initButtonPositions() {
    const buttons = document.querySelectorAll('.control-button');
    buttons.forEach(button => {
        const offsetX = parseFloat(button.getAttribute('data-offset-x'));
        const offsetY = parseFloat(button.getAttribute('data-offset-y'));
        button.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    });
}

// 检测点位是否在视野内的函数
function isInView(landmark, horizontalThreshold = 0.5, verticalThreshold = 0.5) {
    const frustum = new THREE.Frustum();
    const cameraViewProjectionMatrix = new THREE.Matrix4();
    camera.updateMatrixWorld();
    cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

    if (!frustum.intersectsObject(landmark)) {
        return false;
    }

    const screenPosition = landmark.position.clone();
    screenPosition.project(camera);

    // 检测视野的阈值
    const inHorizontalView = Math.abs(screenPosition.x) < horizontalThreshold;
    const inVerticalView = Math.abs(screenPosition.y) < verticalThreshold;

    // 计算点位与相机的夹角，避免检测到地球背面上的点位
    const vectorToCamera = new THREE.Vector3().subVectors(camera.position, landmark.position).normalize();
    const landmarkNormal = new THREE.Vector3().copy(landmark.position).normalize();
    const angle = landmarkNormal.angleTo(vectorToCamera);

    // 设置夹角阈值（例如，PI / 2 表示90度）
    const angleThreshold = Math.PI / 2;

    return inHorizontalView && inVerticalView && angle < angleThreshold;
}

// 渲染函数
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    updateLandmarkInfo(0.3, 0.5);
}

function updateLandmarkInfo(horizontalThreshold = 0.5, verticalThreshold = 0.5) {
    landmarks.forEach(landmark => {
        const isVisible = isInView(landmark, horizontalThreshold, verticalThreshold);
        const screenPosition = landmark.position.clone();
        screenPosition.project(camera);

        const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
        const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;

        const labelElement = landmark.userData.labelElement;
        const labelOffset = landmark.userData.labelOffset;
        labelElement.style.left = `${x + labelOffset.x}px`;
        labelElement.style.top = `${y + labelOffset.y}px`;

        if (isVisible) {
            landmark.material.color.set(0x70dbdb); // 改变颜色表示在视野内
            labelElement.style.display = 'block';
        } else {
            landmark.material.color.set(0x545454); // 改变颜色表示不在视野内
            labelElement.style.display = 'none';
        }
    });
}

// 修改显示弹出窗口的代码以确保模型正确显示
function showPopup(info, modelPath,closeButtonPosition = { top: '100px', right: '10px' }) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    const closeButton = document.getElementById('close-popup');

    // 清除之前的内容
    popupContent.innerHTML = '';

    // 创建文字信息的div
    const infoDiv = document.createElement('div');
    infoDiv.innerText = info;
    infoDiv.style.marginBottom = '50px'; // 添加一些间距，避免文字和模型贴在一起
    popupContent.appendChild(infoDiv);

    // 创建并添加3D模型的渲染器
    const modelRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    modelRenderer.setSize(300, 300); // 根据popup大小调整渲染器大小
    modelRenderer.setClearColor(0x000000, 0.2); // 设置渲染器背景透明
    modelRenderer.setPixelRatio(window.devicePixelRatio); // 设置像素比
    modelRenderer.domElement.style.borderRadius = '10px'; // 可选：设置渲染器画布的圆角
    popupContent.appendChild(modelRenderer.domElement);

    // 创建弹出窗口的场景和相机
    const modelScene = new THREE.Scene();
    const modelCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    modelCamera.position.z = 2;

    // 添加光源到弹出窗口的场景
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // 环境光
    modelScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 方向光
    directionalLight.position.set(1, 1, 1).normalize();
    modelScene.add(directionalLight);

    // 加载并展示模型
    gltfLoader.load(modelPath, function (gltf) {
        const model = gltf.scene;
        model.traverse(function (node) {
            if (node.isMesh) {
                node.material.side = THREE.FrontSide; // 确保只渲染前面，防止穿透现象
                node.material.depthTest = true; // 启用深度测试
                node.material.depthWrite = true; // 启用深度写入
            }
        });
        model.scale.set(1, 1, 1); // 设置模型大小，这里可以调整比例
        modelScene.add(model);
    
        function renderModel() {
            requestAnimationFrame(renderModel);
            model.rotation.y += 0.008; // 使模型旋转
            modelRenderer.render(modelScene, modelCamera);
        }
        renderModel();
    });

    // 设置关闭按钮的位置
    closeButton.style.setProperty('--close-button-top', closeButtonPosition.top);
    closeButton.style.setProperty('--close-button-right', closeButtonPosition.right);

    popup.style.display = 'block';
}


// 隐藏弹出窗口
function hidePopup() {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    popup.style.display = 'none';
    popupContent.innerHTML = '';
}

document.getElementById('close-popup').addEventListener('click', hidePopup);

// 处理窗口大小调整
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 添加点击事件
window.addEventListener('click', (event) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(landmarks, true); // 加上 true 参数以检测子对象

    if (intersects.length > 0) {
        const landmark = intersects[0].object;
        const { info, modelPath } = landmark.userData;
        showPopup(info, modelPath);
    }
});

animate();
initButtonPositions();

// 初始化按钮位置
document.getElementById('button1').style.backgroundImage = 'url(images/button.png)';
document.getElementById('button2').style.backgroundImage = 'url(images/button.png)';
document.getElementById('button3').style.backgroundImage = 'url(images/button.png)';
document.getElementById('button4').style.backgroundImage = 'url(images/button.png)';

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
