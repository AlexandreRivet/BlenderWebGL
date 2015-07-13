var RightSidebar_Geometry_SphereGeometry = function(editor) {
    'use strict';
  
    var events = editor.mEvents;
    var parameters = editor.mEditObject.geometry.parameters;
    
    var container = new UIPanel();
    
    // RADIUS
    var objectRadiusPanel = new UIPanel();
    var objectRadius = new UINumber(parameters.radius, 0.1).setRange(0, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectRadiusPanel.add(new UIText('Radius').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectRadiusPanel.add(objectRadius);   
    
    container.add(objectRadiusPanel);

     // WIDTH SEGMENT
    var objectWidthSegmentPanel = new UIPanel();
    var objectWidthSegment = new UINumber(parameters.widthSegments, 1).setRange(1, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectWidthSegmentPanel.add(new UIText('Width Segments').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectWidthSegmentPanel.add(objectWidthSegment);   
    
    container.add(objectWidthSegmentPanel);

    // HEIGHT SEGMENT 
    var objectHeightSegmentPanel = new UIPanel();
    var objectHeightSegment = new UINumber(parameters.heightSegments, 1).setRange(1, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectHeightSegmentPanel.add(new UIText('Height Segments').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectHeightSegmentPanel.add(objectHeightSegment);   
    
    container.add(objectHeightSegmentPanel);

    
    function update() {
      
        var newGeometry = new THREE.SphereGeometry(
            objectRadius.getValue(), 
            objectWidthSegment.getValue(),
            objectHeightSegment.getValue()
        );
        
        editor.mEditObject.geometry.dispose();
        editor.mEditObject.geometry = newGeometry;
        
        editor.mEditObjectInObjectMode.geometry.dispose();
        editor.mEditObjectInObjectMode.geometry = newGeometry.clone();
        
        events.geometryChanged.dispatch(newGeometry);
        
    };
    
    return container;
    
};