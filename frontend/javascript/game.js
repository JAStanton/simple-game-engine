goog.provide('game.Main');

goog.require('game.core.Main');
goog.require('game.core.helper');



/**
 * The game.
 *
 * @constructor
 * @extends {game.core.Main}
 */
game.Main = function() {
  game.Main.base(this, 'constructor');

  /** @private {!game.core.Entity} */
  this.gameBoard_ = new game.core.Entity().
      addClass('game-board').
      mixin('shape').
      setRectangle(new game.core.math.Vector(), 500, 300).
      attach(this.root);
  this.gameBoard_.init();

  /** @private {!game.core.Entity} */
  this.player_ = new game.core.Entity().
      addClass('player').
      mixin('fourway', 'shape', 'physical').
      setMass(1).
      attach(this.gameBoard_).
      setRectangle(new game.core.math.Vector(10, 10), 20, 20);
  this.player_.init();

  /** @private {!game.core.Entity} */
  this.camera_ = new game.core.Camera(this.gameBoard_).
      addLayer(this.gameBoard_).
      watch(this.player_);
};
game.core.helper.inherit(game.Main, game.core.Main);

var main = new game.Main();
