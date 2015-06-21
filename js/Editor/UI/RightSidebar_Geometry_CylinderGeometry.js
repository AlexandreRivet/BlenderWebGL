var RightSidebar_Geometry_CylinderGeometry = function(editor) {
    'use strict';
  
    var events = editor.mEvents;
    var parameters = editor.mEditObject.geometry.parameters;
    
    var container = new UIPanel();
    
    // RADIUS TOP
    var objectRadiusTopPanel = new UIPanel();
    var objectRadiusTop = new UINumber(parameters.radiusTop, 0.1).setRange(0, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectRadiusTopPanel.add(new UIText('Radius top').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectRadiusTopPanel.add(objectRadiusTop);   
    
    container.add(objectRadiusTopPanel);

    // RADIUS BOTTOM
    var objectRadiusBottomPanel = new UIPanel();
    var objectRadiusBottom = new UINumber(parameters.radiusBottom, 0.1).setRange(0, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectRadiusBottomPanel.add(new UIText('Radius bottom').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectRadiusBottomPanel.add(objectRadiusBottom); 
    
    container.add(objectRadiusBottomPanel);
    
    // HEIGHT
    var objectHeightPanel = new UIPanel();
    var objectHeight = new UINumber(parameters.height, 0.1).setRange(0, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectHeightPanel.add(new UIText('Height').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectHeightPanel.add(objectHeight); 
    
    container.add(objectHeightPanel);    
    
    // RADIAL SEGMENT
    var objectRadialSegmentPanel = new UIPanel();
    var objectRadialSegment = new UINumber(parameters.radialSegments, 1).setRange(1, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectRadialSegmentPanel.add(new UIText('Radial Segments').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectRadialSegmentPanel.add(objectRadialSegment);   
    
    container.add(objectRadialSegmentPanel);

    
    // HEIGHT SEGMENT 
    var objectHeightSegmentPanel = new UIPanel();
    var objectHeightSegment = new UINumber(parameters.heightSegments, 1).setRange(1, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectHeightSegmentPanel.add(new UIText('Height segments').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectHeightSegmentPanel.add(objectHeightSegment);   
    
    container.add(objectHeightSegmentPanel);

    
    function update() {
      
        var object = editor.mEditObject;
        
        if (!check(object))
            return;
        
        object.geometry.dispose();
        
        object.geometry = new THREE.CylinderGeometry(
            objectRadiusTop.getValue(), 
            objectRadiusBottom.getValue(),
            objectHeight.getValue(),
            objectRadialSegment.getValue(),
            objectHeightSegment.getValue()
        );
        
        object.geometry.computeBoundingSphere();
        
        events.geometryChanged.dispatch(editor.mEditObject);
        
    };
    
    return container;
    
};