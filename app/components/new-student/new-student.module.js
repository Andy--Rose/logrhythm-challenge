angular.module("newStudent", [])
	.controller('NewStudentController', [ '$scope', function ($scope, $http, $fdb) {
		$scope.validation = {
			"inputRegex": /^\s*\w*\s*$/,
			"maxLength": 10
		};
		$scope.newStudent = {
			"firstName": "John",
			"lastName": "Doe",
			"grade": 50
		};
		$scope.saveNewStudent = function() {
			$scope.$root.studentCollection.insert($scope.newStudent);
			console.log("INFO: Stored " + $scope.newStudent.firstName + " " + $scope.newStudent.lastName + " to the DB.");

			$scope.$root.studentCollection.save(function(err) {
				if (err) {
					console.log("ERROR: Failed saving DB to file.");
				} else {
					console.log("INFO: Save the grades DB file.");
				}
			});
			$scope.resetInput();
		};

		$scope.resetInput = function() {
			$scope.newStudent.firstName = "";
			$scope.newStudent.lastName = "";
			$scope.newStudent.grade = "";
		};
	}]);