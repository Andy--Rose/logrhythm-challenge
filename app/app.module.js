// Module
angular.module('gradesApp', ['forerunnerdb', 'newStudent', 'students'])
	.run(function ($rootScope, $fdb) {
		var db = $fdb.db('grades');
		$rootScope.$db = db
	})
	.controller('AppController', function AppController($scope) {

	});