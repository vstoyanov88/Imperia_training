Matrix = Class.extend({
	init: function(ctx, size){
		this.ctx = ctx;
		this.cellSize = size;
		this.matrix = [
					[0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
					[0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,0],
					[0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,0],
					[0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,0],
					[0 ,1 ,0 ,0 ,0 ,1 ,0 ,1 ,0 ,0],
					[0 ,1 ,0 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
					[0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0],
					[0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,0],
					[0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,0],
					[0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0]
		];
		
		this.draw();
	},
	draw: function(){
		
		for (var i = 0; i < this.matrix.length; i++){
			for (var j = 0; j < this.matrix.length; j++){
				if (this.matrix[j][i] == 1){
					this.ctx.fillStyle = 'black';
					this.ctx.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
				}else{
					this.ctx.clearRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
				}
			}
		}
	},
	isValidPosition: function(row, col){
		if (row < 0 || row > this.matrix.length - 1){
			return false;
		}
		if (col < 0 || col > this.matrix[0].length - 1){
			return false;
		}
		if (this.matrix[row][col] === 1){
			return false;
		}
		return true;
	}
})