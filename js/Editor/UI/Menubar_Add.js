Menubar.Add = function(editor) {
    'use strict';
    
    var container = new UIMenu('Add');
    
    var meshCount = 0;
    var lightCount = 0;
    
    // PLANE
    var option = new UIPanel();
    option.setTextContent('Plane');
    
    option.click(function() {
       
        var geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
        var material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'Plane.' + (ZeroBeforeString(meshCount++, 3));
        
        editor.addObject(mesh);
        editor.selectObject(mesh);
        
    });
    
    container.addMenuItem(option);
    
    // CUBE
    var option = new UIPanel();
    option.setTextContent('Cube');
    
    option.click(function() {
        
        var geometry = new THREE.BoxGeometry(100, 100, 100, 1, 1, 1);
        var material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'Cube.' + (ZeroBeforeString(meshCount++, 3));
        
        editor.addObject(mesh);
        editor.selectObject(mesh);
        
    });
    container.addMenuItem(option);
    
    // CYLINDER
    var option = new UIPanel();
    option.setTextContent('Cylinder');
    
    option.click(function() {
       
        var geometry = new THREE.CylinderGeometry(50, 50, 100, 32, 1, false);
        var material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'Cylinder.' + (ZeroBeforeString(meshCount++, 3));
        
        editor.addObject(mesh);
        editor.selectObject(mesh);
        
    });
    
    container.addMenuItem(option);
    
    // SPHERE
    var option = new UIPanel();
    option.setTextContent('Sphere');
    
    option.click(function() {
       
        var geometry = new THREE.SphereGeometry(50, 32, 32);
        var material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'Sphere.' + (ZeroBeforeString(meshCount++, 3));
        
        editor.addObject(mesh);
        editor.selectObject(mesh);
        
    });    
    
    container.addMenuItem(option);
    
    // ICOSAHEDRON
    var option = new UIPanel();
    option.setTextContent('Icosahedron');
    
    option.click(function() {
       
        var geometry = new THREE.IcosahedronGeometry(50, 2);
        var material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'Icosahedron.' + (ZeroBeforeString(meshCount++, 3));
        
        editor.addObject(mesh);
        editor.selectObject(mesh);
        
    });    
    
    container.addMenuItem(option);
    
    // TORUS
    var option = new UIPanel();
    option.setTextContent('Torus');
    
    option.click(function() {
       
        var geometry = new THREE.TorusGeometry(100, 40, 16, 16);
        var material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'Torus.' + (ZeroBeforeString(meshCount++, 3));
        
        editor.addObject(mesh);
        editor.selectObject(mesh);
        
    });      
    
    container.addMenuItem(option);
 
    container.addSeparator();
    
    // Point Light
    var option = new UIPanel();
    option.setTextContent('PointLight');
    
    option.click(function() {
       
        var light = new THREE.PointLight(0xffffff, 1, 0);
        light.name = 'PointLight.' + (ZeroBeforeString(lightCount++, 3));
        
        editor.addObject(light);
        editor.selectObject(light);
        
    });      
    
    container.addMenuItem(option);
    
    // SpotLight
    var option = new UIPanel();
    option.setTextContent('SpotLight');
    
    option.click(function() {
       
        var light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI * 0.1, 10);
        light.name = 'SpotLight.' + (ZeroBeforeString(lightCount++, 3));
        
        editor.addObject(light);
        editor.selectObject(light);
        
    });      
    
    container.addMenuItem(option);
    
    // Directional Light
    var option = new UIPanel();
    option.setTextContent('DirectionalLight');
    
    option.click(function() {
       
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.name = 'DirectionalLight.' + (ZeroBeforeString(lightCount++, 3));
        
        editor.addObject(light);
        editor.selectObject(light);
        
    });      
        
    
    container.addMenuItem(option);
    
    return container;
}