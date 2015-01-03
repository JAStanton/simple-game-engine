/**
 * @fileoverview Externs for Matter.js
 *
 * @see https://github.com/liabru/matter-js
 * @externs
 */



/** @constructor */
var Matter = function() {};



/** @constructor */
Matter.Axes = function() {};


/**
 * @param  {*} vertices
 * @return {*|undefined}
 */
Matter.Axes.prototype.fromVertices = function(vertices) {};


/**
 * @param  {*} axes
 * @param  {*} angle
 * @return {*|undefined}
 */
Matter.Axes.prototype.rotate = function(axes, angle) {};



/** @constructor */
Matter.Bodies = function() {};


/**
 * @param  {*} x
 * @param  {*} y
 * @param  {*} radius
 * @param  {*} options
 * @param  {*} maxSides
 * @return {*|undefined}
 */
Matter.Bodies.prototype.circle = function(x, y, radius, options, maxSides) {};


/**
 * @param  {*} x
 * @param  {*} y
 * @param  {*} sides
 * @param  {*} radius
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Bodies.prototype.polygon = function(x, y, sides, radius, options) {};


/**
 * @param  {*} x
 * @param  {*} y
 * @param  {*} width
 * @param  {*} height
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Bodies.prototype.rectangle = function(x, y, width, height, options) {};


/**
 * @param  {*} x
 * @param  {*} y
 * @param  {*} width
 * @param  {*} height
 * @param  {*} slope
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Bodies.prototype.trapezoid =
    function(x, y, width, height, slope, options) {};



/** @constructor */
Matter.Body = function() {};


/**
 * @param  {*} body
 * @param  {*} position
 * @param  {*} force
 * @return {*|undefined}
 */
Matter.Body.prototype.applyForce = function(body, position, force) {};


/**
 * @param  {*} bodies
 * @param  {*} gravity
 * @return {*|undefined}
 */
Matter.Body.prototype.applyGravityAll = function(bodies, gravity) {};


/**
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Body.prototype.create = function(options) {};


/**
 * @return {*|undefined}
 */
Matter.Body.prototype.nextGroupId = function() {};


/**
 * @param  {*} bodies
 * @return {*|undefined}
 */
Matter.Body.prototype.resetForcesAll = function(bodies) {};


/**
 * @param  {*} body
 * @param  {*} rotation
 * @return {*|undefined}
 */
Matter.Body.prototype.rotate = function(body, rotation) {};


/**
 * @param  {*} body
 * @param  {*} scaleX
 * @param  {*} scaleY
 * @param  {*} point
 * @return {*|undefined}
 */
Matter.Body.prototype.scale = function(body, scaleX, scaleY, point) {};


/**
 * @param {*} body
 * @param {*} angle
 */
Matter.Body.prototype.setAngle = function(body, angle) {};


/**
 * @param {*} body
 * @param {*} velocity
 */
Matter.Body.prototype.setAngularVelocity = function(body, velocity) {};


/**
 * @param {*} body
 * @param {*} position
 */
Matter.Body.prototype.setPosition = function(body, position) {};


/**
 * @param {*}  body
 * @param {Boolean} isStatic
 */
Matter.Body.prototype.setStatic = function(body, isStatic) {};


/**
 * @param {*} body
 * @param {*} velocity
 */
Matter.Body.prototype.setVelocity = function(body, velocity) {};


/**
 * @param {*} body
 * @param {*} vertices
 */
Matter.Body.prototype.setVertices = function(body, vertices) {};


/**
 * @param  {*} body
 * @param  {*} translation
 * @return {*|undefined}
 */
Matter.Body.prototype.translate = function(body, translation) {};


/**
 * @param  {*} body
 * @param  {*} deltaTime
 * @param  {*} timeScale
 * @param  {*} correction
 * @return {*|undefined}
 */
Matter.Body.prototype.update =
    function(body, deltaTime, timeScale, correction) {};


/**
 * @param  {*} bodies
 * @param  {*} deltaTime
 * @param  {*} timeScale
 * @param  {*} correction
 * @param  {*} worldBounds
 * @return {*|undefined}
 */
Matter.Body.prototype.updateAll =
    function(bodies, deltaTime, timeScale, correction, worldBounds) {};



