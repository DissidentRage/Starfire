Engine.Screen = {
	RenderList: [],
	Camera: {
		position: null
	},
	Update: function() {
		var context = Engine.Canvas.getContext('2d');
		context.fillStyle = '#000000';
		context.fillRect(0,0,Engine.Canvas.width,Engine.Canvas.height);

		for(var i=0,r,l=Engine.Screen.RenderList.length;i<l;i++) {
			r = Engine.Screen.RenderList[i];

			if(typeof r.draw === 'function') {
				r.draw(context);
			}
		}
	}
};
