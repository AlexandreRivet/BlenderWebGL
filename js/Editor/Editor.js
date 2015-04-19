/*global window, console, check */
/*global THREE, EditorEvent */

var Editor = function (name, container) {
    'use strict';
    
    this.mName = name;
    this.mObjectCount = 0;
    
    this.mPrincipalScene = new THREE.Scene();
    this.mPrincipalScene.name = 'PrincipalScene';
    this.mObjects = {};

    this.mHelpersScene = new THREE.Scene();
    this.mHelpersScene.name = 'HelpersScene';
    this.mHelpers = {};
    
    this.mEditObjectScene = new THREE.Scene();
    this.mEditObjectScene.name = 'EditObjectScene';
    this.mEditObject = null;
    
    this.mGeometries = {};
    this.mMaterials = {};
    this.mTextures = {};
    
    this.mCameras = {};
    
    this.mEvents = new EditorEvent();
};

Editor.prototype.init = function () {
    'use strict';
    
    // Préparation de toutes les caméras
    this.mCamera = new THREE.PerspectiveCamera(50, 1, 1, 100000);
    this.mCamera.position.fromArray([500, 250, 500]);
    this.mCamera.lookAt(new THREE.Vector3().fromArray([0, 0, 0]));
    
    this.mEvents.addEvent("addObject");
    this.mEvents.addEvent("selectObject");
    this.mEvents.addEvent("transformControlModeChanged");
};

Editor.prototype.getName = function () {
    'use strict';
    return this.mName;
};

Editor.prototype.setName = function (name) {
    'use strict';
    this.mName = name;
};

Editor.prototype.addObject = function (object) {
    'use strict';
    var event = this.mEvents.getEvent("addObject");
    if (!check(event)) {
        console.error("No event 'add object' defined in this editor.");
        return;
    }
    
    this.mPrincipalScene.add(object);
    
    event.dispatch(object);
};

Editor.prototype.selectObject = function (object) {
    'use strict';
    var event = this.mEvents.getEvent("selectObject");
    
    if (this.mEditObject === object) {
        return;
    }
    
    this.mEditObject = object;
    event.dispatch(object);
};