/** @constructor */
Matter.Bounds = function() {};


/**
 * @param  {*} bounds
 * @param  {*} point
 * @return {*|undefined}
 */
Matter.Bounds.prototype.contains = function(bounds, point) {};


/**
 * @param  {*} vertices
 * @return {*|undefined}
 */
Matter.Bounds.prototype.create = function(vertices) {};


/**
 * @param  {*} boundsA
 * @param  {*} boundsB
 * @return {*|undefined}
 */
Matter.Bounds.prototype.overlaps = function(boundsA, boundsB) {};


/**
 * @param  {*} bounds
 * @param  {*} position
 * @return {*|undefined}
 */
Matter.Bounds.prototype.shift = function(bounds, position) {};


/**
 * @param  {*} bounds
 * @param  {*} vector
 * @return {*|undefined}
 */
Matter.Bounds.prototype.translate = function(bounds, vector) {};


/**
 * @param  {*} bounds
 * @param  {*} vertices
 * @param  {*} velocity
 * @return {*|undefined}
 */
Matter.Bounds.prototype.update = function(bounds, vertices, velocity) {};



/** @constructor */
Matter.Common = function() {};


/**
 * @param  {*} choices
 * @return {*|undefined}
 */
Matter.Common.prototype.choose = function(choices) {};


/**
 * @param  {*} value
 * @param  {*} min
 * @param  {*} max
 * @return {*|undefined}
 */
Matter.Common.prototype.clamp = function(value, min, max) {};


/**
 * @param  {*} obj
 * @param  {*} deep
 * @return {*|undefined}
 */
Matter.Common.prototype.clone = function(obj, deep) {};


/**
 * @param  {*} colorString
 * @return {*|undefined}
 */
Matter.Common.prototype.colorToNumber = function(colorString) {};


/**
 * @param  {*} obj
 * @param  {*} deep
 * @return {*|undefined}
 */
Matter.Common.prototype.extend = function(obj, deep) {};


/**
 * @param  {*}  obj
 * @return {Boolean}
 */
Matter.Common.prototype.isElement = function(obj) {};


/**
 * @param  {*} obj
 * @return {*|undefined}
 */
Matter.Common.prototype.keys = function(obj) {};


/**
 * @param  {*} message
 * @param  {*} type
 * @return {*|undefined}
 */
Matter.Common.prototype.log = function(message, type) {};


/**
 * @return {*|undefined}
 */
Matter.Common.prototype.nextId = function() {};


/**
 * @return {*|undefined}
 */
Matter.Common.prototype.now = function() {};


/**
 * @param  {*} min
 * @param  {*} max
 * @return {*|undefined}
 */
Matter.Common.prototype.random = function(min, max) {};


/**
 * @param  {*} color
 * @param  {*} percent
 * @return {*|undefined}
 */
Matter.Common.prototype.shadeColor = function(color, percent) {};


/**
 * @param  {*} array
 * @return {*|undefined}
 */
Matter.Common.prototype.shuffle = function(array) {};


/**
 * @param  {*} value
 * @return {*|undefined}
 */
Matter.Common.prototype.sign = function(value) {};


/**
 * @param  {*} obj
 * @return {*|undefined}
 */
Matter.Common.prototype.values = function(obj) {};



/** @constructor */
Matter.Composite = function() {};


/**
 * @param {*} composite
 * @param {*} object
 */
Matter.Composite.prototype.add = function(composite, object) {};


/**
 * @param {*} composite
 * @param {*} body
 */
Matter.Composite.prototype.addBody = function(composite, body) {};


/**
 * @param {*} compositeA
 * @param {*} compositeB
 */
Matter.Composite.prototype.addComposite = function(compositeA, compositeB) {};


/**
 * @param {*} composite
 * @param {*} constraint
 */
Matter.Composite.prototype.addConstraint = function(composite, constraint) {};


/**
 * @param  {*} composite
 * @return {*|undefined}
 */
Matter.Composite.prototype.allBodies = function(composite) {};


/**
 * @param  {*} composite
 * @return {*|undefined}
 */
Matter.Composite.prototype.allComposites = function(composite) {};


/**
 * @param  {*} composite
 * @return {*|undefined}
 */
Matter.Composite.prototype.allConstraints = function(composite) {};


