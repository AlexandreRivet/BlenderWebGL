/*global $, UIElement, console, HashMap */

var UITree = function (name) {
    'use strict';
    UIElement.call(this);
    
    this.mName = name;
    
    var dom = document.createElement('div');
    dom.className = 'Tree';
    dom.id = this.mName;
    this.mDOM = dom;
    
    this.mNodes = new HashMap();
    
    return this;
};

UITree.prototype = Object.create(UIElement.prototype);

UITree.prototype.init = function (options) {
    'use strict';
    $("#" + this.mDOM.id).jstree(options);
};

UITree.prototype.addNode = function (parent, object, position, callback) {
    'use strict';
    var ref = $("#" + this.mDOM.id).jstree(true), node;
    
    console.log(this.mNodes);
    
    parent = (typeof parent == "string") ? this.mNodes.get(parent) : parent;
    console.log(parent);
    node = ref.create_node((check(parent) ? parent : "#"), object, position, callback);
    this.mNodes.put(object, node);
};