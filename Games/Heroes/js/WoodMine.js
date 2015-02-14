WoodMine = Building.extend({
	init: function(){
		this._super.apply(this, arguments);
		this.population = '10 wood';
		this.img =  'url(\'img/wood.png\')';
	},
	getDefaultEnabled: function() {
        return true;
    },
	isBuyable: function(){
		return false;
	},
	getKey: function(){
    	return 'woodMine'; 
     },
     canBreed : function() {
         return false;
     }
});