goog.provide('game.core.Main');

goog.require('game.core.Entity');
goog.require('game.core.Window');



/**
 * The main entry point into the application, extend this and get going.
 *
 * @constructor
 * @param {Element=|HTMLBodyElement=|game.core.Entity=} opt_rootLocation
 */
game.core.Main = function(opt_rootLocation) {
  // Ensure we don't have more than one {@code game.core.Main} floating around.
  if (game.core.Camera.prototype._initialized) {
    throw new Error('Main has already been initialized.');
  }
  game.core.Camera.prototype._initialized = true;
  /** @private {!game.core.Window} */
  this.window_ = new game.core.Window();
  /** @private {Element|HTMLBodyElement|game.core.Entity} */
  this.rootLocation_ = opt_rootLocation || document.body;
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
  /** @type {!game.core.Entity} */
  this.root = game.core.Main.Root = new game.core.Entity().addClass('root');

  // Initialize.
  this.init();
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
  this.root.attach(this.rootLocation_);
  // Kick things off.
  this.physicsLoop();
  this.renderLoop();
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
  var dtstep = 1 / game.core.Main.FPS;
  var steps = Math.floor(dt / dtstep);

  this.physicsRemainderTime_ = dt - dtstep * steps;

  // Update loop, we might have multiple steps per iteration.
  for (var step = 0; step < steps; step++) {
    game.core.Entity.forEach(function(entity) {
      entity.update(dtstep, this.globalTick_);
    }.bind(this));
    this.tick(this.globalTick_++);
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
