goog.provide('game.core.Entity');

goog.require('game.core.helper');
goog.require('game.core.math.Vector');



/**
 * An entity. This can be a player, enemy, object or anything with a size,
 * position, scale.
 *
 * @param {string=} opt_name The entity name, this will be registered in an
 *     index by name.
 * @constructor
 */
game.core.Entity = function(opt_name) {
  /** @type {string} */
  this.name = opt_name || '';
  /** @type {number} */
  this.width = 0;
  /** @type {number} */
  this.height = 0;
  /** @type {number} */
  this.right = 0;
  /** @type {number} */
  this.bottom = 0;
  /** @private {boolean} */
  this.isDirty_ = false;
  /** @private {boolean} */
  this.isActive_ = true;
  /** @private {boolean} */
  this.inDom_ = false;
  /** @private {!game.core.math.Vector} */
  this.position_ = new game.core.math.Vector();
  /** @private {!game.core.math.Vector} */
  this.scale_ = new game.core.math.Vector(1, 1);
  /** @private {string} */
  this.id_ = 'entity-' + game.core.Entity.ID_COUNT++;
  /** @type {!Element} */
  this.el = document.createElement('span');
  this.el.id = this.id_;
  this.addClass(game.core.Entity.CLASS_NAME);

  game.core.Entity.All.push(this);
  if (!_.isUndefined(opt_name)) {
    game.core.Entity.ByName[opt_name] = this;
  }
};


/**
 * All of the entities.
 *
 * @type {Array.<!game.core.Entity>}
 */
game.core.Entity.All = [];


/**
 * All of the entities by name.
 *
 * @type {!Object.<string, !game.core.Entity>}
 */
game.core.Entity.ByName = {};


/**
 * Class name's for all entities.
 *
 * @type {string}
 * @const
 */
game.core.Entity.CLASS_NAME = 'core-entity';


/**
 * Global id count.
 *
 * @type {number}
 */
game.core.Entity.ID_COUNT = 0;


/**
 * Iterates through all the active entities.
 *
 * @param {function()} callback
 * @param {function()=} opt_context
 */
game.core.Entity.forEach = function(callback, opt_context) {
  _.each(_.filter(game.core.Entity.All, function(entity) {
    return entity.isActive();
  }), callback, opt_context);
};


/**
 * Initialized the entity.
 */
game.core.Entity.prototype.init = function() {};


/**
 * Adds a class to the element.
 *
 * @param {string} className
 * @return {!game.core.Entity}
 */
game.core.Entity.prototype.addClass = function(className) {
  this.el.classList.add(className);
  return this;
};


/**
 * Adds mixins to this entity.
 *
 * @param {...string} var_args Variable number of mixin names.
 * @return {!game.core.Entity}
 */
game.core.Entity.prototype.mixin = function(var_args) {
  game.core.helper.mixin(this, arguments);
  return this;
};


/**
 * Sets the dirty bit.
 *
 * @param {boolean} bool True will force the entity to be re-drawn on
 *     {@code #update}.
 * @return {!game.core.Entity}
 */
game.core.Entity.prototype.setDirty = function(bool) {
  this.dirty_ = bool;
  return this;
};


/**
 * Gets the dirty bit.
 *
 * @return {boolean} bool True will force the entity to be re-drawn on
 *     {@code #update}.
 */
game.core.Entity.prototype.isDirty = function() {
  return this.dirty_;
};


/**
 * Returns a copy to the position of the entity.
 *
 * @return {!game.core.math.Vector}
 */
game.core.Entity.prototype.getPosition = function() {
  return this.position_.clone();
};


/**
 * Sets the position and updates the style.
 *
 * @param {game.core.math.Vector} position
 * @return {!game.core.Entity}
 */
game.core.Entity.prototype.setPosition = function(position) {
  this.position_ = position.clone();

  this.right = this.position_.x + this.getWidth();
  this.bottom = this.position_.y + this.getHeight();

  this.setDirty(true);
  return this;
};


/**
 * Gets the scale of the entity.
 *
 * @param {game.core.math.Vector} scale
 * @return {!game.core.Entity}
 */
game.core.Entity.prototype.setScale = function(scale) {
  this.scale_ = scale;
  return this;
};


/**
 * Sets the scale of the entity.
 *
 * @return {1game.core.math.Vector}
 */
game.core.Entity.prototype.getScale = function() {
  return this.scale_;
};


/**
 * For rectangles. Sets the size of the entity.
 *
 * @param {number} width
 * @param {number} height
 * @return {!game.core.Entity}
 */
game.core.Entity.prototype.setSize = function(width, height) {
  this.width = width;
  this.height = height;
  var position = this.getPosition();
  this.right = position.x + this.width;
  this.bottom = position.y + this.height;
  this.el.style.width = this.width + 'px';
  this.el.style.height = this.height + 'px';
  this.setDirty(true);
  return this;
};


/**
 * For rectangles.
 *
 * @return {number}
 */
game.core.Entity.prototype.getWidth = function() {
  return this.width;
};


/**
 * For rectangles.
 *
 * @return {number}
 */
game.core.Entity.prototype.getHeight = function() {
  return this.height;
};


/**
 * Whether the entity is active.
 *
 * @return {boolean}
 */
game.core.Entity.prototype.isActive = function() {
  return this.isActive_;
};


/**
 * Whether the entity is active.
 *
 * @return {boolean}
 */
game.core.Entity.prototype.inDom = function() {
  return this.inDom_;
};


/**
 * Updates the entity information.
 */
game.core.Entity.prototype.update = function() {};


/**
 * Creates and attaches the dom of this entity to the parent provided.
 *
 * @param {Element|HTMLBodyElement|game.core.Entity} parent The parent to attach
 *     this entity to.
 * @return {!game.core.Entity}
 */
game.core.Entity.prototype.attach = function(parent) {
  if (parent instanceof game.core.Entity) {
    parent = parent.el;
  }

  if (!document.getElementById(this.id_)) {
    parent.appendChild(this.el);
    this.inDom_ = true;
  } else {
    console.warn('Attempted to attach dom element multiple times:', this.el);
  }
  this.setupEventListeners();
  return this;
};


/**
 * Detach element from dom.
 * @return {!game.core.Entity}
 */
game.core.Entity.prototype.detach = function() {
  if (this.el.parentNode) {
    this.el.parentNode.removeChild(this.el);
    this.inDom_ = false;
  } else {
    console.warn(
        'Attempted to remove dom element when it has no parent', this.el);
  }
  this.destroyEventListeners();
  return this;
};


/**
 * Sets up event listeners.
 */
game.core.Entity.prototype.setupEventListeners = function() {};


/**
 * Destroys event listeners.
 */
game.core.Entity.prototype.destroyEventListeners = function() {};


/**
 * This is being called from game.mixins.Rectangle, if there is a rect to
 * update it will.
 * @return {!game.core.Entity}
 */
game.core.Entity.prototype.draw = function() {
  if (!this.isDirty()) return;
  this.setDirty(false);
  var position = this.getPosition();
  var scale = this.getScale();
  game.core.helper.updateTranslate(this.el, position, scale);
  return this;
};
