Building = Class.extend({
	init: function(div, panel, image, city, name, gold, wood, ore ){
		this.$div = $(div);

        var _this= this;
        this.$div.on('click', function() {
        	if (_this.isBuild){
        		 $('#btn-buy-monster').removeClass('hidden');
        	} else{
        		 $('#btn-buy-monster').addClass('hidden');
        	}
            _this.renderInPanel();
            _this.informCity();
        });
        this.$panel = $(panel);
        this.image = image;
        this.city = city;
        this.enabled = this.getDefaultEnabled();
        this.isBuild = false;
        this.gold = gold;
        this.wood = wood;
        this.ore = ore;
        this.name = name;
        this.monsterName = 'name';
        this.img = 'image';
        this.monsterHealt = 'healt';
        this.monsterDamage = 'damage';
        this.monsterPrice = 'price';
        this.population = 0;
        this.populationNumber = this.population;
	},
	
    getKey: function(){
    	throw new Error('not implemented') 
    },
    
    informCity: function(){
       	this.city.activeBuilding = this.getKey();
    },
    
	renderInPanel: function() {
		
		this.$panel.find('#building-gold').html('gold: '+ this.gold);
		this.$panel.find('#building-wood').html('wood: '+ this.wood);
		this.$panel.find('#building-ore').html('ore: ' + this.ore);
		this.$panel.find('#building-name').html('');
        this.$panel.find('#monster-name').html('');
        this.$panel.find('#monster-img').css('background','none')
        this.$panel.find('#monster-healt').html('');
        this.$panel.find('#monster-damage').html('');
        this.$panel.find('#monster-price').html('');
        this.$panel.find('#population').html('');
		this.$panel.find('#building-name').html('');
		this.$panel.find('#population').html('');
        this.$panel.find('#monster-number').html('');
        
        this.$panel.find('.image-placeholder img').attr('src', this.image.src);
        this.$panel.find('#population').html(this.population + ' per day');
        this.$panel.find('#monster-img').css('background', this.img);
        this.$panel.find('#monster-img').css('backgroundSize', '100% 100%');
        
        if (this.canBuy() && !this.isBuild) {
            this.$panel.find('.buy-btn-placeholder').removeClass('hidden');
        } else {
            this.$panel.find('.buy-btn-placeholder').addClass('hidden');
        }
        if (this.isBuyable()){
        	this.showMonster();
        }
    },
    showMonster: function(){
    	this.$panel.find('#building-name').html(this.name);
        this.$panel.find('#monster-name').html(this.monsterName);
       
       
        this.$panel.find('#monster-healt').html('healt: ' + this.monsterHealt);
        this.$panel.find('#monster-damage').html('damage: ' + this.monsterDamage);
        this.$panel.find('#monster-price').html('price: ' + this.monsterPrice);
        
        this.$panel.find('#monster-number').html(this.populationNumber);
    },
    canBuy: function () {
        return !this.enabled && this.isBuyable(); 
    },

    getDefaultEnabled: function() {
        return false && this.isBuild;
    },
    isBuyable: function() {
        return true;
    },

    canBreed : function() {
        return true;
    }
    
});