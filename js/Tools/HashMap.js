/*global console */

/*******************************
    HashMap Class
    Note: Keys can only be a string (voluntary)
*******************************/
var HashMap = function (args) {
    'use strict';
    this.mDatas = {};
    
    switch (arguments.length) {
    case 0:
        break;
    case 1:
        this.copy(args);
        break;
    default:
        console.warn("Too many arguments in this HashMap. Arguments have been ignored.");
        break;
    }
};

/*
    Removes all of the mappings from this map
*/
HashMap.prototype.clear = function () {
    'use strict';
    this.mDatas = {};
};

/*
    Copy all keys and values in this map from another one
*/
HashMap.prototype.copy = function (hm) {
    'use strict';
    for (var key in hm.mDatas) 
        this.mDatas[key] = hm.mDatas[key];
};

/*
    Return a clone of this HashMap instance: the keys and values themselves are not cloned
*/
HashMap.prototype.clone = function () {
    'use strict';
    return new HashMap(this);
};

/*
    Return true if this map contains a mapping for the specified key
*/
HashMap.prototype.containsKey = function (key) {
    'use strict';
    return key in this.mDatas;
};

/*
    Return true if this map maps one or more keys to the specified value
*/
HashMap.prototype.containsValue = function (value) {
    'use strict';
    for (var key in this.mDatas)
        if (this.mDatas[key] === value)
            return true;
};

/*
    Return the value to which the specified key is mapped, or undefined if this map contains no mapping for the key
*/
HashMap.prototype.get = function (key) {
    'use strict';
    return this.mDatas[key];
};

/*
    Associates the specified value with the specified key in this map
*/
HashMap.prototype.put = function (key, value) {
    'use strict';
    this.mDatas[key] = value;
};

/*
    Return if this map is empty
*/
HashMap.prototype.isEmpty = function () {
    'use strict';
    return (this.keys().length === 0);
};

/*
    Return the number of key-value mappings in this map
*/
HashMap.prototype.size = function () {
    'use strict';
    return this.keys().length;
};

/*
    Removes the mapping for the specified key from this map if present
*/
HashMap.prototype.remove = function (key) {
    'use strict';
    delete this.mDatas[key];
};

/*
    Return an Array of the keys contained in this map
*/
HashMap.prototype.keys = function () {
    'use strict';
    var keys = [];
    for (var key in this.mDatas)
        keys.push(key);
    return keys;
};

/*
    Return an Array of the values contained in this map
*/
HashMap.prototype.values = function () {
    'use strict';
    var values = [];
    for (var key in this.mDatas)
        values.push(this.mDatas[key]);
    return values;
};