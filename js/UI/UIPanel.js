/**************************************************

**************************************************/
var UIPanel = function ()
{
	UIElement.call(this);
    
    var dom = document.createElement('div');
    dom.className = 'Panel';
    
    this.mDOM = dom;
    
    return this;    
}
UIPanel.prototype = Object.create(UIElement.prototype);

UIPanel.prototype.add = function()
{
    for (var i = 0; i < arguments.length; ++i)
    {
        var argument = arguments[i];
        if (argument instanceof UIElement)
            this.mDOM.appendChild(argument.mDOM);
        else   
            console.error('UIPanel => ', argument, 'is not an instance of UIElement');
    }
    return this;
};

UIPanel.prototype.remove = function()
{
    for (var i = 0; i < arguments.length; ++i)
    {
        var argument = arguments[i];
        if (argument instanceof UIElement)
            this.mDOM.removeChild(argument.mDOM);
        else
            console.error('UIPanel => ', argument, 'is not an instance of UIElement');
    }
    return this;
};

UIPanel.prototype.clean = function()
{
    while(this.mDOM.children.length > 0)
        this.mDOM.removeChild(this.mDOM.lastChild);
};