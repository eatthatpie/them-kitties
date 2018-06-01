/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js-katzespiel
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
});;/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js-katzespiel
 */

Game.levels = [
	{
		level: 1,
		name: 'PRRR I WATCH U SLEEP',
		board: {
			width: 4,
			height: 4
		},
		types: ['kitty', 'sweaty'],
		sounds: {
			soundtrack: 'lvl1',
		}
	},
	{
		level: 2,
		name: 'KITTY IS HUNGRY',
		board: {
			width: 6,
			height: 6
		},
		types: ['kitty', 'sweaty'],
		sounds: {
			soundtrack: 'lvl1',
		}
	},
	{
		level: 3,
		name: 'I\'LL KILL YOU',
		board: {
			width: 6,
			height: 6
		},
		types: ['kitty', 'sweaty', 'pussy'],
		sounds: {
			soundtrack: 'highway',
		}
	},
	{
		level: 4,
		name: 'GIMME SOME FOOD',
		board: {
			width: 8,
			height: 8
		},
		types: ['kitty', 'sweaty', 'pussy'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 5,
		name: 'I\'M SERIOUS',
		board: {
			width: 10,
			height: 10
		},
		types: ['kitty', 'sweaty', 'pussy'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 6,
		name: 'DON\'T P*SS ME OFF',
		board: {
			width: 12,
			height: 12
		},
		types: ['kitty', 'sweaty', 'pussy'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 7,
		name: 'I HAVE A PLAN HUMAN',
		board: {
			width: 12,
			height: 12
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 8,
		name: 'YOU DON\'T BELIEVE ME',
		board: {
			width: 14,
			height: 14
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 9,
		name: 'WILL PURRR FOR FOOD',
		board: {
			width: 16,
			height: 16
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 10,
		name: 'TIME FOR MY REVANGE',
		board: {
			width: 18,
			height: 18
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 11,
		name: 'YU TINK YO FUNY',
		board: {
			width: 20,
			height: 20
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 12,
		name: 'I\'M TOP MODEL',
		board: {
			width: 22,
			height: 22
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 13,
		name: 'ADORE ME',
		board: {
			width: 24,
			height: 24
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 14,
		name: 'THIS STORY IS MINE',
		board: {
			width: 26,
			height: 26
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 15,
		name: 'PLEASE TOUCH ME',
		board: {
			width: 28,
			height: 28
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 16,
		name: 'HARD GAME ISN\'T IT',
		board: {
			width: 28,
			height: 28
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 17,
		name: 'FFFFF...OR YOU',
		board: {
			width: 30,
			height: 30
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 18,
		name: 'I MUST TO WORK',
		board: {
			width: 32,
			height: 32
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 19,
		name: 'MY LIFE IS A LIE',
		board: {
			width: 34,
			height: 34
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 20,
		name: 'WHAT IS MY NAME',
		board: {
			width: 36,
			height: 36
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 21,
		name: 'SAY MY NAME',
		board: {
			width: 38,
			height: 38
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 22,
		name: 'HEAR THAT',
		board: {
			width: 40,
			height: 40
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 23,
		name: 'NEED MONEY',
		board: {
			width: 42,
			height: 42
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 24,
		name: 'OH, A TAIL!',
		board: {
			width: 44,
			height: 44
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 25,
		name: 'DO IT OR I RUN',
		board: {
			width: 46,
			height: 46
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	},
	{
		level: 26,
		name: 'I GIVE UP',
		board: {
			width: 50,
			height: 50
		},
		types: ['kitty', 'sweaty', 'pussy', 'purrty', 'orange', 'purple', 'white'],
		sounds: {
			soundtrack: 'score',
		}
	}
];;/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js-katzespiel
 */
 
Game.values = {
	sounds: {
		collision: 'res/sounds/collision.mp3',
		gameover: 'res/sounds/gameover.mp3',
		score: 'res/sounds/score.mp3',
		shot: 'res/sounds/shot.mp3',
		
		highway: 'res/sounds/highway.mp3',
		
		roundOver: 'res/sounds/twit.wav',
		gameOver: 'res/sounds/purr.mp3',
		defaultHover: 'res/sounds/mouseOver.wav',
		defaultClick: 'res/sounds/meow.mp3',
		
		lvl1: 'res/sounds/lvl1.mp3'
	},
	cats: {
		kitty: {
			sounds: {
				mouseOver: 'defaultHover',
				mouseClick: 'defaultClick'
			},
			animation: {

			}
		},
		sweaty: {
			sounds: {
				mouseOver: 'defaultHover',
				mouseClick: 'defaultClick'
			},
			animation: {
				
			}
		},
		pussy: {
			sounds: {
				mouseOver: 'defaultHover',
				mouseClick: 'defaultClick'
			},
			animation: {
				
			}
		},
		purrty: {
			sounds: {
				mouseOver: 'defaultHover',
				mouseClick: 'defaultClick'
			},
			animation: {
				
			}
		},
		orange: {
			sounds: {
				mouseOver: 'defaultHover',
				mouseClick: 'defaultClick'
			},
			animation: {
				
			}
		},
		white: {
			sounds: {
				mouseOver: 'defaultHover',
				mouseClick: 'defaultClick'
			},
			animation: {
				
			}
		},
		purple: {
			sounds: {
				mouseOver: 'defaultHover',
				mouseClick: 'defaultClick'
			},
			animation: {
				
			}
		}
	}
};;/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js-katzespiel
 */
 
Game.strings = {
	buttons: {
		newGame: "NOWA GRA",
		next: "DALEJ"
	},
	hud: {
		level: "POZIOM",
		points: "punkty",
		left: "ZOSTALO",
		canLeft: "MOZE ZOSTAC"
	},
	dialog: {
		levelCompleted: {
			score: "Poziom ukonczony! Wynik:",
			additionalCats: "Dodatkowe kotki:",
			canLeft: "Moze zostac kotkow:"
		},
		gameOver: {
			yourScoreIs: "Twoj wynik to:",
			toMuchCatsLeft: "Zostalo za duzo kotkow! Koniec gry!",
			noMoreLevels: "Nie ma wiecej poziomow! Koniec gry!"
		}
	}
};;/**
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
};/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js-katzespiel
 */

Game.Sound = {
	soundsOn: true,
	currentSoundtrack: null,
	sounds: {},
	fire: function() {		
		for(var soundID in Game.values.sounds) {
			Game.Sound.sounds[soundID] = new Audio(Game.values.sounds[soundID]);
		}
	},
	playSoundtrack: function(id) {
		// disable soundtracks
		return;
		
		if(id == Game.Sound.currentSoundtrack) {
			return;
		}
		
		Game.Sound.stopSoundtrack();
		Game.Sound.currentSoundtrack = id;
		
		if(Game.Sound.soundsOn) {
			Game.Sound.sounds[id].currentTime = 0;
			Game.Sound.sounds[id].loop = true;
			Game.Sound.sounds[id].volume = 0.3;
			Game.Sound.sounds[id].play();
		}
	},
	stopSoundtrack: function() {
		if(Game.Sound.currentSoundtrack != null) {
			Game.Sound.sounds[Game.Sound.currentSoundtrack].pause();
		}
	},
	play: function(id) {
		if(Game.Sound.soundsOn) {
			Game.Sound.sounds[id].pause();
			Game.Sound.sounds[id].currentTime = 0;
			Game.Sound.sounds[id].play();
		}
	},
	stop: function(id) {
		Game.Sound.sounds[id].pause();
	}
};/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js-katzespiel
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
;/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js-katzespiel
 */

/**
* A Cat object represents a single board's entity.
*/
Game.Board.Cat = function() {
	this.x = null;
	this.y = null;
	
	this.col = null;
	this.row = null;
	
	this.type = null;
	
	this.mouseOver = function() {
		var scores = Game.Board.lookAround(this.col, this.row, this.type);
		if(scores.length > 1) {
			Game.Board.highlightItems(true, scores, this.type);
		}
		else {
			Game.Board.highlightItems(false);
		}
	}
	
	this.mouseClick = function() {
		Game.Sound.play(Game.values.cats[this.type].sounds.mouseClick);
		
		var scores = Game.Board.lookAround(this.col, this.row, this.type);
		if(scores.length > 1) {
			Game.Board.countPoints(scores);
			Game.Board.destroy(scores);
			
			Game.Board.highlightItems(false);
			
			var status = {};
			Game.Board.lookForGameStatus(status);
			
			Game.Hud.values.itemsLeftAmount = status.itemsLeft;

			if(status.roundOver) {
				if(Game.Board.itemsLeftLimit < Game.Hud.values.itemsLeftAmount) {
					Game.pause(); 
					Game.Sound.play('gameOver');
					Game.Dialog.show({
						lines: [
							Game.strings.dialog.gameOver.toMuchCatsLeft,
							Game.strings.dialog.gameOver.yourScoreIs + " " + Game.Board.score
						],
						buttons: [
							new Game.Dialog.Button("..." + Game.strings.dialog.buttons.newGame, function() {
								Game.Sound.stop('gameOver');
								Game.play();
								Game.startGame();
								Game.Dialog.close();
							})
						]
					});
				}
				else if(Game.hasMoreLevels()) {					
					Game.pause();
					
					var extraBalls = Game.Board.addNewCatsLimit(Game.Hud.values.itemsLeftAmount, Game.Board.itemsLeftLimit);

					Game.Sound.play('roundOver');
					Game.Dialog.show({
						lines: [
							Game.strings.dialog.levelCompleted.score + " " + Game.Board.score,
							Game.strings.dialog.levelCompleted.additionalCats + " " + extraBalls,
							Game.strings.dialog.levelCompleted.canLeft + " " + Game.Board.itemsLeftLimit],
						buttons: [
							new Game.Dialog.Button("..." + Game.strings.buttons.next, function() {
								Game.play();
								
								var nextLevel = Game.getNextLevel();
								Game.Board.reset(nextLevel);
								
								Game.startRound();
								Game.Dialog.close();
								
								Game.Sound.playSoundtrack(nextLevel.sounds.soundtrack);
							})
						]
					});
				}
				else {
					Game.pause(); 
					Game.Sound.play('gameOver');
					Game.Dialog.show({
						lines: [
							Game.strings.dialog.gameOver.noMoreLevels,
							Game.stirngs.dialog.gameOver.yourScoreIs + " " + Game.Board.score
						],
						buttons: [
							new Game.Dialog.Button("..." + Game.strings.dialog.buttons.newGame, function() {
								Game.Sound.stop('gameOver');
								Game.play();
								Game.startGame();
								Game.Dialog.close();
							})
						]
					});
				}
			}
		}
	}
};
;/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/js-katzespiel
 */

Game.Hud = {
	/**
	 * Game's Hud numerical values
	 *
	 * @var Object
	 */
	values: {
		itemsLeftAmount: 0,
		allItemsAmount: 1,
		maxItemsLeftAmount: 0
	}
};;/**
 * @project
 * A simple HTML5 board game full of cats.
 *
 * @version 1.0
 * @author	Tom Pugnicki <tom.pugnicki@gmail.com>
 * @github	https://github.com/pugnicki/katzespiel
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
