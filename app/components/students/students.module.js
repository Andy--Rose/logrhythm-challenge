angular.module('students', [])
	.controller('StudentsController', function ($scope, $fdb){
		var students = $fdb.db('grades').collection('students');
		students.ng($scope, "students");

		$scope.save = function() {
			students.save();
		};

		$scope.deleteStudent = function(studentId) {
			students.remove({
				_id: {
					$eq: studentId
				}
			});
			students.save();
		};
	});