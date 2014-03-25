Engine.Rendering.2D = {
	Geometry: {
		Line: function(options) {
			this.start = (start in options && options.start instanceof Engine.Math.Vector2D.Point)
				? options.start
				: new Engine.Math.Vector2D.Point(0,0);

			this.end = (end in options && options.end instanceof Engine.Math.Vector2D.Point)
				? options.end
				: new Engine.Math.Vector2D.Point(0,0);

			this.stroke = (stroke in options && options.stroke instanceof Engine.Graphics.Stroke)
				? options.stroke
				: new Engine.Graphics.Stroke();

			this.draw = function(context) {
				context.beginPath();

				context.moveTo(this.start.x,this.start.y);
				context.lineTo(this.end.x,this.end.y);

				context.lineWidth	= this.stroke.width;
				context.strokeStyle	= this.stroke.color.toString();
				context.lineCap		= this.stroke.cap;

				context.stroke();

				context.closePath();
			};
		},
		Rectangle: function(options) {
			this.position = (position in options && options.position instanceof Engine.Math.Vector2D.Point)
				? options.position
				: new Engine.Math.Vector2D.Point(0,0);

			this.size = (size in options && options.size instanceof Engine.Math.Vector2D.Size)
				? options.size
				: new Engine.Math.Vector2D.Size(0,0);

			this.angle = (angle in options && typeof options.angle === 'number')
				? Engine.Math.limit(options.angle,0,360)
				: 0;

			this.fill = (fill in options && options.fill instanceof Engine.Graphics.Color)
				? options.fill
				: new Engine.Graphics.Color();

			this.stroke = (stroke in options && options.stroke instanceof Engine.Graphics.Stroke)
				? options.stroke
				: new Engine.Graphics.Stroke();

			this.draw = function(context) {
				if(this.angle > 0) {
					context.save();
					context.beginPath();

					context.translate(this.position.x-(this.size.width/2),this.position.y-(this.size.height/2));
					context.rotate(Engine.Math.deg2rad(this.angle));

					context.rect(
						-this.size.width/2,
						-this.size.height/2,
						this.size.width,
						this.size.height
					);
				}
				else {
					context.beginPath();

					context.rect(
						this.position.x-(this.size.width/2),
						this.position.y-(this.size.height/2),
						this.size.width,
						this.size.height
					);
				}

				context.fillStyle = this.fill.toString();
				context.fill();

				context.lineWidth	= this.stroke.width;
				context.strokeStyle	= this.stroke.color.toString();
				context.lineCap		= this.stroke.cap;

				context.stroke();

				context.closePath();

				if(this.angle > 0) {
					context.restore();
				}
			};
		},
		Polygon: function(options) {
			this.points = [];

			if(typeof options.points === 'array') {
				for(var i=0,l=options.points.length;i<l;i++) {
					this.addPoint(options.points[i]);
				}
			}

			this.position = (position in options && options.position instanceof Engine.Math.Vector2D.Point)
				? options.position
				: new Engine.Math.Vector2D.Point(0,0);

			this.angle = (typeof options.angle === 'number')
				? Engine.Math.limit(options.angle,0,360)
				: 0;

			this.fill = (fill in options && options.fill instanceof Engine.Graphics.Color)
				? options.fill
				: new Engine.Graphics.Color();

			this.stroke = (stroke in options && options.stroke instanceof Engine.Graphics.Stroke)
				? options.stroke
				: new Engine.Graphics.Stroke();

			this.addPoint = function(point) {
				if(point instanceof Engine.Math.Vector2D.Point) {
					this.points.push(point);
					return true;
				}
				return false;
			};

			this.draw = function(context) {
				if(this.angle > 0) {
					context.save();
					context.beginPath();

					context.translate(this.position.x,this.position.y);
					context.rotate(Engine.Math.deg2rad(this.angle));
				}
				else {
					context.beginPath();
				}

				for(var i=0,l=this.points.length;i<l;i++) {
					if(i>0)
						{ context.lineTo(this.points[i],this.points[i].y); }
					else
						{ context.moveTo(this.points[i].x,this.points[i].y); }
				}

				context.fillStyle = this.fill.toString();
				context.fill();

				context.lineWidth	= this.stroke.width;
				context.strokeStyle	= this.stroke.color.toString();
				context.lineCap		= this.stroke.cap;

				context.stroke();

				context.closePath();

				if(this.angle > 0) {
					context.restore();
				}
			};
		},
		Circle: function(options) {
			this.position = (position in options && options.position instanceof Engine.Math.Vector2D.Point)
				? options.position
				: new Engine.Math.Vector2D.Point(0,0);

			this.radius = (radius in options && typeof options.radius === 'number')
				? Engine.Math.min(options.radius,0)
				: 0;

			this.stroke = (stroke in options && options.stroke instanceof Engine.Graphics.Stroke)
				? options.stroke
				: new Engine.Graphics.Stroke();

			this.fill = (fill in options && options.fill instanceof Engine.Graphics.Color)
				? options.fill
				: new Engine.Graphics.Color();

			this.stroke = (stroke in options && options.stroke instanceof Engine.Graphics.Stroke)
				? options.stroke
				: new Engine.Graphics.Stroke();

			this.draw = function(context) {
				context.beginPath();

				context.arch(this.position.x,this.position.y,this.radius,0,2*Math.PI,false);

				context.fillStyle = this.fill.toString();
				context.fill();

				context.lineWidth	= this.stroke.width;
				context.strokeStyle	= this.stroke.color.toString();
				context.lineCap		= this.stroke.cap;

				context.stroke();

				context.closePath();
			};
		}
	},
	Gradient: {
		Stop: function(color,position) {
			this.color = (color instanceof Engine.Graphics.Color)
				? color
				: new Engine.Graphics.Color(0,0,0,1);

			this.position = (typeof position === 'number')
				? Engine.Math.limit(position,0,1)
				: 0;
		},
		Linear: function(options) {
			this.stops = [];

			this.start = (start in options && options.start instanceof Engine.Math.Vector2D.Point)
				? options.start
				: new Engine.Math.Vector2D.Point(0,0);

			this.end = (end in options && options.end instanceof Engine.Math.Vector2D.Point)
				? options.end
				: new Engine.Math.Vector2D.Point(0,0);

			this.addStop = function(stop) {
				if(stop instanceof Engine.Rendering2D.Gradient.Stop) {
					this.stops.push(stop);
					return true;
				}
				return false;
			};

			if(stops in options) {
				if(typeof options.stops === 'array') {
					for(var i=0,l=options.stops.length;i<l;i++) {
						this.addStop(options.stops[i]);
					}
				}
			}
		}
	},
	Image: function(options) {
		this.source = (source in options && typeof options.source === 'string')
			? options.source
			: null;

		this.position = (position in options && options.position instanceof Engine.Math.Vector2D.Point)
			? options.position
			: new Engine.Math.Vector2D.Point(0,0);

		this.size = (size in options && options.size instanceof Engine.Math.Vector2D.Size)
			? options.size
			: new Engine.Math.Vector2D.Size(0,0);

		this.angle = (angle in options && typeof options.angle === 'number')
			? Engine.Math.limit(options.angle,0,360)
			: 0;

		this.crop = {};
		this.stretch = {};
	},
	ImageSheet: function(options) {
		this.source = (source in options && typeof options.source === 'string')
			? options.source
			: null;

		this.size = (size in options && options.size instanceof Engine.Math.Vector2D.Size)
			? options.size
			: Engine.Math.Vector2D.Size(0,0);

		this.tilesize = (tilesize in options && options.tilesize instanceof Engine.Math.Vector2D.Size)
			? options.tilesize
			: Engine.Math.Vector2D.Size(0,0);

		this.getTile = function() {
			if(arguments.length===1) {
				
			}
			else if(arguments.length===2) {
				var row = arguments[0];
				var col = arguments[1];

				
			}
		};
	},
	Sprite: function(options) {
		this.components = [];

		this.position = (position in options && position instanceof Engine.Math.Vector2D.Point)
			? options.position
			: new Engine.Math.Vector2D.Point(0,0);

		this.size = (size in options && size instanceof Engine.Math.Vector2D.Size)
			? options.size
			: new Engine.Math.Vector2D.Size(0,0);

		this.angle = (angle in options && typeof options.angle === 'number')
			? Engine.Math.limit(options.angle,0,360)
			: 0;

		this.addComponent = function(component) {
			if(
				component instanceof Engine.Rendering2D.Geometry.Line ||
				component instanceof Engine.Rendering2D.Geometry.Rectangle ||
				component instanceof Engine.Rendering2D.Geometry.Polygon ||
				component instanceof Engine.Rendering2D.Geometry.Circle ||
				component instanceof Engine.Rendering2D.Geometry.Ellipse ||
				component instanceof Engine.Rendering2D.Image
			) {
				this.components.push(component);
				return true;
			}
			return false;
		};

		this.draw = function() {
			for(var i=0,l=this.components.length;i<l;i++) {
				
			}
		};
	}
};
