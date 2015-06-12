var MiddlePanel = function(editor) {
    'use strict';
    
    var container = new UIPanel();
    container.addClass('middlePanel');
    
    var middleContent = new UIPanel();
    middleContent.addClass('middleContent');
    
    middleContent.add(new LeftSidebar(editor));
    middleContent.add(new Viewport(editor));
    middleContent.add(new RightSidebar(editor));    
    
    container.add(middleContent);
    return container;
}