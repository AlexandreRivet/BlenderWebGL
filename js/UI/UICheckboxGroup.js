var UICheckboxGroup = function(checkbox, label) {
    'use strict';
    
    UIElement.call(this);
    
    this.mCheckbox = checkbox;
    this.mLabel = label;
    
    label.setFor(checkbox.mDOM.id);
    
    var container = new UIPanel().setStyle({"display": "inline-block", "margin-bottom": "0px"});
    container.add(checkbox);
    container.add(label);
    
    this.mDOM = container.mDOM;
    
    return this;    
};

UICheckboxGroup.prototype = Object.create(UIElement.prototype);

UICheckboxGroup.prototype.getValue = function() {
    'use strict';
    
    return this.mCheckbox.getValue(); 
    
};

UICheckboxGroup.prototype.setValue = function(value) {
    'use strict';
    
    this.mCheckbox.setValue(value);
    
    return this;
    
};