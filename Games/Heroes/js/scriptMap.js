window.addEventListener('load', load);
function load(){
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    var resourcesDiv = document.querySelector('#resources');
    resourcesDiv.addEventListener('click',function(e){
        e.preventDefault();
    });
    var hero = new Hero(0,300,'img/hero.png',ctx,[1000]);
    var monster1 = new MonsterGroup('crab','img/crab_left.png',10,10,5,100,200,300,hero);
    monster1.mapDraw(monster1.x,monster1.y);
    var monster2 = new MonsterGroup('locust','img/locust_small.png',10,10,3,50,600,100,hero);
    monster2.mapDraw(monster2.x,monster2.y);
    var monster3 = new MonsterGroup('uglyassmonster','img/ugly_ass_monster.png',10,20,4,50,600,300,hero);
    monster3.mapDraw(monster3.x,monster3.y);

    var map = new Map(300,200,ctx,hero,[monster1,monster2,monster3]);

    window.resources = new ResourceLoader({
        'castle': 'img/buildings/castle.png',
        'castle_bw': 'img/buildings/castle_bw.png',
        'glass-hall': 'img/buildings/glass-hall.png',
        'glass-hall_bw': 'img/buildings/glass-hall_bw.png',
        'crab-layer': 'img/buildings/crab_layer.png',
        'crab-layer_bw': 'img/buildings/crab_layer_bw.png',
        'dragon': 'img/buildings/dragon.png',
        'dragon_bw': 'img/buildings/dragon_bw.png',
        'magic-tree': 'img/buildings/magic-tree.png',
        'magic-tree_bw': 'img/buildings/magic-tree_bw.png',
        'woodMine': 'img/buildings/woodMine.png',
        'oreMine': 'img/buildings/oreMine.png'
    });
    
    $('#no-army').hide();
    $('#win').hide();
    $('#no-stamina').hide();
    $('#end-game').hide();
    resources.load();
    var city = new City(hero);
}
