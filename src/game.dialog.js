/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js-katzespiel
 */

Game.Dialog = {
	/**
	* Determines whether dialog is opened. If so, usually the game will be paused.
	*
	* @var Boolean
	*/
	open: false,
	
	/**
	* An array of lines of text displayed on dialog window.
	*
	* @var Array
	*/	
	lines: null,
	
	/**
	* An array of buttons objects displayed on dialog window.
	*
	* @var Array
	*/	
	buttons: null,
	
	/**
	* Fires the dialog window.
	*
	* @param Array {lines, buttons} Text lines and buttons of the dialog window.
	* @returns Void
	*/
	show: function(params) {
		Game.Dialog.lines = params.lines;
		Game.Dialog.buttons = params.buttons;
		Game.Dialog.open = true;
	},
	
	/**
	* Closes the dialog window.
	*
	* @returns Void
	*/
	// What about memory leak here?
	close: function() {
		Game.Dialog.lines = null;
		Game.Dialog.buttons = null;
		Game.Dialog.open = false;
	}
};

/**
 * A dialog button class.
 *
 */
Game.Dialog.Button = function(value, callback) {
	/**
	 * Whether mouse cursor is over it or not.
	 *
	 * @var Boolean
	 */
	this.highlighted = false;
	
	/**
	 * Button's text.
	 *
	 * @var String
	 */
	this.value = value;
	
	/**
	 * OnClick function fired by event listener.
	 *
	 * @returns Void
	 */
	this.onClick = function() {
		callback();
	}
}

Game.Dialog.mouseMove = function(x, y) {
	if(!Game.Dialog.open) {
		return;
	}
	
	var right = 700;
	for(var i = 0; i < Game.Dialog.buttons.length; i++) {
		var textLength = Game.context.measureText(Game.Dialog.buttons[i].value.toString()).width;
		var textHeight = Game.context.measureText('M').width;
	
		var btnRight = right;
		var btnLeft = btnRight - textLength;
		var btnTop = 360 - textHeight;
		var btnBottom = 360;
		
		console.log(btnRight + ' ' + btnLeft + ' ' + btnTop + ' ' + btnBottom);
		console.log(x + ' ' + y);
		
		if(btnLeft <= x && x <= btnRight && btnTop <= y && y <= btnBottom) {
			Game.Dialog.buttons[i].highlighted = true;
		}
		else {
			Game.Dialog.buttons[i].highlighted = false;
		}
		
		right -= (20 + textLength);
	}
}

Game.Dialog.mouseClick = function(x, y) {
	if(!Game.Dialog.open) {
		return;
	}
	
	var right = 700;
	for(var i = 0; i < Game.Dialog.buttons.length; i++) {
		var textLength = Game.context.measureText(Game.Dialog.buttons[i].value.toString()).width;
		var textHeight = Game.context.measureText('M').width;
	
		var btnRight = right;
		var btnLeft = btnRight - textLength;
		var btnTop = 360 - textHeight;
		var btnBottom = 360;
		
		console.log(btnRight + ' ' + btnLeft + ' ' + btnTop + ' ' + btnBottom);
		console.log(x + ' ' + y);
		
		if(btnLeft <= x && x <= btnRight && btnTop <= y && y <= btnBottom) {
			Game.Dialog.buttons[i].onClick();
		}
		
		right -= (20 + textLength);
	}
}