/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js/katzespiel
 */

var Game = Game || {};

Game.debugMode = true;

Game.canvas = null;
Game.paused = false;

/**
 * Global current level, determines by index of Game.levels element.
 * We start with -1 because moving to next level (even the first) increases this value by 1.
 *
 * @var Integer
 */
Game.currentLevel = -1;

/**
 * Game status management functions.
 *
 * @return Void
 */
Game.play = function() {
	Game.paused = false;
}

Game.pause = function() {
	Game.paused = true;
}

Game.togglePause = function() {
	Game.paused = !Game.paused;
}

/**
 * The game loop function responsible for updating and drawing the game field.
 *
 * @param Integer Last time (in miliseconds) this function was fired.
 * @returns Void
 */
Game.loopFunction = function(lastTime) {
	var thisTime = new Date().getTime();
	var elapsed = thisTime - lastTime;
	
	Game.update(elapsed);
	Game.draw(elapsed);
	
	window.requestAnimationFrame(function() {
		Game.loopFunction(thisTime);
	});
}

/**
 * Game status update function.
 * Do with that whatever you want.
 *
 * @param Integer Time elapsed in miliseconds
 * @returns Void
 */
Game.update = function(elapsed) {
	
}

/**
 * The draw function.
 * TODO: improve the code quality here, now is pretty ugly.
 *
 * @param Integer Time elapsed in miliseconds
 * @returns Void
 */
Game.draw = function(elapsed) {
	Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
	
	var bitmaps = {
		board: document.getElementById("board"),
		field: document.getElementById("field"),
		kotNaPunktach: document.getElementById("kotNaPunktach"),
		kotKursor: document.getElementById("kotKursor"),
		blackCoat: document.getElementById("blackCoat"),
		dialog: document.getElementById("dialog"),
		cats: {
			kitty: document.getElementById("cats_kitty"),
			sweaty: document.getElementById("cats_sweaty"),
			pussy: document.getElementById("cats_pussy"),
			purrty: document.getElementById("cats_purrty"),
			white: document.getElementById("cats_white"),
			purple: document.getElementById("cats_purple"),
			orange: document.getElementById("cats_orange")
		},
		highlight: document.getElementById("highlight")
	};
	
	Game.context.drawImage(bitmaps.field, Game.Board.BOARD_X, Game.Board.BOARD_Y);
	
	if(Game.Board.Highlight.items != null) {
		Game.Board.Highlight.animate();
		for(var i = 0; i < Game.Board.Highlight.items.length; i++) {
			var x = Game.Board.BOARD_X + Game.Board.Highlight.items[i].col * Game.Board.SPRITE_WIDTH;
			var y = Game.Board.BOARD_Y + Game.Board.Highlight.items[i].row * Game.Board.SPRITE_HEIGHT + Game.Board.Highlight.animation.verticalDelta;
			
			Game.context.drawImage(bitmaps.highlight, x, y, Game.Board.SPRITE_WIDTH, Game.Board.SPRITE_HEIGHT);
		}
	}
	
	for(var i = 0; i < Game.Board.WIDTH; i++) {
		for(var j = 0; j < Game.Board.HEIGHT; j++) {
			var cat = Game.Board.field[i][j];
			if(!cat)
				continue;
			
			var x = Game.Board.BOARD_X + i * Game.Board.SPRITE_WIDTH;
			var y = Game.Board.BOARD_Y + j * Game.Board.SPRITE_HEIGHT;
			
			Game.context.drawImage(bitmaps.cats[cat.type], x, y, Game.Board.SPRITE_WIDTH, Game.Board.SPRITE_HEIGHT);
		}
	}
	
	Game.context.drawImage(bitmaps.board, 0, 0);

	
	var textToDraw = Game.strings.hud.level + " " + (Game.currentLevel + 1);
	Game.context.font = "24px Orange LET Plain";
	var textWidth = Game.context.measureText(textToDraw.toString()).width;
	
	
	Game.context.fillStyle = '#FFFFFF';
	Game.context.fillText(textToDraw, 705 - (textWidth/2), 51);
	
	var textToDraw2 = Game.Board.name;
	Game.context.font = "36px Orange LET Plain";
	var textWidth2 = Game.context.measureText(textToDraw2.toString()).width;
	
	
	Game.context.fillStyle = '#FFFFFF';
	Game.context.fillText(textToDraw2, 705 - (textWidth2/2), 91);
	
	
	var textToDraw3 = Game.Board.score.toString();
	Game.context.font = "48px Orange LET Plain";
	var textWidth3 = Game.context.measureText(textToDraw3.toString()).width;
	Game.context.fillStyle = '#FFFFFF';
	Game.context.fillText(textToDraw3, 705 - (textWidth3/2), 220);
	
	var textToDraw3 = Game.strings.hud.points;
	Game.context.font = "18px Orange LET Plain";
	var textWidth3 = Game.context.measureText(textToDraw3.toString()).width;
	Game.context.fillStyle = '#FFFFFF';
	Game.context.fillText(textToDraw3, 705 - (textWidth3/2), 240);
	
	Game.context.drawImage(bitmaps.kotNaPunktach, 675, 127);
	
	
	Game.context.beginPath();
	Game.context.rect(540, 300, 330, 20);
	Game.context.strokeStyle = "#202020";
	Game.context.lineWidth = 2;
	Game.context.stroke();
	
	var barMaxWidth = 330;
	var firstWidth = barMaxWidth * (Game.Hud.values.itemsLeftAmount / Game.Hud.values.allItemsAmount)
	
	Game.context.fillStyle = "#21B521";
	Game.context.fillRect(540, 300, firstWidth, 20);
	
	Game.context.fillStyle = "#FFFFFF";
	Game.context.fillRect(540 + firstWidth, 300, barMaxWidth - firstWidth, 20);
	
	Game.context.font = "18px Orange LET Plain";
	Game.context.fillStyle = '#FFFFFF';
	Game.context.fillText(Game.strings.hud.left, 540, 295);
	Game.context.fillText(Game.Hud.values.itemsLeftAmount.toString(), 850, 295);
	
	Game.context.drawImage(bitmaps.kotKursor, 540 + firstWidth - 18.5, 291);
	
	
	Game.context.beginPath();
	Game.context.rect(540, 350, 330, 20);
	Game.context.strokeStyle = "#202020";
	Game.context.lineWidth = 2;
	Game.context.stroke();
	
	var barMaxWidth = 330;
	var firstWidth = barMaxWidth * (Game.Board.itemsLeftLimit / Game.Hud.values.allItemsAmount);
	
	Game.context.fillStyle = "#21B521";
	Game.context.fillRect(540, 350, firstWidth, 20);
	
	Game.context.fillStyle = "#FFFFFF";
	Game.context.fillRect(540 + firstWidth, 350, barMaxWidth - firstWidth, 20);
	
	Game.context.font = "18px Orange LET Plain";
	Game.context.fillStyle = '#FFFFFF';
	Game.context.fillText(Game.strings.hud.canLeft, 540, 345);
	Game.context.fillText(Game.Board.itemsLeftLimit.toString(), 850, 345);
	
	Game.context.drawImage(bitmaps.kotKursor, 540 + firstWidth - 18.5, 341);

	if(Game.Dialog.open) {
		Game.context.drawImage(bitmaps.blackCoat, 0, 0);
		Game.context.drawImage(bitmaps.dialog, 0, 0);
		
		Game.context.font = "24px Orange LET Plain";
		Game.context.fillStyle = '#FFFFFF';
		var lineSpace = 30;
		for(var i = 0; i < Game.Dialog.lines.length; i++) {
			Game.context.fillText(Game.Dialog.lines[i], 220, 255 + lineSpace * i);
		}
		
		var startPossition = 700;
		for(var i = 0; i < Game.Dialog.buttons.length; i++) {
			var text = Game.Dialog.buttons[i].value;
			var textLength = Game.context.measureText(text.toString()).width;
			
			if(Game.Dialog.buttons[i].highlighted) {
				Game.context.fillStyle = '#FFFC00';
			}
			else {
				Game.context.fillStyle = '#FFFFFF';
			}
			
			Game.context.fillText(text, startPossition - textLength, 360);
			startPossition -= (20 + textLength);
		}
	}
}

