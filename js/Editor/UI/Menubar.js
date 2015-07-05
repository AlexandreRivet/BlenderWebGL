var Menubar = function(editor) {
    'use strict';
    
    var events = editor.mEvents;
    
    var container = new UIPanel();
    container.addClass('TopPanel');
    
    container.add(new Menubar.File(editor));
    container.add(new Menubar.Add(editor));
    
    var btnQ = new UIButton('Quit edit').setStyle({"position": "absolute", "right": "10px", "padding": "2px"});
    btnQ.setVisible(false);
    btnQ.click(function() {
    
        editor.setMode(EditMode.SCENE);
        
    });
    
    container.add(btnQ);
    
    
    
    // Events
    events.sceneModeChanged.add(function() {

        if (editor.mEditMode === EditMode.SCENE) {

            btnQ.setVisible(false); 

        } else if (editor.mEditMode === EditMode.OBJECT) {

            btnQ.setVisible(true);
            $('.Menu').unbind('mouseenter mouseleave');

        }
        
    });
    
    return container;
};