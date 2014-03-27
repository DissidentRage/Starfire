//	Generic Class by Josh Gertzen
 //	http://joshgertzen.com/object-oriented-super-class-method-calling-with-javascript/
function Class(){}
Class.prototype.construct = function() {};
Class.extend = function(def) {
	var classDef = function() {
		if(arguments[0] !== Class)
			{ this.construct.apply(this, arguments); }
	};
	var proto = new this(Class);
	var superClass = this.prototype;
	for(var n in def) {
		var item = def[n];                      
		if(item instanceof Function)
			{ item.$ = superClass; }
		proto[n] = item;
	}
	classDef.prototype = proto;
	classDef.extend = this.extend;      
	return classDef;
};

var Game = Class.extend({
	construct: function(options) {
		this.FPS = (options.hasOwnProperty('FPS') && typeof options.FPS === 'number')
			? Engine.Math.limit(parseInt(options.FPS),1,120)
			: 60;

		this.events = {
			init: [],
			update: []
		};

		this.addEvent = function(event,handler) {
			if(event in this.events)
				{this.events[event].push(handler);}
		};

		this.addEvents = function(handlers) {
			if(handlers.constructor === Object) {
				for(var event in handlers)
					{ this.addEvent(event, handlers[event]); }
			}
		};

		if(options.hasOwnProperty('events') && options.events.constructor === Object)
			{ this.addEvents(options.events); }
	}
});

var Engine = {
	Game: null,
	Canvas: null,
	Context: null,
	Timer: {
		Update: null,
		Render: null
	},
	Running: false,
	Update: function() {
		
		if(Engine.Running)
			{ Engine.Update(); }
	},
	Render: function() {
		
	},
	initialize: function(canvas,game) {
		if(!canvas instanceof HTMLCanvasElement) {
			window.alert('Engine not initialized with a Canvas element.');
			return;
		}
		Engine.Canvas = canvas;
		Engine.Context = canvas.getContext('2d');
		Engine.Screen.Camera.position = new Engine.Math.Vector2D.Point(0,0);
		Engine.Game = game;

		Engine.Timer.Render = setInterval(Engine.Render,1000/Engine.Game.FPS);

		Engine.Running = true;
		Engine.Update();
	},
	exit: function() {
		clearInterval(Engime.Timer.Render);

		Engine.Running = false;

		var context = Engine.Canvas.getContext('2d');
		context.fillStyle = '#000000';
		context.fillRect(0,0,Engine.Canvas.width,Engine.Canvas.height);
	}
};
