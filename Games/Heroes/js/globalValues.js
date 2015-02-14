var globalValues = {
    gold: 4000,
    wood: 10,
    ore: 10,
    points: 0,
    dayCount: 1,
    monstersKilled: 0,
   
    display: function(container){
        var resourceDiv = document.querySelector(container);
        for(var i = 0; i < resourceDiv.children.length;i++){
            if(resourceDiv.children[i].tagName == 'LABEL'){
                for(var j = 0;j < 3;j++){
                    resourceDiv.removeChild(resourceDiv.lastChild);
                }
                break;
            }
        }
        var dispGold = document.createElement('label');
        dispGold.style.color = 'yellow';
        var dispWood = document.createElement('label');
        dispWood.style.color = '#663300';
        var dispOre = document.createElement('label');
        dispOre.style.color = '#272727';
        dispGold.className = 'resource_display';
        dispWood.className = 'resource_display';
        dispOre.className = 'resource_display';



        dispGold.innerHTML = 'GOLD ' + this.gold;
        dispWood.innerHTML = 'WOOD ' + this.wood;
        dispOre.innerHTML = 'ORE ' + this.ore;

        resourceDiv.appendChild(dispGold);
        resourceDiv.appendChild(dispWood);
        resourceDiv.appendChild(dispOre);
    }
};