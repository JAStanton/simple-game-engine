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

  var wall0 = new game.core.Entity().
      addClass('boundary').
      mixin('shape', 'physical').
      setRectangle(new game.core.math.Vector(0, 0), 2, 300).
      attach(this.gameBoard_);
  wall0.init();
  wall0.registerCollider('wall-0', game.core.Entity);

  var wall1 = new game.core.Entity().
      addClass('boundary').
      mixin('shape', 'physical').
      setRectangle(new game.core.math.Vector(0, 0), 500, 2).
      attach(this.gameBoard_);
  wall1.init();
  wall1.registerCollider('wall-1', game.core.Entity);

  var wall2 = new game.core.Entity().
      addClass('boundary').
      mixin('shape', 'physical').
      setRectangle(new game.core.math.Vector(0, 300), 2, 500).
      attach(this.gameBoard_);
  wall2.init();
  wall2.registerCollider('wall-2', game.core.Entity);

  var wall3 = new game.core.Entity().
      addClass('boundary').
      mixin('shape', 'physical').
      setRectangle(new game.core.math.Vector(500, 0), 2, 300).
      attach(this.gameBoard_);
  wall3.init();
  wall3.registerCollider('wall-3', game.core.Entity);

  /** @private {!game.core.Entity} */
  this.player_ = new game.core.Entity().
      addClass('player').
      mixin('fourway', 'shape', 'physical').
      setMass(1).
      attach(this.gameBoard_).
      setRectangle(new game.core.math.Vector(10, 10), 20, 20);
  this.player_.init();
  this.player_.registerCollidesWith('wall-0').
      registerCollidesWith('wall-1').
      registerCollidesWith('wall-2').
      registerCollidesWith('wall-3');



  /** @private {!game.core.Entity} */
  this.camera_ = new game.core.Camera(this.gameBoard_).
      addLayer(this.gameBoard_).
      watch(this.player_);
};
game.core.helper.inherit(game.Main, game.core.Main);

var main = new game.Main();
