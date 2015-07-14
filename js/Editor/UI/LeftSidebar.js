var LeftSidebar = function(editor) {
    'use strict';
    
    var container = new UIPanel();
    container.addClass('leftPanel');
    
    var events = editor.mEvents;
    
    // MOVE BUTTON
    var buttonM = new UIButton('Mov.');
    buttonM.addClass('sideBar_btn');
    buttonM.setDisabled(true);
    buttonM.click(function() {
        
        events.transformModeChanged.dispatch('translate');
        
    });
    container.add(buttonM);
    
    // MOVE BUTTON
    var buttonR = new UIButton('Rot.');
    buttonR.addClass('sideBar_btn');
    buttonR.setDisabled(true);
    buttonR.click(function() {
        
        events.transformModeChanged.dispatch('rotate');
        
    });
    container.add(buttonR);
    
    // MOVE BUTTON
    var buttonS = new UIButton('Sca.');
    buttonS.addClass('sideBar_btn');
    buttonS.setDisabled(true);
    buttonS.click(function() {
        
        events.transformModeChanged.dispatch('scale');
        
    });
    container.add(buttonS);

    events.objectSelected.add(function(object) {
       
        if (object instanceof THREE.Scene) {
          
            buttonM.setDisabled(true); 
            buttonR.setDisabled(true);
            buttonS.setDisabled(true);
            
        } else if ( object instanceof THREE.Light ||
		   ( object instanceof THREE.Object3D && object.userData.targetInverse ) ) {
            
            buttonM.setDisabled(false); 
            buttonR.setDisabled(true);
            buttonS.setDisabled(true);
            
        } else if (object instanceof THREE.Object3D) {
            
            buttonM.setDisabled(false); 
            buttonR.setDisabled(false);
            buttonS.setDisabled(false);
            
        } else {
         
            buttonM.setDisabled(true); 
            buttonR.setDisabled(true);
            buttonS.setDisabled(true);
            
        }
        
    });
    
    events.sceneModeChanged.add(function() {
       
        if (editor.mEditMode === EditMode.SCENE) {
         
            buttonM.setDisabled(false); 
            buttonR.setDisabled(false);
            buttonS.setDisabled(false);
            
        } else if (editor.mEditMode === EditMode.OBJECT) {
         
            buttonM.setDisabled(true);
            buttonR.setDisabled(true);
            buttonS.setDisabled(true);
            
        }
        
    });
    
    
    return container;    
}