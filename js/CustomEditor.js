/*global EDITORUI */
/*global UIElement, UIPanel, UIMenu */

function initialiseCustomEditor() {
    'use strict';
    
    // Création de la MenuBar
    var topPanel = new UIPanel();
    topPanel.addClass('TopPanel');
    EDITORUI.add('TopPanel', topPanel);
    
    var fileMenu = new UIMenu('File');
    EDITORUI.add('fileMenu', fileMenu, 'TopPanel');
    
    var newOption = (new UIPanel()).setTextContent("New");
    newOption.click(function() {
       alert('New'); 
    });
    fileMenu.addMenuItem(newOption);
    
    var openOption =  (new UIPanel()).setTextContent("Open");
    openOption.click(function() {
       alert('Open');
    });
    fileMenu.addMenuItem(openOption);
    
    var addMenu = new UIMenu('Add');
    EDITORUI.add('addMenu', addMenu, 'TopPanel');
    
    var addCube = (new UIPanel()).setTextContent("Cube");
    addCube.click(function() {
        var geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
        var material = new THREE.MeshBasicMaterial();
        var mesh = new THREE.Mesh(geometry, material);
        EDITORUI.mEditor.addObject(mesh);
    });
    addMenu.addMenuItem(addCube);
    
    var addCylinder = (new UIPanel()).setTextContent("Cylinder");
    addCylinder.click(function() {
        var geometry = new THREE.CylinderGeometry(10, 10, 20, 1, 1, false);
        var material = new THREE.MeshBasicMaterial();
        var mesh = new THREE.Mesh(geometry, material);
        EDITORUI.mEditor.addObject(mesh);
    });
    addMenu.addMenuItem(addCylinder);
    
    // Création de la SideBar Left
    var leftPanel = new UIPanel();
    leftPanel.addClass('LeftPanel');
    EDITORUI.add('LeftPanel', leftPanel);
    
    // Création du Viewport
    
    // Création de la SideBar Right
    
    // Création de la ToolBar
    
}