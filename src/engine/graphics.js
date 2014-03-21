Engine.Graphics = {
	Color: function(r,g,b,a) {
		this.r = (typeof r === 'number')
			? Engine.Math.limit(r,0,255)
			: 0;
		this.g = (typeof b === 'number')
			? Engine.Math.limit(g,0,255)
			: 0;
		this.b = (typeof b === 'number')
			? Engine.Math.limit(b,0,255)
			: 0;
		this.a = (typeof a === 'number')
			? Engine.Math.limit(a,0,100)
			: 0;

		this.toString = function() {
			return 'rgba('+this.r+','+this.g+','+this.b+','+(this.a/100)+')';
		};
		this.toHex = function() {
			return '#'+this.r.toString(16)+this.g.toString(16)+this.b.toString(16);
		};
	},
	Stroke: function(options) {
		this.CapStyles = [
			'butt',
			'round',
			'square'
		];

		this.width = (width in options && typeof options.width === 'number')
			? Engine.Math.min(options.width,0)
			: 0;
		this.color = (color in options && options.color instanceof Engine.Graphics.Color)
			? options.color
			: new Engine.Graphics.Color(0,0,0,0);
		this.cap = (cap in options && this.CapStyles.indexOf(options.cap) > -1)
			? options.cap
			: this.CapStyles[0];
	}
};
