var UICheckbox = function(value)
{
    UIElement.call(this);
    
    var dom = document.createElement('input');
    dom.className = 'Checkbox';
	dom.type = 'checkbox';
    this.mDOM = dom;
	
	this.setValue(value);
    
    return this;
};

UICheckbox.prototype = Object.create(UIElement.prototype);

UICheckbox.prototype.setValue = function(value)
{
    if (check(value))
	   this.mDOM.checked = value;
};

UICheckbox.prototype.getValue = function()
{
	return this.mDOM.checked;
}