/**
 * @param  {*} composite
 * @param  {*} keepStatic
 * @param  {*} deep
 * @return {*|undefined}
 */
Matter.Composite.prototype.clear = function(composite, keepStatic, deep) {};


/**
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Composite.prototype.create = function(options) {};


/**
 * @param  {*} composite
 * @param  {*} id
 * @param  {*} type
 * @return {*|undefined}
 */
Matter.Composite.prototype.get = function(composite, id, type) {};


/**
 * @param  {*} compositeA
 * @param  {*} objects
 * @param  {*} compositeB
 * @return {*|undefined}
 */
Matter.Composite.prototype.move = function(compositeA, objects, compositeB) {};


/**
 * @param  {*} composite
 * @return {*|undefined}
 */
Matter.Composite.prototype.rebase = function(composite) {};


/**
 * @param  {*} composite
 * @param  {*} object
 * @param  {*} deep
 * @return {*|undefined}
 */
Matter.Composite.prototype.remove = function(composite, object, deep) {};


/**
 * @param  {*} composite
 * @param  {*} body
 * @param  {*} deep
 * @return {*|undefined}
 */
Matter.Composite.prototype.removeBody = function(composite, body, deep) {};


/**
 * @param  {*} composite
 * @param  {*} position
 * @return {*|undefined}
 */
Matter.Composite.prototype.removeBodyAt = function(composite, position) {};


/**
 * @param  {*} compositeA
 * @param  {*} compositeB
 * @param  {*} deep
 * @return {*|undefined}
 */
Matter.Composite.prototype.removeComposite =
    function(compositeA, compositeB, deep) {};


/**
 * @param  {*} composite
 * @param  {*} position
 * @return {*|undefined}
 */
Matter.Composite.prototype.removeCompositeAt = function(composite, position) {};


/**
 * @param  {*} composite
 * @param  {*} constraint
 * @param  {*} deep
 * @return {*|undefined}
 */
Matter.Composite.prototype.removeConstraint =
    function(composite, constraint, deep) {};


/**
 * @param  {*} composite
 * @param  {*} position
 * @return {*|undefined}
 */
Matter.Composite.prototype.removeConstraintAt =
    function(composite, position) {};


/**
 * @param {*}  composite
 * @param {Boolean} isModified
 * @param {*}  updateParents
 * @param {*}  updateChildren
 */
Matter.Composite.prototype.setModified =
    function(composite, isModified, updateParents, updateChildren) {};



/** @constructor */
Matter.Composites = function() {};


/**
 * @param  {*} xx
 * @param  {*} yy
 * @param  {*} width
 * @param  {*} height
 * @param  {*} wheelSize
 * @return {*|undefined}
 */
Matter.Composites.prototype.car = function(xx, yy, width, height, wheelSize) {};


/**
 * @param  {*} composite
 * @param  {*} xOffsetA
 * @param  {*} yOffsetA
 * @param  {*} xOffsetB
 * @param  {*} yOffsetB
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Composites.prototype.chain =
    function(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {};


/**
 * @param  {*} composite
 * @param  {*} columns
 * @param  {*} rows
 * @param  {*} crossBrace
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Composites.prototype.mesh =
    function(composite, columns, rows, crossBrace, options) {};


/**
 * @param  {*} xx
 * @param  {*} yy
 * @param  {*} number
 * @param  {*} size
 * @param  {*} length
 * @return {*|undefined}
 */
Matter.Composites.prototype.newtonsCradle =
    function(xx, yy, number, size, length) {};


/**
 * @param  {*}   xx
 * @param  {*}   yy
 * @param  {*}   columns
 * @param  {*}   rows
 * @param  {*}   columnGap
 * @param  {*}   rowGap
 * @param  {Function} callback
 * @return {*|undefined}
 */
Matter.Composites.prototype.pyramid =
    function(xx, yy, columns, rows, columnGap, rowGap, callback) {};


/**
 * @param  {*} xx
 * @param  {*} yy
 * @param  {*} columns
 * @param  {*} rows
 * @param  {*} columnGap
 * @param  {*} rowGap
 * @param  {*} crossBrace
 * @param  {*} particleRadius
 * @param  {*} particleOptions
 * @param  {*} constraintOptions
 * @return {*|undefined}
 */
