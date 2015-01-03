goog.provide('engine.core.Main');

goog.require('engine.core.Entity');
goog.require('engine.core.Root');
goog.require('engine.core.Window');



/**
 * The main entry point into the application, extend this and get going.
 *
 * @constructor
 * @param {Element=|HTMLBodyElement=|engine.core.Entity=} opt_rootLocation
 */
engine.core.Main = function(opt_rootLocation) {
  // Ensure we don't have more than one {@code engine.core.Main} floating
  // around.
  if (engine.core.Camera.prototype._initialized) {
    throw new Error('Main has already been initialized.');
  }
  engine.core.Camera.prototype._initialized = true;
  /** @private {!engine.core.Entity} */
  this.root_ = engine.core.Main.Root;
  /** @private {!engine.core.Window} */
  this.window_ = new engine.core.Window();
  /** @private {Element|HTMLBodyElement|engine.core.Entity} */
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

  // Initialize.
  this.init();
};


/**
 * The framerate our game runs off on.
 *
 * @type {number}
 */
engine.core.Main.FPS = 60;


/**
 * The framerate our game runs off on.
 *
 * @type {engine.core.Entity}
 */
engine.core.Main.Root = new engine.core.Root();


/**
 * Init function
 */
engine.core.Main.prototype.init = function() {
  var RESIZE = engine.core.Window.RESIZE_LISTENER_EVENT_NAME;
  this.window_.registerListener(RESIZE, function() {
    this.root_.setPosition(this.window_.getPosition());
    this.root_.setSize(this.window_.getWidth(), this.window_.getHeight());
  }.bind(this), true);


  engine.core.Entity.forEach(function(entity) {
    entity.init();
  });

  this.root_.attach(this.rootLocation_);

  // Kick things off.
  this.physicsLoop();
  this.renderLoop();
};


/**
 * Runs render loop.
 */
engine.core.Main.prototype.renderLoop = function() {
  window.requestAnimationFrame(this.renderLoop.bind(this));
  engine.core.Entity.forEach(function(entity) {
    entity.draw();
  });
};


/**
 * Runs physics loop.
 */
engine.core.Main.prototype.physicsLoop = function() {
  var currTime = +new Date() / 1000;
  if (!this.lastTimeRan_) this.lastTimeRan_ = +new Date() / 1000;
  if (!this.physicsRemainderTime_) this.physicsRemainderTime_ = 0;

  var dt = (currTime - this.lastTimeRan_) + this.physicsRemainderTime_;
  var dtstep = 1 / engine.core.Main.FPS;
  var steps = Math.floor(dt / dtstep);

  this.physicsRemainderTime_ = dt - dtstep * steps;

  // Update loop, we might have multiple steps per iteration.
  for (var step = 0; step < steps; step++) {
    engine.core.Entity.forEach(function(entity) {
      entity.update(dtstep, this.globalTick_);
    }, this);
    this.tick(this.globalTick_++);
  }

  if (!_.isUndefined(this.camera_)) {
    this.camera_.update();
  }

  this.lastTimeRan_ = currTime;
  setTimeout(this.physicsLoop.bind(this), 0);
};


/**
 * This gets called for every tick.
 *
 * @param {numbet} tick
 */
engine.core.Main.prototype.tick = function(tick) {};
