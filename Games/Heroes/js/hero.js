function Hero(x,y,img,ctx,params){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.img = img;
    this.params = params;
    this.monsters = [1,2,3,4];

    this.distance = 0;
    this.draw = function() {
        var _this = this;
        this.image = new Image();
        this.image.src = "img/hero.png";

        var rect = this.ctx.canvas.getBoundingClientRect();
        this.image.onload = function(){
            _this.x += _this.image.width - rect.left;
            _this.y += (-_this.image.height - rect.top);
            _this.ctx.drawImage(_this.image,_this.x,_this.y,_this.image.width/2,_this.image.height/2);
        };
    };
    this.init = function(){
        this.draw();
    };
    return this.init();
}
