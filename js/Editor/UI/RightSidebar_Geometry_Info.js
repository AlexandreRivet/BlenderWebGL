var RightSidebar_Geometry_Info = function(editor) {
    'use strict';
  
    var events = editor.mEvents;
    
    var container = new UIPanel();
    
    // VERTICES
    var objectVerticesPanel = new UIPanel();
    var vertices = new UIText('');
        
    objectVerticesPanel.add(new UIText('Vertices').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectVerticesPanel.add(vertices);   
    
    container.add(objectVerticesPanel);

    // FACES
    var objectFacesPanel = new UIPanel();
    var faces = new UIText('');
        
    objectFacesPanel.add(new UIText('Faces').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectFacesPanel.add(faces); 
    
    container.add(objectFacesPanel);
    
    var update = function() {
      
        var object = editor.mEditObject;
        
        if (!check(object))
            return;
        
        var geometry = object.geometry;
        
        if (geometry instanceof THREE.Geometry && editor.mEditMode == EditMode.OBJECT) {
            
            container.setVisible(true);
            
            vertices.setTextContent(geometry.vertices.length);
            faces.setTextContent(geometry.faces.length);
            
        } else {
         
            container.setVisible(false);
            
        }
        
    };
    
    events.sceneModeChanged.add(update);
    events.geometryChanged.add(update);
    
    return container;
    
};