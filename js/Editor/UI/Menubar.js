var Menubar = function(editor) {
    'use strict';
    
    var container = new UIPanel();
    container.addClass('TopPanel');
    
    container.add(new Menubar.File(editor));
    container.add(new Menubar.Add(editor));
    
    return container;
};