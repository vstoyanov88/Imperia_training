Dote = Class.extend({
	init: function(ctx, size){
		this.ctx = ctx;
		this.size = size;
		this.radius = this.size/4;
		this.position = [];
		
		this.draw()
	},
	draw: function(){
		this.ctx.beginPath();
		this.ctx.arc( this.position[0] * this.size + (this.size / 2), this.position[1] * this.size + this.size / 2, this.radius, 0, Math.PI * 2, false);
		this.ctx.fillStyle = 'red';
		this.ctx.fill();
	},
	getRandomPosition: function(){
		var x = Math.floor((Math.random() * 10));
		var y = Math.floor((Math.random() * 10));
		
		this.position = [x, y];
	}
})