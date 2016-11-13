// Module
angular.module('gradesApp', ['forerunnerdb', 'newStudent', 'students'])
	.run(function ($rootScope, $fdb) {
		var students = $fdb.db('grades').collection('students');
		students.load(function (err, tableStats, metaStats) {
		    if (!err) {
		        // $rootScope.$db = db;
				// $rootScope.$students = db.collection('students');
				if (students._data.length == 0) {
					console.log("INFO: Adding default students to empty db.");
					defaultStudents = [
						{
							"_id": 15,
							"firstName": "John",
							"lastName": "Doe",
							"grade": 43
						},
						{
							"_id": 16,
							"firstName": "Jenn",
							"lastName": "Smarts",
							"grade": 99
						},
						{
							"_id": 17,
							"firstName": "Joe",
							"lastName": "Shmoe",
							"grade": 78
						}
					];
					students.insert(defaultStudents);
				}
				// Even if the loaded data was not modified, it still has to be saved in order to 
				// maintain over multiple refreshes. I am not a fan of this package...
				students.save(function(err) {
					if (err) {
						console.log("ERROR: Failed saving db.\n" + err);
					} else {
						console.log("INFO: Saved db.")
					}
				});
		    }
		});
	})
	.controller('AppController', function AppController($scope) {

	});