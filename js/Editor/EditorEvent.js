/*global signals */

/*******************************
    Classe EditorEvent
    Surcharge des events 'signals'
*******************************/
var EditorEvent = function () {
    'use strict';
    
    this.mSignals = {};
};

/*
    Ajoute un nouvel event
*/
EditorEvent.prototype.addEvent = function (name) {
    'use strict';
    this.mSignals[name] = new signals.Signal();
};

/*
    Ajoute une fonction à appeler par l'event
*/
EditorEvent.prototype.addFunctionToEvent = function (name, callback) {
    'use strict';
    if (this.getEvent(name))
        this.mSignals[name].add(callback);
};

/*
    Supprime une fonction à appeler par l'event
*/
EditorEvent.prototype.removeFunctionToEvent = function (name, callback) {
    'use strict';
    this.mSignals[name].remove(callback);
};

/*
    Récupère un event
*/
EditorEvent.prototype.getEvent = function (name) {
    'use strict';
    return this.mSignals[name];
};