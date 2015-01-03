goog.provide('game.Main');

goog.require('engine.core.Main');
goog.require('engine.core.helper');



/**
 * The game.
 *
 * @constructor
 * @extends {engine.core.Main}
 */
game.Main = function() {
  game.Main.base(this, 'constructor');

  this.width = 1920;
  this.height = 802;

  /** @private {!game.Board} */
  this.gameboard_ = new engine.core.Board().
      setRectangle(new engine.core.math.Vector(), this.width, this.height).
      attach(engine.core.Main.Root);

  this.addPlatform(0, 0, this.width, 5);
  this.addPlatform(0, 0, 5, this.height);
  this.addPlatform(this.height - 5, 0, this.width, 5);
  this.addPlatform(0, this.width - 5, 5, this.height);

  // Add 10 random balls and shapes.
  for (var i = 0; i < 10; i++) {
    this.addRandomBall();
    this.addRandomShape();
  }

  /** @private {!engine.core.Entity} */
  this.player_ = new engine.core.Entity('player').
      mixin('fourway', 'shape', 'physical').
      setMass(1).
      setRectangle(new engine.core.math.Vector(50, 50), 40, 40).
      attach(this.gameboard_);
  this.player_.registerCollidesWith('walls', 'balls', 'shapes');

  /** @private {!engine.core.Entity} */
  this.camera_ = new engine.core.Camera().watch(this.player_);

  // Kicks things off
  this.init();
};
engine.core.helper.inherit(game.Main, engine.core.Main);


/**
 * Adds a platform
 *
 * @param {number} top
 * @param {number} left
 * @param {number} width
 * @param {number} height
 */
game.Main.prototype.addPlatform = function(top, left, width, height) {
  var wall = new engine.core.Entity('walls').
      mixin('shape', 'physical').
      setFillColor('black').
      setRectangle(new engine.core.math.Vector(left, top), width, height).
      attach(this.gameboard_);
};


/**
 * Adds a randomly placed ball
*/
game.Main.prototype.addRandomBall = function() {
  var radius = engine.core.helper.getRandomInt(10, 75);
  var x = engine.core.helper.getRandomInt(radius, this.width - radius);
  var y = engine.core.helper.getRandomInt(radius, this.height - radius);
  var ball_ = new engine.core.Entity('balls').
      mixin('shape', 'physical').
      setFillColor(Please.make_color()).
      setMass(0).
      setCircle(new engine.core.math.Vector(x, y), radius).
      attach(this.gameboard_);
};


/**
 * Adds a randomly placed ball
*/
game.Main.prototype.addRandomShape = function() {
  var polygon = [];
  var radius = engine.core.helper.getRandomInt(10, 75);
  var centerX = engine.core.helper.getRandomInt(0, this.width - radius * 2);
  var centerY = engine.core.helper.getRandomInt(0, this.height - radius * 2);
  var numPoints = engine.core.helper.getRandomInt(3, 12);
  var theta = 360 / numPoints;
  var PI2 = 2 * Math.PI;
  for (var i = 1; i <= numPoints; i++) {
    var x = radius * Math.cos(PI2 * i / numPoints + theta) + radius;
    var y = radius * Math.sin(PI2 * i / numPoints + theta) + radius;
    polygon.push(new engine.core.math.Vector(x, y));
  }

  var shape_ = new engine.core.Entity('shapes').
      mixin('shape', 'physical').
      setFillColor(Please.make_color()).
      setMass(0).
      setPolygon(new engine.core.math.Vector(centerX, centerY), polygon).
      attach(this.gameboard_);
};

var main = new game.Main();
