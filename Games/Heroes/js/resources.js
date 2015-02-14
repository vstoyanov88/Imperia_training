function Resource(type,value,x,y,hero,map){
    this.hero = hero;
    this.type = type;
    this.value = value;
    this.x = x;
    this.y = y;
    this.map = map;

    this.place = function(){
        var _this = this;
        var resourceDiv = document.querySelector('#resources');
        var resource = document.createElement('img');
        resource.style.zIndex = '2';
        resource.style.width = '5%';
        resource.style.height = '6%';

        switch(this.type){
            case 'gold': resource.src = 'img/gold.png';break;
            case 'wood': resource.src = 'img/wood.png';break;
            case 'ore': resource.src = 'img/ore.png';break;
        }
        resourceDiv.appendChild(resource);
        resource.style.position = 'absolute';
        resource.style.left = this.x + 'px';
        resource.style.top = this.y + 'px';
        resource.addEventListener('mouseover',function(){
            this.style.cursor = 'url(img/hand.png),auto';
        });
        var rect = _this.hero.ctx.canvas.getBoundingClientRect();
        resource.addEventListener('dblclick',function(e){


            var xCoord = e.clientX - rect.left - _this.hero.image.width/1.1;
            var yCoord = e.clientY - rect.top + _this.hero.image.height/1.7;

            var x1 = _this.hero.x;
            var x2 = xCoord + 100;
            var y1 = _this.hero.y;
            var y2 = yCoord - 280;
            _this.hero.distance = Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2));
            if(_this.map.turn - _this.hero.distance > 0) {
                _this.map.turn -= _this.hero.distance;
                _this.percentage = (_this.map.turn / _this.hero.params[0]) * 100;

                console.log(_this.percentage);
                var hr = document.querySelector('hr');
                hr.style.float = 'left';
                hr.style.width = _this.percentage + '%';
                hr.style.height = '5px';
                if(_this.percentage < 100 && _this.percentage > 65) {
                    hr.style.backgroundColor = 'darkgreen';
                }
                else if(_this.percentage < 65 && _this.percentage > 30){
                    hr.style.backgroundColor = 'orange';
                }
                else {
                    hr.style.backgroundColor = 'red';
                }
                $("#hero_canvas").animate(
                    {
                        left: xCoord + 110,
                        top: yCoord - 250
                    }, 1000, function () {
                        _this.hero.x = xCoord + 110;
                        _this.hero.y = yCoord - 280;
                    }
                );
                switch(_this.type){
                    case 'gold': globalValues.gold += _this.value;
                        resourceDiv.removeChild(resource);
                        break;
                    case 'wood': globalValues.wood += _this.value;
                        resourceDiv.removeChild(resource);
                        break;
                    case 'ore': globalValues.ore += _this.value;
                        resourceDiv.removeChild(resource);
                        break;
                }
            }
            else {
            	 $('#no-stamina').show();
                 $('#no-stamina-confirm').on('click',function(){
              	   	$('#no-stamina').hide();
                 });
            }
            globalValues.display('#resources');
        });
    };
    this.init = function(){
        this.place();
    };
    return this.init();
}