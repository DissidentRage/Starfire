Engine.Event = {
	AddEvent: function() {
		
	},
	TimedEvent: function(options) {
		this.id = (typeof options.id === 'string' || typeof options.id === 'number')
			? options.id
			: null;

		this.timer = 0;

		this.cancel = false;

		this.lifetime = (typeof options.lifetime === 'number')
			? options.lifetime
			: 0;

		this.increment = (typeof options.increment === 'number')
			? options.increment
			: 1;

		this.onBegin = (typeof options.onBegin === 'function')
			? options.onBegin
			: false;

		this.onTick = (typeof options.onTIck === 'function')
			? options.onTick
			: false;

		this.onEnd = (typeof options.onEnd === 'function')
			? options.onEnd
			: false;
	}
};
