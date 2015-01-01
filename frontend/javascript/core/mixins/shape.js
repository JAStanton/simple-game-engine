goog.provide('game.mixins.Shape');
goog.provide('game.mixins.Shape.Type');
goog.provide('game.mixins.UnitSquare');

goog.require('game.core.Entity');
goog.require('game.core.math.Vector');



/**
 * Represents a *convex* shape with any number of points (specified in
 * counter-clockwise order).
 *
 * This was copied and modified from SAT.js: https://github.com/jriecken/sat-js]
 *
 * TODO(jstanton): Update this mixin to use getters and setters as to avoid some
 *                 collision in properties / exposing so many properties.
 *
 * This mixin exposes these properties:
 *
 * type
 * points_
 * calcPoints_
 * edges_
 * normals_
 * angle_
 * offset_
 * radius_
 * fillColor_
 *
 * And these methods:
 *
 * setPolygon
 * setCircle
 * setRectangle
 * setSize
 * setPoints
 * setAngle
 * setOffset
 * rotate
 * recalc
 * translate
 * draw
 *
 * @constructor
 */
game.mixins.Shape = function() {
  return {
    init: function() {
      /** @type {!game.mixins.Shape.Type} */
      this.type;
      /** @private {Array.<!game.core.math.Vector>} */
      this.points_;
      /** @private {Array.<!game.core.math.Vector>} */
      this.calcPoints_;
      /** @private {Array.<!game.core.math.Vector>} */
      this.edges_;
      /** @private {Array.<!game.core.math.Vector>} */
      this.normals_;
      /** @private {number} */
      this.angle_ = 0;
      /** @private {game.core.math.Vector} */
      this.offset_ = new game.core.math.Vector();
      /** @private {number} */
      this.radius_;
      /** @private {string} */
      this.fillColor_ = 'black';
    },
    setPolygon: function(opt_pos, opt_points) {
      this.type = game.mixins.Shape.Type.POLYGON;
      if (opt_pos) {
        this.setPosition(opt_pos);
      }
      this.points_ = opt_points || [];
      this.angle_ = 0;
      this.offset_ = new game.core.math.Vector();
      this.recalc();

      return this;
    },
    setCircle: function(opt_pos, opt_r) {
      this.type = game.mixins.Shape.Type.CIRCLE;
      if (opt_pos) {
        this.setPosition(opt_pos);
      }
      this.radius_ = opt_r || 0;

      return this;
    },
    setRectangle: function(position, width, height) {
      this.type = game.mixins.Shape.Type.RECTANGLE;
      this.angle_ = 0;
      this.offset_ = new game.core.math.Vector();
      this.setSize(width, height);
      this.setPosition(position);

      this.recalc();
      return this;
    },
    setSize: function(width, height) {
      this.points_ = [
        new game.core.math.Vector(),
        new game.core.math.Vector(width, 0),
        new game.core.math.Vector(width, height),
        new game.core.math.Vector(0, height)
      ];
    },
    setPoints: function(opt_points) {
      this.points_ = opt_points;
      this.recalc();
      return this;
    },
    setAngle: function(angle) {
      this.angle_ = angle;
      this.recalc();
      return this;
    },
    setOffset: function(offset) {
      this.offset_ = offset;
      this.recalc();
      return this;
    },
    rotate: function(angle) {
      var points = this.points_;
      var len = points.length;
      for (var i = 0; i < len; i++) {
        points[i].rotate(angle);
      }
      this.recalc();
      return this;
    },
    recalc: function() {
      var i;
      // Calculated points - this is what is used for underlying collisions and
      // takes into account the angle/offset set on the polygon.
      var calcPoints = this.calcPoints_ = [];
      // The edges here are the direction of the `n`th edge of the polygon,
      // relative to the `n`th point. If you want to draw a given edge from the
      // edge value, you must first translate to the position of the starting
      // point.
      var edges = this.edges_ = [];
      // The normals here are the direction of the normal for the `n`th edge of
      // the polygon, relative to the position of the `n`th point. If you want
      // to draw an edge normal, you must first translate to the position of the
      // starting point.
      var normals = this.normals_ = [];
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

      this.setDirty(true);

      return this;
    },
    translate: function(x, y) {
      var points = this.points_;
      var len = points.length;
      for (var i = 0; i < len; i++) {
        points[i].x += x;
        points[i].y += y;
      }
      this.recalc();
      return this;
    },
    draw: function() {
      if (!this.isDirty()) return;

      var svg = this.el.getElementsByTagName('svg');
      if (svg.length == 1) {
        svg = svg[0];
      } else {
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.el.appendChild(svg);
      }

      if (this.type == game.mixins.Shape.Type.POLYGON) {
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

      if (this.type == game.mixins.Shape.Type.CIRCLE) {
        var circle = svg.getElementsByTagName('circle');
        if (circle.length == 1) {
          circle = circle[0];
        } else {
          circle =
              document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          svg.appendChild(circle);
        }
        circle.setAttributeNS(null, 'r', this.radius_);
        circle.setAttributeNS(null, 'cx', this.radius_);
        circle.setAttributeNS(null, 'cy', this.radius_);
        circle.setAttributeNS(null, 'fill', this.fillColor_);
      }
    }
  };
};


/**
 * Register mixin globally.
 */
game.core.helper.mixins['shape'] = game.mixins.Shape;


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
 * Unit square polygon used for polygon hit detection.
 *
 * @extends {game.core.Entity}
 * @constructor
 */
game.mixins.UnitSquare = function() {
  game.mixins.UnitSquare.base(this, 'constructor');
  this.setPosition(new game.core.math.Vector());
  this.setSize(1, 1);
};
game.core.helper.inherit(game.mixins.UnitSquare, game.core.Entity);
