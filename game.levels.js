/**
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
		name: 'PRRRR MOTHAFUCKA',
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
		name: 'DON\'T PISS ME OFF',
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
];