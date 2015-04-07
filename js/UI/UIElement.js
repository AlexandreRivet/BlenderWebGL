/**************************************************

**************************************************/

var UIElement = function (dom) {
    'use strict';
	this.mDOM = dom;
    this.mVisible = true;
};

UIElement.prototype.setID = function (ID) {
    'use strict';
	this.mDOM.id = ID;
	return this;
};

UIElement.prototype.setClass = function (className) {
    'use strict';
	this.mDOM.className = className;
	return this;
};

UIElement.prototype.addClass = function (className) {
    'use strict';
    this.mDOM.className += " " + className;
    return this;
};

UIElement.prototype.setStyle = function (styles) {
    'use strict';
    var key;
    for (key in styles)
        this.mDOM.style[key] = styles[key];
    return this;
};

UIElement.prototype.setVisible = function (enable) {
    'use strict';
    this.mVisible = enable;
    this.setStyle({'display' : ((enable) ? 'block' : 'none') });
};

UIElement.prototype.setDisabled = function (enable) {
    'use strict';
	this.mDOM.disabled = enable;
	return this;
};

UIElement.prototype.setTextContent = function (content) {
    'use strict';
	this.mDOM.textContent = content;
	return this;
};

UIElement.prototype.getTextContent = function () {
    'use strict';
	return this.mDOM.textContent;
};

UIElement.prototype.click = function (callback) { 'use strict'; this.mDOM.addEventListener('click', callback); };
UIElement.prototype.change = function (callback) { 'use strict'; };