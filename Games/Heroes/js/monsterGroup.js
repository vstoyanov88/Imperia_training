function MonsterGroup(name,img,count,hp,damage,cost,x,y,hero){
    this.img = img;
    this.name = name;
    this.count = count;
    this.hp = hp;
    this.damage = damage;
    this.x = x;
    this.y = y;
    this.cost = cost;
    this.hero = hero;
    this.groupDamage = this.damage * this.count;
    this.groupHP = this.hp * this.count;
    this.battleX = 0;
    this.battleY = 0;

    this.incrementGroup = function(number){
        this.count+=number;
    };

    this.draw = function(drawX,drawY){
        this.image = document.createElement('img');
        this.image.src = this.img;
        this.image.style.position = 'absolute';
        this.image.style.left = drawX + 'px';
        this.image.style.top = drawY + 'px';
        this.image.style.zIndex = '2';
    };

    this.mapDraw = function(drawX,drawY){
        this.draw(drawX,drawY);
        var container = document.querySelector('#containerMap');
        this.image.id = this.name;
        container.appendChild(this.image);
        var _this = this;
        this.image.addEventListener('mouseover',function(){
            this.style.cursor = 'url(img/death.png),auto';
        });
        this.image.addEventListener('click',function(e){
            e.stopPropagation();
        });
        this.image.addEventListener('dblclick',function(e){
            var hasMonsters = false;
            for(var i = 0; i < _this.hero.monsters.length;i++){
                if(_this.hero.monsters[i] instanceof MonsterGroup) {
                    var battle = new Battle(_this.hero, _this,e);
                    hasMonsters = true;
                    break;
                }
            }
            if(!hasMonsters) {
               $('#no-army').show();
               $('#no-army-confirm').on('click',function(){
            	   $('#no-army').hide();
               });
            }
        });
    };

    this.battleDraw = function(battleX,battleY){
        this.draw(battleX,battleY);
        this.image.style.width = '100px';
        this.image.style.height = '100px';
        var container = document.querySelector('#battleScreen');
        this.innerDiv = document.createElement('div');
        //this.innerDiv.style.position = 'absolute';
        var label = document.createElement('label');
        label.innerHTML = this.count;
        label.style.position = 'absolute';
        label.style.zIndex = '3';
        label.style.fontSize = '1.3em';
        label.style.color = 'orange';
        this.innerDiv.appendChild(this.image);
        this.innerDiv.appendChild(label);
        container.appendChild(this.innerDiv);
        var _this = this;

    }
}