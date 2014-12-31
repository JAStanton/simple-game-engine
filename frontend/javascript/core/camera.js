goog.provide('game.core.Camera');
goog.provide('game.core.Camera.Axis');

goog.require('game.core.Camera');
goog.require('game.core.Root');



/**
 * Camera singleton class, the camera is responsible for updating the viewport.
 *
 * @constructor
 */
game.core.Camera = function() {
  if (game.core.Camera.prototype._singletonInstance) {
    return game.core.Camera.prototype._singletonInstance;
  }
  game.core.Camera.prototype._singletonInstance = this;
  /** @private {!game.Board}*/
  this.board_ = new game.core.Board();
  /** @private {!game.core.Root}*/
  this.root_ = new game.core.Root();
  /** @private {!game.core.Camera.Axis} */
  this.axis_ = game.core.Camera.DEFAULT_AXIS_;
  /** @private {number} */
  this.lastX_ = 0;
  /** @private {number} */
  this.lastY_ = 0;
  /** @private {array.<!game.core.Entity>} */
  this.layers_ = [];
  // Add the board as the first layer.
  this.addLayer(this.board_, 1);
};


/**
 * Various axis this camera can have.
 *
 * @enum {number}
 */
game.core.Camera.Axis = {
  NONE: 0,
  HORIZONTAL: 1,
  VERTICAL: 2,
  BOTH: 3
};


/**
 * @private {!game.core.Camera.Axis}
 */
game.core.Camera.DEFAULT_AXIS_ = game.core.Camera.Axis.BOTH;


/**
 * Sets the reference to the point the camera is tracking.
 *
 * @param {!game.core.Entity} entity The reference to the point the camera is
 *     tracking. (Really anything that has {@code game.mixins.Rectangle}).
 * @param {?game.core.Camera.Axis=} opt_axis
 * @return {game.core.Camera}
 */
game.core.Camera.prototype.watch = function(entity, opt_axis) {
  this.watchedEntity_ = entity;
  this.axis_ = opt_axis || game.core.Camera.DEFAULT_AXIS_;
  return this;
};


/**
 * Registers a layer to be displayed behind the board.
 *
 * @param {!game.core.Entity} layer
 * @param {number} distance A number from 0 - 1 determines how far away form the
 *     camera it appears to be.
  * @return {game.core.Camera}
 */
game.core.Camera.prototype.addLayer = function(layer, distance) {
  this.layers_.push({
    layer: layer,
    distance: distance || 1
  });
  return this;
};


/**
 * Update the camera's position.
 * @param {number} deltaTime
 */
game.core.Camera.prototype.update = function(deltaTime) {
  var CameraAxis = game.core.Camera.Axis;
  var axis = this.axis_;
  var hView = this.root_.getHeight();
  var wView = this.root_.getWidth();
  var xView = this.board_.getPosition().x;
  var yView = this.board_.getPosition().y;
  var boardWidth = this.board_.getWidth();
  var boardHeight = this.board_.getHeight();
  var xDeadZone = wView / 2;
  var yDeadZone = hView / 2;

  if (wView > boardWidth) {
    // I could scale here but it might look crappy. It would be cool though.
    console.warn('width is too large');
  }

  if (hView > boardHeight) {
    // I could scale here but it might look crappy. It would be cool though.
    console.warn('height is too large');
  }


  if (this.watchedEntity_ != null) {
    var followedX = this.watchedEntity_.getPosition().x;
    var followedY = this.watchedEntity_.getPosition().y;
    if (axis == CameraAxis.HORIZONTAL || axis == CameraAxis.BOTH) {
      if (followedX > wView - xDeadZone) {
        xView = (followedX - (wView - xDeadZone)) * - 1;
      } else {
        xView = (followedX - xDeadZone) * -1;
      }
      // Clip to the bounds of our viewport.
      xView = Math.min(Math.max(xView, wView - boardWidth), 0);
    }

    if (axis == CameraAxis.VERTICAL || axis == CameraAxis.BOTH) {
      if (followedY > hView - yDeadZone) {
        yView = (followedY - (hView - yDeadZone)) * - 1;
      } else {
        yView = (followedY - yDeadZone) * -1;
      }
      // Clip to the bounds of our viewport.
      yView = Math.min(Math.max(yView, hView - boardHeight), 0);
    }
  }

  // Don't update if we don't need to.
  if (this.lastX_ == xView && yView == this.lastY_) return;
  this.lastX_ = xView;
  this.lastY_ = yView;

  _.each(this.layers_, function(l) {
    l.layer.setPosition(
        new game.core.math.Vector(xView * l.distance, yView * l.distance));
  });
};
