'use strict';

var eitherOr = function() {
    return {
        require: "ngModel",
        scope: {
            otherVal: "=eitherOr"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.eitherOr = function(modelValue) {
            	return !!(modelValue || scope.otherVal);
            };

            scope.$watch("otherVal", function() {
                ngModel.$validate();
            });
        }
    };
};

angular.module('cumul8App.timesheet', ['ngRoute', 'ngMessages'])

.directive("eitherOr", eitherOr)

.controller('timesheetCtrl', ['$scope', '$timeout', '$window', function($scope, $timeout, $window) {
	$scope.timesheet = {};
	$scope.inProgress = true;
	$scope.loading = false;
	$scope.workitems = [
		'Time working on visual effects for movie',
		'Time spent reviewing the work of a junior artist'
	];

	$scope.clearTimesheet = function() {
		$scope.inProgress = true;
		$scope.timesheet_form.$setPristine();
		$scope.timesheet_form.$setUntouched();
		delete $scope.timesheet.email;
		delete $scope.timesheet.time;
		delete $scope.timesheet.message;
		delete $scope.timesheet.worktype;
	}

	$scope.nextStep = function() {
		$scope.loading = true;
		$timeout(function() {
			$scope.loading = false;
			$scope.inProgress = false;
		}, 1000);
	}

	$scope.restart = function() {
		$scope.clearTimesheet();
	}

	$scope.isTimePopulated = function() {
		if($scope.timesheet.time)
			return $scope.timesheet.time.hours.$error || $scope.timesheet.time.minutes.$error;
	}

	$scope.getTimeLogged = function() {
		var output = '';
		if($scope.timesheet.time) {
			var hours = $scope.timesheet.time.hours;
			var minutes = $scope.timesheet.time.minutes;

			if(hours)
				output += hours + 'h ';
			if(minutes)
				output += minutes + 'm';
		} else {
			output = 'no time';
		}

		return output;
	}
}]);