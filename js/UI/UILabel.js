var UILabel = function(text) {
    'use strict';
    
    UIElement.call(this);
    
    var dom = document.createElement('label');
    dom.className = 'Label';
    this.mDOM = dom;
	
	this.setTextContent(text);
    
    return this;    
};

UILabel.prototype = Object.create(UIElement.prototype);

UILabel.prototype.setFor = function(target) {
    'use strict';
    
    this.mDOM.htmlFor = target;
}