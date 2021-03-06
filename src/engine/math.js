Engine.Math = {
	Vector2D: {
		Point: function(x,y) {
			this.x = (typeof x === 'number')
				? x
				: 0;
			this.y = (typeof y === 'number')
				? y
				: 0;
			this.getDistance = function(target) {
				return (target instanceof Engine.Math.Vector2D.Point)
					? Math.sqrt(Math.pow(target.x - this.x,2) + Math.pow(target.y - this.y,2))
					: 0;
			};
			this.getAngle = function(target) {
				return (target instanceof Engine.Math.Vector2D.Point)
					? Engine.Math.rad2deg(Math.asin(target.y - this.y/this.getDistance(target)))
					: 0;
			};
		},
		Size: function(w,h) {
			this.width = (typeof w === 'number' && w > 0)
				? w
				: 0;
			this.height = (typeof h === 'number' && h > 0)
				? h
				: 0;
		},
		Velocity: function(speed,angle) {
			this.speed = (typeof speed === 'number')
				? speed
				: 0;

			this.angle = (typeof angle === 'number')
				? angle
				: 0;

			this.getSpeed = function() {
				return {
					x: this.speed * Math.cos(this.angle),
					y: this.speed * Math.sin(this.angle)
				};
			};
		}
	},
	min: function(n,min) {
		return (typeof n === 'number' && typeof min === 'number')
			? (n < min)
				? min
				: n
			: n;
	},
	max: function(n,max) {
		return (typeof n === 'number' && typeof max === 'number')
			? (n > max)
				? max
				: n
			: n;
	},
	limit: function(n,min,max) {
		if(typeof n !== 'number')
			{ return n; }
		if(typeof min === 'number' && typeof max === 'number') {
			return (min <= max)
				? (n < min)
					? min
					: (n > max)
						? max
						: n
				: (n < max)
					? max
					: (n > min)
						? min
						: n;
		}
		return n;
	},
	deg2rad: function(d) {
		return (typeof d === 'number')
			? d * (Math.PI / 180)
			: 0;
	},
	rad2deg: function(r) {
		return (typeof r === 'number')
			? r * (180 / Math.PI)
			: 0;
	}
};
