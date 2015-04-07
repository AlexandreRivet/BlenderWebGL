/*global Editor, check, window, console */

/********************************************************
EditorManager Class
********************************************************/
var EditorManager = function () {
    'use strict';
    this.mEditorInstance = 0;                           // To simulate an id for differents workspaces
    
    this.mEditorList = [];                              // List of current workspaces
    this.mEditorActive = null;                          // Active workspace (current editor)
    
    this.mFrameID = 0;
};

// Add workspace
EditorManager.prototype.addWorkspace = function (name, container) {
    'use strict';
    var editor;
    
    if (!check(name)) {
        name = "Editor" + this.mEditorInstance;
    }
    
    editor = new Editor(name, container);
    this.mEditorList.push(editor);                      // TODO: Send id to Editor, maybe ?
    
    this.setEditorActive(editor);
    
    this.mEditorInstance += 1;
    
    return editor;
};

// Update the graphic view
EditorManager.prototype.render = function (timestamp) {
    'use strict';
    // console.log('Frame id: ' + this.mFrameID);
    
    var context = this;                                                     // Little tricks (to save context, because we can't call this.something)

    this.mFrameID = window.requestAnimationFrame(function () {              // Like SetInterval() but better for graphics render
        context.render();
    });
    
    if (check(this.mEditorActive)) {
        this.mEditorActive.prepareFrame();                                  // Here, we update the current active editor => we don't care if we swapped between two editors 
    }
};

EditorManager.prototype.setEditorActive = function (editor) {
    'use strict';
    if (check(this.mEditorActive)) {
        this.mEditorActive.mRenderer.domElement.style.display = "none";
    }
    this.mEditorActive = editor;
    this.mEditorActive.mRenderer.domElement.style.display = "block";
};

EditorManager.prototype.getEditorByName = function (name) {
    'use strict';
    var editor;
    for (editor in this.mEditorList)
    {
        if (this.mEditorList[editor].mName === name)
            return this.mEditorList[editor];
    }
};

//TODO: Add other treatments in the future