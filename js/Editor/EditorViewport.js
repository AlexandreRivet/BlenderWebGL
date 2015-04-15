var Viewport = function (editor, container) {
    'use strict';
    
    this.mEditor = editor;
    
    this.mRenderer = new THREE.WebGLRenderer();
    this.mRenderer.setSize(container.offsetWidth, container.offsetHeight);
    this.mRenderer.setClearColor(0xdddddd);
    container.appendChild(this.mRenderer.domElement);
};

Viewport.prototype.init = function () {
    'use strict';
    
    // Création de la grille
    var grid = new THREE.GridHelper(500, 25);
    this.mEditor.mHelpersScene.add(grid);
    
    
    // this.render();
};

Viewport.prototype.render = function () {
    'use strict';
    
    var scene = this.mEditor.mPrincipalScene;
    var sceneHelpers = this.mEditor.mHelpersScene;
    var cameras = this.mEditor.mCameras;    
    
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