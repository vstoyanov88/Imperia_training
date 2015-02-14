function Map(width,height,ctx,hero,monsters){
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.hero = hero;
    this.monsters = monsters;
    this.percentage = 100;
    this.turn = this.hero.params[0];
    this.turnCount = 0;

    this.xMove = 0;
    this.yMove = 0;

    this.clear = function(){
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    };
    this.init = function(){
        this.addCity();
        this.listeners();
        this.addResources();
        globalValues.display('#resources');
        this.endTurn();
    };
    return this.init();
}

Map.prototype.addResources = function(){
    var wood = new Resource('wood',10,200,450,this.hero,this);
    var ore = new Resource('ore',20,500,150,this.hero,this);
    var gold = new Resource('gold',3000,600,200,this.hero,this);
    var gold2 = new Resource('gold',2000,300,100,this.hero,this);
    var gold3 = new Resource('gold',1000,1000,150,this.hero,this);
    var gold4 = new Resource('gold',1500,500,500,this.hero,this);
    var gold5 = new Resource('gold',2500,1000,300,this.hero,this);
    var wood2 = new Resource('wood',10,750,350,this.hero,this);
    var ore2 = new Resource('ore',10,270,390,this.hero,this);
};

Map.prototype.addCity = function() {
    var container = document.querySelector('#containerMap');
    var div = document.createElement('div');
    var _this = this;

    div.style.position = 'absolute';
    div.style.left = '100px';
    var city = document.createElement('img');
    city.className = 'city';
    city.src = 'img/DwarfGreatHall03.png';
    container.appendChild(div);
    div.appendChild(city);
    div.style.display = 'inline-block';
    div.addEventListener('mouseover', function () {
        div.style.cursor = 'pointer';
    });


    div.addEventListener('click',function(e){
        e.stopPropagation();
    });
    var rect = _this.hero.ctx.canvas.getBoundingClientRect();
    div.addEventListener('dblclick', function (e) {
        var xCoord = e.clientX - rect.left - _this.hero.image.width/1.1;
        var yCoord = e.clientY - rect.top + _this.hero.image.height/1.7;

        var x1 = _this.hero.x;
        var x2 = xCoord + 100;
        var y1 = _this.hero.y;
        var y2 = yCoord - 280;
        _this.hero.distance = Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2));
        if(_this.turn - _this.hero.distance > 0) {
            _this.turn -= _this.hero.distance;
            _this.percentage = (_this.turn / _this.hero.params[0]) * 100;

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
                    left: xCoord + 130,
                    top: yCoord - 250
                }, 1000, function () {
                    _this.hero.x = xCoord + 130;
                    _this.hero.y = yCoord - 280;
                }
            );
            $('#wrapperMap').hide();
            $('#wrapperCity').fadeIn(2000,function(){

            });
            var divs = document.querySelectorAll('.pos');
            console.log(_this.hero.monsters);
            for(var i = 0; i < divs.length;i++){
                divs[i].innerHTML = '';
                divs[i].style.backgroundImage = '';
                divs[i].backgroundColor = 'rgba(255,255,255,0)';
                if(_this.hero.monsters[i] instanceof MonsterGroup &&_this.hero.monsters[i].count != 0) {
                    divs[i].style.backgroundColor = 'rgba(255,255,255,0.3)';
                    divs[i].style.backgroundImage = "url(" + _this.hero.monsters[i].img + ")";
                    divs[i].style.backgroundSize = '100% 100%';
                    divs[i].innerHTML += _this.hero.monsters[i].count;

                }
            }
            globalValues.display('#resources_city');
        }
        else {
        	 $('#no-stamina').show();
        	 $('#no-stamina-confirm').on('click',function(){
        		 $('#no-stamina').hide();
        	 })
        }
    });
};

Map.prototype.moveFunction = function(xCoord,yCoord){
    var _this = this;

    var x1 = _this.hero.x;
    var x2 = xCoord + 100;
    var y1 = _this.hero.y;
    var y2 = yCoord - 280;

    _this.hero.distance = Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2));
    if(_this.turn - _this.hero.distance > 0) {
        _this.turn -= _this.hero.distance;
        _this.percentage = (_this.turn/_this.hero.params[0]) * 100;
        console.log(_this.percentage);
        var hr = document.querySelector('hr');
        hr.style.float = 'left';
        hr.style.width = _this.percentage + '%';
        hr.style.height = '5px';
        if(_this.percentage < 100 && _this.percentage > 75) {
            hr.style.backgroundColor = 'darkgreen';
        }
        else if(_this.percentage < 75 && _this.percentage > 35){
            hr.style.backgroundColor = 'orange';
        }
        else {
            hr.style.backgroundColor = 'red';
        }

        $("#hero_canvas").animate(
            {
                left: xCoord + 100,
                top: yCoord - 280
            },1000,function(){
                _this.hero.x = xCoord + 100;
                _this.hero.y = yCoord - 280;
            }
        );
    }
    else {
    	 $('#no-stamina').show();
    	 $('#no-stamina-confirm').on('click',function(){
    		 $('#no-stamina').hide();
    	 })
    }
};


Map.prototype.listeners = function(){
    var _this = this;
    var rect = _this.ctx.canvas.getBoundingClientRect();
    var container = document.querySelector('#containerMap');
    container.addEventListener('click', function (e) {
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        var xCoord = e.clientX - rect.left - _this.hero.image.width/1.1;
        var yCoord = e.clientY - rect.top + _this.hero.image.height/1.7;

        var image = document.createElement('img');
        image.src = 'img/move.png';
        image.style.width='25px';
        image.style.height = '25px';
        image.style.position = 'absolute';
        image.style.top = e.clientY - 12.5 + 'px';
        image.style.left = e.clientX - 12.5 + 'px';
        image.style.zIndex = '3';
        if(container.children.length <= 1) {
            container.appendChild(image);
        }
        else {
            while(container.children.length != 2 + _this.monsters.length) {
                container.removeChild(container.lastChild);
            }
            container.appendChild(image);
        }
        image.addEventListener('mouseover',function(){
            this.style.cursor = 'pointer';
        });
        image.addEventListener('click',function(e){
            _this.moveFunction(xCoord,yCoord);
            container.removeChild(image);
            e.stopPropagation();
        });
    });
};
Map.prototype.endTurn = function(e) {
    var _this = this;
    var image = document.querySelector('#end_img');
    image.onclick = function () {
        _this.turn = _this.hero.params[0];
        _this.turnCount++;
        if (_this.turnCount == 10) {
            console.log('End of game');
        }
        //image.className = 'animation';
        globalValues.dayCount++;
        
        if (globalValues.dayCount > 10) {
            $('#wrapperMap').hide();
            $('#end-game').fadeIn(2000);
        } else {
            $('#no-stamina').hide();
            $('#new-day').show();
            $('#new-day-count').html('Day ' + (_this.turnCount + 1))
            $('#get-new-day').on('click', function () {
                $('#new-day').hide();
            });
        }
        var hr = document.querySelector('hr');
        hr.style.width = '90%';
        hr.style.height = '5px';
        hr.style.backgroundColor = 'darkgreen';


        for (var i = 0; i < _this.monsters.length; i++) {
            _this.monsters[i].count += 2;
        }
        
        ;
    };
}
