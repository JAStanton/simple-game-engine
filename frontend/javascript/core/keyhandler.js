goog.provide('engine.core.KeyHandler');



/**
 * KeyHandler class, this class keeps track of key events.
 *
 * @constructor
 */
engine.core.KeyHandler = function() {
  if (engine.core.KeyHandler.prototype._singletonInstance) {
    return engine.core.KeyHandler.prototype._singletonInstance;
  }
  engine.core.KeyHandler.prototype._singletonInstance = this;
  /**
   * True if we should respons to keyUp and keyDown.
   * @type {Boolean}
   */
  this.ignoreKeys = false;
  /**
   * Object that tracks what is currently being pressed.
   * @private {!Object.<!game.constants.KEYCODES, boolean>}
   */
  this.pressed_ = {};
  // Add event listeners.
  window.addEventListener('keyup', this.onKeyup_.bind(this), false);
  window.addEventListener('keydown', this.onKeydown_.bind(this), false);
  // Right clicking
  document.addEventListener(
      'visibilitychange', this.visibilityChanged_.bind(this));
  document.addEventListener('mousedown', this.mouseDown_.bind(this));
};


/**
 * Checks if the app lost visibility. If it does then we can no longer detect
 * keyUp events so we will just wipe out all the keys.
 *
 * @private
 */
engine.core.KeyHandler.prototype.visibilityChanged_ = function() {
  if (document.hidden) {
    this.pressed_ = {};
  }
};


/**
 * @param {!Event} evt
 * @private
 */
engine.core.KeyHandler.prototype.mouseDown_ = function(evt) {
  if (evt.which != 1) {
    this.pressed_ = {};
  }
};


/**
 * Returns true if the given keyCode is currently being pressed.
 *
 * @param {!game.constants.KEYCODES} keyCode
 * @return {boolean} true if key is down.
 */
engine.core.KeyHandler.prototype.isDown = function(keyCode) {
  return !!this.pressed_[keyCode];
};


/**
 * Callback for keydown event.
 *
 * @param {!Event} evt
 * @private
 */
engine.core.KeyHandler.prototype.onKeydown_ = function(evt) {
  var keyCode = evt.keyCode;
  if (this.ignoreKeys) return;
  if (this.isDown(keyCode)) return;
  this.pressed_[evt.keyCode] = true;
};


/**
 * Callback for keyup event.
 *
 * @param {!Event} evt
 * @private
 */
engine.core.KeyHandler.prototype.onKeyup_ = function(evt) {
  var keyCode = evt.keyCode;
  if (this.ignoreKeys) return;
  delete this.pressed_[keyCode];
};
