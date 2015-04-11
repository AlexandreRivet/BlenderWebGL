/*global $, body, initialiseCustomEditor */
/*global THREE, Editor, EditorUserInterface */
/*global UIElement, UIPanel, UIMenu */

var EDITOR = null, EDITORUI = null;

$(document).ready(function () {
    'use strict';
    /*
    var menu = new UIMenu('test');
    menu.addMenuItem((new UIPanel()).setTextContent("Option 1"));
    menu.addMenuItem(new UIButton("Button Test in Menu"));
    menu.addMenuItem(new UIRange(0, 10, 5));
    menu.addMenuItem((new UIPanel()).setTextContent("Option 4"));
    document.body.appendChild(menu.mDOM);
    
    var menu = new UIMenu('test2');
    menu.addMenuItem((new UIPanel()).setTextContent("Option 1"));
    menu.addMenuItem(new UIButton("Button Test in Menu"));
    menu.addMenuItem(new UIRange(0, 10, 5));
    menu.addMenuItem((new UIPanel()).setTextContent("Option 4"));
    document.body.appendChild(menu.mDOM);*/
    
    EDITOR = new Editor();
    EDITOR.init();
    
    EDITORUI = new EditorUserInterface(EDITOR);
    initialiseCustomEditor();
});
