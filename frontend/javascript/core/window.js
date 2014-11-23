goog.provide('game.core.Window');

goog.require('game.core.Entity');
goog.require('game.core.helper');



/**
 * Window singleton class, this is a representation of the current window
 * dimensions.
 *
 * @constructor
 * @extends {game.core.Entity}
 */
game.core.Window = function() {
  if (game.core.Window.prototype._singletonInstance) {
    return game.core.Window.prototype._singletonInstance;
  }
  game.core.Window.prototype._singletonInstance = this;
  game.core.helper.mixin(this, 'shape', 'listenable');
  this.registerListener(
      game.core.Window.RESIZE_LISTENER_EVENT_NAME, this.resize_.bind(this));
  window.addEventListener('resize',
      this.callListeners.bind(
          this, game.core.Window.RESIZE_LISTENER_EVENT_NAME));
  this.resize_();
};


/**
 * @const {string}
 */
game.core.Window.RESIZE_LISTENER_EVENT_NAME = 'resize';


/**
 * Handles window resize events.
 *
 * @private
 */
game.core.Window.prototype.resize_ = function() {
  this.setSize(document.documentElement.clientWidth,
      document.documentElement.clientHeight);
};
