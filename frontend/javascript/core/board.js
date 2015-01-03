goog.provide('engine.core.Board');

goog.require('engine.core.Entity');
goog.require('engine.core.helper');



/**
 * Game board singleton class.
 *
 * @constructor
 * @extends {Game.Entity}
 */
engine.core.Board = function() {
  if (engine.core.Board.prototype._singletonInstance) {
    return engine.core.Board.prototype._singletonInstance;
  }
  engine.core.helper.mixin(this, 'shape');
  engine.core.Board.prototype._singletonInstance = this;
  engine.core.Board.base(this, 'constructor');
  this.el.classList.add(engine.core.Board.CLASS_NAME);
};
engine.core.helper.inherit(engine.core.Board, engine.core.Entity);


/**
 * @type {String}
 */
engine.core.Board.CLASS_NAME = 'board';
