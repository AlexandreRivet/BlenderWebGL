/*global UIElement */

var UIButton = function (value) {
    'use strict';
    UIElement.call(this);
    
    var dom = document.createElement('button');
    dom.className = 'Button';
    dom.textContent = value;
    
    this.mDOM = dom;
    
    return this;
};

UIButton.prototype = Object.create(UIElement.prototype);

UIButton.prototype.add = function() {
    'use strict';
    
    for (var i = 0; i < arguments.length; ++i)
    {
        var argument = arguments[i];
        if (argument instanceof UIElement) {
            this.mDOM.appendChild(argument.mDOM);
            argument.addClass('Image_Button');
        }
        else   
            console.error('UIPanel => ', argument, 'is not an instance of UIElement');
    }
    return this;    
}