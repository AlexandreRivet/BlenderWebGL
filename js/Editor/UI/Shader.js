var Shader = function(editor) {
  
    var events = editor.mEvents;
    
    var currentMaterial;
    var currentType;
    
    var container = new UIPanel();
	container.addClass('shaderPanel');
	container.setVisible(false);
    
    var header = new UIPanel();
    container.add(header);
    
    var title = new UIText().setStyle({'margin': "2px"});
    header.add(title);
    
	var rightButtons = new UIPanel().setStyle({'float': 'right', 'display': 'inline-block'});
	header.add(rightButtons);
	
	var update = new UIButton('Save').setStyle({'width': "40px", 'height': "20px"});
    update.click(function() {
       
        if (currentType == "vs") {
         
            currentMaterial.vertexShader = codemirror.getValue();
            
        } else if (currentType == "fs") {
            
            currentMaterial.fragmentShader = codemirror.getValue();
            
        }
        
        currentMaterial.needsUpdate = true;
        events.materialChanged.dispatch(currentMaterial);
        
    });
	rightButtons.add(update);
	
    var close = new UIButton('X').setStyle({'width': "20px", 'height': "20px"});
    close.click(function() {
        
        events.shaderClosed.dispatch();
        container.setVisible(false);
        
    });
    rightButtons.add(close);
    
	var codemirror = CodeMirror(container.mDOM, {
	
		value: '',
		lineNumbers: true,
		matchBrackets: true,
		indentWithTabs: true,
		tabSize: 4,
		indentUnit: 4
	
	});
	codemirror.setOption('theme', 'monokai');
	
	
    
    
    events.editorCleared.add(function() {
       
        container.setVisible(false);
        
    });
    
    events.shaderEdited.add(function(object, material, type) {
    
		container.setVisible(true);
        
        currentMaterial = material;
        currentType = type;
	
		title.setTextContent(object.name + ' / ' + (( type == "vs") ? 'Vertex shader': 'Fragment shader' ));

        if (type == "vs") {
         
            codemirror.setValue(currentMaterial.vertexShader);
            
        } else if (type == "fs") {
            
            codemirror.setValue(currentMaterial.fragmentShader);
        }
        
    });
    
    events.sceneModeChanged.add(function() {
        
        if (editor.mEditMode == EditMode.SCENE) {
        
            container.setVisible(false);
            
        }
        
    });
	
	return container;
    
};