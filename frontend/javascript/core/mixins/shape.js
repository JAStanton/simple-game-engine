goog.provide('game.mixins.Shape');
goog.provide('game.mixins.Shape.Type');

goog.require('game.core.math.Vector');



/**
 * Represents a *convex* shape with any number of points (specified in
 * counter-clockwise order).
 *
 * This was stolen and modified from SAT.js: https://github.com/jriecken/sat-js
 *
 * @constructor
 */
game.mixins.Shape = function() {};


/**
 * Register mixin globally.
 */
game.core.helper.mixins['shape'] = game.mixins.Shape.prototype;


/**
 * The type of shape this is.
 *
 * @type {Object.<number>}
 */
game.mixins.Shape.Type = {
  POLYGON: 0,
  RECTANGLE: 1,
  CIRCLE: 2
};


/**
 * Initializes mixin.
 */
game.mixins.Shape.prototype.init = function() {
  /** @private {!game.mixins.Shape.Type} */
  this.type_;
  /** @private {Array.<!game.core.math.Vector>} */
  this.points_;
  /** @private {number} */
  this.angle_ = 0;
  /** @private {game.core.math.Vector} */
  this.offset_ = new game.core.math.Vector();
  /** @private {number} */
  this.radius_;
  /** @private {string} */
  this.fillColor_ = 'black';
};


/**
 * Creates a convex pologyon.
 *
 * @param {game.core.math.Vector=} opt_pos A vector representing the origin of
 *     the polygon. (all other points are relative to this one)
 * @param {Array.<game.core.math.Vector>=|number=} opt_points An array of
 *     vectors representing the points in the polygon, in counter-clockwise
 *     order.
 * @return {!game.mixins.Shape} This for chaining.
 */
game.mixins.Shape.prototype.setPolygon = function(opt_pos, opt_points) {
  this.type_ = game.mixins.Shape.Type.POLYGON;
  if (opt_pos) {
    this.setPosition(opt_pos);
  }
  this.points_ = opt_points || [];
  this.angle_ = 0;
  this.offset_ = new game.core.math.Vector();
  this.recalc();

  return this;
};


/**
 * Creates a circle.
 *
 * TODO(jstanton): Does position represent center? or top left?
 *
 * @param {game.core.math.Vector=} opt_pos A vector representing the position of
 *     the center of the circle.
 * @param {number=} opt_r The radius of the circle.
 * @return {!game.mixins.Shape} This for chaining.
 */
game.mixins.Shape.prototype.setCircle = function(opt_pos, opt_r) {
  this.type_ = game.mixins.Shape.Type.CIRCLE;
  if (opt_pos) {
    this.setPosition(opt_pos);
  }
  this.radius_ = opt_r || 0;

  return this;
};


/**
 * Sets the dimensions of the rectangle.
 *
 * @param {game.core.math.Vector} position A vector representing the position of
 *     the center of the rectanctle.
 * @param {number} width
 * @param {number} height
 * @return {!game.mixins.Shape} This for chaining.
 */
game.mixins.Shape.prototype.setRectangle = function(position, width, height) {
  this.type_ = game.mixins.Shape.Type.RECTANGLE;
  this.angle_ = 0;
  this.offset_ = new game.core.math.Vector();
  this.setSize(width, height);
  this.setPosition();

  this.recalc();
  return this;
};


/**
 * Set the points of the polygon.
 *
 * Note: This calls `recalc` for you.
 *
 * @param {Array.<game.core.math.Vector>=} opt_points An array of vectors
 *     representing the points in the polygon, in counter-clockwise order.
 *
 * @return {!game.mixins.Shape} This for chaining.
 */
game.mixins.Shape.prototype.setPoints = function(opt_points) {
  this.points_ = opt_points;
  this.recalc();
  return this;
};


/**
 * Set the current rotation angle of the polygon.
 *
 * Note: This calls `recalc` for you.
 *
 * @param {number} angle The current rotation angle (in radians).
 * @return {!game.mixins.Shape} This for chaining.
 */
game.mixins.Shape.prototype.setAngle = function(angle) {
  this.angle_ = angle;
  this.recalc();
  return this;
};


/**
 * Set the current offset to apply to the `points` before applying the `angle`
 * rotation.
 *
 * Note: This calls `recalc` for you.
 *
 * @param {game.core.math.Vector} offset The new offset vector.
 * @return {!game.mixins.Shape} This for chaining.
 */
game.mixins.Shape.prototype.setOffset = function(offset) {
  this.offset_ = offset;
  this.recalc();
  return this;
};


