/**
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
}