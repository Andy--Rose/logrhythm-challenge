//module
angular.module('students', ['angularInlineEdit'])
	.run(function ($fdb) {
		
	})
	.controller('StudentsController', function ($scope, $fdb){
		var studentCollection = $scope.$root.studentCollection;
		studentCollection.ng($scope, "students");

		$scope.initStudents = function() {
			studentCollection.load(function (err, tableStats, metaStats) {
			    if (err) {
			    	console.log("ERROR: Failed loading the students collection.\n" + err.toString())
			    } else {
					if (studentCollection._data.length == 0) {
						console.log("INFO: Adding default students to empty db.");
						defaultStudents = [
							{
								"firstName": "John",
								"lastName": "Doe",
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
						studentCollection.insert(defaultStudents);
					}
					// Even if the loaded data was not modified, it still has to be saved in order to 
					// maintain over multiple refreshes. I am not a fan of this package...
					studentCollection.save(function(err) {
						if (err) {
							console.log("ERROR: Failed saving db.\n" + err);
						} else {
							console.log("INFO: Saved student collection to browser.")
						}
					});
			    }
			});
		};

		$scope.validateName = function(newValue) {
			if (newValue === null || newValue === "") {
				return false;
			} else if (newValue.length > 10) { // should be more than 10 chars
				return false;
			} else if (/[^a-zA-Z0-9]/.test(newValue)) {
				return false;
			}
			return true;
		};

		$scope.validateGrade = function(newValue) {
			if (isNaN(newValue)) {
				return false;
			} else {
				var num = parseInt(newValue);
				if (num > 100 || num < 0) {
					return false;
				}
				return true;
			}
		};

		$scope.deleteStudent = function(studentId) {
			studentCollection.remove({
				_id: {
					$eq: studentId
				}
			});
			saveStudents();
		};

		$scope.handleEdit = function(student, attributeEdited) {
			var editElement = document.getElementById("student-input-" + attributeEdited + "-" + student._id);
			var editValue = editElement.firstElementChild.firstElementChild.value;
			if (attributeEdited == "grade") {
				editValue = parseInt(editValue);
			}
			var editedObj = { };
			editedObj[attributeEdited] = editValue;
			studentCollection.updateById(student._id, editedObj);
			console.log("INFO: Updated " + attributeEdited + " for student with ID " + student._id);
			saveStudents();
		}

		function saveStudents() {
			studentCollection.save(function(err) {
				if (err) {
					console.log("ERROR: Failed updating student.");
				} else {
					console.log("INFO: Saved student information");
				}
			});
		}
	});