/**
 * Rotates this polygon counter-clockwise around the origin of *its local
 * coordinate system* (i.e. `position`).
 *
 * Note: This changes the **original** points (so any `angle` will be applied
 * on top of this rotation) Note: This calls `recalc` for you.
 *
 * @param {number} angle The angle to rotate (in radians)
 * @return {!game.mixins.Shape} This for chaining.
 */
game.mixins.Shape.prototype.rotate = function(angle) {
  var points = this.points_;
  var len = points.length;
  for (var i = 0; i < len; i++) {
    points[i].rotate(angle);
  }
  this.recalc();
  return this;
};


/**
 * Translates the points of this polygon by a specified amount relative to the
 * origin of *its own coordinate system* (i.e. `position`). This is most
 * useful to change the "center point" of a polygon. If you just want to move
 * the whole polygon, change the coordinates of `position`. Note: This changes
 * the **original** points (so any `offset` will be applied on top of this
 * translation) Note: This calls `recalc` for you.
 *
 * @param {number} x The horizontal amount to translate.
 * @param {number} y The vertical amount to translate.
 * @return {!game.mixins.Shape} This for chaining.
 */
game.mixins.Shape.prototype.translate = function(x, y) {
  var points = this.points_;
  var len = points.length;
  for (var i = 0; i < len; i++) {
    points[i].x += x;
    points[i].y += y;
  }
  this.recalc();
  return this;
};


/**
 * Computes the calculated collision polygon. Applies the `angle` and `offset`
 * to the original points then recalculates the edges and normals of the
 * collision polygon.
 *
 * This **must** be called if the `points` array, `angle`, or `offset` is
 * modified manualy.
 *
 * @return {!game.mixins.Shape} This for chaining.
 */
game.mixins.Shape.prototype.recalc = function() {
  var i;
  // Calculated points - this is what is used for underlying collisions and
  // takes into account the angle/offset set on the polygon.
  var calcPoints = this.calcPoints = [];
  // The edges here are the direction of the `n`th edge of the polygon, relative
  // to the `n`th point. If you want to draw a given edge from the edge value,
  // you must first translate to the position of the starting point.
  var edges = this.edges = [];
  // The normals here are the direction of the normal for the `n`th edge of the
  // polygon, relative to the position of the `n`th point. If you want to draw
  // an edge normal, you must first translate to the position of the starting
  // point.
  var normals = this.normals = [];
  // Copy the original points array and apply the offset/angle
  var points = this.points_ || [];
  var offset = this.offset_ || 0;
  var angle = this.angle_ || 0;
  var len = points.length;
  for (i = 0; i < len; i++) {
    var calcPoint = points[i].clone();
    calcPoints.push(calcPoint);
    calcPoint.x += offset.x;
    calcPoint.y += offset.y;
    if (angle !== 0) {
      calcPoint.rotate(angle);
    }
  }

  // Calculate the edges/normals
  for (i = 0; i < len; i++) {
    var p1 = calcPoints[i];
    var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
    var e = new game.core.math.Vector().copy(p2).sub(p1);
    var n = new game.core.math.Vector().copy(e).perp().normalize();
    edges.push(e);
    normals.push(n);
  }

  this.isDirty = true;

  return this;
};


/**
 * Draws the entity.
 */
game.mixins.Shape.prototype.draw = function() {
  if (!this.isDirty()) return;

  var svg = this.el.getElementsByTagName('svg');
  if (svg.length == 1) {
    svg = svg[0];
  } else {
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.el.appendChild(svg);
  }

  if (this.type_ == game.mixins.Shape.Type.POLYGON) {
    var path = svg.getElementsByTagName('path');
    if (path.length == 1) {
      path = path[0];
    } else {
      path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      svg.appendChild(path);
    }
    path.setAttributeNS(null, 'd', game.core.helper.poly2path(this));
    path.setAttributeNS(null, 'fill', this.fillColor_);
  }

  if (this.type_ == game.mixins.Shape.Type.CIRCLE) {
    var circle = svg.getElementsByTagName('circle');
    if (circle.length == 1) {
      circle = circle[0];
    } else {
      circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      svg.appendChild(circle);
    }
    circle.setAttributeNS(null, 'r', this.radius_);
    circle.setAttributeNS(null, 'cx', this.radius_);
    circle.setAttributeNS(null, 'cy', this.radius_);
    circle.setAttributeNS(null, 'fill', this.fillColor_);
  }
};
