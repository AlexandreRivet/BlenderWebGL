var UIHidingPanel = function(name)
{
    UIPanel.call(this);
    
    this.mPanelTitle = new UIPanel();
    this.mPanelTitle.addClass('PanelClickable');
    
    var button = new UIPanel();
    button.setClass('HidingPanelArrow');
    button.addClass('enabled');
    var title = new UIText(name);
    this.mPanelTitle.add(button);
    this.mPanelTitle.add(title);
    
    var context = this;
    context.mPanelTitle.click(function(e)
    {
        context.mPanelContent.setVisible(!context.mPanelContent.mVisible);
        
        if (context.mPanelContent.mVisible)
        {
            button.mDOM.classList.remove("disabled");   
            button.mDOM.classList.add("enabled");
        }
        else
        {
            button.mDOM.classList.remove("enabled");   
            button.mDOM.classList.add("disabled");
        }
        
    });
    this.mDOM.appendChild(this.mPanelTitle.mDOM);
    
    this.mPanelContent = new UIPanel();
    // this.mPanelContent.setVisible(false);
    this.mDOM.appendChild(this.mPanelContent.mDOM);
    
    return this;
};

UIHidingPanel.prototype = Object.create(UIPanel.prototype);

UIHidingPanel.prototype.add = function(element)
{
    this.mPanelContent.add(element);
};
