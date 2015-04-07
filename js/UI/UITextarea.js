var UITextArea = function () {
    'use strict';
    
    UIElement.call(this);
    
    var dom = document.createElement('textarea');
    dom.className = 'TextArea';
    
    this.mDOM = dom;
    
    return this;
}

UITextArea.prototype = Object.create(UIElement.prototype);