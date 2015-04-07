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

UIButton.prototype.click = function (callback) {
    'use strict';
    this.mDOM.addEventListener('click', callback);
};