Matter.Composites.prototype.softBody =
    function(xx, yy, columns, rows, columnGap, rowGap, crossBrace,
    particleRadius, particleOptions, constraintOptions) {};


/**
 * @param  {*}   xx
 * @param  {*}   yy
 * @param  {*}   columns
 * @param  {*}   rows
 * @param  {*}   columnGap
 * @param  {*}   rowGap
 * @param  {Function} callback
 * @return {*|undefined}
 */
Matter.Composites.prototype.stack =
    function(xx, yy, columns, rows, columnGap, rowGap, callback) {};



/** @constructor */
Matter.Constraint = function() {};


/**
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Constraint.prototype.create = function(options) {};


/**
 * @param  {*} bodies
 * @return {*|undefined}
 */
Matter.Constraint.prototype.postSolveAll = function(bodies) {};


/**
 * @param  {*} constraint
 * @param  {*} timeScale
 * @return {*|undefined}
 */
Matter.Constraint.prototype.solve = function(constraint, timeScale) {};


/**
 * @param  {*} constraints
 * @param  {*} timeScale
 * @return {*|undefined}
 */
Matter.Constraint.prototype.solveAll = function(constraints, timeScale) {};



/** @constructor */
Matter.Contact = function() {};


/**
 * @param  {*} vertex
 * @return {*|undefined}
 */
Matter.Contact.prototype.create = function(vertex) {};


/**
 * @param  {*} vertex
 * @return {*|undefined}
 */
Matter.Contact.prototype.id = function(vertex) {};



/** @constructor */
Matter.Detector = function() {};


/**
 * @param  {*} bodies
 * @param  {*} engine
 * @return {*|undefined}
 */
Matter.Detector.prototype.bruteForce = function(bodies, engine) {};


/**
 * @param  {*} broadphasePairs
 * @param  {*} engine
 * @return {*|undefined}
 */
Matter.Detector.prototype.collisions = function(broadphasePairs, engine) {};



/** @constructor */
Matter.Engine = function() {};


/**
 * @param  {*} engine
 * @return {*|undefined}
 */
Matter.Engine.prototype.clear = function(engine) {};


/**
 * @param  {*} element
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Engine.prototype.create = function(element, options) {};


/**
 * @param  {*} engineA
 * @param  {*} engineB
 * @return {*|undefined}
 */
Matter.Engine.prototype.merge = function(engineA, engineB) {};


/**
 * @param  {*} engine
 * @return {*|undefined}
 */
Matter.Engine.prototype.render = function(engine) {};


/**
 * @param  {*} engine
 * @return {*|undefined}
 */
Matter.Engine.prototype.run = function(engine) {};


/**
 * @param  {*} engine
 * @param  {*} delta
 * @param  {*} correction
 * @return {*|undefined}
 */
Matter.Engine.prototype.update = function(engine, delta, correction) {};



/** @constructor */
Matter.Events = function() {};


/**
 * @param  {*}   object
 * @param  {*}   eventNames
 * @param  {Function} callback
 * @return {*|undefined}
 */
Matter.Events.prototype.off = function(object, eventNames, callback) {};


/**
 * @param  {*}   object
 * @param  {*}   eventNames
 * @param  {Function} callback
 * @return {*|undefined}
 */
Matter.Events.prototype.on = function(object, eventNames, callback) {};


/**
 * @param  {*} object
 * @param  {*} eventNames
 * @param  {*} event
 * @return {*|undefined}
 */
Matter.Events.prototype.trigger = function(object, eventNames, event) {};



/** @constructor */
Matter.Grid = function() {};


/**
 * @param  {*} grid
 * @return {*|undefined}
 */
Matter.Grid.prototype.clear = function(grid) {};


/**
 * @param  {*} bucketWidth
 * @param  {*} bucketHeight
 * @return {*|undefined}
 */
Matter.Grid.prototype.create = function(bucketWidth, bucketHeight) {};


/**
 * @param  {*} grid
 * @param  {*} bodies
 * @param  {*} engine
 * @param  {*} forceUpdate
 * @return {*|undefined}
 */
Matter.Grid.prototype.update = function(grid, bodies, engine, forceUpdate) {};



/** @constructor */
Matter.Metrics = function() {};


