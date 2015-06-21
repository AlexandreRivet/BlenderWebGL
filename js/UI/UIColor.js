var UIColor = function()
{
    UIElement.call(this);
    
    var dom = document.createElement('input');
    dom.className = 'Color';
	dom.type = 'color';
    dom.value = '#ffffff';
    this.mDOM = dom;
    
    return this;
};

UIColor.prototype = Object.create(UIElement.prototype);

UIColor.prototype.getValue = function() {
    'use strict';
    
    return this.mDOM.value;
    
};

UIColor.prototype.getHexaValue = function() {
    'use strict';
    
    return parseInt(this.mDOM.value.substr(1), 16);
    
};

UIColor.prototype.setValue = function(value) {
    'use strict';
    
    this.mDOM.value = value;
    
    return this;    
    
};

UIColor.prototype.setHexaValue = function(value) {
    'use strict';
    
    this.mDOM.value = '#' + ('000000' + value.toString(16)).slice(-6);
    
    return this;
    
};