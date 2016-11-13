angular.module("newStudent", [])
	.controller('NewStudentController', function ($scope, $http, $fdb) {
		$scope.saveNewStudent = function() {
			var students = $fdb.db('grades').collection('students');
			var newStudent = {
				"firstName": $scope.firstName,
				"lastName": $scope.lastName,
				"grade": $scope.grade
			}
			students.insert(newStudent);
			console.log("INFO: Stored " + $scope.firstName + " " + $scope.lastName + " to the DB.");

			students.save(function(err) {
				if (err) {
					console.log("ERROR: Failed saving DB to file.");
				} else {
					console.log("INFO: Save the grades DB file.");
				}
			});
			$scope.reset();
		};

		$scope.reset = function() {
			$scope.firstName = "";
			$scope.lastName = "";
			$scope.grade = "";
		};

		$scope.reset();
	});