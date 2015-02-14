Castle = Building.extend({
	init: function(){
		this._super.apply(this, arguments);
		this.population = '1000 gold';
		this.img =  'url(\'img/goldBottom.png\')';
	},
	getDefaultEnabled: function() {
        return true;
    },
    isBuyable: function() {
        return false;
    },
    canBreed : function() {
        return false;
    },
    getKey: function(){
    	return 'castle';
    },
    showMonster: function(){
    	return 'gold';
    }
    
});