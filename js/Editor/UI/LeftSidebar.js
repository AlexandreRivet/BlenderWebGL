var LeftSidebar = function(editor) {
    'use strict';
    
    var container = new UIPanel();
    container.addClass('leftPanel');
    
    // MOVE BUTTON
    var button = new UIButton('Mov.');
    button.addClass('sideBar_btn');
    button.click(function() {
        
        alert("TODO: move");
        
    });
    container.add(button);
    
    // MOVE BUTTON
    var button = new UIButton('Rot.');
    button.addClass('sideBar_btn');
    button.click(function() {
        
        alert("TODO: rotate");
        
    });
    container.add(button);
    
    // MOVE BUTTON
    var button = new UIButton('Sca.');
    button.addClass('sideBar_btn');
    button.click(function() {
        
        alert("TODO: scale");
        
    });
    container.add(button);
    
    return container;    
}