var RightSidebar_Geometry_TorusGeometry = function(editor) {
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

    // TUBE
    var objectTubePanel = new UIPanel();
    var objectTube = new UINumber(parameters.tube, 0.1).setRange(0, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectTubePanel.add(new UIText('Tube').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectTubePanel.add(objectTube); 
    
    container.add(objectTubePanel);
    
    // RADIAL SEGMENT
    var objectRadialSegmentPanel = new UIPanel();
    var objectRadialSegment = new UINumber(parameters.radialSegments, 1).setRange(1, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectRadialSegmentPanel.add(new UIText('Radial Segments').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectRadialSegmentPanel.add(objectRadialSegment);   
    
    container.add(objectRadialSegmentPanel);

    // TUBULAR SEGMENT 
    var objectTubularSegmentPanel = new UIPanel();
    var objectTubularSegment = new UINumber(parameters.tubularSegments, 1).setRange(1, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectTubularSegmentPanel.add(new UIText('Tubular segments').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectTubularSegmentPanel.add(objectTubularSegment);   
    
    container.add(objectTubularSegmentPanel);
    
    // ARC
    var objectArcPanel = new UIPanel();
    var objectArc = new UINumber(parameters.arc, 0.1).setRange(0, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectArcPanel.add(new UIText('Arc').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectArcPanel.add(objectArc); 
    
    container.add(objectArcPanel);    
    
    function update() {
      
        var object = editor.mEditObject;
        
        if (!check(object))
            return;
        
        object.geometry.dispose();
        
        object.geometry = new THREE.TorusGeometry(
            objectRadius.getValue(), 
            objectTube.getValue(),
            objectRadialSegment.getValue(),
            objectTubularSegment.getValue(),
            objectArc.getValue()
        );
        
        object.geometry.computeBoundingSphere();
        
        events.geometryChanged.dispatch(editor.mEditObject);
        
    };
    
    return container;
    
};