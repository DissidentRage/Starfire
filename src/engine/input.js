Engine.Input = {
	Keyboard: {
		Location: {
			Standard: 0,
			Left: 1,
			Right: 2,
			Numpad: 3
		},
		Status: {
			Up: false,
			Down: true
		},
		Key: function(options) {
			this.code = 0;
			this.location = 0;
			this.status = false;
			this.ticks = 0;

			this.events = {
				down: [],
				hold: [],
				up: []
			};
		},
		keys: {},
		keyup: function(evt) {
			if(evt.keyCode in Engine.Input.Keyboard.keys)
				{ Engine.Input.Keyboard.keys[evt.keyCode].status = Engine.Input.Keyboard.Status.Down; }
		},
		init: function() {
			for(var key in KeyEvent) {
				if(typeof KeyEvent[key] === 'number') {
					for(var location in Engine.Input.Keyboard.Location) {
						var k = KeyEvent[k];
						var loc = Engine.Input.Keyboard.Location[location];
						Engine.Input.Keyboard.keys[k+':'+loc] = new Engine.Input.Keyboard.Key({
							code: k,
							location: loc,
							status: Engine.Input.Keyboard.Status.Up
						});
					}
				}
			}
		}
	}
};