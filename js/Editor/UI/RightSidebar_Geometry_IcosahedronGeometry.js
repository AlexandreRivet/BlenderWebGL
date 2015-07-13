var RightSidebar_Geometry_IcosahedronGeometry = function(editor) {
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

     // DETAIL
    var objectDetailPanel = new UIPanel();
    var objectDetail = new UINumber(parameters.detail, 1).setRange(1, 10).setStyle({"width": "200px", "margin": "0px 5px", "background-color": "#333", "color": "#eee", "border": "none", "padding": "2px", "font-size": "10px"}).change(update);
        
    objectDetailPanel.add(new UIText('Detail').setStyle({"width": "65px", "display": "inline-block", "font-size": "12px"}));
    objectDetailPanel.add(objectDetail);   
    
    container.add(objectDetailPanel);

    
    function update() {
      
         var newGeometry = new THREE.IcosahedronGeometry(
            objectRadius.getValue(), 
            objectDetail.getValue()
        );
        
        editor.mEditObject.geometry.dispose();
        editor.mEditObject.geometry = newGeometry;
        
        editor.mEditObjectInObjectMode.geometry.dispose();
        editor.mEditObjectInObjectMode.geometry = newGeometry.clone();
        
        events.geometryChanged.dispatch(newGeometry);
        
    };
    
    return container;
    
};