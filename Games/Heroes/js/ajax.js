//function loadGames(){
//	var url = 'http://ittalentsapi.bashibozuk.eu/game/?X-GameID=105/users/register';
//
//	$.ajax(url,{
//		method: 'GET',
//		crossDomain: true,
//		success: function(data){
//			var table = '<table>'
//			$(data).each(function(i, val){
//				table += '<tr>';
//				table += '<td>' + val.title + '</td>';
//				
//				table += '</tr>';
//			});
//			table += '</table>';
//			
//			$('#ajax-result').html(table);
//		}
//		
//	})
//}
//
//loadGames()

var url = 'http://ittalentsapi.bashibozuk.eu/game/?X-GameID=105';

function makeRequest() {
	var request = new XMLHttpRequest();
	var method = 'GET';
	var async = true;
	request.open(method, url, async);
	//request.setRequestHeader('Accept', 'text/xml');
	//request.setRequestHeader('Origin', 'test');
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			var response = request.responseText;
			var objectsList = JSON.parse(request.responseText);
			makeTable(objectsList);
		}
	}
	
	request.send();
	
}

function makeTable(objects) {
	var container = document.getElementById('result-container');
	if (objects.length == 0) {
		container.innerHTML = 'No results for this request';
		return;
	}
	
	container.innerHTML = '';
	
	var fragment = document.createDocumentFragment();
	var table = document.createElement('table');
	var thead = document.createElement('thead');
	var headRow = document.createElement('tr');
	//id, start_time, end_time, score
	var th1 = document.createElement('th');
	th1.innerHTML = 'ID';
	headRow.appendChild(th1);
	
	var th2 = document.createElement('th');
	th2.innerHTML = 'Start Time';
	headRow.appendChild(th2);
	
	var th3 = document.createElement('th');
	th3.innerHTML = 'End Time';
	headRow.appendChild(th3);
	
	var th4 = document.createElement('th');
	th4.innerHTML = 'Score';
	headRow.appendChild(th4);
	
	thead.appendChild(headRow);
	table.appendChild(thead);
	
	var tbody = document.createElement('tbody');
	
	for (var i = 0; i < objects.length; i++) {
		var row = document.createElement('tr');
		
		var idCell = document.createElement('td');
		idCell.innerHTML = objects[i].id;
		row.appendChild(idCell);
		
		var startTimeCell = document.createElement('td');
		var startTime = '-/-';
		if (objects[i].start_time) {
			var date = new Date(parseInt(objects[i].start_time) * 1000);
			startTime = date.getDate() + '.' + (date.getMonth() + 1)  + '.' + date.getFullYear();
		}
		
		startTimeCell.innerHTML = startTime;
		row.appendChild(startTimeCell);
		
		var endTimeCell = document.createElement('td');
		endTime =  '-/-';
		if (objects[i].end_time) {
			var date = new Date(parseInt(objects[i].end_time) * 1000);
			endTime = date.getDate() + '.' + (date.getMonth() + 1)  + '.' + date.getFullYear();
		}
		
		endTimeCell.innerHTML = endTime;
		row.appendChild(endTimeCell);
		
		var scoreCell = document.createElement('td');
		scoreCell.innerHTML = objects[i].score;
		row.appendChild(scoreCell);
		
		tbody.appendChild(row);
	}
	
	table.appendChild(tbody);
	fragment.appendChild(table);
	
	container.appendChild(fragment);
	
	
}

window.onload = function() {
	makeRequest();
}