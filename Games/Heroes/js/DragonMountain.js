DragonMountain = Building.extend({
	init: function(){
		this._super.apply(this,arguments);
		this.monsterName = 'Dragon';
		this.population = 1;
		this.img = 'url(\'img/dragon.png\')';
		this.monsterDamage = 20;
		this.monsterHealt = 50;
		this.monsterPrice = 1500;
	},
	 getKey: function(){
    	return 'dragon'; 
    }
});