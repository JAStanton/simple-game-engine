goog.provide('game.mixins.Fourway');

goog.require('game.core.KeyHandler');
goog.require('game.core.constants');
goog.require('game.core.helper');



/**
 * An entity mixin that gives the an entity the ability to move left, right, up
 * or down on arrow keys.
 *
 * @constructor
 */
game.mixins.Fourway = function() {};


/**
 * Register mixin globally.
 */
game.core.helper.mixins['fourway'] = game.mixins.Fourway.prototype;


/**
 * Initialized fourway.
 */
game.mixins.Fourway.prototype.init = function() {
  if (!this.keyHandler_) {
    this.keyHandler_ = new game.core.KeyHandler();
  }
};


/** moveLeft */
game.mixins.Fourway.prototype.moveLeft = function() {
  var velocity = this.getVelocity();
  velocity.x += -35;
  this.setVelocity(velocity);
};


/** moveRight */
game.mixins.Fourway.prototype.moveRight = function() {
  var velocity = this.getVelocity();
  velocity.x += 35;
  this.setVelocity(velocity);
};


/** moveUp */
game.mixins.Fourway.prototype.moveUp = function() {
  var velocity = this.getVelocity();
  velocity.y += -40;
  this.setVelocity(velocity);
};


/** moveDown */
game.mixins.Fourway.prototype.moveDown = function() {
  var velocity = this.getVelocity();
  velocity.y += 40;
  this.setVelocity(velocity);
};


/** Update function */
game.mixins.Fourway.prototype.update = function() {
  var Keycodes = game.core.constants.KEYCODES;
  if (this.keyHandler_.isDown(Keycodes.RIGHT)) this.moveRight();
  if (this.keyHandler_.isDown(Keycodes.LEFT)) this.moveLeft();
  if (this.keyHandler_.isDown(Keycodes.UP)) this.moveUp();
  if (this.keyHandler_.isDown(Keycodes.DOWN)) this.moveDown();
};
