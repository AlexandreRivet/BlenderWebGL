
/*global UIElement, UIPanel, UIText */
var UITab = function (name) {
    'use strict';
	UIElement.call(this);
    
    this.mName = name;
    this.mTabList = {};
    
    
    this.mBlock = new UIPanel();
    this.mBlock.setClass('Tabs');
    
    this.mPanelTabs = new UIPanel();
    this.mPanelTabs.addClass('panelTab_tabs');
    
    this.mPanelContents = new UIPanel();
    this.mPanelContents.addClass('panelTab_contents');
    
    this.mBlock.add(this.mPanelTabs);
    this.mBlock.add(this.mPanelContents);
    
    this.mDOM = this.mBlock.mDOM;
    
    return this;
};

UITab.prototype = Object.create(UIElement.prototype);

UITab.prototype.add = function (name, element, callback) {
    'use strict';

    /* Création de l'onglet */
    var title = new UIPanel();
    title.setTextContent(name);
    title.setID(name);
    title.addClass('oneTab');
    
    this.mPanelTabs.add(title);
    
    /* Création du content associé */
    /* Ajout des interactions utilisateurs avec */
    title.click(callback);
    
    return title;
};