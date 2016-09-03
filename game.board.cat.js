/**
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
