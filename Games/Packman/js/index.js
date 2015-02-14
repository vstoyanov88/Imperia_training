$(document).ready(function(){
	$('#start').click(function(){
		$('#start').css('display', 'none');
		var game = new Game(document.getElementById('canvas').getContext('2d'));	
	});
	$('#play').click(function(){
		$('#gameOver').css('display', 'none');
		var game = new Game(document.getElementById('canvas').getContext('2d'));	
	});
})