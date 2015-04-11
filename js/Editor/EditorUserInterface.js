/*global console, HashMap, check */
/*global THREE, Editor */
/*global UIPanel, UIButton, UIText */

var EditorUserInterface = function (editor) {
    'use strict';
    
    this.mEditor = editor;
    this.mUIElements = new HashMap();
};

EditorUserInterface.prototype.add = function (name, object, parent) {
    'use strict';
    if (!check(name) || !check(object)) {
        console.error("Error with parameters");
        return;
    }
    
    if (this.mUIElements.get(name)) {
        console.info("UIElement already created. Can't override.");
        return;
    }
    
    parent = this.mUIElements.get(parent);
    if (!check(parent) || parent === "#") {
        document.body.appendChild(object.mDOM);
    } else {
        parent.add(object);
    }
    
    this.mUIElements.put(name, object);
};
