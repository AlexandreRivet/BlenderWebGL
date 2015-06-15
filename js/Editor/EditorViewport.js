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
    
    cameras.top.position.fromArray([0, 100, 0]);
    cameras.top.lookAt(new THREE.Vector3(0, 0, 0));
    
    cameras.front.position.fromArray([0, 0, 100]);
    cameras.front.lookAt(new THREE.Vector3(0, 0, 0));
    
    cameras.left.position.fromArray([-100, 0, 0]);
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
    
    transformControls.addEventListener('mouseDown', function() 
                                       {
        controls.enabled = false;
        
    });
    
    transformControls.addEventListener('mouseUp', function() {
        
        events.objectChanged.dispatch(transformControls.object);
        controls.enabled = true; 
        
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
    
    var controls = new THREE.EditorControls(cameras.persp, container.mDOM);
    controls.center.fromArray([0, 0, 0]);
    controls.addEventListener('change', function() {
    
        transformControls.update();
        render();
    });
    
    
    // Events
    events.editorCleared.add(function() {
    
        controls.center.set(0, 0, 0);
        render();
        
    });
    
    events.transformModeChanged.add(function(mode) {
    
        transformControls.setMode(mode);
        
    });
    
    events.sceneGraphChanged.add(function() {
    
        render();
        
    });
    
    events.sceneModeChanged.add(function() {
       
        editor.updateOrthographicsCameras(container.mDOM.offsetWidth, container.mDOM.offsetHeight);
        
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
    
        object.traverse(function(child) {
            
            objects.push(child);
            
        });
        
        render();
            
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
      
        cameras.persp.aspect = container.mDOM.offsetWidth / container.mDOM.offsetHeight;
        cameras.persp.updateProjectionMatrix();
        
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
            
            // back
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