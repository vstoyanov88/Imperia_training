CrabLayer = Building.extend({
	init: function(){
		this._super.apply(this,arguments);
		this.population = 3;
		this.monsterName = 'Crab';
		this.img = 'url(\'img/crab.png\')';
		this.monsterDamage = 10;
		this.monsterHealt = 20;
		this.monsterPrice = 200;
	},
    getKey: function(){
        return 'crab-layer';
    }
});