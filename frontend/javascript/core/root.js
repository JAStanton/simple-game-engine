goog.provide('game.core.Root');

goog.require('game.core.Entity');
goog.require('game.core.helper');



/**
 * Game board singleton class.
 *
 * @constructor
 * @extends {Game.Entity}
 */
game.core.Root = function() {
  if (game.core.Root.prototype._singletonInstance) {
    return game.core.Root.prototype._singletonInstance;
  }
  game.core.helper.mixin(this, 'shape');
  game.core.Root.prototype._singletonInstance = this;
  game.core.Root.base(this, 'constructor');
  this.el.classList.add(game.core.Root.CLASS_NAME);
};
game.core.helper.inherit(game.core.Root, game.core.Entity);


/**
 * @type {String}
 */
game.core.Root.CLASS_NAME = 'root';
