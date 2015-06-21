var requestIdAnimation;
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
    
    // Edition
    var lastFaceIndex = -1;
    
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
    
    cameras.front.position.fromArray([0, 0, 250]);
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
        if (editor.mEditMode === EditMode.SCENE) {
         
            raycaster.setFromCamera(mouse, cameras.persp);
            
        } else if (editor.mEditMode === EditMode.OBJECT) {
            
            // We have to change camera depends where mouse is in the container
            // Don't forget mouse is between -1 and 1 on x and on y
            if (mouse.x <= 0 && mouse.y >= 0) {
                mouse.set((mouse.x + 0.5) * 2, (mouse.y * 2) - 1);
                raycaster.setFromCamera(mouse, cameras.persp);
            }
            else if (mouse.x > 0 && mouse.y >= 0) {
                mouse.set((mouse.x * 2) - 1, (mouse.y * 2) - 1);
                raycaster.setFromCamera(mouse, cameras.top);
            }
            else if (mouse.x <= 0 && mouse.y < 0) {
                mouse.set((mouse.x + 0.5) * 2, (mouse.y +0.5) * 2);
                raycaster.setFromCamera(mouse, cameras.front);
            }
            else if (mouse.x > 0 && mouse.y < 0) {
                mouse.set((mouse.x * 2) - 1,(mouse.y +0.5) * 2);
                raycaster.setFromCamera(mouse, cameras.left);
            }
        }
        
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
        if (mouseDownPosition.distanceTo(mouseUpPosition) === 0) {
   
            var intersects = [];
            if (editor.mEditMode === EditMode.SCENE)
                intersects = getIntersects(mouseUpPosition, scene.children);
            else if (editor.mEditMode === EditMode.OBJECT)
                intersects = getIntersects(mouseUpPosition, editionScene.children);
            
            if (intersects.length > 0) {
                
                var intersect = intersects[0];
                
                // Mode Scene: object picking
                // Mode Object: raycast for vertices manager
                if (editor.mEditMode === EditMode.SCENE) {
                              
                    var object = intersects[0].object;
                    
                    if (object.userData.object !== undefined) {
                        
                        editor.selectObject(object.userData.object);
                    
                    } else {
                        
                        editor.selectObject(object);
                        
                    }
                    
                } else if (editor.mEditMode === EditMode.OBJECT) {
                    
                    alert("j'ai touché l'objet");
                    // console.log(intersect);
                    
                }
                
            } else if (editor.mEditMode === EditMode.SCENE) {
                
                editor.selectObject(null);
                
            }
            
            render();
        }
        
    };
    
    var move = function() {
        
        var intersects = [];
        if (editor.mEditMode === EditMode.SCENE)
            return;
        else if (editor.mEditMode === EditMode.OBJECT)
            intersects = getIntersects(mouseUpPosition, editionScene.children);
            
        if (intersects.length > 0) {
                
            var intersect = intersects[0];
            
            if (intersect.faceIndex != lastFaceIndex)
            {
                var currentFace = intersect.face;
                
                if (lastFaceIndex != -1)
                    editor.mEditObject.geometry.faces[lastFaceIndex].color.setHex(0x000000);
                
                currentFace.color.setHex(0xff0000);
                
                editor.mEditObject.geometry.colorsNeedUpdate = true;
                
                lastFaceIndex = intersect.faceIndex;
            
                render();    
            }
            
            
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
    
    var mouseMove = function(e) {
      
        e.preventDefault();
        
        var position = getMousePosition(container.mDOM, e.clientX, e.clientY);
        mouseUpPosition.fromArray(position);
        
        move();
        
    };
    
    // TODO: Do we want our application on tablet ??
    
    container.mousedown(mouseDown);
    container.mousemove(mouseMove);
    
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
        editPerspControls.center.set(0, 0, 0);
        editTopControls.center.set(0, 0, 0);
        editFrontControls.center.set(0, 0, 0);
        editLeftControls.center.set(0, 0, 0);
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
            
            // Attach transform to object
            transformControls.attach(editor.mEditObject);
            
            
        } else if (editor.mEditMode === EditMode.OBJECT) {
         
            // Disable scene controls
            mainControls.enabled = false;
            
            // Enable object controls
            editPerspControls.enabled = true;
            editTopControls.enabled = true;
            editFrontControls.enabled = true;
            editLeftControls.enabled = true;
            
            // Detach transform
            transformControls.detach();
            
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
    
    events.geometryChanged.add(function() {
        
        // Update WireframeHelper
        var helpers = editionHelpersScene.children;
        
        for (var i = 0; i < helpers.length; i++) {
         
            if (helpers[i] instanceof THREE.WireframeHelper) {
                
                helpers[i].parent.remove(helpers[i]);   
                
            }
        
        }
        
        var helper = new THREE.WireframeHelper(editor.mEditObject);
        helper.material.color.set( 0xffffff );
        editionHelpersScene.add(helper)
       
        render();
        
    });
    
    events.materialChanged.add(function(material) {
       
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
    
    events.helperRemoved.add(function(object) {
       
        objects.splice(objects.indexOf(object.getObjectByName('picker')), 1);
        
    });
    
    events.objectChanged.add(function(object) {
       
        transformControls.update();
        
        if (check(editor.mHelpers[object.id])) {
            
            editor.mHelpers[object.id].update();
            
        }
        
        render();
        
    });
    
    events.objectRemoved.add(function(object) {
    
        object.traverse(function(child) {
            
            objects.splice(objects.indexOf(child), 1);
            
        });
        
        render();
        
    });
    
    events.windowResized.add(function() {
    
        renderer.domElement.style.display = 'none';
        
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
        
        renderer.domElement.style.display = 'block';
        
        render();        
    });
    
    events.animatorLaunched.add(function() {
        renderAnimation();    
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
    var context = this;
    function renderAnimation() {
        
        if(!(ANIMATIONMGR.getState() == STATE.PAUSE))
        {
            ANIMATIONMGR.updateAnimation(); 
            
            var w = container.mDOM.offsetWidth / 2;
            var h = container.mDOM.offsetHeight / 2;

            sceneHelpers.updateMatrixWorld();
            scene.updateMatrixWorld();

            renderer.setViewport(0, 0, w * 2, h * 2);

            renderer.clear();
            renderer.render(scene, cameras.persp);
            renderer.render(sceneHelpers, cameras.persp);
            
            var currentTime = ANIMATIONMGR.mDurationPlay/1000;
            setPosWithTime(currentTime, ANIMATIONMGR.mEnd);
            updateTimeEditorAnimation(currentTime);
            if(ANIMATIONMGR.getState() == STATE.STOP)
            {
                buttonPlay.setTextContent('>');
                window.cancelAnimationFrame(requestIdAnimation);
                return;
            }
            
             
        } 
        
        requestIdAnimation = requestAnimationFrame(renderAnimation); 
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