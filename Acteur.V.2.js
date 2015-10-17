var serveur = "";
var serveurKEY = "";

var region = 'TK-Turkey'; //server region to request
var http = require('http');
var AgarioClient = require('agario-client'); //in your code you should do require('agario-client') to create agario client

var ActeurName = "Acteur." // You can change the name of the Acteur if you want.
var numberOfConnected = 0;

var ActeurID = 0; // list of ID of the Acteur.
var PositionX = 0; // PositionX of the Acteur.
var positionY = 0 // PositionY of the Acteur. (ou dernière postion connue)
var lost = true;
var otherSuicidaire = false;

var suicidaire1 = new AgarioClient("suicidaire");
var suicidaire2 = new AgarioClient("suicidaire");
var suicidaire3 = new AgarioClient("suicidaire");
var suicidaire4 = new AgarioClient("suicidaire");

if (serveur == "") { // si aucun serveur n'est spécifié...
	AgarioClient.servers.getPartyServer({party_key: serveurKEY},  function(srv) { // chercher un serveur avec la partieKEY renseignée
		if (!srv.server) {// si un probleme survient...
			console.log("probleme de connection");
			return;
		}
		else 
		{serveur = 'ws://' + srv.server;
		serveurKEY = srv.key;
		launch();}

	}); 
	
}
else {
	launch();	
};

function launch() { // connect bot to a server
	suicidaire1.connect(serveur, serveurKEY);
	suicidaire2.connect(serveur, serveurKEY);
	suicidaire3.connect(serveur, serveurKEY);
	suicidaire4.connect(serveur, serveurKEY);
}

function moveCells(x, y) { // move cells
	
	suicidaire1.moveTo(x, y);
	suicidaire2.moveTo(x, y);
	suicidaire3.moveTo(x, y);
	suicidaire4.moveTo(x, y);
	
}

function explore() { // explore the map with the bots	
	console.log("exploration en cours :-)");
	suicidaire1.moveTo(0, 0);
	suicidaire2.moveTo(10000, 0);
	suicidaire3.moveTo(0, 10000);
	suicidaire4.moveTo(10000, 10000);
		
}

suicidaire1.on('connected', function() {
	
	numberOfConnected++
	if (numberOfConnected == 4) {
		suicidaire1.spawn("free f0o0o0od !")
		explore();
		
	}
});
suicidaire2.on('connected', function() {
	
	numberOfConnected++
	if (numberOfConnected == 4) {
		suicidaire2.spawn("free f0o0o0od !")
		explore();
		
	}
});
suicidaire3.on('connected', function() {
	
	numberOfConnected++
	if (numberOfConnected == 4) {
		suicidaire3.spawn("free f0o0o0od !")
		explore();
		
	}
});
suicidaire4.on('connected', function() {
		numberOfConnected++
	if (numberOfConnected == 4) {
		suicidaire4.spawn("free f0o0o0od !")
		explore();
		
	}
});

suicidaire1.on('ballAppear', function(ball_id) {
	ball = suicidaire1.balls[ball_id];
	if (ball.mine) return;
	if (ActeurID == 0) {
		if (ball.name == "Acteur.") {			
			ActeurID = ball_id;
			PositionX = ball.x;
			PositionY = ball.y;
			moveCells(PositionX, PositionY);
			lost = false;
			ball.on('move', function(old_x, old_y, new_x, new_y) {				
				PositionX = ball.x;
				PositionY = ball.y;
				moveCells(PositionX, PositionY);
			});
		}
	}
	if (ball_id == ActeurID) {
		if (lost == true) {
			PositionX = ball.x;
			PositionY = ball.y;
			moveCells(PositionX, PositionY);
			lost = false;
			ball.on('disappear', function() {
				console.log("acteur disparu")
				lost = true;				
			})
			ball.on('move', function(old_x, old_y, new_x, new_y) {
				if (ball.visible == true) 
				{
				PositionX = ball.x;
				PositionY = ball.y;
				moveCells(PositionX, PositionY);
				}
				else {
					console.log("ball invisible !!!");
					
				}
			});
		}
		
	}
	if (ball.name = "suicidaire") {
		
		otherSuicidaire = true;
		console.log('other suicidaire found.');
		ball.on("destroy", function(ball_id, reason) {
			if (reason.reason == 'eaten') {
				if (reason.by == ActeurID) {
					console.log("un suicidaire a été mangé par l'acteur.");
					if (suicidaire1.my_balls.lenghts == 0) {
						suicidaire1.spawn("suicidaire");
						
					}
					
				}
				else
				{
					
					otherSuicidaire = false;
				}
				
			}
			else {
				
				otherSuicidaire = false;
			}
			
		})
	}
	
	
});


