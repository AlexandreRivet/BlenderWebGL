/*global window, THREE, console */

var Editor = function (name, container) {
    'use strict';
    this.mName = name;
    this.mScene = new THREE.Scene();
    this.mObject = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff}));
    this.mScene.add(this.mObject);
    
    // debugger;
    
    // this.mCameraList = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    this.mCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.mCamera.position.z = 5;
    
    this.mRenderer = new THREE.WebGLRenderer();
    this.mRenderer.setPixelRatio(window.devicePixelRatio);
    this.mRenderer.setSize(container.offsetWidth, container.offsetHeight);
    this.mRenderer.setClearColor(0xdddddd);
    this.mRenderer.domElement.style.position = "relative";
    container.appendChild(this.mRenderer.domElement);
};

Editor.prototype.getName = function () {
    'use strict';
    return this.mName;
};

Editor.prototype.setName = function (name) {
    'use strict';
    this.mName = name;
};

Editor.prototype.isActive = function () {
    'use strict';
    return this.mActive;
};

Editor.prototype.setActive = function (active) {
    'use strict';
    this.mActive = active;
};

Editor.prototype.prepareFrame = function () {
    'use strict';

    // Some updates if we need
    
    this.render();
};

Editor.prototype.render = function () {
    'use strict';
    console.log("Editor " + this.mName + " is rendering.");
    
    this.mObject.rotation.x += 0.1;
    this.mObject.rotation.y += 0.1;
    
    // debugger;
    
    this.mRenderer.render(this.mScene, this.mCamera);
    
    var cameraName, camera;
    
    // this.mRenderer.render(this.mScene, this.mCamera);
    
    /*
    for (cameraName in this.mCameraList) {
        if (this.mCameraList.hasOwnProperty(cameraName)) {
            camera =  this.mCameraList[cameraName];
            if (camera.active === true && camera.object !== null) {
                this.mRenderer.render(this.mScene, camera.object);
            }
        }
    }*/
};

Editor.prototype.setClearColor = function (color) {
    'use strict';
    this.mRenderer.setClearColor(color);
};