var UIHidingPanel = function(name)
{
    UIElement.call(this);
    
    this.mName = name;
    
    this.mBlock = new UIPanel();
    
    this.mPanelTitle = new UIPanel();
    this.mPanelTitle.add(new UIText(name));
    this.mPanelTitle.addClass("PanelClickable");
    
    this.mPanelContent = new UIPanel();
    this.mPanelContent.setVisible(false);

    this.mBlock.add(this.mPanelTitle);
    this.mBlock.add(this.mPanelContent);
    
    var scope = this;
    scope.mPanelTitle.mDOM.addEventListener('click', function(e)
    {
        scope.mPanelContent.setVisible(!scope.mPanelContent.mVisible);
    });
    
    this.mDOM = this.mBlock.mDOM;
    
    return this;
};

UIHidingPanel.prototype = Object.create(UIElement.prototype);

UIHidingPanel.prototype.add = function(element)
{
    this.mPanelContent.add(element);
};
