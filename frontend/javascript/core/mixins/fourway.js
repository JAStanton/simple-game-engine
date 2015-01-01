goog.provide('game.mixins.Fourway');

goog.require('game.core.KeyHandler');
goog.require('game.core.constants');
goog.require('game.core.helper');



/**
 * An entity mixin that gives the an entity the ability to move left, right, up
 * or down on arrow keys. No new methods are introduced.
 *
 * @constructor
 */
game.mixins.Fourway = function() {
  var Keycodes = game.core.constants.KEYCODES;
  var keyHandler = new game.core.KeyHandler();
  var moveLeft = function() {
    var velocity = this.getVelocity();
    velocity.x += -35 / 10;
    this.setVelocity(velocity);
  };
  var moveRight = function() {
    var velocity = this.getVelocity();
    velocity.x += 35 / 10;
    this.setVelocity(velocity);
  };
  var moveUp = function() {
    var velocity = this.getVelocity();
    velocity.y += -40 / 10;
    this.setVelocity(velocity);
  };
  var moveDown = function() {
    var velocity = this.getVelocity();
    velocity.y += 40 / 10;
    this.setVelocity(velocity);
  };
  return {
    init: function() { },
    update: function() {
      if (keyHandler.isDown(Keycodes.RIGHT)) moveRight.call(this);
      if (keyHandler.isDown(Keycodes.LEFT)) moveLeft.call(this);
      if (keyHandler.isDown(Keycodes.UP)) moveUp.call(this);
      if (keyHandler.isDown(Keycodes.DOWN)) moveDown.call(this);
    }
  };
};


/**
 * Register mixin globally.
 */
game.core.helper.mixins['fourway'] = game.mixins.Fourway;
