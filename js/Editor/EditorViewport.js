var requestIdAnimation = null;
var requestIdRigidbody = null;

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
    
    // Maillage    
    var selectionMode = SelectionMode.POINTS;
    var verticesMgr = new VerticesManager(editor);
    var facesMgr = new FacesManager(editor);
    
    // For Keyboard
    var ctrlPressed = false;
    
    // Edition
    var lastFaceIndex = -1;    
    
    // Helpers
    var gridScene = new THREE.GridHelper(400, 25);
    var gridEdition = new THREE.GridHelper(400, 25);
    var objectForSelection = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({'color': 0x000000}));
    objectForSelection.visible = false;
    
    sceneHelpers.add(gridScene);
    editionHelpersScene.add(gridEdition);
    editionHelpersScene.add(objectForSelection);
    
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
    
    var shaderEditorOpened = false;    
    
    // Transform Control Selection
    var selectionTransformControl = new THREE.TransformControls(cameras.persp, container.mDOM);
    selectionTransformControl.setMode( 'translate' );
    
    selectionTransformControl.addEventListener('change', function() {
    
        var object = selectionTransformControl.object;
        
        /*if (check(object)) {
         
            if (
            
        }*/
                
        render();
        
    });
    
    selectionTransformControl.addEventListener('mouseDown', function() {
        
        editPerspControls.enabled = false;
        
    });
    
    selectionTransformControl.addEventListener('mouseUp', function() {
        
        selectionTransformControl.update();
        editPerspControls.enabled = true; 
        
        render();
        
    });
    // selectionTransformControl.attach(objectForSelection);
    // editionHelpersScene.add(selectionTransformControl);
    
    
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
        
        if (shaderEditorOpened)
            return;
        
        // To avoid drag
        if (mouseDownPosition.distanceTo(mouseUpPosition) === 0) {
   
            var intersects = [];
            if (editor.mEditMode === EditMode.SCENE)
                intersects = getIntersects(mouseUpPosition, objects);
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
                
                    var faceIndex = intersect.faceIndex;
                    
                    if (ctrlPressed) {
                     
                        facesMgr.pushFace(faceIndex);
                        
                    } else {
                        
                        facesMgr.addFace(faceIndex);
                        
                    }
                    
                    var bary = facesMgr.getBarycentreFaces();
                    
                    objectForSelection.position.set(bary.x, bary.y, bary.z);
                    objectForSelection.visible = true;                    
                    
                }
                
            } else if (editor.mEditMode === EditMode.OBJECT) {
                
                facesMgr.clearFaces();
                objectForSelection.visible = false;
                
            } else if (editor.mEditMode === EditMode.SCENE) {
                
                editor.selectObject(null);
                
            }
            
            render();
        }
        
    };
    
    var move = function() {
        
        if (shaderEditorOpened)
            return;
        
        var intersects = [];
        if (editor.mEditMode === EditMode.SCENE)
            return;
        else if (editor.mEditMode === EditMode.OBJECT)
            intersects = getIntersects(mouseUpPosition, editionScene.children);
        
        var faces = editor.mEditObject.geometry.faces;
        
        // Je survole une face
        if (intersects.length > 0) {
                
            var intersected = intersects[0];
            
            // Je survole une face différente de l'ancienne
            if (intersected.faceIndex != lastFaceIndex)
            {   
                
                // Traitement de l'ancienne face
                if (lastFaceIndex != -1) {
                 
                    // Si la face était sélectionnée faut la remettre en bleue
                    if (check(faces[lastFaceIndex].selected) && faces[lastFaceIndex].selected) 
                    {
                     
                        faces[lastFaceIndex].color = new THREE.Color(0x0000ff);
                        
                    }
                    
                    // Si la face n'était pas sélectionnée on la remet en blanc
                    
                    else
                    {
                     
                        faces[lastFaceIndex].color = new THREE.Color(0xffffff);
                        
                    }
                    
                }
                
                // Je survole une face sélectionnée
                if (check(faces[intersected.faceIndex].selected) && faces[intersected.faceIndex].selected)
                {
                    
                    editor.mEditObject.geometry.faces[intersected.faceIndex].color = new THREE.Color(0x3498db);
                    
                }                
                
                // Je survole une face non sélectionnée
                
                else
                {
                    
                    editor.mEditObject.geometry.faces[intersected.faceIndex].color = new THREE.Color(0xff0000);
                    
                }          
                
                lastFaceIndex = intersected.faceIndex;
                
                render();
            }
            
            // Je survole la même face
            else   
            {
                // Je survole une face sélectionnée
                if (check(faces[intersected.faceIndex].selected) && faces[intersected.faceIndex].selected)
                {
                    
                    editor.mEditObject.geometry.faces[intersected.faceIndex].color = new THREE.Color(0x3498db);
                    
                }
                
            }
            
        } 
        
        // Je ne survole plus rien
        
        else 
        {
            // Si je survolais quelque chose
            if (lastFaceIndex != -1) 
            {

                // Si la face était sélectionnée faut la remettre en bleue
                if (check(faces[lastFaceIndex].selected) && faces[lastFaceIndex].selected) 
                {

                    faces[lastFaceIndex].color = new THREE.Color(0x0000ff);

                }

                // Si la face n'était pas sélectionnée on la remet en blanc

                else
                {

                    faces[lastFaceIndex].color = new THREE.Color(0xffffff);

                }
                
            }
            
        }
        
        editor.mEditObject.geometry.colorsNeedUpdate = true;        
        render();
        
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
        
        if (e.button == 0 && contextualMenu.mVisible === false) {
            
            events.leftClick.dispatch(e.clientX, e.clientY);
            
            click();
            
        } else if (e.button == 2) {
            
            events.rightClick.dispatch(e.clientX, e.clientY);
            
        }
        
        document.removeEventListener('mouseup', mouseUp, false);
    };
    
    var mouseMove = function(e) {
      
        e.preventDefault();
        
        var position = getMousePosition(container.mDOM, e.clientX, e.clientY);
        mouseUpPosition.fromArray(position);
        
        move();
        
    };
    
    var keydown = function(e) {
        
        switch(e.which) {
         
            case 17:
                ctrlPressed = true;
                break;
                
        }        
     
    };
    
    var keyup = function(e) {
     
        switch(e.which) {
         
            case 17:
                ctrlPressed = false;
                break;
                
            case 69:
                facesMgr.move(new THREE.Vector3(0, 10, 0));
                break;
            
            case 70:
                facesMgr.move(new THREE.Vector3(10, 0, 0));
                break;
                
            case 82:
                facesMgr.move(new THREE.Vector3(0, 0, -10));
                break;
                
            case 83:
                facesMgr.move(new THREE.Vector3(-10, 0, 0));
                break;
                
            case 87:
                facesMgr.move(new THREE.Vector3(0, 0, 10));
                break;
            
            case 88:
                facesMgr.move(new THREE.Vector3(0, -10, 0));
                break;
                
        }
        
        render();
        
    };
    
    // TODO: Do we want our application on tablet ??
    document.addEventListener('keydown', keydown, false);
    document.addEventListener('keyup', keyup, false);

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
    
    events.selectionModeChanged.add(function(mode) {
       
        selectionMode = mode;
        
    });
    
    events.sceneModeChanged.add(function() {
        
        objectForSelection.visible = false;
        
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
            
            // Clean Faces Manager
            facesMgr.cleanContext();
            
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
            
            // Inform Faces Manager
            facesMgr.setObject(editor.mEditObject);
            
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
    
    events.geometryChanged.add(function(geometry) {
        
        editor.mEditObject.rigidBody.box.update();
        
        render();
        
    });
    
    events.materialChanged.add(function(material) {
       
        render();
        
    });
    
    events.shaderEdited.add(function(object, type) {
       
        // Disable object controls
        editPerspControls.enabled = false;
        editTopControls.enabled = false;
        editFrontControls.enabled = false;
        editLeftControls.enabled = false;
        
        // Disable mouse interaction
        shaderEditorOpened = true;
        
        
    });
    
    events.shaderClosed.add(function() {
       
        // Enable object controls
        editPerspControls.enabled = true;
        editTopControls.enabled = true;
        editFrontControls.enabled = true;
        editLeftControls.enabled = true;
        
        // Enable mouse interaction
        shaderEditorOpened = false;
        
    });
    
    events.objectAdded.add(function(object) {
    
        var materialsNeedUpdate = false;
        
        object.traverse(function(child) {
            
            if (child instanceof THREE.Light) materialsNeedUpdate = true;
            
            objects.push(child);
            
        });
        
        if (materialsNeedUpdate === true) updateMaterials();
       
        if(!(object instanceof THREE.Light))
        {
            RIGIDBODY.append({ 
			scene: scene, 						//	Scene THREE.js nécessaire pour les calculs physiques par rapport aux autres objets
			sceneHelpers : sceneHelpers,
            obj: object, 						//	Objet physique
			update: false, 						//	Mise-à-jour automatique ou pas du composant (Sinon il faut appeller la méthode update du composant rigidBody)
			isKinematic: false, 				//	Physique des corps solides active ou pas
			mass: 1.0	//	Masse de l'objet en Kg (Bon, pas très réaliste pour le moment mais on fait avec ... =_=)
            });
            object.rigidBody.showBox = true;						//	Box de collisions visible
            object.rigidBody.box.update();
        }
        
        render();
            
    });
    
    events.helperAdded.add(function(object) {
        if (check(object))
            objects.push(object.getObjectByName('picker'));
        
    });
    
    events.helperRemoved.add(function(object) {
        if (check(object))
            objects.splice(objects.indexOf(object.getObjectByName('picker')), 1);
        
    });
    
    events.objectChanged.add(function(object) {
        transformControls.update();
        if (check(object))
        {
            if (check(editor.mHelpers[object.id])) {
                editor.mHelpers[object.id].update();
            }
            if(check(object.rigidBody))
                object.rigidBody.box.update();   
        }
        
        
        render();
        
    });
    
    events.objectRemoved.add(function(object) {
        
        if (check(object))
        {
            object.traverse(function(child) {

                objects.splice(objects.indexOf(child), 1);

            });
        }
        
        render();
        
    });
    
    events.windowResized.add(function() {
    
        renderer.domElement.style.display = 'none';
        
        // Get offset (little custom for our case)
        var oX = container.mDOM.offsetLeft;
        var oY = container.mDOM.offsetParent.offsetTop;
        
        // Get new size
        var w = container.mDOM.offsetWidth;
        var h = container.mDOM.offsetHeight;
        
        var w_over2 = w / 2; 
        var h_over2 = h / 2;
        
        // Set area interaction
        mainControls.setAreaInteraction(oX, oY, w, h);
        editPerspControls.setAreaInteraction(oX, oY, w_over2, h_over2);
        editTopControls.setAreaInteraction(w_over2 + oX, oY, w_over2, h_over2);
        editFrontControls.setAreaInteraction(oX, h_over2 + oY, w_over2, h_over2);
        editLeftControls.setAreaInteraction(w_over2 + oX, h_over2 + oY, w_over2, h_over2);
        
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
        if(requestIdAnimation != null)
            return;
        
        renderAnimation();    
    });
    
    events.rigidbodyLaunched.add(function() {
        if(requestIdRigidbody != null)
            return;
        
        if(!RIGIDBODY.isInit)
        {
            var object_tmp;
            for(var i = 0; i < scene.children.length; i++)
            {
                object_tmp = scene.children[i];
                if(!(check(object_tmp.rigidBody)))
                    continue;
                object_tmp.rigidBody.init();
            }
            RIGIDBODY.isInit = true;
        }
        RIGIDBODY.isRun = true;
        renderRigidbody();    
    });
    events.rigidbodyStop.add(function() {
        if(requestIdRigidbody == null)
            return;
        
        window.cancelAnimationFrame(requestIdRigidbody);
        requestIdRigidbody = null;
        
        RIGIDBODY.isRun = false;
    });
    events.rigidbodyReset.add(function() {
        if(!RIGIDBODY.isInit)
            return;
        editor.mEvents.rigidbodyStop.dispatch();
        var object_tmp;
        for(var i = 0; i < scene.children.length; i++)
        {
            object_tmp = scene.children[i];
            if((object_tmp instanceof THREE.Light))
                continue;
            object_tmp.rigidBody.reset();
            object_tmp.rigidBody.box.update();
        }
        editor.mEvents.objectChanged.dispatch(editor.mEditObject);
        RIGIDBODY.isInit = false;
        RIGIDBODY.isRun = false;
    });
    // Renderer
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x555555);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    renderer.autoUpdateScene = false;
    
    container.mDOM.appendChild(renderer.domElement);   
    
	var shader = new Shader(editor);
	container.add(shader);
    
    var contextualMenu = new ContextualMenu(editor);
    container.add(contextualMenu);
    
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
            
            editor.mEvents.objectChanged.dispatch(editor.mEditObject);
            
            var currentTime = ANIMATIONMGR.mDurationPlay/1000;
            ANIMATIONEDITOR.setPosWithTime(ANIMATIONEDITOR.mCursorPrincipal, currentTime, ANIMATIONMGR.mEnd);
            ANIMATIONEDITOR.updateTimeEditorAnimation(currentTime);

            if(ANIMATIONMGR.getState() == STATE.STOP)
            {
                ANIMATIONEDITOR.getPlayButton().setTextContent('>');
                window.cancelAnimationFrame(requestIdAnimation);
                requestIdAnimation = null;
                return;
            }
            
             
        } 
        
        requestIdAnimation = requestAnimationFrame(renderAnimation); 
    };
    function renderRigidbody() { 
        var object_tmp;
        for(var i = 0; i < scene.children.length; i++)
        {
            object_tmp = scene.children[i];
            if(!(check(object_tmp.rigidBody)))
                continue;
            object_tmp.rigidBody.update();
        }
        editor.mEvents.objectChanged.dispatch(editor.mEditObject);
        
        requestIdRigidbody = requestAnimationFrame(renderRigidbody); 
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