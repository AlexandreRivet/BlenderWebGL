/*global UIElement, UIPanel, UISeparator */

var UIMenu = function (name) {
    'use strict';
    UIElement.call(this);
    
    this.mName = name;
    
    this.mBlock = new UIPanel();
    this.mBlock.setClass('Menu');
    
    this.mMenuTitle = new UIPanel();
    this.mMenuTitle.setClass('Title');
    this.mMenuTitle.setTextContent(name);
    
    this.mMenuItems = new UIPanel();
    this.mMenuItems.setClass('Options');

    this.mBlock.add(this.mMenuTitle);
    this.mBlock.add(this.mMenuItems);
	
    this.mDOM = this.mBlock.mDOM;
    
    return this;
};

UIMenu.prototype = Object.create(UIElement.prototype);

UIMenu.prototype.addMenuItem = function (menuItem) {
    'use strict';
    menuItem.addClass('Option');
    this.mMenuItems.add(menuItem);
};

UIMenu.prototype.addSeparator = function () {
    'use strict';
    this.mMenuItems.add(new UISeparator());
};