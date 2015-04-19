var Viewport = function (editor, container) {
    'use strict';
    
    // Mémorisation de paramètres
    this.mEditor = editor;
    this.mContainer = container;
    
    // Création du renderer
    this.mRenderer = new THREE.WebGLRenderer({antialias: true });
    this.mRenderer.setClearColor(0xbbbbbb);
    this.mRenderer.setPixelRatio(window.devicePixelRatio);
    this.mRenderer.autoClear = false;
    this.mRenderer.autoUpdateScene = false;
    this.mRenderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(this.mRenderer.domElement);
    
    console.log(this.mRenderer);
    
    // Création des différentes positions
    
    // Raycast et souris
    this.mRaycaster = new THREE.Raycaster();
    this.mMouse = new THREE.Vector2();
    this.mMouseDownPosition = new THREE.Vector2();
    this.mMouseUpPosition = new THREE.Vector2();    
    
    this.mObjects = [];
};

Viewport.prototype.init = function () {
    'use strict';
    var context = this;    
    
    // Correction de l'aspect ratio de la caméra
    this.mEditor.mCamera.aspect = this.mContainer.offsetWidth / this.mContainer.offsetHeight;
    this.mEditor.mCamera.updateProjectionMatrix();
    
    // Création de la grille
    var grid = new THREE.GridHelper(400, 25);
    this.mEditor.mHelpersScene.add(grid);
    
    // Définition du transform
    var transformControls = new THREE.TransformControls(this.mEditor.mCamera, this.mContainer);
    transformControls.setMode( 'translate' );
    
    transformControls.addEventListener('change', function() {
        var object = transformControls.object;
        if (object !== undefined) {
            if (context.mEditor.mHelpers[object.id] !== undefined) {
                console.log(context.mEditor.mHelpers[object.id]);
                context.mEditor.mHelpers[object.id].update();
            }
        }
        context.render();
    });
    
    transformControls.addEventListener('mouseDown', function() {
        editorControls.enabled = false; 
    });
    
    transformControls.addEventListener('mouseUp', function() {
        editorControls.enabled = true; 
    });
    
    this.mEditor.mHelpersScene.add(transformControls);
    
    var editorControls = new THREE.EditorControls(this.mEditor.mCamera, this.mContainer);
    editorControls.addEventListener('change', function() {
        transformControls.update();
        context.render();
    });
    
    
    this.mContainer.addEventListener('mousedown', function(e) { context.mouseDown(e); }, false);
    
    // Signals
    this.mEditor.mEvents.addFunctionToEvent('addObject', function(object) {
        object.traverse(function(child) {
             context.mObjects.push(child);
        });
        context.render();
    });
    
    this.mEditor.mEvents.addFunctionToEvent('selectObject', function(object) {
        transformControls.detach();
        if (object !== null) {
            transformControls.attach(object);
        }
        context.render();
    });
    
    
    this.mEditor.mEvents.addFunctionToEvent('transformControlModeChanged', function(mode) {
        transformControls.setMode(mode);
        context.render();
    });
    
    this.render();
};

Viewport.prototype.getIntersects = function (point, object) {
    'use strict';
    this.mMouse.set((point.x * 2) - 1, -(point.y * 2) + 1);
    this.mRaycaster.setFromCamera(this.mMouse, this.mEditor.mCamera);
    if (object instanceof Array)
        return this.mRaycaster.intersectObjects(object);
    return this.mRaycaster.intersectObject(obejct);
};

Viewport.prototype.click = function () {
    'use strict';
    
    if (this.mMouseDownPosition.distanceTo(this.mMouseUpPosition) == 0) {
        var intersections = this.getIntersects(this.mMouseUpPosition, this.mObjects);
        if (intersections.length > 0) {
            var object = intersections[0].object;
            if (object.userData.object !== undefined) {
                // Select helper
                this.mEditor.selectObject(object.userData.object);
            } else {
                // Select object
                this.mEditor.selectObject(object);
            }
        } else {
            // Select nothing   
            this.mEditor.selectObject(null);
        }
    }
    this.render();
};

Viewport.prototype.mouseDown = function (event) {
    'use strict';
    event.preventDefault();
    var context = this;
    
    var mousePosition = getMousePositionInDOM(context.mContainer, event.clientX, event.clientY);
    context.mMouseDownPosition.fromArray(mousePosition);
    
    document.addEventListener('mouseup', function(e) { context.mouseUp(e); }, false);
}

Viewport.prototype.mouseUp = function (event) {
    'use strict';
    event.preventDefault();
    var context = this;
    
    var mousePosition = getMousePositionInDOM(context.mContainer, event.clientX, event.clientY);
    context.mMouseUpPosition.fromArray(mousePosition);
    
    context.click();
    
    document.removeEventListener( 'mouseup', function(e) { context.mouseUp(e); }, false);
}

Viewport.prototype.render = function () {
    'use strict';
    
    var scene = this.mEditor.mPrincipalScene;
    var sceneHelpers = this.mEditor.mHelpersScene;
    var cameras = this.mEditor.mCameras;    
    
    sceneHelpers.updateMatrixWorld();
    scene.updateMatrixWorld();
    
    this.mRenderer.clear();    
    this.mRenderer.render(scene, this.mEditor.mCamera);
    this.mRenderer.render(sceneHelpers, this.mEditor.mCamera);
    
    /*      PLUS TARD POUR LE MULTI CAMERA
    // Rendu de la scène
    for (var cam in cameras)
        this.mRenderer.render(scene, cam);
    
    // Rendu des helpers
    for (var cam in cameras)
        this.mRenderer.render(sceneHelpers, cam);
    */
};