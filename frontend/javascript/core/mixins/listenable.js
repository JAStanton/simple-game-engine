goog.provide('game.mixins.Listenable');

goog.require('engine.core.helper');



/**
 * Makes something listenable. Exposes functions like {@code #registerListener},
 * and {@code #callListeners} which will iterate over the functions and call the
 * registered listener. Namespace is global.
 *
 * @constructor
 */
game.mixins.Listenable = function() {};


/**
 * Register mixin globally.
 */
engine.core.helper.mixins['listenable'] = game.mixins.Listenable.prototype;


/**
 * The listeners.
 *
 * @type {Object.<string, Function>}
 */
game.mixins.Listenable.listeners = {};


/**
 * Registers a listener via a global namespace.
 *
 * @param {string} name
 * @param {Function} callback
 * @param {boolean=} opt_callImmediatly Calls the callback immediately.
 */
game.mixins.Listenable.prototype.registerListener =
    function(name, callback, opt_callImmediatly) {
  if (!game.mixins.Listenable.listeners[name]) {
    game.mixins.Listenable.listeners[name] = [];
  }
  game.mixins.Listenable.listeners[name].push(callback);
  if (_.isBoolean(opt_callImmediatly) && opt_callImmediatly) {
    callback();
  }
};


/**
 * @param {string} name
 */
game.mixins.Listenable.prototype.callListeners = function(name) {
  _.each(game.mixins.Listenable.listeners[name], function(callback) {
    callback();
  });
};
