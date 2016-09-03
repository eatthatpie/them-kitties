/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js/katzespiel
 */

/**
 * Events for dialog windows are fired here.
 *
 * TODO: Create another listener only for dialog events.
 */
Game.Listeners = {
	catListener: {
		mouseClick: function(x, y) {
			if(Game.Dialog.open) {
				Game.Dialog.mouseClick(x, y);
			}
			
			if(!(x < Game.Board.BOARD_X || x > Game.Board.BOARD_X + Game.Board.PIXEL_WIDTH
				|| y < Game.Board.BOARD_Y || y > Game.Board.BOARD_Y + Game.Board.PIXEL_HEIGHT)
					&& !Game.paused) {
				
				var cat = Game.Board.findByCoords(x, y); console.log(cat);
				if(cat) {
					cat.mouseClick();
				}
			}
			else {
				console.log("You missed the game field");
			}	
		},
		mouseMove: function(x, y) {
			if(Game.Dialog.open) {
				Game.Dialog.mouseMove(x, y);
			}
			
			if(!(x < Game.Board.BOARD_X || x > Game.Board.BOARD_X + Game.Board.PIXEL_WIDTH
				|| y < Game.Board.BOARD_Y || y > Game.Board.BOARD_Y + Game.Board.PIXEL_HEIGHT) 
					&& !Game.paused) {
			
				var cat = Game.Board.findByCoords(x, y);
				if(cat) {
					cat.mouseOver();
				}
			}
		}
	}
};
