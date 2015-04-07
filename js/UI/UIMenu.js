var UIMenu = function(name)
{
    UIElement.call(this);
    
    this.mName = name;
    
    this.mBlock = new UIPanel();
    
    this.mMenuTitle = new UIPanel();
    this.mMenuTitle.add(new UIText(name));
    
    this.mMenuItems = new UIPanel();
    this.mMenuItems.setVisible(false);

    this.mBlock.add(this.mMenuTitle);
    this.mBlock.add(this.mMenuItems);
    
    var scope = this;
    scope.mMenuTitle.mDOM.addEventListener('mousedown', function(e){
        scope.mMenuItems.setVisible(true);
        
    });
    
    this.mDOM = this.mBlock.mDOM;
    
    return this;
};

UIMenu.prototype = Object.create(UIElement.prototype);

UIMenu.prototype.addMenuItem = function(menuItem)
{
    this.mMenuItems.add(menuItem);
};
