angular.module('students', [])
	.controller('StudentsController', function ($scope, $fdb){
		var studentsFromDB = $fdb.db('grades').collection('students').find();
		this.students = [
			{
				"firstName": "Ben",
				"lastName": "Dummy",
				"grade": 43
			},
			{
				"firstName": "Jenn",
				"lastName": "Smarts",
				"grade": 99
			},
			{
				"firstName": "Joe",
				"lastName": "Shmoe",
				"grade": 78
			}
		];
	});