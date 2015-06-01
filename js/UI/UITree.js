/*global $, UIElement, console, HashMap */

var UINode = function(name, defaultOpened, callback) {
    'use strict';
    UIElement.call(this);
    
    this.mName = name;
    this.mOpened = defaultOpened;
    this.mChildren = new HashMap();
    this.mButtonHidden = true;
    
    this.mBlock = new UIPanel();
    this.mBlock.setClass('Node');
    
    this.mHeaderPanel = new UIPanel();
    this.mHeaderPanel.addClass('header_node');
    
    this.mChildrenPanel = new UIPanel();
    this.mChildrenPanel.addClass('children_node');
    
    this.mBlock.add(this.mHeaderPanel);
    this.mBlock.add(this.mChildrenPanel);
    
    this.mDOM = this.mBlock.mDOM;
    
    this.mOpenButton = null;
    this.mActionButton = null;    
    
    this.init();
    
    return this;
};

UINode.prototype = Object.create(UIElement.prototype);

UINode.prototype.init = function() {
    "use strict";
    var context = this;
    
    // Button definition
    this.mOpenButton = (new UIButton('+')).addClass('hierarchy_btn');
    this.mOpenButton.click(function(e) {
        context.mOpened = !context.mOpened;
        if (context.mOpened) {
            context.mChildrenPanel.setVisible(true);
            context.mOpenButton.setTextContent('-');
        } else {
            context.mChildrenPanel.setVisible(false);
            context.mOpenButton.setTextContent('+');
        }
    });
    this.mHeaderPanel.add(this.mOpenButton);
    
    if (this.mOpened) {
        this.mChildrenPanel.setVisible(true);
        this.mOpenButton.setTextContent('-');
    } else {
        this.mChildrenPanel.setVisible(false);
        this.mOpenButton.setTextContent('+');
    }
    
    if (this.mButtonHidden) {
        this.mOpenButton.setDisabled(true);
    }
    
    // Title definition
    var title = new UIText(this.mName);
    title.addClass('header_title_node');
    
    this.mHeaderPanel.add(title);
    
};

UINode.prototype.add = function(node) {
    'use strict';
    
    this.mChildrenPanel.add(node);
    
    this.mChildren.put(node.mName, node);
    
    if (this.hasChildren() && this.mButtonHidden) {
        this.mButtonHidden = false;
        this.mOpenButton.setDisabled(false);
    }
    
};

UINode.prototype.hasChildren = function() {
    'use strict';
    
    return (this.mChildren.size() > 0 ? true : false);
};