goog.provide('engine.core.math.collision');
goog.provide('engine.core.math.collision.helper');

goog.require('engine.core.helper');
goog.require('engine.core.math.Vector');
goog.require('game.mixins.UnitSquare');


engine.core.helper.scope(function() {
  /**
   * An object representing the result of an intersection. Contains:
   *  - The two objects participating in the intersection
   *  - The vector representing the minimum change necessary to extract the
   *    first object from the second one (as well as a unit vector in that
   *    direction and the magnitude of the overlap)
   *  - Whether the first object is entirely inside the second, and vice versa.
   *
   * Stolen and modified from SAT.js: https://github.com/jriecken/sat-js
   *
   * @constructor
   */
  engine.core.math.collision.Response = function() {
    this.a = null;
    this.b = null;
    this.overlapN = new engine.core.math.Vector();
    this.overlapV = new engine.core.math.Vector();
    this.clear();
  };


  /**
   * Set some values of the response back to their defaults. Call this between
   * tests if you are going to reuse a single Response object for multiple
   * intersection tests (recommented as it will avoid allcating extra memory)
   *
   * @return {engine.core.math.collision.Response} This for chaining
   */
  engine.core.math.collision.Response.prototype.clear = function() {
    this.aInB = true;
    this.bInA = true;
    this.overlap = Number.MAX_VALUE;
    return this;
  };



  // Alias to help life be easy!
  var helper = engine.core.math.collision.helper;
  /**
   * A pool of `engine.core.math.Vector` objects that are used in calculations
   * to avoid allocating memory.
   *
   * @type {Array.<engine.core.math.Vector>}
   */
  var T_VECTORS = [];
  for (var i = 0; i < 10; i++) {
    T_VECTORS.push(new engine.core.math.Vector());
  }


  /**
   * A pool of arrays of numbers used in calculations to avoid allocating
   * memory.
   *
   * @type {Array.<Array.<number>>}
   */
  var T_ARRAYS = [];
  for (var i = 0; i < 5; i++) { T_ARRAYS.push([]); }


  /**
   * Temporary response used for polygon hit detection.
   *
   * @type {!engine.core.math.collision.Response}
   */
  var T_RESPONSE = new engine.core.math.collision.Response();


  /**
   * Unit square polygon used for polygon hit detection.
   *
   * @type {Polygon}
   */
  var UNIT_SQUARE = new game.mixins.UnitSquare;


  /**
   * Flattens the specified array of points onto a unit vector axis,
   * resulting in a one dimensional range of the minimum and
   * maximum value on that axis.
   *
   * @param {Array.<engine.core.math.Vector>} points The points to flatten.
   * @param {engine.core.math.Vector} normal The unit vector axis to flatten on.
   * @param {Array.<number>} result An array.  After calling this function,
   *   result[0] will be the minimum value,
   *   result[1] will be the maximum value.
   */
  helper.flattenPointsOn = function(points, normal, result) {
    var min = Number.MAX_VALUE;
    var max = -Number.MAX_VALUE;
    var len = points.length;
    for (var i = 0; i < len; i++) {
      // The magnitude of the projection of the point onto the normal
      var dot = points[i].dot(normal);
      if (dot < min) { min = dot; }
      if (dot > max) { max = dot; }
    }
    result[0] = min; result[1] = max;
  };


  /**
   * Check whether two convex polygons are separated by the specified
   * axis (must be a unit vector).
   *
   * @param {engine.core.math.Vector} aPos The position of the first polygon.
   * @param {engine.core.math.Vector} bPos The position of the second polygon.
   * @param {Array.<engine.core.math.Vector>} aPoints The points in the first
   *     polygon.
   * @param {Array.<engine.core.math.Vector>} bPoints The points in the second
   *     polygon.
   * @param {engine.core.math.Vector} axis The axis (unit sized) to test
   *     against. The points of both polygons will be projected onto this axis.
   * @param {engine.core.math.collision.Response=} opt_response A response
   *     object (optional) which will be populated if the axis is not a
   *     separating axis.
   * @return {boolean} true if it is a separating axis, false otherwise.
   *     If false, and a response is passed in, information about how much
   *     overlap and the direction of the overlap will be populated.
   */
  helper.isSeparatingAxis =
      function(aPos, bPos, aPoints, bPoints, axis, opt_response) {
    var rangeA = T_ARRAYS.pop();
    var rangeB = T_ARRAYS.pop();
    // The magnitude of the offset between the two polygons
    var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
    var projectedOffset = offsetV.dot(axis);
    // Project the polygons onto the axis.
    helper.flattenPointsOn(aPoints, axis, rangeA);
    helper.flattenPointsOn(bPoints, axis, rangeB);
    // Move B's range to its position relative to A.
    rangeB[0] += projectedOffset;
    rangeB[1] += projectedOffset;
    // Check if there is a gap. If there is, this is a separating axis and we
    // can stop
    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
      T_VECTORS.push(offsetV);
      T_ARRAYS.push(rangeA);
      T_ARRAYS.push(rangeB);
      return true;
    }
    // This is not a separating axis. If we're calculating a response, calculate
    // the overlap.
    if (opt_response) {
      var response = opt_response;
      var overlap = 0;
      // A starts further left than B
      if (rangeA[0] < rangeB[0]) {
        response.aInB = false;
        // A ends before B does. We have to pull A out of B
        if (rangeA[1] < rangeB[1]) {
          overlap = rangeA[1] - rangeB[0];
          response.bInA = false;
        // B is fully inside A.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      // B starts further left than A
      } else {
        response.bInA = false;
        // B ends before A ends. We have to push A out of B
        if (rangeA[1] > rangeB[1]) {
          overlap = rangeA[0] - rangeB[1];
          response.aInB = false;
        // A is fully inside B.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      }
      // If this is the smallest amount of overlap we've seen so far, set it as
      // the minimum overlap.
      var absOverlap = Math.abs(overlap);
      if (absOverlap < response.overlap) {
        response.overlap = absOverlap;
        response.overlapN.copy(axis);
        if (overlap < 0) {
          response.overlapN.reverse();
        }
      }
    }
    T_VECTORS.push(offsetV);
    T_ARRAYS.push(rangeA);
    T_ARRAYS.push(rangeB);
    return false;
  };


  /**
   * Calculates which Vornoi region a point is on a line segment.
   * It is assumed that both the line and the point are relative to `(0,0)`
   *
   *            |       (0)      |
   *     (-1)  [S]--------------[E]  (1)
   *            |       (0)      |
   *
   * @param {engine.core.math.Vector} line The line segment.
   * @param {engine.core.math.Vector} point The point.
   * @return  {number} LEFT_VORNOI_REGION (-1) if it is the left region,
   *          MIDDLE_VORNOI_REGION (0) if it is the middle region,
   *          RIGHT_VORNOI_REGION (1) if it is the right region.
   */
  helper.vornoiRegion = function(line, point) {
    var len2 = line.len2();
    var dp = point.dot(line);
    // If the point is beyond the start of the line, it is in the
    // left vornoi region.
    if (dp < 0) { return LEFT_VORNOI_REGION; }
  // If the point is beyond the end of the line, it is in the
  // right vornoi region.
    else if (dp > len2) { return RIGHT_VORNOI_REGION; }
  // Otherwise, it's in the middle one.
    else { return MIDDLE_VORNOI_REGION; }
  };


  // Constants for Vornoi regions

  /**
   * @const
   */
  var LEFT_VORNOI_REGION = -1;


  /**
   * @const
   */
  var MIDDLE_VORNOI_REGION = 0;


  /**
   * @const
   */
  var RIGHT_VORNOI_REGION = 1;


  /**
   * Check if a point is inside a circle.
   *
   * @param {engine.core.math.Vector} p The point to test.
   * @param {Circle} c The circle to test.
   * @return {boolean} true if the point is inside the circle, false if it is
   *     not.
   */
  engine.core.math.collision.pointInCircle = function(p, c) {
    var differenceV = T_VECTORS.pop().copy(p).sub(c.position_);
    var radiusSq = c.radius_ * c.radius_;
    var distanceSq = differenceV.len2();
    T_VECTORS.push(differenceV);
    // If the distance between is smaller than the radius then the point is
    // inside the circle.
    return distanceSq <= radiusSq;
  };


  /**
   * Check if a point is inside a convex polygon.
   *
   * @param {engine.core.math.Vector} p The point to test.
   * @param {Polygon} poly The polygon to test.
   * @return {boolean} true if the point is inside the polygon, false if it is
   *     not.
   */
  engine.core.math.collision.pointInPolygon = function(p, poly) {
    UNIT_SQUARE.position_.copy(p);
    T_RESPONSE.clear();
    var result = engine.core.math.collision.testPolygonPolygon(
        UNIT_SQUARE, poly, T_RESPONSE);
    if (result) {
      result = T_RESPONSE.aInB;
    }
    return result;
  };


  /**
   * Check if two circles collide.
   *
   * @param {Circle} a The first circle.
   * @param {Circle} b The second circle.
   * @param {engine.core.math.collision.Response=} opt_response Response
   *     object (optional) that will be populated if the circles intersect.
   * @return {boolean} true if the circles intersect, false if they don't.
   */
  engine.core.math.collision.testCircleCircle = function(a, b, opt_response) {
    var response = opt_response;
    // Check if the distance between the centers of the two
    // circles is greater than their combined radius.
    var differenceV = T_VECTORS.pop().copy(b.position_).sub(a.position_);
    var totalRadius = a.radius_ + b.radius_;
    var totalRadiusSq = totalRadius * totalRadius;
    var distanceSq = differenceV.len2();
    // If the distance is bigger than the combined radius, they don't intersect.
    if (distanceSq > totalRadiusSq) {
      T_VECTORS.push(differenceV);
      return false;
    }
    // They intersect.  If we're calculating a response, calculate the overlap.
    if (response) {
      var dist = Math.sqrt(distanceSq);
      response.a = a;
      response.b = b;
      response.overlap = totalRadius - dist;
      response.overlapN.copy(differenceV.normalize());
      response.overlapV.copy(differenceV).scale(response.overlap);
      response.aInB = a.radius_ <= b.radius_ && dist <= b.radius_ - a.radius_;
      response.bInA = b.radius_ <= a.radius_ && dist <= a.radius_ - b.radius_;
    }
    T_VECTORS.push(differenceV);
    return true;
  };


  /**
   * Check if a polygon and a circle collide.
   *
   * @param {Polygon} polygon The polygon.
   * @param {Circle} circle The circle.
   * @param {engine.core.math.collision.Response=} opt_response A Response
   *     object (optional) that will be populated if they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  engine.core.math.collision.testPolygonCircle =
      function(polygon, circle, opt_response) {
    var response = opt_response;
    // Get the position of the circle relative to the polygon.
    var circlePos = T_VECTORS.
        pop().
        copy(circle.position_).
        sub(polygon.position_);
    var radius = circle.radius_;
    var radius2 = radius * radius;
    var points = polygon.calcPoints_;
    var len = points.length;
    var edge = T_VECTORS.pop();
    var point = T_VECTORS.pop();

    // For each edge in the polygon:
    for (var i = 0; i < len; i++) {
      var next = i === len - 1 ? 0 : i + 1;
      var prev = i === 0 ? len - 1 : i - 1;
      var overlap = 0;
      var overlapN = null;

      // Get the edge.
      edge.copy(polygon.edges_[i]);
      // Calculate the center of the circle relative to the starting point of
      // the edge.
      point.copy(circlePos).sub(points[i]);

      // If the distance between the center of the circle and the point
      // is bigger than the radius, the polygon is definitely not fully in
      // the circle.
      if (response && point.len2() > radius2) {
        response.aInB = false;
      }

      // Calculate which Vornoi region the center of the circle is in.
      var region = helper.vornoiRegion(edge, point);
      // If it's the left region:
      if (region === LEFT_VORNOI_REGION) {
        // We need to make sure we're in the RIGHT_VORNOI_REGION of the previous
        // edge.
        edge.copy(polygon.edges_[prev]);
        // Calculate the center of the circle relative the starting point of the
        // previous edge
        var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
        region = helper.vornoiRegion(edge, point2);
        if (region === RIGHT_VORNOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the
          // point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            T_VECTORS.push(point2);
            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response.bInA = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        T_VECTORS.push(point2);
      // If it's the right region:
      } else if (region === RIGHT_VORNOI_REGION) {
        // We need to make sure we're in the left region on the next edge
        edge.copy(polygon.edges_[next]);
        // Calculate the center of the circle relative to the starting point of
        // the next edge.
        point.copy(circlePos).sub(points[next]);
        region = helper.vornoiRegion(edge, point);
        if (region === LEFT_VORNOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the
          // point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response.bInA = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
      // Otherwise, it's the middle region:
      } else {
        // Need to check if the circle is intersecting the edge,
        // Change the edge into its "edge normal".
        var normal = edge.perp().normalize();
        // Find the perpendicular distance between the center of the
        // circle and the edge.
        var dist = point.dot(normal);
        var distAbs = Math.abs(dist);
        // If the circle is on the outside of the edge, there is no
        // intersection.
        if (dist > 0 && distAbs > radius) {
          // No intersection
          T_VECTORS.push(circlePos);
          T_VECTORS.push(normal);
          T_VECTORS.push(point);
          return false;
        } else if (response) {
          // It intersects, calculate the overlap.
          overlapN = normal;
          overlap = radius - dist;
          // If the center of the circle is on the outside of the edge, or part
          // of the circle is on the outside, the circle is not fully inside the
          // polygon.
          if (dist >= 0 || overlap < 2 * radius) {
            response.bInA = false;
          }
        }
      }

      // If this is the smallest overlap we've seen, keep it.
      // (overlapN may be null if the circle was in the wrong Vornoi region).
      if (overlapN &&
          response && Math.abs(overlap) < Math.abs(response.overlap)) {
        response.overlap = overlap;
        response.overlapN.copy(overlapN);
      }
    }

    // Calculate the final overlap vector - based on the smallest overlap.
    if (response) {
      response.a = polygon;
      response.b = circle;
      response.overlapV.
          copy(response.overlapN).
          scale(response.overlap);
    }
    T_VECTORS.push(circlePos);
    T_VECTORS.push(edge);
    T_VECTORS.push(point);
    return true;
  };


  /**
   * Check if a circle and a polygon collide.
   *
   * **NOTE:** This is slightly less efficient than polygonCircle as it just
   * runs polygonCircle and reverses everything at the end.
   *
   * @param {Circle} circle The circle.
   * @param {Polygon} polygon The polygon.
   * @param {engine.core.math.collision.Response=} opt_response A.Response
   *     object (optional) that will be populated if they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  engine.core.math.collision.testCirclePolygon =
      function(circle, polygon, opt_response) {
    var response = opt_response;
    // Test the polygon against the circle.
    var result =
        engine.core.math.collision.testPolygonCircle(polygon, circle, response);
    if (result && response) {
      // Swap A and B in the response.
      var a = response.a;
      var aInB = response.aInB;
      response.overlapN.reverse();
      response.overlapV.reverse();
      response.a = response.b;
      response.b = a;
      response.aInB = response.bInA;
      response.bInA = aInB;
    }
    return result;
  };


  /**
   * Checks whether polygons collide.
   *
   * @param {Polygon} a The first polygon.
   * @param {Polygon} b The second polygon.
   * @param {engine.core.math.collision.Response=} opt_response
   *     engine.core.math.collision.Response object (optional) that will be
   *     populated if they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  engine.core.math.collision.testPolygonPolygon = function(a, b, opt_response) {
    var response = opt_response;
    var aPoints = a.calcPoints_;
    var aLen = aPoints.length;
    var bPoints = b.calcPoints_;
    var bLen = bPoints.length;
    // If any of the edge normals of A is a separating axis, no intersection.
    for (var i = 0; i < aLen; i++) {
      if (helper.isSeparatingAxis(
          a.position_,
          b.position_,
          aPoints,
          bPoints,
          a.normals_[i],
          response)) {
        return false;
      }
    }
    // If any of the edge normals of B is a separating axis, no intersection.
    for (var i = 0; i < bLen; i++) {
      if (helper.isSeparatingAxis(
          a.position_,
          b.position_,
          aPoints,
          bPoints,
          b.normals_[i],
          response)) {
        return false;
      }
    }
    // Since none of the edge normals of A or B are a separating axis, there is
    // an intersection and we've already calculated the smallest overlap (in
    // isSeparatingAxis).  Calculate the final overlap vector.
    if (response) {
      response.a = a;
      response.b = b;
      response.overlapV.
          copy(response.overlapN).
          scale(response.overlap);
    }
    return true;
  };
});  // engine.core.helper.scope
