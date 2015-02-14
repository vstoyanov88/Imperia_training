function Monster(x,y,img,count){
    this.x = x;
    this.y = y;
    this.img = img;
    this.count = count;

    this.draw = function() {
        var container = document.querySelector('#containerMap');
        var image = document.createElement('img');
        image.src = this.img;
        image.style.position = 'absolute';
        image.style.left = this.x + 'px';
        image.style.top = this.y + 'px';
        image.style.zIndex = '2';
        image.addEventListener('mouseover',function(){
            this.style.cursor = 'url(img/death.png),auto';
        });
        image.addEventListener('click',function(e){
            e.stopPropagation();
        });
        image.addEventListener('dblclick',function(){
            alert('to battle');
        });
        container.appendChild(image);
    };

    this.init = function(){
        this.draw();
    };
    return this.init();
}