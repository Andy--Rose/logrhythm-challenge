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

		$scope.editToggle = function(studentId) {
			var editButton = document.getElementById("btn_edit_" + studentId);
			var state = editButton.innerHTML;

			if (state === "Edit") {
				editButton.innerHTML = "Save";
				$(".student-input-" + studentId).each(function(i, el) {
					el.readOnly = false;
				});
			} else {
				editButton.innerHTML = "Edit";
				var student = {
					"_id": studentId,
					"firstName": document.getElementById("student-input-firstname-" + studentId).innerHTML,
					"lastName": document.getElementById("student-input-lastname-" + studentId).innerHTML,
					"grade": document.getElementById("student-input-grade-" + studentId).innerHTML
				};
				students.insert(student);
				students.save();
			}
		};
	});