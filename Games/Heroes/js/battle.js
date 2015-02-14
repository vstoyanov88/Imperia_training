function Battle(hero,monster,e) {
    this.hero = hero;
    this.monster = monster;
    this.e = e;
    var _this = this;
    this.helperArray = this.hero.monsters; //0,monster,monster
    $('#end-game').hide();
    $('#wrapperMap').hide();
    $('#wrapperCity').hide();
    $('#wrapperBattle').fadeIn(2000,function(){
        _this.hero.x = _this.e.clientX;
        _this.hero.y = _this.e.clientY;
    });
    document.querySelector('#battleScreen').innerHTML = '';
    document.querySelector('#turnOrderDisplay').innerHTML = '';

    this.init = function(){
        this.leave();
        this.turnOrderInit();
        this.turnOrderSort();
        this.turnOrderDisplay();
        this.displayHeroArmy();
        this.displayMonster();
        this.battleInit();
    };
    this.battleInit = function(){
        console.log(this.turnOrder);
        var isDead = true;
        for(var i = 0; i < this.hero.monsters.length;i++){
            if(this.hero.monsters[i].count > 0) {
                isDead = false;
            }
        }
        if(isDead) {
        	$('#wrapperBattle').hide();
            document.querySelector('#pointsLose').innerHTML = 'Points: ' + globalValues.points;
            document.querySelector('#pointsLose').style.color = 'white';
        	$('#end-game').fadeIn(2000);
            return;
        }
        if(this.monster.count <= 0) {
            globalValues.monstersKilled++;
            console.log(globalValues.monstersKilled);
            if(globalValues.monstersKilled == 3) {
                $('#wrapperBattle').hide();
                $('#wrapperMap').css('display','none');
                $('#win').show();
                return;
            }
            document.querySelector('#turnOrderDisplay').innerHTML = '';
            document.querySelector('#battleScreen').innerHTML = '';
            $('#wrapperBattle').hide();
            document.querySelector('#pointsWin').innerHTML = 'Points: ' + globalValues.points;
            document.querySelector('#pointsWin').style.color = 'white';
            $('#wrapperMap').fadeIn(2000);
            $('#'+this.monster.name).css('visibility','hidden');

            return;
        }
        this.monsterOnTurn = this.turnOrder[0];
        var _this = this;
        if(this.hero.monsters.indexOf(this.monsterOnTurn) != -1){
            this.monster.innerDiv.children[0].onclick = function(){
                var ball = document.createElement('img');
                ball.style.display = 'inline';
                switch(_this.monsterOnTurn.name){
                    case 'hydra': ball.src = 'img/ball_green.png';break;
                    case 'dragon': ball.src = 'img/ball_blue.png';break;
                    case 'griffin': ball.src = 'img/ball_red.png';break;
                    case 'crab': ball.src = 'img/plant.png';break;
                }
                ball.style.position = 'absolute';
                ball.style.left = _this.monsterOnTurn.battleX + 'px';
                ball.style.top = _this.monsterOnTurn.battleY + 'px';
                ball.id = 'ball';
                var container = document.querySelector('#wrapperBattle');
                container.appendChild(ball);
                $('#ball').animate(
                    {
                        left: _this.monster.battleX + 'px',
                        top: _this.monster.battleY + 'px'
                    }, 1000, function(){
                        $('#ball').remove();
                        _this.monstersPassed++;
                        _this.monsterOnTurn.groupDamage = _this.monsterOnTurn.damage * _this.monsterOnTurn.count;
                        _this.monster.groupHP -= _this.monsterOnTurn.groupDamage;
                        globalValues.points += _this.monsterOnTurn.groupDamage;
                        _this.monster.count = Math.round(_this.monster.groupHP/_this.monster.hp);
                        _this.monster.innerDiv.innerHTML = '';
                        _this.displayMonster();
                        document.querySelector('#turnOrderDisplay').innerHTML = '';

                        _this.turnOrder.shift();
                        _this.turnOrderDisplay();

                        if(_this.turnOrder.length <= 1){
                            _this.turnOrder.shift();
                            _this.turnOrderInit();
                            for(var i = 0; i < _this.turnOrder.length;i++){
                                if(_this.turnOrder[i] == undefined || _this.turnOrder[i].count <= 0){
                                    _this.turnOrder.splice(i,1);
                                    i--;
                                }
                            }
                            _this.turnOrderSort();
                            _this.turnOrderDisplay();
                            _this.turnOrder.unshift(_this.monster);
                        }
                        _this.battleInit();
                    }
                );
            };
        }
        else {
            console.log(this.turnOrder);
            var bestMonster;
            var _this = this;
            var index;
            var random;

            do {
                random = Math.round(Math.random()*_this.helperArray.length - 1);
            } while(_this.helperArray[random] == 0 || !(_this.helperArray[random] instanceof MonsterGroup));
            if(_this.helperArray[random] != 0 && _this.helperArray[random] instanceof MonsterGroup){
                console.log('success');
                bestMonster = _this.helperArray[random];
            }
//            else if(_this.helperArray[1] != 0){
//                bestMonster = _this.helperArray[1];
//            }
//            else if(_this.helperArray[2] != 0){
//                bestMonster = _this.helperArray[2];
//            }
//            else if(_this.helperArray[3] != 0){
//                bestMonster = _this.helperArray[3];
//            }
            console.log(bestMonster);
            var ball = document.createElement('img');
            switch(this.monster.name){
                case 'locust': ball.src = 'img/ball_locust.png';break;
                case 'crab': ball.src = 'img/ball_locust.png';break;
                case 'uglyassmonster': ball.src = 'img/ball_locust.png';break;
            }
            ball.style.position = 'absolute';
            ball.style.left = _this.monster.battleX + 'px';
            ball.style.top = _this.monster.battleY + 'px';
            var container = document.querySelector('#wrapperBattle');
            container.appendChild(ball);
            ball.id = 'enemy_ball';
            $('#enemy_ball').animate({
                left: bestMonster.battleX + 'px',
                top: bestMonster.battleY + 'px'
            },1000, function(){
                $('#enemy_ball').remove();
                _this.monster.groupDamage = _this.monster.damage * _this.monster.count;
                bestMonster.groupHP -= _this.monster.groupDamage;
                bestMonster.count = Math.round(bestMonster.groupHP/bestMonster.hp);

                if(bestMonster.count <= 0) {
                    bestMonster.innerDiv.innerHTML = '';
                    _this.turnOrder.splice(_this.turnOrder.indexOf(bestMonster),1);
                    document.querySelector('#turnOrderDisplay').innerHTML = '';
                    for(var i = 0; i < _this.helperArray.length;i++){
                        if(_this.helperArray[i] == bestMonster) {
                            _this.helperArray[i] = 0;
                            break;
                        }
                    }
                    _this.turnOrderDisplay();
                }
                else {
                    bestMonster.innerDiv.children[1].innerHTML = bestMonster.count;
                    _this.displayMonster();
                    document.querySelector('#turnOrderDisplay').innerHTML = '';
                }
                _this.turnOrder.shift();
                if(_this.turnOrder.length == 0) {
                    _this.turnOrderInit();
                    _this.turnOrderSort();
                }
                document.querySelector('#turnOrderDisplay').innerHTML = '';
                _this.turnOrderDisplay();
                _this.battleInit();
            });
        }
    };

    this.leave = function() {
        var _this = this;
        $('#returnMap').on('click', function () {
            $('#wrapperBattle').hide();
            $('#wrapperMap').fadeIn(2000,function(){
                document.querySelector('#turnOrderDisplay').innerHTML = '';
                _this.turnOrder = [];
                document.querySelector('#battleScreen').innerHTML = '';
            });
        });
    };


    this.displayHeroArmy = function(){
        var monsters = this.hero.monsters;
        for(var i = 0; i < monsters.length;i++){
            if(monsters[i] instanceof MonsterGroup){
                monsters[i].battleX = 100;
                monsters[i].battleY = 150 * (i + 1);
                monsters[i].battleDraw(monsters[i].battleX,monsters[i].battleY);
                monsters[i].innerDiv.children[1].style.left = monsters[i].battleX + 100 + 'px';
                monsters[i].innerDiv.children[1].style.top = monsters[i].battleY +  50 + 'px';
            }
        }
    };

    this.displayMonster = function(){
        this.monster.battleDraw(1000,200);
        this.monster.innerDiv.children[1].style.left = 1000 - 40 + 'px';
        this.monster.innerDiv.children[1].style.top = 200 +  50 + 'px';
        this.monster.battleX = 960;
        this.monster.battleY = 250;
    };

    this.turnOrderInit = function() {
        this.turnOrder = [];
        for (var i = 0; i < this.hero.monsters.length; i++) {
            if (this.hero.monsters[i] instanceof MonsterGroup) {
                this.turnOrder[i] = this.hero.monsters[i];
            }
        }
        this.turnOrder.push(this.monster);
    };

    this.turnOrderSort = function(){
        if(this.turnOrder.length != 0) {
            var swapped;
            do {
                swapped = false;
                for (var i = 0; i < this.turnOrder.length - 1; i++) {
                    if (this.turnOrder[i].hp < this.turnOrder[i + 1].hp) {
                        var temp = this.turnOrder[i];
                        this.turnOrder[i] = this.turnOrder[i + 1];
                        this.turnOrder[i + 1] = temp;
                        swapped = true;
                    }
                }
            } while (swapped);
        }
    };
    this.turnOrderDisplay = function(){
        var turnOrderDiv = document.querySelector('#turnOrderDisplay');
        for(var i = 0; i < this.turnOrder.length;i++){
            var image = document.createElement('img');
            image.src = this.turnOrder[i].img;
            image.style.width = '70px';
            image.style.height ='70px';
            turnOrderDiv.appendChild(image);
            if(this.turnOrder[i] == this.monster) {
                image.style.backgroundColor = 'rgba(255,0,0,0.6)';
            }
            else {
                image.style.backgroundColor = 'rgba(0,255,0,0.6)';
            }
        }
    };
    return this.init();
}