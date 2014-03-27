var Starfire = new Game({
	events: {
		init: function() {
			
		}
	}
});

function init() {
	var canvas = document.getElementsByTagName('canvas')[0];

	Engine.initialize(canvas,Starfire);
}

window.addEventListener('DOMContentLoaded',init,false);