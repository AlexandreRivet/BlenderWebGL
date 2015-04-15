var UISeparator = function () {
    'use strict';
    UIElement.call(this);
    
    var dom = document.createElement('hr');
    dom.className = 'Separator';
    
    this.mDOM = dom;
    
    return this; 
};

UISeparator.prototype = Object.create(UIElement.prototype);