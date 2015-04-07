/*global $, body, EditorManager, HashMap, THREE, UITab, UIPanel */

var EDITORMANAGER = null, EDITORUI = null;

$(document).ready(function () {
    'use strict';
    /*var editor = new ShaderEditor('test');
    document.body.appendChild(editor.mDOM);
    
    editor.init();*/
    
    
    EDITORMANAGER = new EditorManager();
    EDITORUI = new EditorUserInterface(EDITORMANAGER);
    
    EDITORUI.init();
    EDITORMANAGER.render();
    
    /*var editor_tmp;
    
    EDITORMANAGER = new EditorManager();                            // Instanciation de l'EditorManager
    editor_tmp = EDITORMANAGER.addWorkspace("Default");             // Ajout du workspace par défaut
    editor_tmp.setClearColor(new THREE.Color(0xff0000));
    EDITORMANAGER.render();                                         // Lancement de la boucle de rendu
    
    setTimeout(function () {
        editor_tmp = EDITORMANAGER.addWorkspace("New001");
        editor_tmp.setClearColor(new THREE.Color(0x00ff00));
    }, 5000);
    
    var topPanel = new UIPanel();
    topPanel.addClass('topPanel');
    
    var middleContent = new UIPanel();
    middleContent.addClass('middleContent');
    
    var middlePanel = new UIPanel();
    middlePanel.addClass('middlePanel');
    middlePanel.add(middleContent);
    
    var leftPanel = new UIPanel();
    leftPanel.addClass('leftPanel');
    
    var tab = new UITab("Workspace");
    tab.add("Bunny");
    tab.add("Lena");
    tab.add("Assassin's creed");
    tab.add("New");
    
    var rightPanel = new UIPanel();
    rightPanel.addClass('rightPanel');
    
    middleContent.add(leftPanel);
    middleContent.add(tab);
    middleContent.add(rightPanel);
    
    var bottomPanel = new UIPanel();
    bottomPanel.addClass('bottomPanel');
    
    document.body.appendChild(topPanel.mDOM);
    document.body.appendChild(middlePanel.mDOM);
    document.body.appendChild(bottomPanel.mDOM);*/
});