goog.provide('game.core.Board');

goog.require('game.core.Entity');
goog.require('game.core.helper');



/**
 * Game board singleton class.
 *
 * @constructor
 * @extends {Game.Entity}
 */
game.core.Board = function() {
  if (game.core.Board.prototype._singletonInstance) {
    return game.core.Board.prototype._singletonInstance;
  }
  game.core.helper.mixin(this, 'shape');
  game.core.Board.prototype._singletonInstance = this;
  game.core.Board.base(this, 'constructor');
  this.el.classList.add(game.core.Board.CLASS_NAME);
};
game.core.helper.inherit(game.core.Board, game.core.Entity);


/**
 * @type {String}
 */
game.core.Board.CLASS_NAME = 'board';
