/*global $, body, initialiseCustomEditor */
/*global THREE, Editor, EditorUserInterface */
/*global UIElement, UIPanel, UIMenu */

$(document).ready(function () {
    'use strict';
    
    var editor = new Editor();
    
    var menubar = new Menubar(editor);
    document.body.appendChild(menubar.mDOM);
    
    var middlePanel = new MiddlePanel(editor);
    document.body.appendChild(middlePanel.mDOM);
    
    var animationPanel = new AnimationPanel(editor);
    document.body.appendChild(animationPanel.mDOM);
    
    var windowResize = function(e) {
        
        editor.mEvents.windowResized.dispatch();
        
    }
    window.addEventListener('resize', windowResize, false);
    
    windowResize();    
    
    
});
