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
    newOption.setDisabled(true);
    newOption.click(function() {
        if (!newOption.mDOM.disabled)
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
    
    var addPlane = (new UIPanel()).setTextContent("Plane");
    addPlane.click(function() {
        var geometry = new THREE.PlaneGeometry(100, 100);
        var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        var mesh = new THREE.Mesh(geometry, material);
        EDITORUI.mEditor.addObject(mesh);
        EDITORUI.mEditor.selectObject(mesh);
    });
    addMenu.addMenuItem(addPlane); 
    
    var addCube = (new UIPanel()).setTextContent("Cube");
    addCube.click(function() {
        var geometry = new THREE.BoxGeometry(100, 100, 100, 1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        var mesh = new THREE.Mesh(geometry, material);
        EDITORUI.mEditor.addObject(mesh);
        EDITORUI.mEditor.selectObject(mesh);
    });
    addMenu.addMenuItem(addCube);
    
    var addCylinder = (new UIPanel()).setTextContent("Cylinder");
    addCylinder.click(function() {
        var geometry = new THREE.CylinderGeometry(40, 40, 100, 16, 16);
        var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        var mesh = new THREE.Mesh(geometry, material);
        EDITORUI.mEditor.addObject(mesh);
        EDITORUI.mEditor.selectObject(mesh);
    });
    addMenu.addMenuItem(addCylinder);
    
    var addSphere = (new UIPanel()).setTextContent("Sphere");
    addSphere.click(function() {
        var geometry = new THREE.SphereGeometry(100, 16, 16);
        var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        var mesh = new THREE.Mesh(geometry, material);
        EDITORUI.mEditor.addObject(mesh);
        EDITORUI.mEditor.selectObject(mesh);
    });
    addMenu.addMenuItem(addSphere);
    
    // HelpMenu
    var helpMenu = new UIMenu('Help');
    topPanel.add(helpMenu);
    
    var aboutUs = (new UIPanel()).setTextContent("About us");
    aboutUs.click(function () {
        alert('----------- WebBlender -----------\nMaxime Helaine\nAlexandre Rivet\nArthur Torrent\nKevin Waththuewa\nJamal Bouizem\n-------------------------------------');
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
        EDITORUI.mEditor.mEvents.getEvent("transformControlModeChanged").dispatch("translate");
    });
    sideBarLeft.add(button);
    
    var button = (new UIButton('Rot.')).addClass('sideBar_btn');
    button.click(function() {
        EDITORUI.mEditor.mEvents.getEvent("transformControlModeChanged").dispatch("rotate");
    });
    sideBarLeft.add(button);
    
    var button = (new UIButton('Sca.')).addClass('sideBar_btn');
    button.click(function() {
        EDITORUI.mEditor.mEvents.getEvent("transformControlModeChanged").dispatch("scale");
    });
    sideBarLeft.add(button);
    
    sideBarLeft.add( new UISeparator());
    
    var button = (new UIButton('Persp')).addClass('sideBar_btn');
    button.setDisabled(true);
    button.click(function() {
        alert('One camera - perspective');
    });
    sideBarLeft.add(button);
    
    var button = (new UIButton('4V.')).addClass('sideBar_btn');
    button.setDisabled(true);
    button.click(function() {
        alert('Four cameras - top, front, left, perspective');
    });
    sideBarLeft.add(button);
    
    var viewport = (new UIPanel()).addClass('viewportPanel');
    middleContent.add(viewport);
    
    var sideBarRight = (new UIPanel()).addClass('rightPanel');
    middleContent.add(sideBarRight);  
    
    var graphScene = new UIHidingPanel(' > SCENE').setStyle({"width" : "250px"});
    var graphPanel = (new UIPanel()).addClass('graphPanel')
    graphScene.add(graphPanel);
    sideBarRight.add(graphScene);
    
    var others = new UIHidingPanel(' > OTHERS');
    sideBarRight.add(others);
    
    // Création du Viewport
    var renderViewport = new Viewport(EDITOR, viewport.mDOM);
    renderViewport.init();
    
    // Création de la ToolBar
    var bottomPanel = new UIPanel();
    bottomPanel.setTextContent("ANIMATIONS");
    bottomPanel.addClass('bottomPanel');
    EDITORUI.add('bottomPanel', bottomPanel);
    
    // Création du ROOT
    var root = new UINode('Scene', true, undefined);
    graphPanel.add(root);
    
    root.add(new UINode('Child1 fef erf  fer fer fjkberf rfjrhf fjkrhf', false, undefined));
    root.add(new UINode('Child2', false, undefined));
    var child = new UINode('Child3', false, undefined);
    root.add(child);
    child.add(new UINode('SubChild3_1', false, undefined));
    child.add(new UINode('SubChild3_2', false, undefined));            
    root.add(new UINode('Child4', false, undefined));
    child = new UINode('Child5', true, undefined);
    root.add(child);
    child.add(new UINode('SubChild5', false, undefined));
    }