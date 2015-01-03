goog.provide('engine.core.Window');

goog.require('engine.core.Entity');
goog.require('engine.core.helper');



/**
 * Window singleton class, this is a representation of the current window
 * dimensions.
 *
 * @constructor
 * @extends {!engine.core.Entity}
 */
engine.core.Window = function() {
  if (engine.core.Window.prototype._singletonInstance) {
    return engine.core.Window.prototype._singletonInstance;
  }
  engine.core.Window.prototype._singletonInstance = this;
  engine.core.Window.base(this, 'constructor');
  engine.core.helper.mixin(this, 'shape', 'listenable');
  this.resize_();
  this.registerListener(
      engine.core.Window.RESIZE_LISTENER_EVENT_NAME, this.resize_.bind(this));
  window.addEventListener(
      engine.core.Window.RESIZE_LISTENER_EVENT_NAME,
      this.callListeners.bind(
          this, engine.core.Window.RESIZE_LISTENER_EVENT_NAME));
};
engine.core.helper.inherit(engine.core.Window, engine.core.Entity);


/**
 * @const {string}
 */
engine.core.Window.RESIZE_LISTENER_EVENT_NAME = 'resize';


/**
 * Handles window resize events.
 *
 * @private
 */
engine.core.Window.prototype.resize_ = function() {
  this.setSize(document.documentElement.clientWidth,
      document.documentElement.clientHeight);
};
