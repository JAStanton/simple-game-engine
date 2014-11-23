goog.provide('game.core.Entity');

goog.require('game.core.helper');
goog.require('game.core.math.Vector');



/**
 * An entity. This can be a player, enemy, object or anything with a size,
 * position, scale.
 *
 * @param {game.core.math.Vector=} opt_position
 * @param {?number=} opt_w The width of the box.
 * @param {?number=} opt_h The height of the box.
 *
 * @constructor
 */
game.core.Entity = function(opt_position, opt_w, opt_h) {
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
  this.el.classList.add(game.core.Entity.CLASS_NAME);
};


/**
 * All of the entities.
 *
 * @type {Array.<!game.core.Entity>}
 */
game.core.Entity.All = [];


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
 * Initialized the entity.
 */
game.core.Entity.prototype.init = function() {};


/**
 * Adds mixins to this entity.
 *
 * @param {...string} var_args Variable number of mixin names.
 */
game.core.Entity.prototype.mixin = function(var_args) {
  game.core.helper.mixin(this, arguments);
};


/**
 * Sets the dirty bit.
 *
 * @param {boolean} bool True will force the entity to be re-drawn on
 *     {@code #update}.
 */
game.core.Entity.prototype.setDirty = function(bool) {
  this.dirty_ = bool;
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
 */
game.core.Entity.prototype.setScale = function(scale) {
  this.scale_ = scale;
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
 * Iterates through all the active entities.
 *
 * @param {function()} callback
 */
game.core.Entity.forEach = function(callback) {
  _.each(
      _.filter(game.core.Entity.All, function(entity) {
        return entity.isActive();
      }), callback);
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
 * Initializes the entity.
 */
game.core.Entity.prototype.init = function() {};


/**
 * Updates the entity information.
 */
game.core.Entity.prototype.update = function() {};


/**
 * Resolves any collisions if they exist.
 */
game.core.Entity.prototype.resolveCollisions = function() {};


/**
 * Creates and attaches the dom of this entity to the parent provided.
 *
 * @param {Element|HTMLBodyElement|game.core.Entity} parent The parent to attach
 *     this entity to.
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
};


/**
 * Detach element from dom.
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
 */
game.core.Entity.prototype.draw = function() {
  if (!this.isDirty()) return;
  this.setDirty(false);
  var position = this.getPosition();
  var scale = this.getScale();
  game.core.helper.updateTranslate(this.el, position, scale);
};
