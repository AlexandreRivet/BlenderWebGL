var UIInput = function(text) {
    'use strict';
    
    UIElement.call(this);
    
    var dom = document.createElement('input');
    dom.className = 'Input';
    
    dom.addEventListener('keydown', function(e) {
    
        e.stopPropagation();
        
    });
    
    this.mDOM = dom;
    this.setValue(text);
    
    return this;    
};

UIInput.prototype = Object.create(UIElement.prototype);

UIInput.prototype.getValue = function() {
    'use strict';
    
    return this.mDOM.value;
}

UIInput.prototype.setValue = function(value) {
    'use strict';
    
    this.mDOM.value = value;
    
};