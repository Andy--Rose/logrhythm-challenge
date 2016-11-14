angular.module('summary', [])
	.controller('SummaryController', function ($scope, $fdb){
		var summaryCollection = $scope.$root.summaryCollection;
		var studentCollection = $scope.$root.studentCollection;
		summaryCollection.ng($scope, 'summary')

		// Set event triggers for database to recalculate
		studentCollection.on("update", function (updated) {
		    console.log("DEBUG: Calculation triggered by updated grade.");
		    $scope.calculateSummary();
		});

		studentCollection.on("insert", function (inserted, failed) {
		    console.log("DEBUG: Calculation triggered by added student.");
		    $scope.calculateSummary();
		});

		studentCollection.on("remove", function (removed) {
		    console.log("DEBUG: Calculation triggered by removed student.");
		    $scope.calculateSummary();
		});

		$scope.initSummary = function() {
			summaryCollection.load(function (err, tableStats, metaStats) {
			    if (err) {
			    	console.log("ERROR: Failed loading the summary collection.\n" + err.toString())
			    } else {
					if (summaryCollection._data.length == 0) {
						console.log("INFO: Adding default summary components to empty db.");
						defaultSummary = {
							"min": 0,
							"max": 0,
							"average": 0
						};
						summaryCollection.insert(defaultSummary);
					}

					// save loaded [and edited] DB
					summaryCollection.save(function(err) {
						if (err) {
							console.log("ERROR: Failed saving db.\n" + err);
						} else {
							console.log("INFO: Saved summary collection to browser.")
						}
					});
			    }
			});
			if (studentCollection._data.length == 0) {
				setTimeout(function() {
					$scope.calculateSummary();
				}, 2000);
			} else {
				$scope.calculateSummary();
			}
		}

		$scope.calculateSummary = function() {
			// Retreive and sort grades
			var grades = studentCollection.find({}, {
			    $aggregate: "grade",
			    $orderBy: {
			    	"grade": 1
			    }
			});

			// Calculate Values
			var minVal, maxVal, avgVal = 0;
			if (grades.length == 0) {
				console.log("DEBUG: No data to calculate summary from.");
			} else if (grades.length == 1) {
				minVal, maxVal, avgVal = grades[0];
			} else {
				minVal = grades[0];
				maxVal = grades[grades.length - 1];
				avgVal = Math.floor(getAverage(grades));
			}

			// Submit values to DB
			summaryCollection.update({}, {
				$replace: {
					min: minVal,
					max: maxVal,
					average: avgVal
				}
			});

			// Save DB
			saveSummary();
		};

		function saveSummary() {
			summaryCollection.save(function(err) {
				if (err) {
					console.log("ERROR: Failed updating summary values.");
				} else {
					console.log("INFO: Saved summary information");
				}
			});
		}

		function getAverage(arr) {
			var sum = arr.reduce((a, b) => a + b, 0);
			return sum / arr.length;
		}
	});