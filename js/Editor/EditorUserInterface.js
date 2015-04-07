/*global console, Editor, UIPanel, UITab, UIText, UIButton */

var EditorUserInterface = function (editorMng) {
    'use strict';
    
    this.mEditorManager = editorMng;
    
    this.mTopPanel = new UIPanel();
    this.mTopPanel.addClass('topPanel');
    
    this.mMiddlePanel = new UIPanel();
    this.mMiddlePanel.addClass('middlePanel');
    
    this.mMiddleContent = new UIPanel();
    this.mMiddleContent.addClass('middleContent');
    
    this.mMiddlePanel.add(this.mMiddleContent);
    
    this.mLeftPanel = new UIPanel();
    this.mLeftPanel.addClass('leftPanel');
    
    this.mWorkspacePanel = new UITab('workspacePanel');
    
    this.mRightPanel = new UIPanel();
    this.mRightPanel.addClass('rightPanel');
    
    this.mBottomPanel = new UIPanel();
    this.mBottomPanel.addClass('bottomPanel');
    
    this.mMiddleContent.add(this.mLeftPanel);
    this.mMiddleContent.add(this.mWorkspacePanel);
    this.mMiddleContent.add(this.mRightPanel);
    
    document.body.appendChild(this.mTopPanel.mDOM);
    document.body.appendChild(this.mMiddlePanel.mDOM);
    document.body.appendChild(this.mBottomPanel.mDOM);
};

EditorUserInterface.prototype.init = function () {
    'use strict';
    var context = this, panel;
    
    panel = new UIButton("Add new workspace");
    panel.click(function () {
        context.mEditorManager.addWorkspace(null, context.mWorkspacePanel.mPanelContents.mDOM);
        var tab = context.mWorkspacePanel.add(context.mEditorManager.mEditorActive.mName, null, function () {
            var editor = context.mEditorManager.getEditorByName(tab.mDOM.id);
            context.mEditorManager.setEditorActive(editor);
        });
    });
    this.mTopPanel.add(panel);
};