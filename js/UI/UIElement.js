/**************************************************
    Class UIElement
**************************************************/

var UIElement = function (dom) {
    'use strict';
	this.mDOM = dom;
    this.mVisible = true;
};

/*
    Définition de l'ID de la div
*/
UIElement.prototype.setID = function (ID) {
    'use strict';
	this.mDOM.id = ID;
	return this;
};

/*
    Définition de la classe (écrase toutes celles existantes)
*/
UIElement.prototype.setClass = function (className) {
    'use strict';
	this.mDOM.className = className;
	return this;
};

/*
    Ajoute une classe à celles existantes
*/
UIElement.prototype.addClass = function (className) {
    'use strict';
    this.mDOM.className += " " + className;
    return this;
};

/*
    Définition du style de la div
*/
UIElement.prototype.setStyle = function (styles) {
    'use strict';
    var key;
    for (key in styles)
        this.mDOM.style[key] = styles[key];
    return this;
};

/*
    Définit si la div doit être visible
*/
UIElement.prototype.setVisible = function (enable) {
    'use strict';
    this.mVisible = enable;
    this.setStyle({'display' : ((enable) ? 'block' : 'none') });
};

/*
    Définit si on désactive la div
*/
UIElement.prototype.setDisabled = function (enable) {
    'use strict';
	this.mDOM.disabled = enable;
	return this;
};

/*
    Définit le content direct de la div
*/
UIElement.prototype.setTextContent = function (content) {
    'use strict';
	this.mDOM.textContent = content;
	return this;
};

/*
    Retourne le content direct de la div
*/
UIElement.prototype.getTextContent = function () {
    'use strict';
	return this.mDOM.textContent;
};

/*
    Gestion de la souris
*/
UIElement.prototype.click       = function (callback) { 'use strict'; this.mDOM.addEventListener('click', callback.bind(this), true); return this; };
UIElement.prototype.mousedown   = function (callback) { 'use strict'; this.mDOM.addEventListener('mousedown', callback.bind(this), true); return this; };
UIElement.prototype.mouseup     = function (callback) { 'use strict'; this.mDOM.addEventListener('mouseup', callback.bind(this), true); return this; };
UIElement.prototype.mouseenter  = function (callback) { 'use strict'; this.mDOM.addEventListener('mouseenter', callback.bind(this), true); return this; };
UIElement.prototype.mouseleave  = function (callback) { 'use strict'; this.mDOM.addEventListener('mouseleave', callback.bind(this), true); return this; };
UIElement.prototype.mousemove   = function (callback) { 'use strict'; this.mDOM.addEventListener('mousemove', callback.bind(this), true); return this; };
UIElement.prototype.mousewheel  = function (callback) { 'use strict'; this.mDOM.addEventListener('mousewheel', callback.bind(this), true); return this; };


/*
    Gestion du clavier
*/
UIElement.prototype.keydown     = function (callback) { 'use strict'; this.mDOM.addEventListener('keydown', callback.bind(this), true); return this;};
UIElement.prototype.keyup       = function (callback) { 'use strict'; this.mDOM.addEventListener('keyup', callback.bind(this), true); return this; };

/*
    Other
*/
UIElement.prototype.change      = function (callback) { 'use strict'; this.mDOM.addEventListener('change', callback.bind(this), true); return this; };