Menubar.Add = function(editor) {
    'use strict';
    
    var container = new UIMenu('Add');
    
    var meshCount = 0;
    
    // Add cube
    var option = new UIPanel();
    option.setTextContent('Cube');
    
    option.click(function() {
        
        var geometry = new THREE.BoxGeometry(100, 100, 100, 1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'Cube.' + (ZeroBeforeString(meshCount++, 3));
        
        editor.addObject(mesh);
        editor.selectObject(mesh);
        
    });
    container.addMenuItem(option);
 
    
    return container;
}