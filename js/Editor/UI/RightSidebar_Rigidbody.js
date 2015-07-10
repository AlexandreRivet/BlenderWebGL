RightSidebar.Rigidbody = function(editor) {
    'use strict';
    
    var context = this;
    
    var events = editor.mEvents;
    
    var container = new UIHidingPanel('RIGIDBODY');
    container.setVisible(false);
    
    
    
    // Rigidbody
    /*var objectRigidBodyPanel = new UIPanel();
    var objectRigidBodyLink = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_rigidbodylink').setStyle({"border": "none", "vertical-align": "middle"}), new UILabel('').setClass('LabelForCheckbox')).change(update);
    objectRigidBodyPanel.add(new UIText('RigidBody').setStyle({"width": "70px", "display": "inline-block", "font-size": "12px"}));
    objectRigidBodyPanel.add(objectRigidBodyLink);*/
    
    // IsKinematic
    var objectKinematicPanel = new UIPanel();
    var objectKinematicLink = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_kinematiclink').setStyle({"border": "none", "vertical-align": "middle"}), new UILabel('').setClass('LabelForCheckbox')).change(update);
    objectKinematicPanel.add(new UIText('isKinematic').setStyle({"width": "70px", "display": "inline-block", "font-size": "12px"}));
    objectKinematicPanel.add(objectKinematicLink);
    
    // ShowBox
    var objectShowBoxPanel = new UIPanel();
    var objectShowBoxLink = new UICheckboxGroup(new UICheckbox(false).setID('checkbox_showboxlink').setStyle({"border": "none", "vertical-align": "middle"}), new UILabel('').setClass('LabelForCheckbox')).change(update);
    objectShowBoxPanel.add(new UIText('Show Box').setStyle({"width": "70px", "display": "inline-block", "font-size": "12px"}));
    objectShowBoxPanel.add(objectShowBoxLink);
    
    // Mass
    var objectMassPanel = new UIPanel();
    var objectMass = new UINumber(0.0, 1.0).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee","border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    
    objectMassPanel.add(new UIText('Mass').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectMassPanel.add(objectMass);
    
    // Buttons
    var objectBtnsPanel = new UIPanel();
    var panelForPlacement = new UIPanel().setStyle({"width": "100%", "position": "relative", "margin": "0 auto" });
    var btn_run = new UIButton('Run').setStyle({"padding": "2px 3% 2px 3%", "width": "30%"}).click(function(e) {
      editor.mEvents.rigidbodyLaunched.dispatch();
    });
    var btn_stop = new UIButton('Stop').setStyle({"padding": "2px 3% 2px 3%", "width": "30%"}).click(function(e) {
      editor.mEvents.rigidbodyStop.dispatch();
    });
    var btn_reset = new UIButton('Reset').setStyle({"padding": "2px 3% 2px 3%", "width": "30%"}).click(function(e) {
      editor.mEvents.rigidbodyReset.dispatch();
    });
    panelForPlacement.add(btn_run);
    panelForPlacement.add(btn_stop);
    panelForPlacement.add(btn_reset);
    objectBtnsPanel.add(panelForPlacement);
    
    // POSITION
    var objectVelocityPanel = new UIPanel();
    var objectVelocityX = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee","border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    var objectVelocityY = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    var objectVelocityZ = new UINumber(0.0, 0.01).setStyle({"width": "60px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
    
    objectVelocityPanel.add(new UIText('Velocity').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectVelocityPanel.add(objectVelocityX);
    objectVelocityPanel.add(objectVelocityY);
    objectVelocityPanel.add(objectVelocityZ);
    
    //container.add(objectRigidBodyPanel);
    container.add(objectKinematicPanel);
    container.add(objectShowBoxPanel);
    container.add(objectMassPanel);
    container.add(objectVelocityPanel);
    container.add(objectBtnsPanel);
    
    events.sceneModeChanged.add(function() {
       
        if (editor.mEditMode === EditMode.SCENE) {
         
            container.setVisible(true);            
            
        } else if (editor.mEditMode === EditMode.OBJECT) {
         
            container.setVisible(false);
            
        }
        
    });
    
    events.objectSelected.add(function(object) {
        if (object != null && !(object instanceof THREE.Light)) {
            
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
    
    function update() {
        
        var object = editor.mEditObject;
        
        if (check(object)) {
            object.rigidBody.isKinematic = objectKinematicLink.getValue();
            object.rigidBody.showBox = objectShowBoxLink.getValue();
            object.rigidBody.box.visible = objectShowBoxLink.getValue();
            object.rigidBody.mass = objectMass.getValue();
            object.rigidBody.velocity.x = objectVelocityX.getValue();
            object.rigidBody.velocity.y = objectVelocityY.getValue();
            object.rigidBody.velocity.z = objectVelocityZ.getValue();
            
            events.objectChanged.dispatch(object);
            
        }
        
    }
    
    function updateUI(object) {
        
        if (!check(object) || object instanceof THREE.Light)
            return;
        objectKinematicLink.setValue( object.rigidBody.isKinematic );
        objectShowBoxLink.setValue( object.rigidBody.showBox );
        objectMass.setValue( object.rigidBody.mass );
        objectVelocityX.setValue( object.rigidBody.velocity.x );
        objectVelocityY.setValue( object.rigidBody.velocity.y );
        objectVelocityZ.setValue( object.rigidBody.velocity.z );
        
    }
    
    return container;    
};