var UINumber = function(defaultValue, step) {
    'use strict';
    
    UIElement.call(this);
    
    var dom = document.createElement('input');
    dom.className = 'Number';
	dom.type = 'number';
    dom.step = step || 1.0;
    
    this.mDOM = dom;
	
	this.setValue(defaultValue);
    
    return this;
};

UINumber.prototype = Object.create(UIElement.prototype);

UINumber.prototype.getValue = function() {
    'use strict;'
    
    return parseFloat(this.mDOM.value);
};

UINumber.prototype.setValue = function(value) {
    'use strict';
    
    this.mDOM.value = parseFloat(value).toFixed(2) || 0.0;    
    
    return this;
};

UINumber.prototype.setRange = function(min, max) {
    'use strict';
    
    this.mDOM.min = min;
    this.mDOM.max = max;
  
    return this;
    
};