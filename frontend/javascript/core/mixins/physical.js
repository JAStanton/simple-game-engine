goog.provide('game.mixins.Physical');

goog.require('game.core.constants');
goog.require('game.core.helper');
goog.require('game.core.math.Response');
goog.require('game.core.math.Vector');
goog.require('game.core.math.collision');
goog.require('game.mixins.Shape.Type');



/**
 * This thing has physical characteristics like velocity & acceleration.
 *
 * @constructor
 */
game.mixins.Physical = function() {};


/**
 * Register mixin globally.
 */
game.core.helper.mixins['physical'] = game.mixins.Physical.prototype;


/**
 * Global registered Collider.
 *
 * @type {Object.<string, !game.core.Entity>}
 */
game.mixins.Physical.Colliders = {};


/**
 * Initialized the values.
 */
game.mixins.Physical.prototype.init = function() {
  if (!this.position_) {
    this.position_ = new game.core.math.Vector();
  }
  if (!this.acceleration_) {
    this.acceleration_ = new game.core.math.Vector();
  }
  if (!this.velocity_) {
    this.velocity_ = new game.core.math.Vector();
  }
  if (!_.isNumber(this.mass_)) {
    this.mass_ = 0;
  }
};


/**
 * Returns a reference to the acceleration of the entity.
 *
 * @return {!game.core.math.Vector}
 */
game.mixins.Physical.prototype.getAcceleration = function() {
  return this.acceleration_;
};


/**
 * Sets acceleration.
 *
 * @param {!game.core.math.Vector} vector
 * @return {!game.core.math.Vector}
 */
game.mixins.Physical.prototype.setAcceleration = function(vector) {
  return this.acceleration_ = vector;
};


/**
 * Returns a reference to the velocity of the entity.
 *
 * @return {!game.core.math.Vector}
 */
game.mixins.Physical.prototype.getVelocity = function() {
  return this.velocity_;
};


/**
 * Sets velocity.
 *
 * @param {!game.core.math.Vector} vector
 * @return {!game.core.math.Vector}
 */
game.mixins.Physical.prototype.setVelocity = function(vector) {
  return this.velocity_ = vector;
};


/**
 * Returns a reference to the mass of the entity.
 *
 * @return {!number}
 */
game.mixins.Physical.prototype.getMass = function() {
  return this.mass_;
};


/**
 * Sets mass.
 *
 * @param {number} mass
 * @return {!number}
 */
game.mixins.Physical.prototype.setMass = function(mass) {
  return this.mass_ = mass;
};


/**
 * Determines whether the object can be moved.
 *
 * @return {boolean}
 */
game.mixins.Physical.prototype.isMovable = function() {
  return (this.getMass() > game.core.constants.EPSILON);
};


/**
 * Adds gravity to the object.
 */
game.mixins.Physical.prototype.addGravity = function() {
  if (this.isMovable()) {
    var acc = this.getAcceleration();
    acc.y += game.core.constants.GRAVITY;
  }
};


/**
 * Adds a force to the object.
 *
 * @param {!game.core.math.Vector} force
 */
game.mixins.Physical.prototype.addForce = function(force) {
  if (this.isMovable()) {
    var acc = this.getAcceleration();
    acc += force / this.getMass();
  }
};


/**
 * Adds a force along the x-axis to the object.
 *
 * @param {!number} force
 */
game.mixins.Physical.prototype.addXForce = function(force) {
  if (this.isMovable()) {
    var acc = this.getAcceleration();
    acc.x += force / this.getMass();
  }
};


/**
 * Adds a force along the y-axis to the object.
 *
 * @param {!number} force
 */
game.mixins.Physical.prototype.addYForce = function(force) {
  if (this.isMovable()) {
    var acc = this.getAcceleration();
    acc.y += force / this.getMass();
  }
};


/**
 * Update velocity.
 *
 * @param {number} delta
 */
game.mixins.Physical.prototype.updateVelocity = function(delta) {
  var accel = this.getAcceleration();
  var velocity = this.getVelocity();
  velocity.x += accel.x * delta;
  velocity.y += accel.y * delta;
};


/**
 * Update position.
 *
 * @param {number} delta
 */
game.mixins.Physical.prototype.updatePosition = function(delta) {
  var accel = this.getAcceleration();
  var velocity = this.getVelocity();
  var pos = this.getPosition();
  pos.x += (velocity.x * delta) + (0.5 * accel.x * delta * delta);
  pos.y += (velocity.y * delta) + (0.5 * accel.y * delta * delta);
};


/**
 * Steps the time forward.
 *
 * @param {number} delta
 */
game.mixins.Physical.prototype.step = function(delta) {
  if (this.isMovable()) {
    this.addGravity();

    // Update the position.
    this.updatePosition(delta);
    // Update new velocity.
    this.updateVelocity(delta);
  }
};


/**
 * Checks for collisions and adjust accordingly.
 *
 * @param {number} delta
 */
game.mixins.Physical.prototype.update = function(delta) {
  this.step(delta);
  if (!_.isObject(this.colliders)) this.colliders = {};
  var collision = false;
  _.each(game.core.Entity.All, function(entity) {
    _.each(this.colliders, function(callback, name) {
      if (entity instanceof game.mixins.Physical.Colliders[name]) {
        var response = new game.core.math.Response();
        var collision = game.core.math.collision;
        var ShapeType = game.mixins.Shape.Type;
        var didCollide = false;

        if ((this.type == ShapeType.POLYGON ||
            this.type == ShapeType.RECTANGLE) &&
            (entity.type == ShapeType.POLYGON ||
            entity.type == ShapeType.RECTANGLE)) {
          didCollide = collision.testPolygonPolygon(this, entity, response);
        } else if (this.type == ShapeType.CIRCLE &&
            (entity.type == ShapeType.POLYGON ||
            entity.type == ShapeType.RECTANGLE)) {
          didCollide = collision.testCirclePolygon(this, entity, response);
        } else if ((this.type == ShapeType.POLYGON ||
            this.type == ShapeType.RECTANGLE) &&
            entity.type == ShapeType.CIRCLE) {
          didCollide = collision.testPolygonCircle(this, entity, response);
        }

        if (didCollide) {
          callback(entity, response, delta);
        }
      }
    }.bind(this));
  }.bind(this));
};


/**
 * Checks for collisions and adjust accordingly.
 *
 * @param {number} delta
 */
game.mixins.Physical.prototype.resolveCollisions = function(delta) {};


/**
 * Registers the mass of the object.
 * @param {!number} mass
 */
game.mixins.Physical.prototype.setMass = function(mass) {
  this.mass_ = mass;
};


/**
 * Registeres objects that can be collided with.
 * @param {string} name
 * @param {!game.core.Entity} type [description]
 */
game.mixins.Physical.prototype.registerCollider = function(name, type) {
  game.mixins.Physical.Colliders[name] = type;
};


/**
 * Registers names of objects that this instance can colide with.
 * @param {string} name
 * @param {Function} callback
 */
game.mixins.Physical.prototype.registerCollidesWith = function(name, callback) {
  if (!_.isObject(this.colliders)) this.colliders = {};
  if (_.isUndefined(game.mixins.Physical.Colliders[name])) {
    console.warn('Warning:', name, 'Is not registered as a colideer');
    return;
  }
  this.colliders[name] = callback;
};
