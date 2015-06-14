/*global UIElement */
var UITree = function(editor) {
    'use strict';
    
    UIElement.call(this);
    
    var context = this;
    
    var dom = document.createElement('div');
    dom.ClassName = 'Tree';
    dom.tabIndex = 0;
    
    this.mPrincipalScene = editor.mPrincipalScene;
    
    var changeEvent = document.createEvent('HTMLEvents');
    changeEvent.initEvent('change', true, true);
    
    dom.addEventListener('keydown', function(event) {
        
        switch(event.keyCode) {
            case 38:
            case 40:
                event.preventDefault();
                event.stopPropagation();
                break;                
        }
        
    }, false);
    
    dom.addEventListener('keyup', function(event) {
        
        switch(event.keyCode) {
            case 38:
            case 40:
                context.mSelectedIndex += (event.keyCode == 38) ? -1 : 1;
                
                if(context.mSelectedIndex >= 0 && context.mSelectedIndex < context.mOptions.length)
                {
                    context.setValue(context.mOptions[context.mSelectedIndex].value);
                    context.mDOM.dispatchEvent(changeEvent);
                }
                break;                
        }        
        
    }, false);    
    
    this.mDOM = dom;
    
    this.mOptions = [];
    this.mSelectedIndex = -1;
    this.mSelectedValue = null;
    
    return this;
};  

UITree.prototype = Object.create(UIElement.prototype);

UITree.prototype.setOptions = function(options) {
    'use strict';
    
    var context = this;
    
    var changeEvent = document.createEvent( 'HTMLEvents' );
	changeEvent.initEvent( 'change', true, true );

	while ( context.mDOM.children.length > 0 ) {

		context.mDOM.removeChild( context.mDOM.firstChild );

	}

	context.mOptions = [];
    
    for ( var i = 0; i < options.length; i ++ ) {

		var option = options[i];

		var div = document.createElement( 'div' );
		div.className = 'node';
		div.innerHTML = option.html;
		div.value = option.value;
		context.mDOM.appendChild( div );

		context.mOptions.push( div );

		div.addEventListener( 'click', function ( event ) {

			context.setValue( this.value );
			context.mDOM.dispatchEvent( changeEvent );

		}, false );

	}

	return context;
};

UITree.prototype.getValue = function() {
    'use strict';
    
    return this.mSelectedValue;
    
};

UITree.prototype.setValue = function(value) {
    'use strict';
    
    var context = this;
    
    for (var i = 0; i < this.mOptions.length; i++) {
     
        var option = this.mOptions[i];
        
        if (option.value == value) {
            
            option.classList.add('node_active');         // Devient l'option active
            
            // TODO: Scroller jusqu'à l'élément dans la liste ??
            
            this.mSelectedIndex = i;
            
        } else {
            
            option.classList.remove('node_active');      // N'est plus l'option active
            
        }
        
    }   
    
    this.mSelectedValue = value;
    
    return context;
};