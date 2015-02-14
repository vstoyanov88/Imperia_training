GlassHall = Building.extend({
	init: function(){
		this._super.apply(this,arguments);
		this.monsterName = 'Hydra';
		this.population = 1;
		this.img = 'url(\'img/hydra.png\')';
		this.monsterDamage = 18;
		this.monsterHealt = 45;
		this.monsterPrice = 1000;
	},
	
	 canBuy: function () {
        return !this.enabled && this.isBuyable(); 
    },
    
    getKey: function(){
    	return 'glass-hall'; 
    }
});