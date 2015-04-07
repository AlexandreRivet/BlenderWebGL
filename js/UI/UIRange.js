var UIRange = function(min, max, value)
{
    UIElement.call(this);
    
    var dom = document.createElement('input');
    dom.className = 'Range';
	dom.type = 'range';
    
    dom.min = (check(min)) ? min : 0;
    dom.max = (check(max)) ? max : 0;
    
    this.mDOM = dom;
	
	this.setValue(value);
    
    return this;
};

UIRange.prototype = Object.create(UIElement.prototype);

UIRange.prototype.setValue = function(value)
{
    if (check(value))
	   this.mDOM.value = value;
};

UIRange.prototype.getValue = function()
{
	return this.mDOM.value;
}
