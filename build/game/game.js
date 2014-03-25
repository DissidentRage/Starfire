var Starfire = {
	
};

function init() {
	var canvas = document.getElementsByTagName('canvas')[0];

	Engine.initialize(canvas,Starfire);
}

window.addEventListener('DOMContentLoaded',init,false);