/*global EDITORUI */
/*global UIElement, UIPanel, UIMenu */

function initialiseCustomEditor() {
    'use strict';
    
    // Création de la MenuBar
    // FileMenu
    var topPanel = new UIPanel();
    topPanel.addClass('TopPanel');
    EDITORUI.add('TopPanel', topPanel);
    
    var fileMenu = new UIMenu('File');
    topPanel.add(fileMenu);
    
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
    
    fileMenu.addSeparator();
    
    var saveOption =  (new UIPanel()).setTextContent("Save");
    saveOption.click(function() {
       alert('Save');
    });
    fileMenu.addMenuItem(saveOption);
    
    fileMenu.addSeparator();
    
    var importOBJ =  (new UIPanel()).setTextContent("Import OBJ");
    importOBJ.click(function() {
        alert('Import OBJ');
    });
    fileMenu.addMenuItem(importOBJ);
    
    var importDAE =  (new UIPanel()).setTextContent("Import DAE");
    importDAE.click(function() {
        alert('Import DAE');
    });
    fileMenu.addMenuItem(importDAE);
    
    fileMenu.addSeparator();
    
    var exportOBJ =  (new UIPanel()).setTextContent("Export OBJ");
    exportOBJ.click(function() {
        alert('Export OBJ');
    });
    fileMenu.addMenuItem(exportOBJ);
    
    var exportDAE =  (new UIPanel()).setTextContent("Export DAE");
    exportDAE.click(function() {
        alert('Export DAE');
    });
    fileMenu.addMenuItem(exportDAE);
    
    // EditMenu
    var editMenu = new UIMenu('Edit');
    topPanel.add(editMenu);
        
    // AddMenu
    var addMenu = new UIMenu('Add');
    topPanel.add(addMenu);
    
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
    
    // HelpMenu
    var helpMenu = new UIMenu('Help');
    topPanel.add(helpMenu);
    
    var aboutUs = (new UIPanel()).setTextContent("About us");
    aboutUs.click(function () {
        alert('About us');
    });
    helpMenu.addMenuItem(aboutUs);
    
    // Création du milieu de la page
    var middlePanel = (new UIPanel()).addClass('middlePanel');
    EDITORUI.add('MiddlePanel', middlePanel);
    
    var middleContent = (new UIPanel()).addClass('middleContent');
    middlePanel.add(middleContent);
    
    var sideBarLeft = (new UIPanel()).addClass('leftPanel');
    middleContent.add(sideBarLeft);
    
    var button = (new UIButton('Sel.')).addClass('sideBar_btn');
    button.click(function() {
        alert('Select');
    });
    sideBarLeft.add(button);
    
    var button = (new UIButton('Mov.')).addClass('sideBar_btn');
    button.click(function() {
        alert('Move');
    });
    sideBarLeft.add(button);
    
    var button = (new UIButton('Rot.')).addClass('sideBar_btn');
    button.click(function() {
        alert('Rotate');
    });
    sideBarLeft.add(button);
    
    var button = (new UIButton('Sca.')).addClass('sideBar_btn');
    button.click(function() {
        alert('Scale');
    });
    sideBarLeft.add(button);
    
    sideBarLeft.add( new UISeparator());
    
    var button = (new UIButton('Persp')).addClass('sideBar_btn');
    button.click(function() {
        alert('One camera - perspective');
    });
    sideBarLeft.add(button);
    
    var button = (new UIButton('4V.')).addClass('sideBar_btn');
    button.click(function() {
        alert('Four cameras - top, front, left, perspective');
    });
    sideBarLeft.add(button);
    
    var viewport = (new UIPanel()).addClass('viewportPanel');
    middleContent.add(viewport);
    
    var sideBarRight = (new UIPanel()).addClass('rightPanel');
    middleContent.add(sideBarRight);  
    
    var graphScene = new UIHidingPanel(' > SCENE');
    graphScene.add((new UIPanel()).addClass('graphPanel'));
    sideBarRight.add(graphScene);
    
    sideBarRight.add( new UISeparator());
    
    var others = new UIHidingPanel(' > OTHERS');
    sideBarRight.add(others);
    
    // Création du Viewport
    // var renderViewport = new Viewport(EDITOR, viewport.mDOM);
    // renderViewport.init();
    // renderViewport.render();
    
    // Création de la ToolBar
    var bottomPanel = new UIPanel();
    bottomPanel.addClass('bottomPanel');
    EDITORUI.add('bottomPanel', bottomPanel);
    
}