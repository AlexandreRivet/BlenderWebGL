/*global window, console, check */
/*global THREE, EditorEvent */

var FacesManager = function(editor) {
    "use strict";
    
    this.mEditor = editor;
    this.mObjectGeometry = null;
    this.mFaces = [];
    this.mVertices = [];
    this.mNeedsUpdate = false;
};


FacesManager.prototype.cleanContext = function() {
    /**
     * Clean le context du manager
     */
    "use strict";
    this.clearFaces();
    this.mObjectGeometry = null;
};

FacesManager.prototype.setObject = function(object) {
    /**
     * Clean le context courant
     * 
     * Réattribut l'objet managé
     */
    
    "use strict";
    this.cleanContext();
    
    this.mObjectGeometry = object.geometry;
};

FacesManager.prototype.addFace = function(idFace) {
    /**
     * Supprime tous les vertices selectionné et ajoute le nouveau vertices à la liste
     */
    
    "use strict";    
    
    this.clearFaces();
    this.pushFace(idFace);
    
    this.mNeedsUpdate = true;
};

FacesManager.prototype.pushFace = function(idFace) {
    /**
     * Ajout à la liste de vetices selectionné idVertices
     */
    
    "use strict";
    
    if(idFace > this.mObjectGeometry.faces.length)
    {
        console.warn("Out of range + " + idFace);
    }
    else
    {
        if (this.mFaces.indexOf(idFace) != -1) {
            
            this.remove(idFace);
            
        } else {
            
            this.mFaces.push(idFace);
            
            this.mObjectGeometry.faces[idFace].selected = true;
            this.mObjectGeometry.faces[idFace].color = new THREE.Color(0x000fff);
            this.mObjectGeometry.colorsNeedUpdate = true;
            
        }
        
        this.mNeedsUpdate = true;
    }
};

FacesManager.prototype.remove = function(idFace) {
    /**
     * Remove à la liste de faces
     */
    
    "use strict";
    
    var index = this.mFaces.indexOf(idFace);
    if (index != -1) {
        
        this.mFaces.splice(index, 1);    
        
        this.mObjectGeometry.faces[idFace].selected = false;
        this.mObjectGeometry.faces[idFace].color = new THREE.Color(0xffffff);
        this.mObjectGeometry.colorsNeedUpdate = true;
        
    }

    this.mNeedsUpdate = true;
    
};

FacesManager.prototype.popFace = function() {
    /**
     * Supprime le dernier vertices selectionné
     */
    
    "use strict";
    
    this.mFaces.pop();
    
    this.mNeedsUpdate = true;
};

FacesManager.prototype.clearFaces = function() {
    /**
     * Supprime tous les vertices selectionné
     */
    
    "use strict";
    
    while (this.mFaces.length > 0)
        this.remove(this.mFaces[0]);
    
    this.mNeedsUpdate = true;
};

FacesManager.prototype.move = function(deltas) {
    /**
     * Deplace tous les vertices selectionné selon delta qui est un Vector3 avec les delta sur chaque axe
     */
    
    "use strict";
    
    this.prepareVertices();
    
    for(var i = 0; i < this.mVertices.length; ++i) {
        
        this.mObjectGeometry.vertices[this.mVertices[i]].x += deltas.x;
        this.mObjectGeometry.vertices[this.mVertices[i]].y += deltas.y;
        this.mObjectGeometry.vertices[this.mVertices[i]].z += deltas.z;
        
    }
    
    this.mObjectGeometry.verticesNeedUpdate = true;
};

    
FacesManager.prototype.prepareVertices = function(force) {
  
    "use strict";
    
    if (!this.mNeedsUpdate || (check(force) && !force))
        return;
    
    this.mVertices = [];
    
    for(var i = 0; i < this.mFaces.length; ++i) {
     
        var face = this.mObjectGeometry.faces[this.mFaces[i]];
        
        var a = face.a;
        if (this.mVertices.indexOf(a) == -1)
            this.mVertices.push(a);
        
        var b = face.b;
        if (this.mVertices.indexOf(b) == -1)
            this.mVertices.push(b);
        
        var c = face.c;
        if (this.mVertices.indexOf(c) == -1)
            this.mVertices.push(c); 
   
    }
    
    this.mNeedsUpdate = false;
    
};

FacesManager.prototype.getBarycentreFaces = function() {
    
    "use strict";
    
    this.prepareVertices(true);
    
    var barycentre = new THREE.Vector3();
    
    for (var i = 0; i < this.mVertices.length; i++) {
     
        barycentre.x += this.mObjectGeometry.vertices[this.mVertices[i]].x;
        barycentre.y += this.mObjectGeometry.vertices[this.mVertices[i]].y;
        barycentre.z += this.mObjectGeometry.vertices[this.mVertices[i]].z;
        
    }
    
    barycentre.divideScalar(this.mVertices.length);
    
    return barycentre;    
    
}