var UIRadio = function(name, value)
{
    UIElement.call(this);
    
    var dom = document.createElement('input');
    dom.className = 'Checkbox';
	dom.type = 'radio';
    dom.name = check(name) ? name : 'default';
    
    this.mDOM = dom;
	
	this.setValue(value);
    
    return this;
};

UIRadio.prototype = Object.create(UIElement.prototype);

UIRadio.prototype.setValue = function(value)
{
    if (check(value))
	   this.mDOM.checked = value;
};

UIRadio.prototype.getValue = function()
{
	return this.mDOM.checked;
}