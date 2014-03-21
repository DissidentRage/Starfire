var Engine = {
	Canvas: null,
	Timer: null,
	Running: false,
	initialize: function(canvas,game) {
		if(!canvas instanceof HTMLCanvasElement) {
			window.alert('Engine not initialized with a Canvas element.');
			return;
		}
		Engine.Canvas = canvas;
		Engine.Screen.Camera.position = new Engine.Math.Vector2D.Point(0,0);

		Engine.Running = true;

		
	},
	exit: function() {
		for(var i=0,l=Engine.Timers.length;i<l;i++)
			{ clearInterval(Engime.Timers[i]); }

		Engine.Running = false;

		var context = Engine.Canvas.getContext('2d');
		context.fillStyle = '#000000';
		context.fillRect(0,0,Engine.Canvas.width,Engine.Canvas.height);
	}
};
