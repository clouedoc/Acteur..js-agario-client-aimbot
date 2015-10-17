var serveur = "";
var serveurKEY = "";

var region = 'TK-Turkey'; //server region to request
var http = require('http');
var AgarioClient = require('./agario-client.js'); //in your code you should do require('agario-client') to create agario client

var ActeurName = "Acteur." // You can change the name of the Acteur if you want.
var numberOfConnected = 0;

var ActeurID = 0; // list of ID of the Acteur.
var PositionX = 0; // PositionX of the Acteur.
var positionY = 0 // PositionY of the Acteur. (ou dernière postion connue)
var lost = true;

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
			ball.on('move', function(old_x, old_y, new_x, new_y) {				
				PositionX = ball.x;
				PositionY = ball.y;
				moveCells(PositionX, PositionY);
			});
		}
		
	}
	
});