suicidaire1.on('somebodyAteSomething', function(eater_id, eaten_id) {
	
	if (eater_id == ActeurID && eaten_id == suicidaire1.my_balls) {		
		console.log("l'acteur m'a mangé !!!!!");
		if (otherSuicidaire == true) {
			suicidaire1.spawn("suicidaire");
		}
	}
	else {
		
		if (eaten_id == suicidaire1.my_balls) {
			
			suicidaire1.spawn("suicidaire");
		}
	}
	
});

suicidaire2.on('ballAppear', function(ball_id) {
	ball = suicidaire2.balls[ball_id];
	if (ball.mine) return;
	if (ActeurID == 0) {
		if (ball.name == "Acteur.") {			
			ActeurID = ball_id;
			PositionX = ball.x;
			PositionY = ball.y;
			moveCells(PositionX, PositionY);
			lost = false;
			ball.on('move', function(old_x, old_y, new_x, new_y) {				
				PositionX = ball.x;
				PositionY = ball.y;
				moveCells(PositionX, PositionY);
			});
		}
	}
	if (ball_id == ActeurID) {
		if (lost == true) {
			PositionX = ball.x;
			PositionY = ball.y;
			moveCells(PositionX, PositionY);
			lost = false;
			ball.on('disappear', function() {
				console.log("acteur disparu")
				lost = true;				
			})
			ball.on('move', function(old_x, old_y, new_x, new_y) {
				if (ball.visible == true) 
				{
				PositionX = ball.x;
				PositionY = ball.y;
				moveCells(PositionX, PositionY);
				}
				else {
					console.log("ball invisible !!!");
					
				}
			});
		}
		
	}
	if (ball.name = "suicidaire") {
		
		otherSuicidaire = true;
		console.log('other suicidaire found.');
		ball.on("destroy", function(ball_id, reason) {
			if (reason.reason == 'eaten') {
				if (reason.by == ActeurID) {
					console.log("un suicidaire a été mangé par l'acteur.");
					if (suicidaire2.my_balls.lenghts == 0) {
						suicidaire2.spawn("suicidaire");
						
					}
					
				}
				else
				{
					
					otherSuicidaire = false;
				}
				
			}
			else {
				
				otherSuicidaire = false;
			}
			
		})
	}
	
	
});

suicidaire2.on('somebodyAteSomething', function(eater_id, eaten_id) {
	
	if (eater_id == ActeurID && eaten_id == suicidaire2.my_balls) {		
		console.log("l'acteur m'a mangé !!!!!");
		if (otherSuicidaire == true) {
			suicidaire2.spawn("suicidaire");
		}
	}
	else {
		
		if (eaten_id == suicidaire2.my_balls) {
			
			suicidaire2.spawn("suicidaire");
		}
	}
	
});

