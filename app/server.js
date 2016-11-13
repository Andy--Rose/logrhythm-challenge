var Express = require('express');
// var ForerunnerDB = require('forerunnerdb');

// // Set up the DB
// var fdb = new ForerunnerDB();
// var db = fdb.db("grades");
// db.persist.dataDir("./app/data/grades");
// db.persist.auto(true);

// // create then load the students from the DB
// var students = db.collection("students");
// students.load(function(err, tableStats, metaStats) {
// 	if (err) {
// 		console.log("ERROR: Failed loading DB collection for Students.\n" + err);
// 	} else {
// 		console.log("INFO: Loaded DB collection Students:\n" + tableStats + "\n" + metaStats);
// 	}
// })

// configure the server
const Server = Express()
const Port = 3000;

var routeOptions = {
	root: __dirname,
	dotfiles: 'allow',
	headers: {
		root: __dirname,
		'x-timestamp': Date.now(),
		'x-sent': true
	}
};

// include all files in directory
Server.use(Express.static(__dirname));

// set route for home page
fileName = 'index.html';
Server.get('/', function(request, response) {
	response.sendFile(fileName, routeOptions, function(err) {
		if (err) {
			console.log("failed loading home page.\n" + err);
			response.status(err.status).end();
		}
		else {
			console.log('Sent: ', fileName)
		}
	});
});

// return 201 for created
// Server.post('/save-data', function(request, response) {
// 	console.log(students);
// 	students.save();
// });

// create server to listen for calls to the port
Server.listen(Port, function(err) {
	if (err) {
		console.log("ERROR: " + err);
	}

	console.log("Web server is listening on port " + Port);
})