var UIText = function(text)
{
    UIElement.call(this);
    
    var dom = document.createElement('span');
    dom.className = 'Text';
    this.mDOM = dom;
	
	this.setTextContent(text);
    
    return this;    
};

UIText.prototype = Object.create(UIElement.prototype);