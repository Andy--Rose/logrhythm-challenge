angular.module('summary', [])
	.controller('SummaryController', function ($scope, $fdb){
		$scope.studentCollection = $scope.$root.studentCollection;
		$scope.min = 25;
		$scope.max = 0;
		$scope.average = 0;

		var baseChartOptions = {
			chart: {
	            type: 'solidgauge'
			},
			title: {
				style: {
		        	"font-size": "24px"
		        }
			},
			pane: {
				size: '100%',
				startAngle: -90,
				endAngle: 90,
				background: {
				    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
				    innerRadius: '60%',
				    outerRadius: '100%',
				    shape: 'arc'
				}
			},
			yAxis: {
				stops: [
					[0.1, '#DF5353'], // red
					[0.65, '#DDDF0D'], // yellow
					[0.85, '#55BF3B'] // green
				],
				lineWidth: 0,
				max: 100,
				min: 0,
				minorTickInterval: null,
				tickAmount: 1,
				labels: {
				    y: 16
				}
			},
			plotOptions: {
				solidgauge: {
				    dataLabels: {
				        y: 5,
				        borderWidth: 0,
				        useHTML: true,
				        style: {
				        	"font-size": "24px"
				        }
				    }
				}
			}
		};

		$scope.minChartOptions = Highcharts.merge(baseChartOptions, {
			series: [{
				data: [$scope.min]
			}],
			title: {
				text: "Min Grade"
			}
		});

		$scope.maxChartOptions = Highcharts.merge(baseChartOptions, {
			series: [{
				data: [$scope.max]
			}],
			title: {
				text: "Max Grade"
			}
		});

		$scope.avgChartOptions = Highcharts.merge(baseChartOptions, {
			series: [{
				data: [$scope.average]
			}],
			title: {
				text: "Average Grade"
			}
		});

		$scope.minChart = Highcharts.chart("minChartContainer", $scope.minChartOptions);
		$scope.maxChart = Highcharts.chart("maxChartContainer", $scope.maxChartOptions);
		$scope.avgChart = Highcharts.chart("avgChartContainer", $scope.avgChartOptions);

		// Set event triggers for database to recalculate
		$scope.studentCollection.on("update", function (updated) {
		    console.log("DEBUG: Calculation triggered by updated grade.");
		    $scope.calculateSummary();
		});

		$scope.studentCollection.on("remove", function (removed) {
		    console.log("DEBUG: Calculation triggered by removed student.");
		    $scope.calculateSummary();
		});

		if ($scope.studentCollection._data.length == 0) {
			setTimeout(function() {
				$scope.calculateSummary();
			}, 2000);
		} else {
			$scope.calculateSummary();
		}

		$scope.calculateSummary = function() {
			// Retreive and sort grades
			var grades = $scope.studentCollection.find({}, {
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

			$scope.updateGraphs(minVal, maxVal, avgVal);
		};

		$scope.updateGraphs = function(minVal, maxVal, avgVal) {
			$scope.min = minVal;
			$scope.max = maxVal;
			$scope.average = avgVal;

			if ($scope.minChart && $scope.minChart.series) {
				$scope.minChart.series[0].points[0].update(minVal);
			} else {
				console.log("WARN: Chart not initialized.");
			}
			if ($scope.maxChart && $scope.maxChart.series) {
				$scope.maxChart.series[0].points[0].update(maxVal);
			} else {
				console.log("WARN: Chart not initialized.");
			}
			if ($scope.avgChart && $scope.avgChart.series) {
				$scope.avgChart.series[0].points[0].update(avgVal);
			} else {
				console.log("WARN: Chart not initialized.");
			}
		}

		$scope.saveSummary = function() {
			$scope.summaryCollection.save(function(err) {
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