Menubar.File = function(editor) {
    'use strict';
    
    var container = new UIMenu('File');
    
    // NEW OPTION
    var option = new UIPanel();
    option.setTextContent('New');
    
    option.click(function() {
        
        alert('TODO: new');
        
    });
    container.addMenuItem(option);
    
    // OPEN OPTION
    var option = new UIPanel();
    option.setTextContent('Open');
    
    option.click(function() {
        
        alert('TODO: open');
        
    });
    container.addMenuItem(option);
    
    // SAVE OPTION
    var option = new UIPanel();
    option.setTextContent('Save');
    
    option.click(function() {
        
        alert('TODO: save');
        
    });
    container.addMenuItem(option);
    
    // SEPARATOR
    container.addSeparator();
    
    // IMPORT OBJ OPTION
    var option = new UIPanel();
    option.setTextContent('Import OBJ');
    
    option.click(function() {
        
        alert('TODO: import obj');
        
    });
    container.addMenuItem(option);
    
    // IMPORT DAE OPTION
    var option = new UIPanel();
    option.setTextContent('Import DAE');
    
    option.click(function() {
        
        alert('TODO: import dae');
        
    });
    container.addMenuItem(option);
    
    // SEPARATOR
    container.addSeparator();
    
    // Export OBJ OPTION
    var option = new UIPanel();
    option.setTextContent('Export OBJ');
    
    option.click(function() {
        
        alert('TODO: export obj');
        
    });
    container.addMenuItem(option);
    
    // IMPORT DAE OPTION
    var option = new UIPanel();
    option.setTextContent('Export DAE');
    
    option.click(function() {
        
        alert('TODO: export dae');
        
    });
    container.addMenuItem(option);
    
    return container;    
}