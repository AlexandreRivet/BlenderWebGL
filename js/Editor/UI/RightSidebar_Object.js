RightSidebar.Object3D = function(editor) {
    'use strict';
    
    var context = this;
    
    var events = editor.mEvents;
    
    var container = new UIHidingPanel('OBJECT');
    container.setVisible(false);
    
    // NAME
    var objectNamePanel = new UIPanel();
    var objectName = new UIInput().setStyle({"background-color": "#333", "color": "#eee"}).change(function() {
        
        editor.setObjectName(editor.mEditObject, objectName.getValue());
        
    });
        
    objectNamePanel.add(new UIText('Name').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectNamePanel.add(objectName.setStyle({"width" : "200px", "margin": "0px 5px"}));
    
    container.add(objectNamePanel);
    
    // POSITION
    var objectPositionPanel = new UIPanel();
    var objectPositionX = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee","border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    var objectPositionY = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    var objectPositionZ = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    
    objectPositionPanel.add(new UIText('Position').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectPositionPanel.add(objectPositionX);
    objectPositionPanel.add(objectPositionY);
    objectPositionPanel.add(objectPositionZ);
    
    container.add(objectPositionPanel);
    
    // ROTATION
    var objectRotationPanel = new UIPanel();
    var objectRotationX = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    var objectRotationY = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    var objectRotationZ = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    
    objectRotationPanel.add(new UIText('Rotation').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectRotationPanel.add(objectRotationX);
    objectRotationPanel.add(objectRotationY);
    objectRotationPanel.add(objectRotationZ);
    
    container.add(objectRotationPanel);
    
    // SCALE
    var objectScalePanel = new UIPanel();
    var objectScaleX = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(updateScaleX);
    var objectScaleY = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(updateScaleY);
    var objectScaleZ = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(updateScaleZ);
    var objectScaleLink = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_scalelink').setStyle({"border": "none", "vertical-align": "middle"}), new UILabel('').setClass('LabelForCheckbox'));
    
    objectScalePanel.add(new UIText('Scale').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectScalePanel.add(objectScaleX);
    objectScalePanel.add(objectScaleY);
    objectScalePanel.add(objectScaleZ);
    objectScalePanel.add(objectScaleLink);
    
    container.add(objectScalePanel);
    
    var objectBtnsPanel = new UIPanel();
    var panelForPlacement = new UIPanel().setStyle({"width": "220px", "position": "relative", "margin": "0 auto" });
    var btn_remove = new UIButton('Remove object').setStyle({"padding": "2px", "width": "100px"}).click(function(e) {
      
        var object = editor.mEditObject;
        
        var parent = object.parent;        
        editor.removeObject(object);
        editor.selectObject(parent);
        
    });
    var btn_edit = new UIButton('Edit object').setStyle({"padding": "2px", "width": "100px"}).click(function(e) {
      
        editor.setMode(EditMode.OBJECT);
        
    });
    panelForPlacement.add(btn_remove);
    panelForPlacement.add(btn_edit);
    objectBtnsPanel.add(panelForPlacement);
    
    container.add(objectBtnsPanel);
    
    
    events.sceneModeChanged.add(function() {
       
        if (editor.mEditMode === EditMode.SCENE) {
         
            container.setVisible(true);            
            
        } else if (editor.mEditMode === EditMode.OBJECT) {
         
            container.setVisible(false);
            
        }
        
    });
    
    events.objectSelected.add(function(object) {
        if (object != null) {
            container.setVisible(true);
            
            updateUI(object);
            
        } else {
            container.setVisible(false);   
        }
    });
    
    events.objectChanged.add(function(object) {
       
        if (object !== editor.mEditObject)
            return;
        
        updateUI(object);
        
    });
    
    function updateScaleX() {
        
        var object = editor.mEditObject;
        
        if (objectScaleLink.getValue() === true) {
            
            var scale = objectScaleX.getValue() / object.scale.x;
            
            objectScaleY.setValue(objectScaleY.getValue() * scale);
            objectScaleZ.setValue(objectScaleZ.getValue() * scale);
            
        }
        
        update();
        
    }
    
    function updateScaleY() {
        
        var object = editor.mEditObject;
        
        if (objectScaleLink.getValue() === true) {
            
            var scale = objectScaleY.getValue() / object.scale.y;
            
            objectScaleX.setValue(objectScaleX.getValue() * scale);
            objectScaleZ.setValue(objectScaleZ.getValue() * scale);
            
        }
        
        update();
        
    }
    
    function updateScaleZ() {
        
        var object = editor.mEditObject;
        
        if (objectScaleLink.getValue() === true) {
            
            var scale = objectScaleZ.getValue() / object.scale.z;
            
            objectScaleX.setValue(objectScaleX.getValue() * scale);
            objectScaleY.setValue(objectScaleY.getValue() * scale);
            
        }
        
        update();
        
    }
    
    
    function update() {
        
        var object = editor.mEditObject;
        
        if (check(object)) {
         
            object.position.x = objectPositionX.getValue();
            object.position.y = objectPositionY.getValue();
            object.position.z = objectPositionZ.getValue();
            
            object.rotation.x = objectRotationX.getValue();
            object.rotation.y = objectRotationY.getValue();
            object.rotation.z = objectRotationZ.getValue();
            
            object.scale.x = objectScaleX.getValue();
			object.scale.y = objectScaleY.getValue();
			object.scale.z = objectScaleZ.getValue();
            
        }
        
        
        events.objectChanged.dispatch(object);
        
    }
    
    function updateUI(object) {
        
        if (object instanceof THREE.Scene) {
         
            objectBtnsPanel.setVisible(false);
            
        } else {
         
            objectBtnsPanel.setVisible(true);
            
        }        
     
        objectName.setValue(object.name);
        
        objectPositionX.setValue( object.position.x );
		objectPositionY.setValue( object.position.y );
		objectPositionZ.setValue( object.position.z );

		objectRotationX.setValue( object.rotation.x );
		objectRotationY.setValue( object.rotation.y );
		objectRotationZ.setValue( object.rotation.z );

		objectScaleX.setValue( object.scale.x );
		objectScaleY.setValue( object.scale.y );
		objectScaleZ.setValue( object.scale.z );
        
    }
    
    return container;    
};