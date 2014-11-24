goog.provide('game.mixins.Physical');

goog.require('game.core.constants');
goog.require('game.core.helper');
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
  if (!this.colliders) {
    this.colliders = {};
  }
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
 * Returns a clone of the acceleration of the entity.
 *
 * @return {!game.core.math.Vector}
 */
game.mixins.Physical.prototype.getAcceleration = function() {
  return this.acceleration_.clone();
};


/**
 * Sets acceleration.
 *
 * @param {!game.core.math.Vector} vector
 * @return {!game.mixins.Physical}
 */
game.mixins.Physical.prototype.setAcceleration = function(vector) {
  this.acceleration_ = vector;
  return this;
};


/**
 * Returns a clone of the velocity of the entity.
 *
 * @return {!game.core.math.Vector}
 */
game.mixins.Physical.prototype.getVelocity = function() {
  return this.velocity_.clone();
};


/**
 * Sets velocity.
 *
 * @param {!game.core.math.Vector} vector
 * @return {!game.mixins.Physical}
 */
game.mixins.Physical.prototype.setVelocity = function(vector) {
  this.velocity_ = vector;
  return this;
};


/**
 * Returns a reference to the mass of the entity.
 *
 * @return {number}
 */
game.mixins.Physical.prototype.getMass = function() {
  return this.mass_;
};


/**
 * Registers the mass of the object.
 * @param {number} mass
 * @return {!game.mixins.Physical}
 */
game.mixins.Physical.prototype.setMass = function(mass) {
  this.mass_ = mass;
  return this;
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
 * Adds a force along the x-axis to the object.
 *
 * @param {number} force
 * @return {!game.mixins.Physical}
 */
game.mixins.Physical.prototype.addXForce = function(force) {
  if (this.isMovable()) {
    var acc = this.getAcceleration();
    acc.x += force / this.getMass();
    this.setAcceleration(acc);
  }
  return this;
};


/**
 * Adds a force along the y-axis to the object.
 *
 * @param {number} force
 * @return {!game.mixins.Physical}
 */
game.mixins.Physical.prototype.addYForce = function(force) {
  if (this.isMovable()) {
    var acc = this.getAcceleration();
    acc.y += force / this.getMass();
    this.setAcceleration(acc);
  }
  return this;
};


/**
 * Adds gravity to the object.
 *
 * @return {!game.mixins.Physical}
 */
game.mixins.Physical.prototype.addGravity = function() {
  if (this.isMovable()) {
    var acc = this.getAcceleration();
    acc.y += game.core.constants.GRAVITY;
    this.setAcceleration(acc);
  }
  return this;
};


/**
 * Update velocity.
 *
 * @param {number} delta
 * @return {!game.mixins.Physical}
 */
game.mixins.Physical.prototype.updateVelocity = function(delta) {
  var accel = this.getAcceleration();
  var velocity = this.getVelocity();
  velocity.x += accel.x * delta;
  velocity.y += accel.y * delta;
  this.setVelocity(velocity);
  return this;
};


/**
 * Update position.
 *
 * @param {number} delta
 * @return {!game.mixins.Physical}
 */
game.mixins.Physical.prototype.updatePosition = function(delta) {
  var acceleration = this.getAcceleration();
  var velocity = this.getVelocity();
  var position = this.getPosition();
  position.x += (velocity.x * delta) + (0.5 * acceleration.x * delta * delta);
  position.y += (velocity.y * delta) + (0.5 * acceleration.y * delta * delta);
  this.setPosition(position);
  return this;
};


/**
 * Checks for collisions and adjust accordingly.
 *
 * @param {number} delta
 */
game.mixins.Physical.prototype.update = function(delta) {
  if (this.isMovable()) {
    this.addGravity(delta);
    this.updateVelocity(delta);
    this.updatePosition(delta);
  }
  // Detects Collision
  game.core.Entity.forEach(function(entity) {
    // TODO(jstanton): Combine with non-instance collisions i.e.: game.Player
    // collides with game.Wall.
    _.each(this.colliders, function(callback, name) {
      if (entity instanceof game.mixins.Physical.Colliders[name]) {
        var response = new game.core.math.collision.Response();
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
          this.resolveCollisions_(response, delta);
          callback(entity);
        }
      }
    }.bind(this));
  }.bind(this));
};


/**
 * Checks for collisions and adjust accordingly.
 *
 * @param {game.core.collision.Response} response
 * @param {number} delta
 * @private
 */
game.mixins.Physical.prototype.resolveCollisions_ = function(response, delta) {
  var correction =
      response.overlapV.clone().scale(game.Player.COLLISION_SMUDGE);
  var position = this.getPosition().sub(correction);
  var velocity = this.getVelocity();
  var normal = response.overlapN;
  velocity.sub(normal.clone().scale(2 * normal.dot(velocity)));
  velocity.scale(this.bouncyness);

  if (velocity.x > game.core.constants.EPSILON) {
    velocity.x -= game.core.constants.GRAVITY * this.friction * delta;
    if (velocity.x < 0) velocity.x = 0;
  } else if (velocity.x < game.core.constants.EPSILON) {
    velocity.x += game.core.constants.GRAVITY * this.friction * delta;
    if (velocity.x > 0) velocity.x = 0;
  } else {
    velocity.x = 0;
  }

  this.setVelocity(velocity);
  this.setPosition(position);
};


/**
 * Registers objects that can be collided with.
 *
 * @param {string} name
 * @param {!game.core.Entity} type
 * @return {!game.mixins.Physical}
 */
game.mixins.Physical.prototype.registerCollider = function(name, type) {
  game.mixins.Physical.Colliders[name] = type;
  return this;
};


/**
 * Registers names of objects that this instance can collide with.
 *
 * @param {string} name
 * @param {Function} callback
 * @return {!game.mixins.Physical}
 */
game.mixins.Physical.prototype.registerCollidesWith = function(name, callback) {
  if (_.isUndefined(game.mixins.Physical.Colliders[name])) {
    console.warn('Warning:', name, 'Is not registered as a collider');
    return this;
  }
  this.colliders[name] = callback;
  return this;
};
