goog.provide('game.core.Main');

goog.require('game.core.Entity');



/**
 * The main entry point into the application, extend this and get going.
 *
 * @constructor
 */
game.core.Main = function() {
  // Ensure we don't have more than one {@code game.core.Main} floating around.
  if (game.core.Camera.prototype._initialized) {
    throw new Error('Main has already been initialized.');
    return;
  }
  game.core.Camera.prototype._initialized = true;
  /**
   * In the physics loop this is the last time the loop ran in seconds.
   * @private {number}
   */
  this.lastTimeRan_;
  /**
   * In the physics loop this is the remainder time from last time the loop
   * was run in seconds.
   * @private {number}
   */
  this.physicsRemainderTime_;
  /**
   * The global tick of the game, 1 tick per frame.
   * @private {number}
   */
  this.globalTick_ = 0;

  // Initialize.
  this.init();
  // Kick things off.
  this.physicsLoop();
  this.renderLoop();
};


/**
 * The framerate our game runs off on.
 *
 * @type {number}
 */
game.core.Main.FPS = 60;


/**
 * Init function
 */
game.core.Main.prototype.init = function() {
  game.core.Entity.forEach(function(entity) {
    entity.init();
  });
};


/**
 * Runs render loop.
 */
game.core.Main.prototype.renderLoop = function() {
  window.requestAnimationFrame(this.renderLoop.bind(this));
  game.core.Entity.forEach(function(entity) {
    entity.draw();
  });
};


/**
 * Runs physics loop.
 */
game.core.Main.prototype.physicsLoop = function() {
  var currTime = +new Date() / 1000;
  if (!this.lastTimeRan_) this.lastTimeRan_ = +new Date() / 1000;
  if (!this.physicsRemainderTime_) this.physicsRemainderTime_ = 0;

  var dt = (currTime - this.lastTimeRan_) + this.physicsRemainderTime_;
  var dtstep = 1 / game.Main.FPS;
  var steps = Math.floor(dt / dtstep);

  this.physicsRemainderTime_ = dt - dtstep * steps;

  // Update loop, we might have multiple steps per iteration.
  for (var step = 0; step < steps; step++) {
    game.core.Entity.forEach(function(entity) {
      entity.update(dtstep, this.globalTick_);
      entity.resolveCollisions(dtstep);
    }.bind(this));
    this.tick(this.this.globalTick_++);
  }
  this.lastTimeRan_ = currTime;
  setTimeout(this.physicsLoop.bind(this), 0);
};


/**
 * This gets called for every tick.
 *
 * @param {numbet} tick
 */
game.core.Main.prototype.tick = function(tick) {};


/**
 * Adds entities.
 */
game.core.Main.prototype.addEntities = function() {};


/**
 * Removes an entity.
 */
game.core.Main.prototype.removeEntities = function() {};
