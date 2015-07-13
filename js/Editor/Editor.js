/*global window, console, check */
/*global THREE, EditorEvent */

var EditMode = 
    {
        SCENE: 1,
        OBJECT: 2
    };
Object.freeze(EditMode);

var SelectionMode =
    {
        POINTS: 1,
        FACES: 2
    };
Object.freeze(SelectionMode);

var Editor = function (name) {
    'use strict';
    
    this.mName = name;
    
    this.mEvents = {
      
        // Clear the editor
        editorCleared : new signals.Signal(),
        
        // Mode changed
        selectionModeChanged: new signals.Signal(),
        
        // Transform changed
        transformModeChanged: new signals.Signal(),
        
        // Scene graph has to be updated
        sceneGraphChanged: new signals.Signal(),
        
        // Geometry and material changed 
        geometryChanged: new signals.Signal(),
        materialChanged: new signals.Signal(),
        
        // Update for objects
        objectSelected: new signals.Signal(),
        objectAdded: new signals.Signal(),
        objectChanged: new signals.Signal(),
        objectRemoved: new signals.Signal(),
        
        // Update helpers
        helperAdded: new signals.Signal(),
        helperRemoved: new signals.Signal(),
        
        // Window resized
        windowResized: new signals.Signal(),
        
        // Change mode SCENE <=> OBJECT
        sceneModeChanged: new signals.Signal(),
        
        // Animation + rigidbody
        animatorLaunched: new signals.Signal(),
        rigidbodyLaunched: new signals.Signal(),
        rigidbodyStop: new signals.Signal(),
        rigidbodyReset: new signals.Signal(),
        
        // Shader edition
        shaderEdited: new signals.Signal(),
        shaderClosed: new signals.Signal(),
        
        // Right click
        rightClick: new signals.Signal()
    };
    
    this.mCameras =
        {
            persp:  new THREE.PerspectiveCamera(50, 1, 1, 100000),
            top:    new THREE.PerspectiveCamera(50, 1, 1, 100000),
            front:  new THREE.PerspectiveCamera(50, 1, 1, 100000),
            left:   new THREE.PerspectiveCamera(50, 1, 1, 100000)
        }
    
    // Loader
    this.mLoader = new Loader(this);
    
    // Principal Scene
    this.mScene = new THREE.Scene();
    this.mScene.name = 'Scene';
    
    this.mSceneHelpers = new THREE.Scene();
    this.mSceneHelpers.name = 'Scene Helpers';
    
    // Secondary scene for editing an object
    this.mEditionScene = new THREE.Scene();
    this.mEditionScene.name = 'Scene Edition';
    
    this.mEditObjectInObjectMode = new THREE.Mesh(undefined, new THREE.MeshBasicMaterial({'color': 0xffffff, 'side': 2}));
    this.mEditionScene.add(this.mEditObjectInObjectMode);
    
    this.mEditionHelpersScene = new THREE.Scene();
    this.mEditionHelpersScene.name = 'Scene Edition Helpers';
    
    this.mObjectCount = 0;
    this.mObjects = {};
    this.mGeometries = {};
    this.mMaterials = {};
    this.mTextures = {};
    
    this.mEditObject = null;
    this.mMaterialEditObject = null;
    this.mGeometryEditObject = null;
        
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
    
    if (check(this.mEditObject))
        this.mEditObject.add(object);
    else
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
    
    var context = this;
    
    object.traverse(function(child) {
    
        context.removeHelper(child);
        
    });
    
    
    object.parent.remove(object);
    if(check(object.rigidBody) && this.mEditMode === EditMode.OBJECT)
    {
        object.rigidBody.remove();
        delete(object.rigidBody);
    }
    this.mEvents.objectRemoved.dispatch(object);
    this.mEvents.sceneGraphChanged.dispatch();    
};

Editor.prototype.removeHelper = function(object) {
    'use strict';
    
    if ( check(this.mHelpers[ object.id ])) {

        var helper = this.mHelpers[ object.id ];
		helper.parent.remove( helper );
		
        delete this.mHelpers[ object.id ];

		this.mEvents.helperRemoved.dispatch( helper );

    }
    
};

Editor.prototype.selectObject = function (object) {
    'use strict';
    
    if (this.mEditObject === object)
        return;
    var animationSelected = ANIMATIONMGR.getAnimationSelectedByObject(object);
    ANIMATIONMGR.mAnimationSelected = animationSelected;
    
    ANIMATIONEDITOR.updateDisplayCursors(animationSelected);
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

    if (this.mEditMode === EditMode.OBJECT) {

        this.mMaterialEditObject = this.mEditObject.material;

        this.mEditObjectInObjectMode.geometry = this.mEditObject.geometry.clone();
    
    } else if (this.mEditMode === EditMode.SCENE) {

        this.mEditObject.material = this.mMaterialEditObject;

        this.mEvents.sceneGraphChanged.dispatch();
        this.mEvents.objectSelected.dispatch(this.mEditObject);
        
    }
    
    this.mEvents.sceneModeChanged.dispatch();    
};

Editor.prototype.clear = function() {
    'use strict';
    
    this.setMode(EditMode.SCENE);
    
    var cameras = this.mCameras;
    
    cameras.persp.position.fromArray([500, 250, 500]);
    cameras.persp.lookAt(new THREE.Vector3(0, 0, 0));
    
    cameras.top.position.fromArray([0, 250, 0]);
    cameras.top.lookAt(new THREE.Vector3(0, 0, 0));
    
    cameras.front.position.fromArray([0, 0, 250]);
    cameras.front.lookAt(new THREE.Vector3(0, 0, 0));
    
    cameras.left.position.fromArray([-250, 0, 0]);
    cameras.left.lookAt(new THREE.Vector3(0, 0, 0));
    
    var objects = this.mScene.children;
    
    while(objects.length > 0)
        this.removeObject(objects[0]);
    
    this.mGeometries = {};
    this.mMaterials = {};
    this.mTextures = {};
    
    this.deselectObject();    
    
    this.mEvents.editorCleared.dispatch();
};