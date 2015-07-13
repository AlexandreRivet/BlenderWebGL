/*global UIElement, UIPanel, UISeparator */

var UIContextualMenu = function () {
    'use strict';
    UIElement.call(this);
    
    this.mBlock = new UIPanel();
    this.mBlock.setClass('ContextualMenu');

    this.mMenuItems = new UIPanel();
    this.mMenuItems.setClass('Options');

    this.mBlock.add(this.mMenuItems);
	
    this.mDOM = this.mBlock.mDOM;
    
    return this;
};

UIContextualMenu.prototype = Object.create(UIElement.prototype);

UIContextualMenu.prototype.addMenuItem = function (menuItem) {
    'use strict';
    menuItem.addClass('Option');
    this.mMenuItems.add(menuItem);
};

UIContextualMenu.prototype.addSeparator = function () {
    'use strict';
    this.mMenuItems.add(new UISeparator());
};