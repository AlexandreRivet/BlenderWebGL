var Viewport = function (editor) {
    'use strict';
    
    var events = editor.mEvents;
    
    var container = new UIPanel();
    container.addClass('viewportPanel');

    var scene = editor.mScene;
    var sceneHelpers = editor.mSceneHelpers;
    var editionScene = editor.mEditionScene;
    var editionHelpersScene = editor.mEditionHelpersScene;
    
    // Objects
    var objects = [];
    
    // Helpers
    var gridScene = new THREE.GridHelper(400, 25);
    var gridEdition = new THREE.GridHelper(400, 25);
    sceneHelpers.add(gridScene);
    editionHelpersScene.add(gridEdition);
    
    // Set cameras
    var cameras = editor.mCameras;
    
    cameras.persp.position.fromArray([500, 250, 500]);
    cameras.persp.lookAt(new THREE.Vector3(0, 0, 0));
    
    cameras.top.position.fromArray([0, 250, 0]);
    cameras.top.lookAt(new THREE.Vector3(0, 0, 0));
    
    cameras.front.position.fromArray([0, 250, 0]);
    cameras.front.lookAt(new THREE.Vector3(0, 0, 0));
    
    cameras.left.position.fromArray([-250, 0, 0]);
    cameras.left.lookAt(new THREE.Vector3(0, 0, 0));
    
    
    // Transform control
    var transformControls = new THREE.TransformControls(cameras.persp, container.mDOM);
    transformControls.setMode( 'translate' );
    
    transformControls.addEventListener('change', function() {
        
        var object = transformControls.object;
        
        if (check(object)) {
            
            if (editor.mHelpers[object.id] !== undefined) {
                
                editor.mHelpers[object.id].update();
                
            }
        }
        
        render();
    });
    
    transformControls.addEventListener('mouseDown', function() {
        
        mainControls.enabled = false;
        
    });
    
    transformControls.addEventListener('mouseUp', function() {
        
        events.objectChanged.dispatch(transformControls.object);
        mainControls.enabled = true; 
        
    });
    transformControls.detach();    
    sceneHelpers.add(transformControls);
    
    // Picking and interaction
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    
    var getIntersects = function(point, object) {
        
        mouse.set((point.x * 2) - 1, - (point.y * 2) + 1);
        
        // TODO: Depends mode and viewport
        
        raycaster.setFromCamera(mouse, cameras.persp);
        
        if (object instanceof Array) {
            
            return raycaster.intersectObjects(object);
            
        }
        
        return raycaster.intersectObject(object);
        
    };
    
    var mouseDownPosition = new THREE.Vector2();
    var mouseUpPosition = new THREE.Vector2();
    
    var getMousePosition = function (domElement, x, y) {
      
        var rect = domElement.getBoundingClientRect();
        return [( (x - rect.left) / rect.width ), ( (y - rect.top) / rect.height )];
        
    };
    
    var click = function() {
        
        // To avoid drag
        if (mouseDownPosition.distanceTo(mouseUpPosition) == 0) {
            
            var intersects = getIntersects(mouseUpPosition, objects);
            
            if (intersects.length > 0) {
                
                var object = intersects[0].object;
                
                if (object.userData.object !== undefined) {
                
                    editor.selectObject(object.userData.object);
                    
                } else {
                
                    editor.selectObject(object);
                    
                }
                
            } else {
                
                editor.selectObject(null);
                
            }
            
            render();
        }
        
    };
    
    
    var mouseDown = function(e) {
    
        e.preventDefault();
        
        var position = getMousePosition(container.mDOM, e.clientX, e.clientY);
        mouseDownPosition.fromArray(position);
        
        document.addEventListener('mouseup', mouseUp, false);
        
    };
    
    var mouseUp = function(e) {
    
        var position = getMousePosition(container.mDOM, e.clientX, e.clientY);
        mouseUpPosition.fromArray(position);
        
        click();
        
        document.removeEventListener('mouseup', mouseUp, false);
    };
    
    // TODO: Do we want our application on tablet ??
    
    container.mousedown(mouseDown);
    
    // Camera controller
    var mainControls = new THREE.EditorControls(cameras.persp, container.mDOM);
    mainControls.center.fromArray([0, 0, 0]);
    mainControls.addEventListener('change', function() {
       
        transformControls.update();
        render();
        
    });
    
    var editPerspControls = new THREE.EditorControls(cameras.persp, container.mDOM);
    editPerspControls.center.fromArray([0, 0, 0]);
    editPerspControls.addEventListener('change', function() {
       
        render();
        
    });
    editPerspControls.enabled = false;
    
    
    //TODO: Set mode allowed
    var editTopControls = new THREE.EditorControls(cameras.top, container.mDOM);
    editTopControls.center.fromArray([0, 0, 0]);
    editTopControls.setActionsAllowed(false, true, true);
    editTopControls.addEventListener('change', function() {
       
        render();
        
    });
    editTopControls.enabled = false;
    
    
    var editLeftControls = new THREE.EditorControls(cameras.left, container.mDOM);
    editLeftControls.center.fromArray([0, 0, 0]);
    editLeftControls.setActionsAllowed(false, true, true);
    editLeftControls.addEventListener('change', function() {
       
        render();
        
    });
    editLeftControls.enabled = false;
    
    var editFrontControls = new THREE.EditorControls(cameras.front, container.mDOM);
    editFrontControls.center.fromArray([0, 0, 0]);
    editFrontControls.setActionsAllowed(false, true, true);
    editFrontControls.addEventListener('change', function() {
       
        render();
        
    });
    editFrontControls.enabled = false;       
    
    // Events
    events.editorCleared.add(function() {
    
        mainControls.center.set(0, 0, 0);
        render();
        
    });
    
    events.transformModeChanged.add(function(mode) {
    
        transformControls.setMode(mode);
        
    });
    
    events.sceneGraphChanged.add(function() {
    
        render();
        
    });
    
    events.sceneModeChanged.add(function() {
        
        if (editor.mEditMode === EditMode.SCENE) {
        
            // Disable object controls
            editPerspControls.enabled = false;
            editTopControls.enabled = false;
            editFrontControls.enabled = false;
            editLeftControls.enabled = false;
            
            // Enable scene controls
            mainControls.enabled = true;
            
        } else if (editor.mEditMode === EditMode.OBJECT) {
         
            // Disable scene controls
            mainControls.enabled = false;
            
            // Enable object controls
            editPerspControls.enabled = true;
            editTopControls.enabled = true;
            editFrontControls.enabled = true;
            editLeftControls.enabled = true;
            
        }
        
        render();
        
    });
    
    events.objectSelected.add(function(object) {
        
        transformControls.detach();
        
        if (check(object) && !(object instanceof THREE.Scene)) {
         
            transformControls.attach(object);
        }
        
        render();
        
    });
    
    events.objectAdded.add(function(object) {
    
        var materialsNeedUpdate = false;
        
        object.traverse(function(child) {
            
            if (child instanceof THREE.Light) materialsNeedUpdate = true;
            
            objects.push(child);
            
        });
        
        if (materialsNeedUpdate === true) updateMaterials();
        
        render();
            
    });
    
    events.helperAdded.add(function(object) {
       
        objects.push(object.getObjectByName('picker'));
        
    });
    
    events.objectChanged.add(function(object) {
       
        transformControls.update();
        
        render();
        
    });
    
    events.objectRemoved.add(function(object) {
    
        object.traverse(function(child) {
            
            objects.splice(objects.indexOf(child), 1);
            
        });
        
        render();
        
    });
    
    events.windowResized.add(function() {
    
        // Get new size
        var w = container.mDOM.offsetWidth;
        var h = container.mDOM.offsetHeight;
        var w_over2 = w / 2; 
        var h_over2 = h / 2;
        
        // Set area interaction
        mainControls.setAreaInteraction(0, 0, w, h);
        editPerspControls.setAreaInteraction(0, 0, w_over2, h_over2);
        editTopControls.setAreaInteraction(w_over2, 0, w_over2, h_over2);
        editFrontControls.setAreaInteraction(0, h_over2, w_over2, h_over2);
        editLeftControls.setAreaInteraction(w_over2, h_over2, w_over2, h_over2);
        
        
        // Set cameras aspect
        cameras.persp.aspect = w / h;
        cameras.persp.updateProjectionMatrix();
        
        cameras.top.aspect = w / h;
        cameras.top.updateProjectionMatrix();
        
        cameras.left.aspect = w / h;
        cameras.left.updateProjectionMatrix();
        
        cameras.front.aspect = w / h;
        cameras.front.updateProjectionMatrix();
        
        renderer.setSize(container.mDOM.offsetWidth, container.mDOM.offsetHeight);
        
        render();        
    });
    
    // Renderer
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x555555);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    renderer.autoUpdateScene = false;
    
    container.mDOM.appendChild(renderer.domElement);   
    
    
    function updateMaterials() {
      
        editor.mScene.traverse( function ( child ) {

			if ( child.material ) {

				child.material.needsUpdate = true;

				if ( child.material instanceof THREE.MeshFaceMaterial ) {

					for ( var i = 0; i < child.material.materials.length; i ++ ) {

						child.material.materials[ i ].needsUpdate = true;

					}

				}

			}

		} );
        
    };
    
    
    function render() {
        
        var w = container.mDOM.offsetWidth / 2;
        var h = container.mDOM.offsetHeight / 2;
        
        if (editor.mEditMode === EditMode.SCENE) {
            
            sceneHelpers.updateMatrixWorld();
            scene.updateMatrixWorld();
            
            renderer.setViewport(0, 0, w * 2, h * 2);
            
            renderer.clear();
            renderer.render(scene, cameras.persp);
            renderer.render(sceneHelpers, cameras.persp);
            
        } else if (editor.mEditMode === EditMode.OBJECT) {
            
            editionHelpersScene.updateMatrixWorld();
            editionScene.updateMatrixWorld();
            
            renderer.clear();
            
            // We want 4 views
            
            // persp
            renderer.setViewport(0, h, w, h);   
            renderer.render(editionScene, cameras.persp);
            renderer.render(editionHelpersScene, cameras.persp);
            
            // top
            renderer.setViewport(w, h, w, h);  
            renderer.render(editionScene, cameras.top);
            renderer.render(editionHelpersScene, cameras.top);            
            
            // front
            renderer.setViewport(0, 0, w, h);  
            renderer.render(editionScene, cameras.front);
            renderer.render(editionHelpersScene, cameras.front);   
            
            // left
            renderer.setViewport(w, 0, w, h); 
            renderer.render(editionScene, cameras.left);
            renderer.render(editionHelpersScene, cameras.left);   
            
        }
        

    }
      
    return container;
};