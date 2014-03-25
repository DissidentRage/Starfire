Engine.GUI = {
	Menu: function(options) {
		this.label = (options.hasOwnProperty('label') && typeof options.label === 'string')
			? this.label = options.label
			: 'Menu';

		this.position = (options.hasOwnProperty('position') && options.position instanceof Engine.Math.Vector2D.Point)
			? options.position
			: new Engine.Math.Vector2D.Point(0,0);

		this.selection = false;

		this.items = [];
		this.events = {
			change: []
		};

		this.addItem = function() {
			var l = arguments.length;
			if(l===1 && arguments[0] instanceof Engine.GUI.MenuItem)
				{this.items.push(arguments[0]);}
			else if(l > 1)
				{this.addItems(arguments);}
			if(this.items.length>0)
				{ this.selection = 0; }
		};

		this.addItems = function(items) {
			if(items instanceof Array) {
				for(var i=0,l=items.length;i<l;i++)
					{ this.addItem(items[i]); }
			}
		}

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

		if(options.hasOwnProperty('items') && options.items instanceof Array)
			{ this.addItems(options.items); }

		if(options.hasOwnProperty('events') && options.events.constructor === Object)
			{ this.addEvents(options.events); }

		this.change = function(x) {
			var i;
			if(this.items.length===0)
				{ this.selection = false; }
			else {
				var n = parseInt(x);
				var l = this.items.length;

				if(n < 0)
					{ this.selection = 0; }
				else if(n > l)
					{ this.selection = --l; }
				else
					{ this.selection = n; }
			}

			for(i=0,l=this.events.change;i<l;i++)
				{ this.events.change[i].call(this); }

			return this.selection;
		}

		this.next = function() {
			var i, l;
			if(this.items.length===0) {
				this.selection = false;
				for(i=0,l=this.events.change;i<l;i++)
					{ this.events.change[i].call(this); }
			}
			else {
				if(this.selection < this.items.length + 1) {
					this.selection++;
					for(i=0,l=this.events.change;i<l;i++)
						{ this.events.change[i].call(this); }
				}
			}
		};

		this.prev = function() {
			var i, l;
			if(this.items.length===0) {
				this.selection = false;
				for(i=0,l=this.events.change;i<l;i++)
					{ this.events.change[i].call(this); }
			}
			else {
				if(this.selection > 0) {
					this.selection--;
					for(i=0,l=this.events.change;i<l;i++)
						{ this.events.change[i].call(this); }
				}
			}
		};
	},
	MenuItem: function(options) {
		this.label = (options.hasOwnProperty('label') && typeof options.label === 'string')
			? this.label = options.label
			: 'Menu';

		this.position = (options.hasOwnProperty('position') && options.position instanceof Engine.Math.Vector2D.Point)
			? options.position
			: new Engine.Math.Vector2D.Point(0,0);

		this.events = {
			focus: [],
			blur: [],
			select: []
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
};