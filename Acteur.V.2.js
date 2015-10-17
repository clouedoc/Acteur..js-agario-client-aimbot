var serveur = "";
var serveurKEY = "";

var region = 'TK-Turkey'; //server region to request
var http = require('http');
var AgarioClient = require('./agario-client.js'); //in your code you should do require('agario-client') to create agario client

var ActeurName = "Acteur." // You can change the name of the Acteur if you want.


var ActeurIDList = []; // list of ID of the Acteur.
var PositionX = 0; // PositionX of the Acteur.
var positionY = 0 // PositionY of the Acteur.

var suicidaire1 = new AgarioClient("suicidaire1");
var suicidaire2 = new AgarioClient("suicidaire2");
var suicidaire3 = new AgarioClient("suicidaire3");
var suicidaire4 = new AgarioClient("suicidaire4");