suicidaire3.on('ballAppear', function(ball_id) {
	ball = suicidaire3.balls[ball_id];
	if (ball.mine) return;
	if (ActeurID == 0) {
		if (ball.name == "Acteur.") {			
			ActeurID = ball_id;
			PositionX = ball.x;
			PositionY = ball.y;
			moveCells(PositionX, PositionY);
			lost = false;
			ball.on('move', function(old_x, old_y, new_x, new_y) {				
				PositionX = ball.x;
				PositionY = ball.y;
				moveCells(PositionX, PositionY);
			});
		}
	}
	if (ball_id == ActeurID) {
		if (lost == true) {
			PositionX = ball.x;
			PositionY = ball.y;
			moveCells(PositionX, PositionY);
			lost = false;
			ball.on('disappear', function() {
				console.log("acteur disparu")
				lost = true;				
			})
			ball.on('move', function(old_x, old_y, new_x, new_y) {
				if (ball.visible == true) 
				{
				PositionX = ball.x;
				PositionY = ball.y;
				moveCells(PositionX, PositionY);
				}
				else {
					console.log("ball invisible !!!");
					
				}
			});
		}
		
	}
	if (ball.name = "suicidaire") {
		
		otherSuicidaire = true;
		console.log('other suicidaire found.');
		ball.on("destroy", function(ball_id, reason) {
			if (reason.reason == 'eaten') {
				if (reason.by == ActeurID) {
					console.log("un suicidaire a été mangé par l'acteur.");
					if (suicidaire3.my_balls.lenghts == 0) {
						suicidaire3.spawn("suicidaire");
						
					}
					
				}
				else
				{
					
					otherSuicidaire = false;
				}
				
			}
			else {
				
				otherSuicidaire = false;
			}
			
		})
	}
	
	
});


suicidaire3.on('somebodyAteSomething', function(eater_id, eaten_id) {
	
	if (eater_id == ActeurID && eaten_id == suicidaire3.my_balls) {		
		console.log("l'acteur m'a mangé !!!!!");
		if (otherSuicidaire == true) {
			suicidaire3.spawn("suicidaire");
		}
	}
	else {
		
		if (eaten_id == suicidaire3.my_balls) {
			
			suicidaire3.spawn("suicidaire");
		}
	}
	
});

suicidaire4.on('ballAppear', function(ball_id) {
	ball = suicidaire4.balls[ball_id];
	if (ball.mine) return;
	if (ActeurID == 0) {
		if (ball.name == "Acteur.") {			
			ActeurID = ball_id;
			PositionX = ball.x;
			PositionY = ball.y;
			moveCells(PositionX, PositionY);
			lost = false;
			ball.on('move', function(old_x, old_y, new_x, new_y) {				
				PositionX = ball.x;
				PositionY = ball.y;
				moveCells(PositionX, PositionY);
			});
		}
	}
	if (ball_id == ActeurID) {
		if (lost == true) {
			PositionX = ball.x;
			PositionY = ball.y;
			moveCells(PositionX, PositionY);
			lost = false;
			ball.on('disappear', function() {
				console.log("acteur disparu")
				lost = true;				
			})
			ball.on('move', function(old_x, old_y, new_x, new_y) {
				if (ball.visible == true) 
				{
				PositionX = ball.x;
				PositionY = ball.y;
				moveCells(PositionX, PositionY);
				}
				else {
					console.log("ball invisible !!!");
					
				}
			});
		}
		
	}
	if (ball.name = "suicidaire") {
		
		otherSuicidaire = true;
		console.log('other suicidaire found.');
		ball.on("destroy", function(ball_id, reason) {
			if (reason.reason == 'eaten') {
				if (reason.by == ActeurID) {
					console.log("un suicidaire a été mangé par l'acteur.");
					if (suicidaire4.my_balls.lenghts == 0) {
						suicidaire4.spawn("suicidaire");
						
					}
					
				}
				else
				{
					
					otherSuicidaire = false;
				}
				
			}
			else {
				
				otherSuicidaire = false;
			}
			
		})
	}
	
	
});


suicidaire4.on('somebodyAteSomething', function(eater_id, eaten_id) {
	
	if (eater_id == ActeurID && eaten_id == suicidaire4.my_balls) {		
		console.log("l'acteur m'a mangé !!!!!");
		if (otherSuicidaire == true) {
			suicidaire4.spawn("suicidaire");
		}
	}
	else {
		
		if (eaten_id == suicidaire4.my_balls) {
			
			suicidaire4.spawn("suicidaire");
		}
	}
	
});



