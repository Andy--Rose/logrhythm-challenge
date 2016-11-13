angular.module('students', ['angularInlineEdit'])
	.controller('StudentsController', function ($scope, $fdb){
		var self = this;
		var students = $fdb.db('grades').collection('students');
		students.ng($scope, "students");

		$scope.save = function() {
			students.save();
		};

		$scope.convertStudent = function(student) {
			return {
				"_id": student._id,
				"firstName": student.firstName,
				"lastName": student.lastName,
				"grade": student.grade
			}
		}

		$scope.deleteStudent = function(studentId) {
			students.remove({
				_id: {
					$eq: studentId
				}
			});
			students.save();
		};

		$scope.handleEdit = function(student, attributeEdited) {
			var editElement = document.getElementById("student-input-" + attributeEdited + "-" + student._id);
			var editValue = editElement.firstElementChild.firstElementChild.value;
			var editedObj = { };
			editedObj[attributeEdited] = editValue;
			students.updateById(student._id, editedObj);
			students.save(function(err) {
				if (err) {
					console.log("ERROR: Failed updating student.");
				} else {
					console.log("INFO: Updated student information with ID " + studentId);
				}
			});
		}

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
				
			}
		};
	});