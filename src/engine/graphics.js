Engine.Graphics = {
	Color: function(r,g,b,a) {
		this.r = (typeof r === 'number')
			? Engine.Math.limit(parseInt(r),0,255)
			: 0;
		this.g = (typeof b === 'number')
			? Engine.Math.limit(parseInt(g),0,255)
			: 0;
		this.b = (typeof b === 'number')
			? Engine.Math.limit(parseInt(b),0,255)
			: 0;
		this.a = (typeof a === 'number')
			? Engine.Math.limit(parseInt(a),0,100)
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

		this.width = (options.hasOwnProperty('width') && typeof options.width === 'number')
			? Engine.Math.min(options.width,0)
			: 0;
		this.color = (options.hasOwnProperty('color') && options.color instanceof Engine.Graphics.Color)
			? options.color
			: new Engine.Graphics.Color(0,0,0,0);
		this.cap = (options.hasOwnProperty('cap') && this.CapStyles.indexOf(options.cap) > -1)
			? options.cap
			: this.CapStyles[0];
	},
	Font: function(options) {
		this.family = (options.hasOwnProperty('family') && typeof options.family === 'string')
			? options.family
			: 'sans-serif';
		this.size = (options.hasOwnProperty('size') && typeof options.size === 'number')
			? Engine.Math.limit(options.size,0,200)
			: 12;
		this.bold = (options.hasOwnProperty('bold') && typeof options.bold === 'boolean')
			? options.bold
			: false;
		this.italic = (options.hasOwnProperty('italic') && typeof options.italic === 'boolean')
			? options.italic
			: false;
	}
};
