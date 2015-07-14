var RightSidebar_Geometry_BoxGeometry = function(editor) {
    'use strict';
  
    var events = editor.mEvents;
    var parameters = editor.mEditObject.geometry.parameters;
    
    var container = new UIPanel();
    
    // WIDTH
    var objectWidthPanel = new UIPanel();
    var objectWidth = new UINumber(parameters.width, 0.1).setRange(0, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectWidthPanel.add(new UIText('Width').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectWidthPanel.add(objectWidth);   
    
    container.add(objectWidthPanel);

    // HEIGHT
    var objectHeightPanel = new UIPanel();
    var objectHeight = new UINumber(parameters.height, 0.1).setRange(0, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectHeightPanel.add(new UIText('Height').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectHeightPanel.add(objectHeight); 
    
    container.add(objectHeightPanel);
    
    // DEPTH
    var objectDepthPanel = new UIPanel();
    var objectDepth = new UINumber(parameters.depth, 0.1).setRange(0, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectDepthPanel.add(new UIText('Depth').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectDepthPanel.add(objectDepth); 
    
    container.add(objectDepthPanel);
    
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

    // DEPTH SEGMENT 
    var objectDepthSegmentPanel = new UIPanel();
    var objectDepthSegment = new UINumber(parameters.heightSegments, 1).setRange(1, Infinity).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectDepthSegmentPanel.add(new UIText('Depth segments').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectDepthSegmentPanel.add(objectDepthSegment);   
    
    container.add(objectDepthSegmentPanel);    
    
    
    function update() {
        
        var newGeometry = new THREE.BoxGeometry(
            objectWidth.getValue(), 
            objectHeight.getValue(),
            objectDepth.getValue(),
            objectWidthSegment.getValue(),
            objectHeightSegment.getValue(),
            objectDepthSegment.getValue()
        );
        
        editor.mEditObject.geometry.dispose();
        editor.mEditObject.geometry = newGeometry;
        
        editor.mEditObjectInObjectMode.geometry.dispose();
        editor.mEditObjectInObjectMode.geometry = newGeometry.clone();
        
        events.basicGeometryChanged.dispatch(newGeometry);
        
    };
    
    return container;
    
};