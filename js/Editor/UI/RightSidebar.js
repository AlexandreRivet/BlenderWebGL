var RightSidebar = function(editor) {
    'use strict';
    
    var container = new UIPanel();
    container.addClass('rightPanel');
    
    container.add(new RightSidebar.Scene(editor));
    container.add(new RightSidebar.Object3D(editor));
    container.add(new RightSidebar.Rigidbody(editor));
    container.add(new RightSidebar_Geometry(editor));
    container.add(new RightSidebar_Material(editor));
    
    
    return container;    
}