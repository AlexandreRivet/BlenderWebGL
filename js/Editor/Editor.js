/*global window, console, check */
/*global THREE, EditorEvent */

var EditMode = 
    {
        SCENE: 1,
        OBJECT: 2
    };
Object.freeze(EditMode);

var Editor = function (name) {
    'use strict';
    
    this.mName = name;
    
    this.mEvents = {
      
        // Clear the editor
        editorCleared : new signals.Signal(),
        
        transformModeChanged: new signals.Signal(),
        
        sceneGraphChanged: new signals.Signal(),
        
        geometryChanged: new signals.Signal(),
        
        objectSelected: new signals.Signal(),
        objectAdded: new signals.Signal(),
        objectChanged: new signals.Signal(),
        objectRemoved: new signals.Signal(), 
        
        windowResized: new signals.Signal(),
        
        sceneModeChanged: new signals.Signal()
    };
    
    this.mCameras =
        {
            persp: new THREE.PerspectiveCamera(50, 1, 1, 100000),
            top: new THREE.OrthographicCamera(-100, 100, 100, -100, 1, 100000),
            front: new THREE.OrthographicCamera(-100, 100, 100, -100, 1, 100000),
            left: new THREE.OrthographicCamera(-100, 100, 100, -100, 1, 100000),        
        }
    
    // Principal Scene
    this.mScene = new THREE.Scene();
    this.mScene.name = 'Scene';
    
    this.mSceneHelpers = new THREE.Scene();
    this.mSceneHelpers.name = 'Scene Helpers';
    
    // Secondary scene for editing an object
    this.mEditionScene = new THREE.Scene();
    this.mEditionScene.name = 'Scene Edition';
    
    //TODO: SceneHelper for edition ??
    this.mEditionHelpersScene = new THREE.Scene();
    this.mEditionHelpersScene.name = 'Scene Edition Helpers';
    
    this.mObjectCount = 0;
    this.mObjects = {};
    this.mGeometries = {};
    this.mMaterials = {};
    this.mTextures = {};
    
    this.mEditObject = null;
    this.mTransformEditObject = {"position": new THREE.Vector3(), "rotation": new THREE.Euler(), "scale": new THREE.Vector3()};
    
    this.mHelpers = {};
    
    this.mEditMode = EditMode.SCENE;    
};

Editor.prototype.getName = function () {
    'use strict';
    return this.mName;
};

Editor.prototype.setName = function (name) {
    'use strict';
    this.mName = name;
};

Editor.prototype.setObjectName = function(object, name) {
    'use strict';
        
    object.name = name;
    
    this.mEvents.sceneGraphChanged.dispatch();
    
};

Editor.prototype.addObject = function (object) {
    'use strict';

    var context = this;
    
    // TODO: Add Helpers ??
    
    this.mScene.add(object);
    
    this.mEvents.objectAdded.dispatch(object);
    this.mEvents.sceneGraphChanged.dispatch();
};

Editor.prototype.removeObject = function(object) {
    'use strict';
    
    if (!check(object.parent))
        return;
    
    // TODO: Remove Helpers ??
    
    object.parent.remove(object);
    
    this.mEvents.objectRemoved.dispatch(object);
    this.mEvents.sceneGraphChanged.dispatch();    
}

Editor.prototype.selectObject = function (object) {
    'use strict';
    
    if (this.mEditObject === object)
        return;
    
    this.mEditObject = object;
    
    this.mEvents.objectSelected.dispatch(object);
};

Editor.prototype.selectObjectById = function(id) {
    'use strict';
    
    this.selectObject(this.mScene.getObjectById(id, true));    
};

Editor.prototype.deselectObject = function() {
    'use strict';
    
    this.selectObject(null);
};

Editor.prototype.setMode = function(mode) {
    'use strict';
    
    if (!check(this.mEditObject))
        return;
    
    this.mEditMode = mode;
    
    // Save editObject transform
    if (this.mEditMode === EditMode.OBJECT) {
        
        this.mTransformEditObject.position.copy(this.mEditObject.position);
        this.mTransformEditObject.rotation.copy(this.mEditObject.rotation);
        this.mTransformEditObject.scale.copy(this.mEditObject.scale);
        
        this.mEditObject.position.set(0, 0, 0);
        this.mEditObject.rotation.set(0, 0, 0);
        this.mEditObject.scale.set(1, 1, 1);
        
        this.mEditionScene.add(this.mEditObject);
        
    } else if (this.mEditMode === EditMode.SCENE) {

        this.mEditObject.position.copy(this.mTransformEditObject.position);
        this.mEditObject.rotation.copy(this.mTransformEditObject.rotation);
        this.mEditObject.scale.copy(this.mTransformEditObject.scale);
    
        debugger;
        
        this.mScene.add(this.mEditObject);
        this.mEvents.sceneGraphChanged.dispatch();
        this.mEvents.objectSelected.dispatch(this.mEditObject);
        
        
    }
    
    this.mEvents.sceneModeChanged.dispatch();    
};

Editor.prototype.updateOrthographicsCameras = function(w, h) {
    'use strict';
    
    var fW = w / 2;
    var fH = h / 2;
    
    this.mCameras.top.left = -fW;
    this.mCameras.top.right = fW;
    this.mCameras.top.top = fH;
    this.mCameras.top.bottom = -fH;
    this.mCameras.top.updateProjectionMatrix();
    
    this.mCameras.front.left = -fW;
    this.mCameras.front.right = fW;
    this.mCameras.front.top = fH;
    this.mCameras.front.bottom = -fH;
    this.mCameras.front.updateProjectionMatrix();
    
    this.mCameras.left.left = -fW;
    this.mCameras.left.right = fW;
    this.mCameras.left.top = fH;
    this.mCameras.left.bottom = -fH;
    this.mCameras.left.updateProjectionMatrix();
}

Editor.prototype.clear = function() {
    'use strict';
    
    var objects = this.mScene.children;
    
    while(objects.length > 0)
        this.removeObject(objects[0]);
    
    this.mGeometries = {};
    this.mMaterials = {};
    this.mTextures = {};
    
    this.deselectObject();    
};