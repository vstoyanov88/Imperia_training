OreMine = Building.extend({
	init: function(){
		this._super.apply(this, arguments);
		this.population = '10 ore';
		this.img =  'url(\'img/ore.png\')';
	},
	getDefaultEnabled: function() {
        return true;
    },
    isBuyable: function() {
        return false;
    },
	 getKey: function(){
    	return 'oreMine'; 
    },
    canBreed : function() {
        return false;
    }
});