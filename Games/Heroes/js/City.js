City = Class.extend({
	init: function(hero){
		this.city = document.getElementById('city');
		this.panel = document.getElementById('side-panel');
		this.hero = document.getElementById('hero');
        this.heroObj = hero;
		this.activeBuilding = null;
		this.isBuilded = false;
		
		var _this = this;
		 $('#end_img').on('click',function(){
			 _this.isBuilded = false;
			 globalValues.gold += 1000;
			 globalValues.wood += 10;
			 globalValues.ore += 10;
			 globalValues.display('#resources');
			 
			 if (_this.buildings['crab-layer'].isBuild){
			 	_this.buildings['crab-layer'].populationNumber += _this.buildings['crab-layer'].population;
			 }
			 if (_this.buildings['glass-hall'].isBuild){
			 	_this.buildings['glass-hall'].populationNumber += _this.buildings['glass-hall'].population;
			 }
			 if (_this.buildings['dragon'].isBuild){
				 _this.buildings['dragon'].populationNumber += _this.buildings['dragon'].population;
			 }
			 if ( _this.buildings['magic-tree'].isBuild){
				 _this.buildings['magic-tree'].populationNumber += _this.buildings['magic-tree'].population;
			 }
			 
			
	    }),
		this.buildings = {
            'castle': new Castle(document.querySelector('.castle'), this.panel, resources.get('castle'), this, 'Castle'),
            'glass-hall': new GlassHall(document.querySelector('.glass-hall'), this.panel, resources.get('glass-hall'), this ,'Glass Hall',1000,10,10),
            'crab-layer': new CrabLayer(document.querySelector('.crab-layer'), this.panel, resources.get('crab-layer'), this ,'Grab Layer',500,10,10),
            'dragon': new DragonMountain(document.querySelector('.dragon'), this.panel, resources.get('dragon'), this, 'Dragon\s Mountain',1200,10,10),
            'magic-tree': new MagicTree(document.querySelector('.magic-tree'), this.panel, resources.get('magic-tree'), this ,'Magic Tree',1000,10,10),
			'woodMine': new WoodMine(document.querySelector('.woodMine'), this.panel, resources.get('woodMine'), this, 'Wood Mine',1000,10,10),
			'oreMine': new OreMine(document.querySelector('.oreMine'), this.panel, resources.get('oreMine'), this,'Ore Mine',1000,10,10)
		};
		
        $('#btn-buy-building').on('click', function() {
        	_this.onBuyBuildingClick();
        });
        $('#btn-buy-monster').on('click',function(){
            _this.buyMonster();
        });
        
        $('#btn-getOut').on('click',function(){
        	$('#wrapperCity').hide();
        	$('#wrapperMap').fadeIn(2000);

        });
	},
	
    buyBuilding: function(name) {
    	$(name).removeClass('disabled').addClass('enabled');
    },
    
    onBuyBuildingClick: function() {
    	if (this.activeBuilding == null){
    		return;
    	} 
    	var building = this.buildings[this.activeBuilding];
        if(globalValues.gold >= building.gold && globalValues.wood >= building.wood && globalValues.ore >= building.ore && !this.isBuilded){
            building.isBuild = true;
            this.isBuilded = true;
            if(building.isBuild == true){
                $('.buy-btn-placeholder').addClass('hidden');
                $('#btn-buy-monster').removeClass('hidden');
            }
            else {
                alert('sauce');
            }
            this.buyBuilding(building.$div);
            globalValues.gold -= building.gold;
            globalValues.wood -= building.wood;
            globalValues.ore -= building.ore;
            globalValues.display('#resources_city');
            
            building.populationNumber = building.population;
            document.getElementById('monster-number').innerHTML = building.populationNumber;
        }
        else {
           return;
        }
    },
    buyMonster: function(){
        var building = this.buildings[this.activeBuilding];
        if ( globalValues.gold >= building.monsterPrice && building.populationNumber > 0){
	        switch(this.activeBuilding){
	            case 'glass-hall':this.spawnCreature('hydra',45,18);break;
	            case 'dragon':this.spawnCreature('dragon',50,20);break; 
	            case 'magic-tree': this.spawnCreature('griffin',25,10);break;
	            case 'crab-layer': this.spawnCreature('crab',20,10);break;
	        }
	        building.populationNumber--;
	        document.getElementById('monster-number').innerHTML = building.populationNumber;
	        globalValues.gold -= building.monsterPrice;
	        globalValues.display('#resources_city');
        } 
    },

    spawnCreature: function(name,hp,damage){
        var hasGroup = false;
        var divs = document.querySelectorAll('.pos');
        var monsters = this.heroObj.monsters;
        for(var i = 0;i < monsters.length;i++){
            if(monsters[i] instanceof MonsterGroup && monsters[i].name == name){
                monsters[i].incrementGroup(1);
                divs[i].innerHTML = monsters[i].count;
                hasGroup = true;
                break;
            }
        }

        if(!hasGroup){
            for(var j = 0; j < monsters.length;j++){
                if(!(monsters[j] instanceof  MonsterGroup)){
                    monsters[j] = new MonsterGroup(name,'img/'+ name +'.png',1,hp,damage,100);
                    divs[j].style.backgroundColor = 'rgba(255,255,255,0.3)';
                    divs[j].style.backgroundImage = "url("+monsters[j].img+")";
                    divs[j].style.backgroundSize = '100% 100%';
                    divs[j].innerHTML += monsters[j].count;
                    break;
                }
            }
        }
    }
});