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

  var width = 500;
  var height = 300;

  /** @private {!game.core.Entity} */
  this.gameBoard_ = new game.core.Entity().
      addClass('game-board').
      mixin('shape').
      setRectangle(new game.core.math.Vector(), width, height).
      attach(this.root);

  this.gameBoard_.init();

  this.addPlatform('wall-0', 0, 0, width, 5);
  this.addPlatform('wall-1', 0, 0, 5, height);
  this.addPlatform('wall-2', height - 5, 0, width, 5);
  this.addPlatform('wall-3', 0, width - 5, 5, height);

  /** @private {!game.core.Entity} */
  this.player_ = new game.core.Entity().
      addClass('player').
      mixin('fourway', 'shape', 'physical').
      setMass(1).
      attach(this.gameBoard_).
      setRectangle(new game.core.math.Vector(10, 10), 20, 20);
  this.player_.init();
  this.player_.registerCollidesWith(
      'wall-0', 'wall-1', 'wall-2', 'wall-3', function(entity) {
        console.log("shit's going down", entity.name);
      });

  /** @private {!game.core.Entity} */
  this.camera_ = new game.core.Camera(this.gameBoard_).
      addLayer(this.gameBoard_).
      watch(this.player_);
};
game.core.helper.inherit(game.Main, game.core.Main);


/**
 * Adds a platform
 *
 * @param {string} entityName
 * @param {number} top
 * @param {number} left
 * @param {number} width
 * @param {number} height
 */
game.Main.prototype.addPlatform =
    function(entityName, top, left, width, height) {
  var wall = new game.core.Entity(entityName).
      addClass('boundary').
      mixin('shape', 'physical').
      setRectangle(new game.core.math.Vector(left, top), width, height).
      attach(this.gameBoard_);
  wall.init();
};

var main = new game.Main();
