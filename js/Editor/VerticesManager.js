/*global window, console, check */
/*global THREE, EditorEvent */

var VerticesManager = function() {
    "use strict";
    
    this.m_ObjectGeometry = null;
    this.mVertices = [];
};


VerticesManager.prototype.setObject = function(object) {
    "use strict";
    
    this.mVertices = [];
    this.m_ObjectGeometry = object.geometry;
};

VerticesManager.prototype.addVertices = function(idVertices) {
  "use strict";
    
};

VerticesManager.prototype.pushVertice = function(idVertices) {
  "use strict";
    
};

VerticesManager.prototype.popVertice = function() {
  "use strict";
    
};

VerticesManager.prototype.clearVertice = function() {
  "use strict";
    
};

VerticesManager.prototype.move = function(axis, delta) {
  "use strict";
    
};