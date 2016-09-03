/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js/katzespiel
 */

/**
 * Handy class for array's row and column pairs.
 *
 */
 function Pair(col = null, row = null) {
	this.col = col;
	this.row = row;
}

Game.Board = {
	WIDTH: 4,
	HEIGHT: 4,
	PIXEL_WIDTH: 480,
	PIXEL_HEIGHT: 480,
	SPRITE_WIDTH: null,
	SPRITE_HEIGHT: null,
	BOARD_X: 30,
	BOARD_Y: 30,
	SINGLE_CAT_SCORE: 10,
	
	/**
	 * Level's name.
	 *
	 * @var String
	 */
	name: null,
	
	/**
	 * Player's current score.
	 *
	 * @var Integer
	 */
	score: null,
	
	/**
	 * The limit of cats that can left on the board after finished level.
	 *
	 * @var Integer
	 */
	itemsLeftLimit: null,
	
	/**
	 * Array of game field cells.
	 *
	 * @var Array
	 */
	field: null,
	
	/**
	 * Highlight animation management object.
	 *
	 */
	Highlight: {
		items: null,
		cellType: null,
		animation: {
			verticalDelta: 0,
			direction: 1,
			maxAmplitude: 1,
			reset: function() {
				Game.Board.Highlight.animation.verticalDelta = 0;
				Game.Board.Highlight.animation.direction = Math.abs(Game.Board.Highlight.animation.direction);
			}
		},
		animate: function(elapsed) {
			if(Math.abs(Game.Board.Highlight.animation.verticalDelta + Game.Board.Highlight.animation.direction) > Game.Board.Highlight.animation.maxAmplitude) {
				Game.Board.Highlight.animation.direction = -Game.Board.Highlight.animation.direction;
			}
			
			Game.Board.Highlight.animation.verticalDelta += Game.Board.Highlight.animation.direction;
		}
	},
	
	/**
	 * Whether given column-row pair exists on the game board.
	 * 
	 * @param Integer
	 * @param Integer
	 * @param Array
	 * @returns Boolean	 
	 */
	findPair: function(col, row, arr) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].col == col && arr[i].row == row) {
				return true;
			}
		}
		
		return false;
	},
	
	/**
	 * Determines whether the column-row pair is inside the game board and the cell is not empty.
	 * 
	 * @param Integer
	 * @param Integer
	 * @returns Boolean
	 */
	check: function(col, row) {
		return !(col < 0 || row < 0 || col > Game.Board.WIDTH - 1 || row > Game.Board.HEIGHT - 1 || !Game.Board.field[col][row]);
	},
	
	/**
	 * Search for the same neighbours (cell's value) looking left, UP and right.
	 * Looking for cells that have not yet been checked.
	 *
	 * @param Integer	Column to begin with.
	 * @param Integer	Row to begin with.
	 * @param Object	Cell's value we are looking for.
	 * @param Array		Array of {col: value, row: value} objects which the method will ignore.
	 * @returns Array	Array of {col: value, row: value} objects.
	 */
	up: function(col, row, handle, ignore) {
		var hCol = col;
		var hRow = row - 1;
		
		if(Game.Board.findPair(hCol, hRow, ignore)) {
			return new Array();
		}
		
		if(!Game.Board.check(hCol, hRow)) {
			return new Array();
		}
		
		ignore.push(new Pair(hCol, hRow));
		
		if(Game.Board.field[hCol][hRow].type == handle) {
			var result = new Array(new Pair(hCol, hRow));
			result = result.concat(Game.Board.up(hCol, hRow, handle, ignore));
			result = result.concat(Game.Board.right(hCol, hRow, handle, ignore));
			result = result.concat(Game.Board.left(hCol, hRow, handle, ignore));
			
			return result;
		}
		else {
			return new Array();
		}
	},
	
	/**
	 * Search for the same neighbours (cell's value) looking left, DOWN and right.
	 * Looking for cells that have not yet been checked.
	 *
	 * @param Integer	Column to begin with.
	 * @param Integer	Row to begin with.
	 * @param Object	Cell's value we are looking for.
	 * @param Array		Array of {col: value, row: value} objects which the method will ignore.
	 * @returns Array	Array of {col: value, row: value} objects.
	 */
	down: function(col, row, handle, ignore) {
		var hCol = col;
		var hRow = row + 1;
		
		if(Game.Board.findPair(hCol, hRow, ignore)) {
			return new Array();
		}
		
		if(!Game.Board.check(hCol, hRow)) {
			return new Array();
		}
		
		ignore.push(new Pair(hCol, hRow));
		
		if(Game.Board.field[hCol][hRow].type == handle) {
			var result = new Array(new Pair(hCol, hRow));
			result = result.concat(Game.Board.down(hCol, hRow, handle, ignore));
			result = result.concat(Game.Board.left(hCol, hRow, handle, ignore));
			result = result.concat(Game.Board.right(hCol, hRow, handle, ignore));
			
			return result;
		}
		else {
			return new Array();
		}
	},
	
	/**
	 * Search for the same neighbours (cell's value) looking up, RIGHT and down.
	 * Looking for cells that have not yet been checked.
	 *
	 * @param Integer	Column to begin with.
	 * @param Integer	Row to begin with.
	 * @param Object	Cell's value we are looking for.
	 * @param Array		Array of {col: value, row: value} objects which the method will ignore.
	 * @returns Array	Array of {col: value, row: value} objects.
	 */
	right: function(col, row, handle, ignore) {
		var hCol = col + 1;
		var hRow = row;
		
		if(Game.Board.findPair(hCol, hRow, ignore)) {
			return new Array();
		}
		
		if(!Game.Board.check(hCol, hRow)) {
			return new Array();
		}
		
		ignore.push(new Pair(hCol, hRow));
		
		if(Game.Board.field[hCol][hRow].type == handle) {
			var result = new Array(new Pair(hCol, hRow));
			result = result.concat(Game.Board.up(hCol, hRow, handle, ignore));
			result = result.concat(Game.Board.right(hCol, hRow, handle, ignore));
			result = result.concat(Game.Board.down(hCol, hRow, handle, ignore));
			
			return result;
		}
		else {
			return new Array();
		}
	},
	
	/**
	 * Search for the same neighbours (cell's value) looking up, LEFT and down.
	 * Looking for cells that have not yet been checked.
	 *
	 * @param Integer	Column to begin with.
	 * @param Integer	Row to begin with.
	 * @param Object	Cell's value we are looking for.
	 * @param Array		Array of {col: value, row: value} objects which the method will ignore.
	 * @returns Array	Array of {col: value, row: value} objects.
	 */
	left: function(col, row, handle, ignore) {
		var hCol = col - 1;
		var hRow = row;
		
		if(Game.Board.findPair(hCol, hRow, ignore)) {
			return new Array();
		}
		
		if(!Game.Board.check(hCol, hRow)) {
			return new Array();
		}
		
		ignore.push(new Pair(hCol, hRow));
		
		if(Game.Board.field[hCol][hRow].type == handle) {
			var result = new Array(new Pair(hCol, hRow));
			result = result.concat(Game.Board.up(hCol, hRow, handle, ignore));
			result = result.concat(Game.Board.left(hCol, hRow, handle, ignore));
			result = result.concat(Game.Board.down(hCol, hRow, handle, ignore));
			
			return result;
		}
		else {
			return new Array();
		}
	},
	
	/**
	 * Search for the same neighbours (cell's value) of the given cell.
	 *
	 * @param Integer	Column to begin with.
	 * @param Integer	Row to begin with.
	 * @param Object	Cell's value we are looking for.
	 * @returns Array	Array of {col: value, row: value} objects.
	 */
	lookAround: function(col, row, handle) {
		var looked = new Array(new Pair(col, row));
		var result = new Array(new Pair(col, row));
		
		result = result.concat(Game.Board.up(col, row, handle, looked));
		result = result.concat(Game.Board.down(col, row, handle, looked));
		result = result.concat(Game.Board.left(col, row, handle, looked));
		result = result.concat(Game.Board.right(col, row, handle, looked));
		
		return result;
	},
	
	/**
	 * Remove given game field array elements.
	 *
	 * @param Array 
	 * @param Boolean Whether to fire Game.Board.collapse function after removing
	 * @returns Void 
	 */
	destroy: function(items, collapse = true) {
		for(var i = 0; i < items.length; i++) {
			Game.Board.field[items[i].col][items[i].row] = null;
		}
		
		if(collapse) {
			Game.Board.collapse();
		}
	},
	
	/**
	 * Installs and fires gravity for game entities that's left.
	 * Gravity works in two dimensions: to the bottom and to the right.
	 *
	 * @returns Void
	 */
	collapse: function() {
		for(var i = 0; i < Game.Board.WIDTH; i++) {
			var jActualIterations = 0;
			var emptyColumnCheckSum = 0;
			for(var j = Game.Board.HEIGHT - 1; j >= 0; j--) {
				if(jActualIterations > Game.Board.HEIGHT - 1) {
					break;
				}
				
				if(Game.Board.field[i][j] == null || Game.Board.field[i][j] == 0) {
					Game.Board.field[i].splice(j, 1);
					Game.Board.field[i].splice(0, 0, 0);
					
					j += 1;
				}
				else {
					Game.Board.field[i][j].row = j;
				}
				
				if(Game.Board.field[i][j] != null && Game.Board.field[i][j] != 0) {
					emptyColumnCheckSum += 1;
				}
				
				jActualIterations++;
			}
			
			if(emptyColumnCheckSum < 1) {
				Game.Board.field.splice(i, 1);
				Game.Board.field.splice(0, 0, new Array(Game.Board.HEIGHT).fill(0));
			}
			
			emptyColumnCheckSum = 0;
		}
		
		for(var i = 0; i < Game.Board.WIDTH; i++) {
			for(var j = 0; j < Game.Board.HEIGHT; j++) {
				if(Game.Board.field[i][j] == null || Game.Board.field[i][j] == 0) {
					continue;
				}
				else {
					Game.Board.field[i][j].col = i;
				}
			}
		}
	},
	
	/**
	 * Checks the game status, which means:
	 * - how many entities are left on the game field,
	 * - is there a possibility to make next move (at least two same typed entities in one row or a column).
	 *
	 * @param Object A reference to {(Boolean) roundOver, (Integer) itemsLeft} object
	 * @returns Boolean	Whether the round is over
	 */
	lookForGameStatus: function(status) {
		var roundOver = true;
		var itemsLeft = 0;
		
		for(var i = 0; i < Game.Board.WIDTH; i++) {
			var lastItemType = null;
			for(var j = 0; j < Game.Board.HEIGHT; j++) {
				var current = Game.Board.field[i][j];
				if(current == null || current == 0) {
					current = null;
				}
				else {
					itemsLeft += 1;
				}
				
				if(lastItemType != null && current != null && current.type == lastItemType.type) {
					roundOver = false;
				}
				else if(current != null) {
					lastItemType = {type: current.type};
				}
				else {
					lastItemType = null;
				}
			}
		}
		
		if(roundOver) {
			for(var j = 0; j < Game.Board.HEIGHT; j++) {
				var lastItemType = null;
				for(var i = 0; i < Game.Board.WIDTH; i++) { 
					var current = Game.Board.field[i][j];
					if(current == null || current == 0) {
						current = null;
					}
					
					if(lastItemType != null && current != null && current.type == lastItemType.type) {
						roundOver = false;
					}
					else if(current != null) {
						lastItemType = {type: current.type};
					}
					else {
						lastItemType = null;
					}
				}
			}
		}
		
		status.itemsLeft = itemsLeft;
		status.roundOver = roundOver;
		
		return roundOver;
	},
	
	/**
	 * Ends current level and starts another.
	 *
	 * @param Object Level object that will be set
	 * @returns Void
	 */
	reset: function(level) {
		Game.Board.field = new Array(level.board.width);
		for(var i = 0; i < level.board.width; i++) {
			Game.Board.field[i] = new Array(level.board.height);
		}
		
		var randomizedKitties = new Array();

		Game.Board.WIDTH = level.board.width;
		Game.Board.HEIGHT = level.board.height;
		Game.Board.SPRITE_WIDTH = Game.Board.PIXEL_WIDTH / level.board.width;
		Game.Board.SPRITE_HEIGHT = Game.Board.PIXEL_HEIGHT / level.board.height;
		
		Game.Board.name = level.name; console.log(Game.Board.name);
		
		for(var i = 0; i < level.board.width; i++) {
			for(var j = 0; j < level.board.height; j++) {
				var kitty = new Game.Board.Cat();
				kitty.type = Game.Utils.arrayRand(level.types);
				kitty.col = i;
				kitty.row = j;
				kitty.x = Game.Board.BOARD_X + i * Game.Board.SPRITE_WIDTH;
				kitty.y = Game.Board.BOARD_Y + j * Game.Board.SPRITE_HEIGHT;
				
				Game.Board.field[i][j] = kitty;
			}
		}
		
		Game.Hud.values.itemsLeftAmount = Game.Board.WIDTH * Game.Board.HEIGHT;
		Game.Hud.values.allItemsAmount = Game.Board.WIDTH * Game.Board.HEIGHT;
		
		if(Game.Board.itemsLeftLimit > Game.Hud.values.allItemsAmount) {
			Game.Board.itemsLeftLimit = Game.Hud.values.allItemsAmount;
		}
		
		Game.Board.Highlight.animation.maxAmplitude = 4 * Game.Board.SPRITE_HEIGHT/100;
		Game.Board.Highlight.animation.direction = 0.4 * Game.Board.SPRITE_HEIGHT/100;
	},
	
	/**
	 * Visually highlight game entities (usually fired by mouse move event) and start their animation.
	 * 
	 * @param Boolean
	 * @param Array 	Elements to be highlighted 
	 * @param String	This param is here to prevent restarting of the animation with every mouse move
	 * @returns Void
	 */
	highlightItems: function(bShow, items = null, highlightedType = null) {
		if(bShow) {
			if(highlightedType != Game.Board.Highlight.cellType) {
				Game.Sound.play(Game.values.cats[highlightedType].sounds.mouseOver);
				Game.Board.Highlight.animation.reset();
				Game.Board.Highlight.cellType = highlightedType;
			}
			
			Game.Board.Highlight.items = items;
		}
		else {
			Game.Board.Highlight.animation.reset();
			Game.Board.Highlight.cellType = null;
			Game.Board.Highlight.items = [];
		}
	},
	
	/**
	 * Count and add points for removed field entities.
	 * TODO: A strategy pattern here?
	 * 
	 * @param Array
	 * @returns Void
	 */
	countPoints: function(items) {
		Game.Board.score += Game.Board.SINGLE_CAT_SCORE * items.length;
	},
	
	/**
	 * Get Game.Board.field array element by window coordinates.
	 *
	 * @param Integer 
	 * @param Integer 
	 * @returns Object
	 */
	findByCoords: function(x, y) {
		var adjX = x - Game.Board.BOARD_X;
		var adjY = y - Game.Board.BOARD_Y;
		
		var col = Math.floor(adjX / Game.Board.SPRITE_WIDTH);
		var row = Math.floor(adjY / Game.Board.SPRITE_HEIGHT);
		
		if(Game.Board.check(col, row)) {
			return Game.Board.field[col][row];
		}
		else {
			return null;
		}
	},
	
	/**
	 * Add extra limit of cats that can stay on the game field.
	 *
	 * @param Integer	Amount of cats left on the field
	 * @param Integer	Limit before level started
	 * @returns Integer	Extra limit added
	 */
	addNewCatsLimit: function(leftAmount, leftLimit) {
		var extraBalls = 0;
		
		Game.Board.itemsLeftLimit = leftLimit - leftAmount;
		
		// Premium limit for emptyfying whole game field
		var premiumPoints = 0;
		if(leftAmount == 0) {
			premiumPoints = Game.Board.HEIGHT;
		}
		
		extraBalls = Math.round(Game.Board.itemsLeftLimit * 0.5) + premiumPoints;
		
		var maxLimit = Game.Board.HEIGHT * Game.Board.WIDTH;
		if(Game.Board.itemsLeftLimit + extraBalls > maxLimit) {
			extraBalls = maxLimit - Game.Board.itemsLeftLimit;
		}
		
		Game.Board.itemsLeftLimit += extraBalls;
		
		return extraBalls;
	}
};
