goog.provide('game.mixins.Physical');

goog.require('game.core.constants');
goog.require('game.core.helper');
goog.require('game.core.math.Vector');
goog.require('game.core.math.collision');
goog.require('game.mixins.Shape.Type');



/**
 * A mixin which introduces physical attributes, this mixin will add:
 *
 * setBouncyness
 * setFriction
 * setAcceleration
 * getAcceleration
 * setVelocity
 * getVelocity
 * setMass
 * getMass
 * isMovable
 * addXForce
 * addYForce
 * registerCollidesWith
 *
 * @constructor
 */
game.mixins.Physical = function() {
  var ShapeType = game.mixins.Shape.Type;
  var collision = game.core.math.collision;
  var GRAVITY = game.core.constants.GRAVITY;
  var EPSILON = game.core.constants.EPSILON;

  // Collision smudge, when colliding with the wall it's nice to just subtract
  // a little bit so you're not always colliding with something.
  var SMUDGE = 1.01;
  var colliders = {};
  var acceleration = new game.core.math.Vector();
  var velocity = new game.core.math.Vector();
  var mass = 0;
  var friction = 0.5;
  var bouncyness = 0.5;

  var updateVelocity = function(delta) {
    var accel = this.getAcceleration();
    var vel_ = this.getVelocity();
    vel_.x += accel.x * delta;
    vel_.y += accel.y * delta;
    this.setVelocity(vel_);
    return this;
  };

  var updatePosition = function(delta) {
    var accel = this.getAcceleration();
    var vel = this.getVelocity();
    var pos = this.getPosition();
    pos.x += (vel.x * delta) + (0.5 * accel.x * delta * delta);
    pos.y += (vel.y * delta) + (0.5 * accel.y * delta * delta);
    this.setPosition(pos);
    return this;
  };

  var addGravity = function() {
    if (this.isMovable()) {
      var acc = this.getAcceleration();
      acc.y = GRAVITY;
      this.setAcceleration(acc);
    }
    return this;
  };

  var resolveCollisions = function(response, delta) {
    var correction = response.overlapV.clone().scale(SMUDGE);
    var pos = this.getPosition().sub(correction);
    var vel = this.getVelocity();
    var normal = response.overlapN;

    vel.sub(normal.clone().scale(2 * normal.dot(vel)));
    vel.scale(bouncyness);

    if (vel.x > EPSILON) {
      vel.x -= GRAVITY * friction * delta;
      if (vel.x < 0) vel.x = 0;
    } else if (vel.x < EPSILON) {
      vel.x += GRAVITY * friction * delta;
      if (vel.x > 0) vel.x = 0;
    } else {
      vel.x = 0;
    }

    this.setVelocity(vel);
    this.setPosition(pos);
  };

  return {
    init: function() { },
    update: function(delta) {
      if (this.isMovable()) {
        addGravity.call(this, delta);
        updateVelocity.call(this, delta);
        updatePosition.call(this, delta);
      }

      // TODO filter colliders by what's nearby.
      _.each(colliders, function(callback, name) {
        var entity = game.core.Entity.ByName[name];
        if (_.isUndefined(entity)) {
          console.warn('Entity registered as a collider but doesnt exist.');
          return;
        }

        var response = new game.core.math.collision.Response();
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
          resolveCollisions.call(this, response, delta);
          if (_.isFunction(callback)) {
            callback(entity);
          }
        }
      }, this);
    },

    setBouncyness: function(bouncyness_) {
      bouncyness = bouncyness_;
      return this;
    },

    setFriction: function(friction_) {
      friction = friction_;
      return this;
    },

    setAcceleration: function(acceleration_) {
      acceleration = acceleration_;
      return this;
    },

    getAcceleration: function() {
      return acceleration.clone();
    },

    setVelocity: function(velocity_) {
      velocity = velocity_;
      return this;
    },

    getVelocity: function() {
      return velocity.clone();
    },

    setMass: function(mass_) {
      mass = mass_;
      return this;
    },

    getMass: function() {
      return mass;
    },

    isMovable: function() {
      return (this.getMass() > EPSILON);
    },

    addXForce: function(force) {
      if (this.isMovable()) {
        var acc = this.getAcceleration();
        acc.x += force / this.getMass();
        this.setAcceleration(acc);
      }
      return this;
    },

    addYForce: function(force) {
      if (this.isMovable()) {
        var acc = this.getAcceleration();
        acc.y += force / this.getMass();
        this.setAcceleration(acc);
      }
      return this;
    },

    registerCollidesWith: function(var_args, callback) {
      var names = [];
      for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i];
        if (_.isString(argument)) {
          names.push(argument);
        } else if (_.isFunction(argument)) {
          if (arguments.length - 1 == i) {
            callback = argument;
          } else {
            console.error(
                'Abort:', argument, 'Is not recognized collider name');
            return;
          }
        }
      }

      _.each(names, function(name) {
        if (_.isUndefined(game.core.Entity.ByName[name])) {
          console.warn('Warning: Unkown entity by this name:', name);
          return this;
        }
        colliders[name] = callback;
      }, this);
      return this;
    }
  };
};


/**
 * Register mixin globally.
 */
game.core.helper.mixins['physical'] = game.mixins.Physical;


/**
 * Global registered Collider.
 *
 * @type {Object.<string, !game.core.Entity>}
 */
game.mixins.Physical.Colliders = {};
