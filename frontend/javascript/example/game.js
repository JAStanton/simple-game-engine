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

  this.width = 1920;
  this.height = 802;

  /** @private {!game.Board} */
  this.gameboard_ = new game.core.Board().
      setRectangle(new game.core.math.Vector(), this.width, this.height).
      attach(game.core.Main.Root);

  this.addPlatform(0, 0, this.width, 5);
  this.addPlatform(0, 0, 5, this.height);
  this.addPlatform(this.height - 5, 0, this.width, 5);
  this.addPlatform(0, this.width - 5, 5, this.height);

  // Add 10 random balls and shapes.
  for (var i = 0; i < 10; i++) {
    this.addRandomBall();
    this.addRandomShape();
  }

  /** @private {!game.core.Entity} */
  this.player_ = new game.core.Entity().
      addClass('player').
      mixin('fourway', 'shape', 'physical').
      setMass(1).
      setBouncyness(0.4).
      setFriction(0.1).
      setRectangle(new game.core.math.Vector(50, 50), 40, 40).
      attach(this.gameboard_);

  this.player_.init();
  this.player_.registerCollidesWith('walls', 'balls', 'shapes');

  /** @private {!game.core.Entity} */
  this.camera_ = new game.core.Camera().watch(this.player_);
};
game.core.helper.inherit(game.Main, game.core.Main);


/**
 * Adds a platform
 *
 * @param {number} top
 * @param {number} left
 * @param {number} width
 * @param {number} height
 */
game.Main.prototype.addPlatform = function(top, left, width, height) {
  var wall = new game.core.Entity('walls').
      addClass('boundary').
      mixin('shape', 'physical').
      setFillColor('black').
      setRectangle(new game.core.math.Vector(left, top), width, height).
      attach(this.gameboard_);
  wall.init();
};


/**
 * Adds a randomly placed ball
*/
game.Main.prototype.addRandomBall = function() {
  var radius = game.core.helper.getRandomInt(10, 75);
  var x = game.core.helper.getRandomInt(radius, this.width - radius);
  var y = game.core.helper.getRandomInt(radius, this.height - radius);
  var ball_ = new game.core.Entity('balls').
      mixin('shape', 'physical').
      setFillColor(Please.make_color()).
      setMass(0).
      setCircle(new game.core.math.Vector(x, y), radius).
      attach(this.gameboard_);

  ball_.init();
};


/**
 * Adds a randomly placed ball
*/
game.Main.prototype.addRandomShape = function() {
  var polygon = [];
  var radius = game.core.helper.getRandomInt(10, 75);
  var centerX = game.core.helper.getRandomInt(0, this.width - radius * 2);
  var centerY = game.core.helper.getRandomInt(0, this.height - radius * 2);
  var numPoints = game.core.helper.getRandomInt(3, 12);
  var theta = 360 / numPoints;
  var PI2 = 2 * Math.PI;
  for (var i = 1; i <= numPoints; i++) {
    var x = radius * Math.cos(PI2 * i / numPoints + theta) + radius;
    var y = radius * Math.sin(PI2 * i / numPoints + theta) + radius;
    polygon.push(new game.core.math.Vector(x, y));
  }

  var shape_ = new game.core.Entity('shapes').
      mixin('shape', 'physical').
      setFillColor(Please.make_color()).
      setMass(0).
      setPolygon(new game.core.math.Vector(centerX, centerY), polygon).
      attach(this.gameboard_);

  shape_.init();
};

var main = new game.Main();
