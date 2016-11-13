// Module
angular.module('gradesApp', ['forerunnerdb', 'newStudent', 'students'])
	.run(function ($rootScope, $fdb) {
		var students = $fdb.db('grades').collection('students');
		students.load();
		students.load();
		// $rootScope.$db = db;
		// $rootScope.$students = db.collection('students');

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
		students.save();
	})
	.controller('AppController', function AppController($scope) {

	});