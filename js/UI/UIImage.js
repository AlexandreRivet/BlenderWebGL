var UIImage = function(src) {
    'use strict';
    
    UIElement.call(this);
    
    var dom = document.createElement('img');
    dom.className = 'Image';
    dom.src= src;
    
    this.mDOM = dom;
    
    return this;    
};

UIImage.prototype = Object.create(UIElement.prototype);