/**
 * @return {*|undefined}
 */
Matter.Metrics.prototype.create = function() {};


/**
 * @param  {*} metrics
 * @return {*|undefined}
 */
Matter.Metrics.prototype.reset = function(metrics) {};


/**
 * @param  {*} metrics
 * @param  {*} engine
 * @return {*|undefined}
 */
Matter.Metrics.prototype.update = function(metrics, engine) {};



/** @constructor */
Matter.Mouse = function() {};


/**
 * @param {*} element
 */
Matter.prototype.Mouse = function(element) {};


/**
 * @param  {*} mouse
 * @return {*|undefined}
 */
Matter.Mouse.prototype.clearSourceEvents = function(mouse) {};


/**
 * @param  {*} element
 * @return {*|undefined}
 */
Matter.Mouse.prototype.create = function(element) {};


/**
 * @param {*} mouse
 * @param {*} element
 */
Matter.Mouse.prototype.setElement = function(mouse, element) {};


/**
 * @param {*} mouse
 * @param {*} offset
 */
Matter.Mouse.prototype.setOffset = function(mouse, offset) {};


/**
 * @param {*} mouse
 * @param {*} scale
 */
Matter.Mouse.prototype.setScale = function(mouse, scale) {};



/** @constructor */
Matter.MouseConstraint = function() {};


/**
 * @param  {*} engine
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.MouseConstraint.prototype.create = function(engine, options) {};


/**
 * @param  {*} mouseConstraint
 * @param  {*} bodies
 * @return {*|undefined}
 */
Matter.MouseConstraint.prototype.update = function(mouseConstraint, bodies) {};



/** @constructor */
Matter.Pair = function() {};


/**
 * @param  {*} collision
 * @param  {*} timestamp
 * @return {*|undefined}
 */
Matter.Pair.prototype.create = function(collision, timestamp) {};


/**
 * @param  {*} bodyA
 * @param  {*} bodyB
 * @return {*|undefined}
 */
Matter.Pair.prototype.id = function(bodyA, bodyB) {};


/**
 * @param {*}  pair
 * @param {Boolean} isActive
 * @param {*}  timestamp
 */
Matter.Pair.prototype.setActive = function(pair, isActive, timestamp) {};


/**
 * @param  {*} pair
 * @param  {*} collision
 * @param  {*} timestamp
 * @return {*|undefined}
 */
Matter.Pair.prototype.update = function(pair, collision, timestamp) {};



/** @constructor */
Matter.Pairs = function() {};


/**
 * @param  {*} pairs
 * @return {*|undefined}
 */
Matter.Pairs.prototype.clear = function(pairs) {};


/**
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Pairs.prototype.create = function(options) {};


/**
 * @param  {*} pairs
 * @param  {*} timestamp
 * @return {*|undefined}
 */
Matter.Pairs.prototype.removeOld = function(pairs, timestamp) {};


/**
 * @param  {*} pairs
 * @param  {*} collisions
 * @param  {*} timestamp
 * @return {*|undefined}
 */
Matter.Pairs.prototype.update = function(pairs, collisions, timestamp) {};



/** @constructor */
Matter.Query = function() {};


/**
 * @param  {*} bodies
 * @param  {*} startPoint
 * @param  {*} endPoint
 * @param  {*} rayWidth
 * @return {*|undefined}
 */
Matter.Query.prototype.ray =
    function(bodies, startPoint, endPoint, rayWidth) {};


/**
 * @param  {*} bodies
 * @param  {*} bounds
 * @param  {*} outside
 * @return {*|undefined}
 */
Matter.Query.prototype.region = function(bodies, bounds, outside) {};



/** @constructor */
Matter.Render = function() {};


/**
 * @param  {*} engine
 * @param  {*} bodies
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.bodies = function(engine, bodies, context) {};


/**
 * @param  {*} engine
 * @param  {*} bodies
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.bodyAxes = function(engine, bodies, context) {};


/**
 * @param  {*} engine
 * @param  {*} bodies
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.bodyBounds = function(engine, bodies, context) {};


/**
 * @param  {*} engine
 * @param  {*} bodies
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.bodyIds = function(engine, bodies, context) {};


/**
 * @param  {*} engine
 * @param  {*} bodies
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.bodyPositions = function(engine, bodies, context) {};


/**
 * @param  {*} engine
 * @param  {*} bodies
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.bodyShadows = function(engine, bodies, context) {};


/**
 * @param  {*} engine
 * @param  {*} bodies
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.bodyVelocity = function(engine, bodies, context) {};


/**
 * @param  {*} engine
 * @param  {*} bodies
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.bodyWireframes = function(engine, bodies, context) {};


/**
 * @param  {*} render
 * @return {*|undefined}
 */
