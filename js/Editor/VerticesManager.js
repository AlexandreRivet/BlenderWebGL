/*global window, console, check */
/*global THREE, EditorEvent */

var VerticesManager = function(editor) {
    "use strict";
    
    this.mEditor = editor;
    this.mObjectGeometry = null;
    this.mVertices = [];
};

VerticesManager.prototype.cleanContext = function() {
    /**
     * Clean le context du manager
     */
    "use strict";
    this.mVertices = [];
    this.mObjectGeometry = null;
};

VerticesManager.prototype.setObject = function(object) {
    /**
     * Clean le context courant
     * 
     * Réattribut l'objet managé
     */
    
    "use strict";
    this.cleanContext();
    
    this.mObjectGeometry = object.geometry;
};

VerticesManager.prototype.addVertices = function(idVertices) {
    /**
     * Supprime tous les vertices selectionné et ajoute le nouveau vertices à la liste
     */
    
    "use strict";    
    console.log("Add vetices : " + idVertices);
    
    this.clearVertices();
    this.pushVertice(idVertices);
};

VerticesManager.prototype.pushVertice = function(idVertices) {
    /**
     * Ajout à la liste de vetices selectionné idVertices
     */
    
    "use strict";
    console.log("Push vetices : " + idVertices);
    
    if(idVertices > this.mObjectGeometry)
    {
        console.log("Out of range idVertice");
    }
    else
    {
        this.mVertices.push(idVertices);
    }
};

VerticesManager.prototype.popVertice = function() {
    /**
     * Supprime le dernier vertices selectionné
     */
    
    "use strict";
    console.log("Pop vetices");
    
    this.mVertices.pop();
};

VerticesManager.prototype.clearVertices = function() {
    /**
     * Supprime tous les vertices selectionné
     */
    
    "use strict";
    console.log("Clear vertices");
    
    this.mVertices = [];
};

VerticesManager.prototype.move = function(deltas) {
    /**
     * Deplace tous les vertices selectionné sur l'axe donné en paramètre de delta
     */
    
    "use strict";
    console.log("Move vertices");
    
    for(var i = 0; i < this.mVertices.length; ++i) {
        this.mObjectGeometry.vertices[this.mVertices[i]].x += deltas.x;
        this.mObjectGeometry.vertices[this.mVertices[i]].y += deltas.y;
        this.mObjectGeometry.vertices[this.mVertices[i]].z += deltas.z;
    }
    
    this.mObjectGeometry.verticesNeedUpdate = true;
};