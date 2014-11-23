goog.provide('game.core.math.Vector');



/**
 * Create a new Vector, optionally passing in the `x` and `y` coordinates. If
 * a coordinate is not specified, it will be set to `0`.
 *
 * This was stolen and modified from SAT.js: https://github.com/jriecken/sat-js
 *
* @param {?number=} opt_x The x position.
* @param {?number=} opt_y The y position.
* @constructor
*/
game.core.math.Vector = function(opt_x, opt_y) {
  this.x = opt_x || 0;
  this.y = opt_y || 0;
};


/**
 * Copy the values of another Vector into this one.
 *
 * @param {Vector} other The other Vector.
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.copy = function(other) {
  this.x = other.x;
  this.y = other.y;
  return this;
};


/**
 * Create a new vector with the same coordinates as this on.
 *
 * @return {Vector} The new cloned vector
 */
game.core.math.Vector.prototype.clone = function() {
  return new game.core.math.Vector(this.x, this.y);
};


/**
 * Change this vector to be perpendicular to what it was before (Effectively
 * roatates it 90 degrees in a clockwise direction).
 *
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.perp = function() {
  var x = this.x;
  this.x = this.y;
  this.y = -x;
  return this;
};


/**
 * Rotate this vector (counter-clockwise) by the specified angle (in radians).
 *
 * @param {number} angle The angle to rotate (in radians)
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.rotate = function(angle) {
  var x = this.x;
  var y = this.y;
  this.x = x * Math.cos(angle) - y * Math.sin(angle);
  this.y = x * Math.sin(angle) + y * Math.cos(angle);
  return this;
};


/**
 * Reverse this vector.
 *
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.reverse = function() {
  this.x = -this.x;
  this.y = -this.y;
  return this;
};


/**
 * Normalize this vector.  (make it have length of `1`)
 *
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.normalize = function() {
  var d = this.len();
  if (d > 0) {
    this.x = this.x / d;
    this.y = this.y / d;
  }
  return this;
};


/**
 * Add another vector to this one.
 *
 * @param {Vector} other The other Vector.
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.add = function(other) {
  this.x += other.x;
  this.y += other.y;
  return this;
};


/**
 * Subtract another vector from this one.
 *
 * @param {Vector} other The other Vector.
 * @return {Vector} This for chaiing.
 */
game.core.math.Vector.prototype.sub = function(other) {
  this.x -= other.x;
  this.y -= other.y;
  return this;
};


/**
 * Scale this vector. An independant scaling factor can be provided
 * for each axis, or a single scaling factor that will scale both `x` and `y`.
 *
 * @param {number} x The scaling factor in the x direction.
 * @param {?number=} opt_y The scaling factor in the y direction.  If this is
 *     not specified, the x scaling factor will be used.
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.scale = function(x, opt_y) {
  this.x *= x;
  this.y *= opt_y || x;
  return this;
};


/**
 * Project this vector on to another vector.
 *
 * @param {Vector} other The vector to project onto.
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.project = function(other) {
  var amt = this.dot(other) / other.len2();
  this.x = amt * other.x;
  this.y = amt * other.y;
  return this;
};


/**
 * Project this vector onto a vector of unit length. This is slightly more
 * efficient than `project` when dealing with unit vectors.
 *
 * @param {Vector} other The unit vector to project onto.
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.projectN = function(other) {
  var amt = this.dot(other);
  this.x = amt * other.x;
  this.y = amt * other.y;
  return this;
};


/**
 * Reflect this vector on an arbitrary axis.
 *
 * @param {Vector} axis The vector representing the axis.
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.reflect = function(axis) {
  var x = this.x;
  var y = this.y;
  this.project(axis).scale(2);
  this.x -= x;
  this.y -= y;
  return this;
};


/**
 * Reflect this vector on an arbitrary axis (represented by a unit vector).
 * This is slightly more efficient than `reflect` when dealing with an axis
 * that is a unit vector.
 *
 * @param {Vector} axis The unit vector representing the axis.
 * @return {Vector} This for chaining.
 */
game.core.math.Vector.prototype.reflectN = function(axis) {
  var x = this.x;
  var y = this.y;
  this.projectN(axis).scale(2);
  this.x -= x;
  this.y -= y;
  return this;
};


/**
 * Get the dot product of this vector and another.
 *
 * @param {Vector}  other The vector to dot this one against.
 * @return {number} The dot product.
 */
game.core.math.Vector.prototype.dot = function(other) {
  return this.x * other.x + this.y * other.y;
};


/**
 * Get the squared length of this vector.
 *
 * @return {number} The length^2 of this vector.
 */
game.core.math.Vector.prototype.len2 = function() {
  return this.dot(this);
};


/**
 * Get the length of this vector.
 *
 * @return {number} The length of this vector.
 */
game.core.math.Vector.prototype.len = function() {
  return Math.sqrt(this.len2());
};


/**
 * Distance between this vector and the given.
 *
 * @param {game.core.math.Vector} other
 * @return {number}
 */
game.core.math.Vector.prototype.distanceTo = function(other) {
  var xs = other.x - this.x;
  xs = xs * xs;
  var ys = other.y - this.y;
  ys = ys * ys;
  return Math.sqrt(xs + ys);
};