Matter.Render.prototype.clear = function(render) {};


/**
 * @param  {*} engine
 * @param  {*} pairs
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.collisions = function(engine, pairs, context) {};


/**
 * @param  {*} constraints
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.constraints = function(constraints, context) {};


/**
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.Render.prototype.create = function(options) {};


/**
 * @param  {*} engine
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.debug = function(engine, context) {};


/**
 * @param  {*} engine
 * @param  {*} grid
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.grid = function(engine, grid, context) {};


/**
 * @param  {*} inspector
 * @param  {*} context
 * @return {*|undefined}
 */
Matter.Render.prototype.inspector = function(inspector, context) {};


/**
 * @param {*} render
 * @param {*} background
 */
Matter.Render.prototype.setBackground = function(render, background) {};


/**
 * @param  {*} engine
 * @return {*|undefined}
 */
Matter.Render.prototype.world = function(engine) {};



/** @constructor */
Matter.RenderPixi = function() {};


/**
 * @param  {*} engine
 * @param  {*} body
 * @return {*|undefined}
 */
Matter.RenderPixi.prototype.body = function(engine, body) {};


/**
 * @param  {*} render
 * @return {*|undefined}
 */
Matter.RenderPixi.prototype.clear = function(render) {};


/**
 * @param  {*} engine
 * @param  {*} constraint
 * @return {*|undefined}
 */
Matter.RenderPixi.prototype.constraint = function(engine, constraint) {};


/**
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.RenderPixi.prototype.create = function(options) {};


/**
 * @param {*} render
 * @param {*} background
 */
Matter.RenderPixi.prototype.setBackground = function(render, background) {};


/**
 * @param  {*} engine
 * @return {*|undefined}
 */
Matter.RenderPixi.prototype.world = function(engine) {};



/** @constructor */
Matter.Resolver = function() {};


/**
 * @param  {*} bodies
 * @return {*|undefined}
 */
Matter.Resolver.prototype.postSolvePosition = function(bodies) {};


/**
 * @param  {*} pairs
 * @return {*|undefined}
 */
Matter.Resolver.prototype.preSolveVelocity = function(pairs) {};


/**
 * @param  {*} pairs
 * @param  {*} timeScale
 * @return {*|undefined}
 */
Matter.Resolver.prototype.solvePosition = function(pairs, timeScale) {};


/**
 * @param  {*} pairs
 * @param  {*} timeScale
 * @return {*|undefined}
 */
Matter.Resolver.prototype.solveVelocity = function(pairs, timeScale) {};



/** @constructor */
Matter.SAT = function() {};


/**
 * @param  {*} bodyA
 * @param  {*} bodyB
 * @param  {*} previousCollision
 * @return {*|undefined}
 */
Matter.SAT.prototype.collides = function(bodyA, bodyB, previousCollision) {};



/** @constructor */
Matter.Sleeping = function() {};


/**
 * @param  {*} pairs
 * @return {*|undefined}
 */
Matter.Sleeping.prototype.afterCollisions = function(pairs) {};


/**
 * @param {*}  body
 * @param {Boolean} isSleeping
 */
Matter.Sleeping.prototype.set = function(body, isSleeping) {};


/**
 * @param  {*} bodies
 * @return {*|undefined}
 */
Matter.Sleeping.prototype.update = function(bodies) {};



/** @constructor */
Matter.Vector = function() {};


/**
 * @param {*} vectorA
 * @param {*} vectorB
 */
Matter.Vector.prototype.add = function(vectorA, vectorB) {};


/**
 * @param  {*} vectorA
 * @param  {*} vectorB
 * @return {*|undefined}
 */
Matter.Vector.prototype.angle = function(vectorA, vectorB) {};


/**
 * @param  {*} vector
 * @return {*|undefined}
 */
