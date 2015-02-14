Packman = Class.extend({
	init: function(ctx, size, row, col){
		this.ctx = ctx;
		this.size = size;
		this.radius = this.size/3;
		this.step = this.size/4;
		this.position = [row, col];
		this.lastPosition = [row,col]
		this.isMoving = true;
		this.direction = 'd';
		this.angle1 =  0.75; // 0.75 1.25 1.75 0.25
		this.angle2 = 0.25; // 0.25 0.75 1.25 1.75
		
		this.draw();
	},
	draw:function(){
		var x = (this.position[0] * this.size) + (this.size / 2);
		var y = (this.position[1] * this.size) + (this.size / 2);
		this.ctx.beginPath();
		this.ctx.arc( x, y, this.radius, Math.PI * this.angle1, Math.PI * this.angle2, false);
		this.ctx.lineTo( x, y);
		this.ctx.fillStyle = 'orange';
		this.ctx.fill();
		this.lastPosition[0] = this.position[0];
		this.lastPosition[1] = this.position[1];
	}
	

})