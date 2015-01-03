goog.provide('engine.core.Root');

goog.require('engine.core.Entity');
goog.require('engine.core.helper');



/**
 * Game board singleton class.
 *
 * @constructor
 * @extends {Game.Entity}
 */
engine.core.Root = function() {
  if (engine.core.Root.prototype._singletonInstance) {
    return engine.core.Root.prototype._singletonInstance;
  }
  engine.core.helper.mixin(this, 'shape');
  engine.core.Root.prototype._singletonInstance = this;
  engine.core.Root.base(this, 'constructor');
  this.el.classList.add(engine.core.Root.CLASS_NAME);
};
engine.core.helper.inherit(engine.core.Root, engine.core.Entity);


/**
 * @type {String}
 */
engine.core.Root.CLASS_NAME = 'root';
