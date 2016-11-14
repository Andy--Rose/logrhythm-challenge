// Module
angular.module('gradesApp', ['forerunnerdb', 'newStudent', 'students', 'summary'])
	.run(function ($rootScope, $fdb) {
		$rootScope.summaryCollection = $fdb.db('grades').collection('summary');
		$rootScope.studentCollection = $fdb.db('grades').collection('students');
	})
	.controller('AppController', function AppController($scope) {

	});