/**
 * Utils namespace.
 *
 * TODO: I think it should be moved to an another file.
 */
Game.Utils = {
	/**
	 * Selects random element of an array.
	 *
	 * @param Array
	 * @returns Mixed
	 */
	arrayRand: function(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}
}

/**
 * Fired after finished and not lost game level.
 *
 * @returns Boolean
 */
Game.hasMoreLevels = function() {
	return (Game.levels.length - Game.currentLevel - 1) > 0;
};
	
/**
 * Get the next level (given by index Game.currentLevel + 1) object.
 *
 * @returns Object
 */
Game.getNextLevel = function() {
	var nextLevelID = Game.currentLevel + 1;
	if(nextLevelID > Game.levels.length) {
		console.log("No level with id '" + nextLevelID + "' speciefied.");
		return null;
	}
	else {
		Game.currentLevel = nextLevelID;
		return Game.levels[nextLevelID];
	}
};

/**
 * This function is actually deprecated in this version.
 *
 * @returns Void
 */
Game.startRound = function() {
	console.log(Game.Board);
}

/**
 * Prepeares and fires the game field with first level from Game.levels array.
 *
 * @returns Void
 */
Game.startGame = function() {
	Game.currentLevel = -1;
	
	var nextLevel = Game.getNextLevel();
	Game.Board.reset(nextLevel);
	
	Game.Board.score = 0;
	Game.Board.itemsLeftLimit = Math.round(Game.Board.WIDTH * Game.Board.HEIGHT / 3);
		
	Game.startRound();
	
	Game.Sound.playSoundtrack(nextLevel.sounds.soundtrack);
}

/**
 * Fires events listeners for game entities (cats) and dialog windows (see more in game.dialog.js).
 *
 * @returns Void
 */
Game.startEventListeners = function() {
	Game.canvas.addEventListener('click', function(e) {
		var x = e.pageX - Game.canvas.offsetLeft;
		var y = e.pageY - Game.canvas.offsetTop;
		
		Game.Listeners.catListener.mouseClick(x, y);
	});
	
	canvas.addEventListener('mousemove', function(e) {
		var x = e.pageX - Game.canvas.offsetLeft;
		var y = e.pageY - Game.canvas.offsetTop;
		
		Game.Listeners.catListener.mouseMove(x, y);
	});
}

window.addEventListener('load', function() {
	if(Game.levels == undefined || Game.values == undefined) {
		//document.write("Files game.levels.js and game.values.js are required.");
	}
	
	Game.canvas = document.getElementById('canvas');
	Game.context = Game.canvas.getContext('2d');
	
	Game.Sound.fire();
	
	Game.startGame();
	
	Game.startEventListeners();
	
	Game.loopFunction(new Date().getTime());
	
	if(!Game.debugMode) {
		console.log = function() {};
	}
});