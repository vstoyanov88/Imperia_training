MagicTree = Building.extend({
	init: function(){
		this._super.apply(this,arguments);
		this.monsterName = 'Griffin';
		this.population = 2;
		this.img = 'url(\'img/griffin.png\')';
		this.monsterDamage = 10;
		this.monsterHealt = 25;
		this.monsterPrice = 500;
	},
	 getKey: function(){
    	return 'magic-tree'; 
    }
});