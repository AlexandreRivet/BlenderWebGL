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
        
        helperAdded: new signals.Signal(),
        
        windowResized: new signals.Signal(),
        
        sceneModeChanged: new signals.Signal()
    };
    
    this.mCameras =
        {
            persp:  new THREE.PerspectiveCamera(50, 1, 1, 100000),
            top:    new THREE.PerspectiveCamera(50, 1, 1, 100000),
            front:  new THREE.PerspectiveCamera(50, 1, 1, 100000),
            left:   new THREE.PerspectiveCamera(50, 1, 1, 100000)
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
    
    object.traverse(function(child) {
       
        if (check(child.geometry)) context.addGeometry(child.geometry);
        if (check(child.material)) context.addMaterial(child.material);
        
        context.addHelper(child);
        
    });
    
    this.mScene.add(object);
    
    this.mEvents.objectAdded.dispatch(object);
    this.mEvents.sceneGraphChanged.dispatch();
};

Editor.prototype.addGeometry = function(geometry) {
    'use strict';
    
    this.mGeometries[geometry.uuid] = geometry;
    
};

Editor.prototype.addMaterial = function(material) {
    'use strict';
    
    this.mMaterials[material.uuid] = material;
    
};

Editor.prototype.addHelper = function(object) {
    'use strict';
    
    var geometry = new THREE.SphereGeometry( 20, 4, 2 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    
    var helper;
    
    if (object instanceof THREE.PointLight) {
     
        helper = new THREE.PointLightHelper(object, 10);
        
    } else if (object instanceof THREE.SpotLight) {
     
        helper = new THREE.SpotLightHelper(object, 10);
        
    } else if (object instanceof THREE.DirectionalLight) {
     
        helper = new THREE.DirectionalLightHelper(object, 10);
        
    } else {
	
		return;
	
	}
    
    var picker = new THREE.Mesh(geometry, material);
    picker.name = 'picker';
    picker.userData.object = object;
    picker.visible = false;
    helper.add(picker);
    
    this.mSceneHelpers.add(helper);
    this.mHelpers[object.id] = helper;
    
    this.mEvents.helperAdded.dispatch(helper);    
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
        
        // this.mEditObject.material.wireframe = true;
        this.mEditObject.position.set(0, 0, 0);
        this.mEditObject.rotation.set(0, 0, 0);
        this.mEditObject.scale.set(1, 1, 1);
        
        this.mEditionScene.add(this.mEditObject);
        
    } else if (this.mEditMode === EditMode.SCENE) {

        // this.mEditObject.material.wireframe = false;
        this.mEditObject.position.copy(this.mTransformEditObject.position);
        this.mEditObject.rotation.copy(this.mTransformEditObject.rotation);
        this.mEditObject.scale.copy(this.mTransformEditObject.scale);
 
        this.mScene.add(this.mEditObject);
        this.mEvents.sceneGraphChanged.dispatch();
        this.mEvents.objectSelected.dispatch(this.mEditObject);
        
    }
    
    this.mEvents.sceneModeChanged.dispatch();    
};

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