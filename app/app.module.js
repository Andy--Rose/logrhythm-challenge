// Module
angular.module('gradesApp', ['forerunnerdb', 'newStudent', 'students', 'summary'])
	.run(function ($rootScope, $fdb) {
		$rootScope.studentCollection = $fdb.db('grades').collection('students');
	})
	.controller('AppController', function AppController($scope) {

	});