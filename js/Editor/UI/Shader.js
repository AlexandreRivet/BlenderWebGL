var Shader = function(editor) {
  
    var events = editor.mEvents;
    
    var container = new UIPanel();
	container.addClass('shaderPanel');
	container.setVisible(false);
    
    var header = new UIPanel().setStyle({'padding': '10px'});
    container.add(header);
    
    var title = new UIText();
    header.add(title);
    
	var rightButtons = new UIPanel().setStyle({'float': 'right', 'display': 'inline-block'});
	header.add(rightButtons);
	
	var update = new UIButton('Save').setStyle({'padding': "2px"});
    update.click(function() {
       
        // TODO
		
        
    });
	rightButtons.add(update);
	
    var close = new UIButton('X').setStyle({'padding': "2px"});
    close.click(function() {
        
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
    
    events.shaderEdited.add(function(object, type) {
    
		container.setVisible(true);
	
		title.setTextContent(object.name + ' / ' + (( type == "vs") ? 'Vertex shader': 'Fragment shader' ));
        
    });
	
	return container;
    
};