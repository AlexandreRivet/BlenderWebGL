var RightSidebar_Geometry = function(editor) {
    'use strict';
    
    var events = editor.mEvents;
    
    var container = new UIHidingPanel('GEOMETRY');
    container.setVisible(false);
    
    container.add(new RightSidebar_Geometry_Info(editor));
    
    var parameters = new UIPanel();
    container.add(parameters);
    
    function build() {
        
        var geometry = editor.mEditObject.geometry;     

		if ( geometry && editor.mEditMode == EditMode.OBJECT ) {
            
            container.setVisible(true);
            
            parameters.clean();
            
            if (geometry instanceof THREE.PlaneGeometry) {
                
                parameters.add(new RightSidebar_Geometry_PlaneGeometry(editor));
                
            } else if (geometry instanceof THREE.BoxGeometry) {
             
                parameters.add(new RightSidebar_Geometry_BoxGeometry(editor));
                
            } else if (geometry instanceof THREE.CylinderGeometry) {
             
                parameters.add(new RightSidebar_Geometry_CylinderGeometry(editor));
                
            } else if (geometry instanceof THREE.SphereGeometry) {
                
                parameters.add(new RightSidebar_Geometry_SphereGeometry(editor));
                
            } else if (geometry instanceof THREE.IcosahedronGeometry) {
             
                parameters.add(new RightSidebar_Geometry_IcosahedronGeometry(editor));
                
            } else if (geometry instanceof THREE.TorusGeometry) {
             
                parameters.add(new RightSidebar_Geometry_TorusGeometry(editor));
                
            }
                       
        
        } else {
         
            container.setVisible(false);
            
        }
        
    };
    
    events.sceneModeChanged.add(build);
    events.geometryChanged.add(build);
    
    return container;    
};