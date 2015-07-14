Menubar.File = function(editor) {
    'use strict';
    
    var container = new UIMenu('File');
    
    // Create a fileinput but not visible for the user
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', function(e) {
        
        editor.mLoader.loadFile(fileInput.files[0]);    
        
    });
    
    // NEW OPTION
    var option = new UIPanel();
    option.setTextContent('New');
    
    option.click(function() {
        
        if (editor.mEditMode === EditMode.OBJECT) {
         
            alert('You need to be in principal scene to do this.');            
            return;
            
        }
        
        if (confirm('Are you sure you want to clear editor?\nYou should save before.')) {
         
            editor.clear();
            ANIMATIONMGR.clear(); 
            ANIMATIONEDITOR.clear(); 
        }
        
    });
    container.addMenuItem(option);
    
    // OPEN OPTION
    var option = new UIPanel();
    option.setTextContent('Open');
    
    option.click(function() {
        
        if (editor.mEditMode === EditMode.OBJECT) {
         
            alert('You need to be in principal scene to do this.');            
            return;
            
        }        
        
        if (confirm('Are you sure you want to open new scene?\nYou should save before.')) {
         
            editor.clear();
            ANIMATIONMGR.clear(); 
            ANIMATIONEDITOR.clear(); 
        }
        
        fileInput.click();
        
    });
    container.addMenuItem(option);
    
    // SAVE OPTION
    var option = new UIPanel();
    option.setTextContent('Save');
    
    option.click(function() {
        
        if (editor.mEditMode === EditMode.OBJECT) {
         
            alert('You need to be in principal scene to do this.');            
            return;
            
        }
        
        var content = editor.mScene.toJSON();
        content.animations = ANIMATIONMGR.toJSON();
        
        content = JSON.stringify( content, null, '\t' );
		content = content.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
        
        exportString(content, editor.mScene.name + '.json');
        
    });
    container.addMenuItem(option);
    
    // SEPARATOR
    container.addSeparator();
    
    // IMPORT OBJ OPTION    
    var option = new UIPanel();
    option.setTextContent('Import OBJ');
    
    option.click(function() {
        
        if (editor.mEditMode === EditMode.OBJECT) {
         
            alert('You need to be in principal scene to do this.');            
            return;
            
        }
        
        fileInput.click();
        
    });
    container.addMenuItem(option);
    
    // SEPARATOR
    container.addSeparator();
    
    // Export OBJ OPTION
    var option = new UIPanel();
    option.setTextContent('Export OBJ');
    
    option.click(function() {
        
        if (editor.mEditMode === EditMode.OBJECT) {
         
            alert('You need to be in principal scene to do this.');            
            return;
            
        }
        
        var object = editor.mEditObject;
        
        if (!check(object))
            return;
        
        var output = new OBJ().export(object);
        
        exportString(output, object.name + '.obj');
        
    });
    container.addMenuItem(option);
    
    return container;    
}