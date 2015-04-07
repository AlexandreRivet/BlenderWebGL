var UISelect = function(options)
{
    UIElement.call(this);
    
    var dom = document.createElement('select');
    dom.className = 'Select';    
    this.mDOM = dom;
	
	this.setOptions(options);
    
    return this;
};

UISelect.prototype = Object.create(UIElement.prototype);

UISelect.prototype.setMultiplie = function(multiple)
{
    this.mDOM.multiple = multiple;
};

UISelect.prototype.setOptions = function(options)
{
    while(this.mDOM.children.length > 0)
        this.mDOM.removeChild(this.mDOM.lastChild);
    
    for (var key in options)
    {
        var option = document.createElement('option');
        option.value = options[key];
        option.innerHTML = options[key];
        this.mDOM.appendChild(option);
    }
};