var Shader = function(editor) {
  
    var events = editor.mEvents;
    
    var container = new UIPanel();
    
    var header = new UIPanel();
    container.add(header);
    
    var title = new UIText();
    header.add(title);
    
    var close = new UIButton('X');
    close.click(function() {
        
        container.setVisible(false);
        
    });
    header.add(close);
    
    var update = new UIButton('Update');
    update.click(function() {
       
        // TODO
        
    });
    
    events.editorCleared.add(function() {
       
        container.setVisible(false);
        
    });
    
    events.editShader.add(function(object, type) {
       
        
        
    });
    
};