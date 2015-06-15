var RightSidebar_Geometry = function(editor) {
    'use strict';
    
    var events = editor.mEvents;
    
    var container = new UIHidingPanel('GEOMETRY');
    container.setVisible(false);
    
    container.add(new RightSidebar_Geometry_Info(editor));
    
    function build() {
        
        var object = editor.mEditObject;

		if ( check(object) && object.geometry && editor.mEditMode == EditMode.OBJECT ) {

			var geometry = object.geometry;
            
            container.setVisible(true);
        
        } else {
         
            container.setVisible(false);
            
        }
        
    };
    
    events.sceneModeChanged.add(build);
    
    return container;    
};