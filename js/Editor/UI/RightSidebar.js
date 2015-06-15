var RightSidebar = function(editor) {
    'use strict';
    
    var container = new UIPanel();
    container.addClass('rightPanel');
    
    container.add(new RightSidebar.Scene(editor));
    container.add(new RightSidebar.Object3D(editor));
    container.add(new RightSidebar_Geometry(editor));
    
    
    return container;    
}