Matter.Vector.prototype.clone = function(vector) {};


/**
 * @param  {*} vectorA
 * @param  {*} vectorB
 * @return {*|undefined}
 */
Matter.Vector.prototype.cross = function(vectorA, vectorB) {};


/**
 * @param  {*} vector
 * @param  {*} scalar
 * @return {*|undefined}
 */
Matter.Vector.prototype.div = function(vector, scalar) {};


/**
 * @param  {*} vectorA
 * @param  {*} vectorB
 * @return {*|undefined}
 */
Matter.Vector.prototype.dot = function(vectorA, vectorB) {};


/**
 * @param  {*} vector
 * @return {*|undefined}
 */
Matter.Vector.prototype.magnitude = function(vector) {};


/**
 * @param  {*} vector
 * @return {*|undefined}
 */
Matter.Vector.prototype.magnitudeSquared = function(vector) {};


/**
 * @param  {*} vector
 * @param  {*} scalar
 * @return {*|undefined}
 */
Matter.Vector.prototype.mult = function(vector, scalar) {};


/**
 * @param  {*} vector
 * @return {*|undefined}
 */
Matter.Vector.prototype.neg = function(vector) {};


/**
 * @param  {*} vector
 * @return {*|undefined}
 */
Matter.Vector.prototype.normalise = function(vector) {};


/**
 * @param  {*} vector
 * @param  {*} negate
 * @return {*|undefined}
 */
Matter.Vector.prototype.perp = function(vector, negate) {};


/**
 * @param  {*} vector
 * @param  {*} angle
 * @return {*|undefined}
 */
Matter.Vector.prototype.rotate = function(vector, angle) {};


/**
 * @param  {*} vector
 * @param  {*} angle
 * @param  {*} point
 * @return {*|undefined}
 */
Matter.Vector.prototype.rotateAbout = function(vector, angle, point) {};


/**
 * @param  {*} vectorA
 * @param  {*} vectorB
 * @return {*|undefined}
 */
Matter.Vector.prototype.sub = function(vectorA, vectorB) {};



/** @constructor */
Matter.Vertices = function() {};


/**
 * @param  {*} vertices
 * @param  {*} signed
 * @return {*|undefined}
 */
Matter.Vertices.prototype.area = function(vertices, signed) {};


/**
 * @param  {*} vertices
 * @return {*|undefined}
 */
Matter.Vertices.prototype.centre = function(vertices) {};


/**
 * @param  {*} vertices
 * @param  {*} radius
 * @param  {*} quality
 * @param  {*} qualityMin
 * @param  {*} qualityMax
 * @return {*|undefined}
 */
Matter.Vertices.prototype.chamfer =
    function(vertices, radius, quality, qualityMin, qualityMax) {};


/**
 * @param  {*} vertices
 * @param  {*} point
 * @return {*|undefined}
 */
Matter.Vertices.prototype.contains = function(vertices, point) {};


/**
 * @param  {*} points
 * @param  {*} body
 * @return {*|undefined}
 */
Matter.Vertices.prototype.create = function(points, body) {};


/**
 * @param  {*} path
 * @param  {*} body
 * @return {*|undefined}
 */
Matter.Vertices.prototype.fromPath = function(path, body) {};


/**
 * @param  {*} vertices
 * @param  {*} mass
 * @return {*|undefined}
 */
Matter.Vertices.prototype.inertia = function(vertices, mass) {};


/**
 * @param  {*} vertices
 * @param  {*} angle
 * @param  {*} point
 * @return {*|undefined}
 */
Matter.Vertices.prototype.rotate = function(vertices, angle, point) {};


/**
 * @param  {*} vertices
 * @param  {*} scaleX
 * @param  {*} scaleY
 * @param  {*} point
 * @return {*|undefined}
 */
Matter.Vertices.prototype.scale = function(vertices, scaleX, scaleY, point) {};


/**
 * @param  {*} vertices
 * @param  {*} vector
 * @param  {*} scalar
 * @return {*|undefined}
 */
Matter.Vertices.prototype.translate = function(vertices, vector, scalar) {};



/** @constructor */
Matter.World = function() {};


/**
 * @param  {*} options
 * @return {*|undefined}
 */
Matter.World.prototype.create = function(options) {};
