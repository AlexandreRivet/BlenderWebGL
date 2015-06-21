Menubar.File = function(editor) {
    'use strict';
    
    var container = new UIMenu('File');
    
    // NEW OPTION
    var option = new UIPanel();
    option.setTextContent('New');
    
    option.click(function() {
        
        if (confirm('Are you sure you want to clear editor?\nYou should save before.')) {
         
               editor.clear();
            
        }
        
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
        
        var content = editor.mScene.toJSON();
        content = JSON.stringify( content, null, '\t' );
		content = content.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
        
        exportString(content, editor.mScene.name + '.json');
        
    });
    container.addMenuItem(option);
    
    // SEPARATOR
    container.addSeparator();
    
    // IMPORT OBJ OPTION
    // Create a fileinput but not visible for the user
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', function(e) {
      
        editor.mLoader.loadFile(fileInput.files[0]);    // On veut charger que le premier (peut être plusieurs ??)
        
    });
    
    var option = new UIPanel();
    option.setTextContent('Import OBJ');
    
    option.click(function() {
        
        fileInput.click();
        
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
        
        var object = editor.mEditObject;
        
        var output = new OBJ().export(object);
        
        exportString(output, object.name + '.obj');
        
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

function exportString(content, filename) {
    
    var blob = new Blob([content], {type: 'text/plain'});
    var objectURL = URL.createObjectURL(blob);
    
    var link = document.createElement('a');
    link.href = objectURL;
    link.download = filename || 'data.json';
    link.target = '_blank';
    link.click();
    
}
