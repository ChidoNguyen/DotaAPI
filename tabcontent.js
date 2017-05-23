document.getElementById("defaultOpen").click();
document.addEventListener('DOMContentLoaded',getMatch);
document.addEventListener('DOMContentLoaded',getHistKills);
document.addEventListener('DOMContentLoaded',getHistKillsQ);


function openTab(evt, tabStuff) {
    
    var i, tabcontent, tablinks;

    // Goes through my webpage and hides all of the information 
    tabcontent = document.getElementsByClassName("navbar_content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // makes it so all the tabs are not active
    tablinks = document.getElementsByClassName("navbar");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  // When clicked it'll get the DIV id corresponding with each button that was clicked.
  // and then populate it + turn the tab active with shading
    document.getElementById(tabStuff).style.display = "block";
    evt.currentTarget.className += " active";
   
}

//listens for clicks
function getMatch(){
	
	document.getElementById('get_form_matches').addEventListener('click',function(event){
		//extract form data//
		var steamid = document.getElementById('steam3id_match').value;
		var match_lim = "limit=" +document.getElementById('limit_match').value;
		var win_only = document.getElementById('win_match').value;
		var data;
		//start API request functions //
		var req = new XMLHttpRequest();
		req.open("GET", 'https://api.opendota.com/api/players/' + steamid + '/matches?'+ match_lim+'&' + win_only, true);
		
		//delays code in here until page is loaded, to preventDefault() submit refresh//
		req.addEventListener('load', function(){
			data = JSON.parse(req.responseText);
		//creating a new table for data population
		var table = document.createElement('table');
		document.getElementById('datapop').innerHTML = " ";// clears old table for every submit
		document.getElementById('datapop').appendChild(table);
		
		// creating table headers
		var table_head = document.createElement('th');
		table_head.textContent = "item count";
		table.appendChild(table_head);
		table_head = document.createElement('th');
		table_head.textContent = "match id";
		table.appendChild(table_head);
		//loops through our JSON object array to get match ID and
		//append child accordingly to table
		for(var i = 0; i < data.length; i++){
			var tmp = data[i];
			var id = tmp.match_id;
			
			var new_row = document.createElement('tr');
			table.appendChild(new_row);
			for(var x = 0; x < 2; x++){
				var new_data= document.createElement('td');
				if(x == 0){new_data.textContent = i + 1;}
				else{new_data.textContent = id;}
				
				new_row.appendChild(new_data);
			}
			
			
		}
		});
		req.send(null);
		event.preventDefault();
	});
}


function getHistKills(){
//add an event listener for our  submit button//
	document.getElementById('hist').addEventListener('click',function(event){
	var steamid = "44694420"; // we can populate this with getElementById and pull the form value if needed
  var field = "kills"; // simliar to steamid this can be populated by our form if implemented
	var data;
//communicate with the API server
// req is short for request
	var req = new XMLHttpRequest();
  // send a GET request
  req.open("GET", 'https://api.opendota.com/api/players/' + steamid + '/histograms/' + field, true);
  //add an event listener for the response to load
  req.addEventListener('load',function(){
  		data = JSON.parse(req.responseText); // convert to JSON object format
      //clear inner html + create new table element for our div histtab
      var table2 = document.createElement('table');
      document.getElementById('histtab').innerHTML=" ";
      document.getElementById('histtab').appendChild(table2);
            // create the two header for # of Kills and # of Game Occurences


	  	var table_head = document.createElement('th');
		table_head.textContent = field+ " count";
		table2.appendChild(table_head);
		
		var table_head = document.createElement('th');
		table_head.textContent = "# of game occurences";
		table2.appendChild(table_head);
     
       // for each object in the JSON array get X and games count
	   for(var i = 0; i < 20; i++){
			var tmp = data[i];
			var kills = tmp.x;
			var games = tmp.games;
			
			var new_row = document.createElement('tr');
			table2.appendChild(new_row);
			for(var x = 0; x < 2; x++){
				var new_data= document.createElement('td');
				if(x == 0){new_data.textContent = kills;}
				else{new_data.textContent = games;}
				
				new_row.appendChild(new_data);
			}
				
  
      
  }
	var explain = "As you can see the GET request pulls all match history information from the user, either from game 1 that they've ever played. Or whenever valve started tracking DoTA 2 match stats. We see there are times that the user has gotten 10 kills in 174 games. We can use this and create a bar graph to track trend, or pie chart, or plot it on a graph."
	document.getElementById('exp').textContent = explain;
	
  });
    
    req.send(null);
    event.preventDefault();
  });
}


function getHistKillsQ(){
//add an event listener for our  submit button//
	document.getElementById('histq').addEventListener('click',function(event){
	var steamid = "44694420"; // we can populate this with getElementById and pull the form value if needed
	var field = "kills"; // simliar to steamid this can be populated by our form if implemented
	
	//CHANGES TO URL VARIABLE//
	//hard coding the query in for our example but like before
	// query can be pulled from form data value if you wanted
	
	var query_payload = "date=10"
	
	
	var data;
//communicate with the API server
// req is short for request
	var req = new XMLHttpRequest();
  // send a GET request
  //ALTERING URL , tagging on a ?querykey=value, 
  // If we wanted more than one query separate with &
  
  req.open("GET", 'https://api.opendota.com/api/players/' + steamid + '/histograms/' + field +'?'+query_payload, true);
  //add an event listener for the response to load
  req.addEventListener('load',function(){
  		data = JSON.parse(req.responseText); // convert to JSON object format
      //clear inner html + create new table element for our div histtab
      var table2 = document.createElement('table');
      document.getElementById('histtab').innerHTML=" ";
      document.getElementById('histtab').appendChild(table2);
            // create the two header for # of Kills and # of Game Occurences


	  	var table_head = document.createElement('th');
		table_head.textContent = field+ " count";
		table2.appendChild(table_head);
		
		var table_head = document.createElement('th');
		table_head.textContent = "# of game occurences";
		table2.appendChild(table_head);
     
       // for each object in the JSON array get X and games count
	   for(var i = 0; i < 20; i++){
			var tmp = data[i];
			var kills = tmp.x;
			var games = tmp.games;
			
			var new_row = document.createElement('tr');
			table2.appendChild(new_row);
			for(var x = 0; x < 2; x++){
				var new_data= document.createElement('td');
				if(x == 0){new_data.textContent = kills;}
				else{new_data.textContent = games;}
				
				new_row.appendChild(new_data);
			}
				
  
      
  }
	var explain = "With the query added we are able to narrow down our data sample. With dates you can chart progress from 10 days ago to 20 days ago. You could also change it to limit only the last 100 games regardless of date. Or specificy a certain patch ID to see how you are doing in the recent game updates."
	document.getElementById('exp').textContent = explain;
	
  });
    
    req.send(null);
    event.preventDefault();
  });
}