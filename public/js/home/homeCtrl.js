angular.module("myBookshelf").controller("homeCtrl", function($scope, $location) {

	$scope.goToItemsPage = function() {
		$location.path("/books");
	};

	$scope.goHome = function() {
		$location.path("/");
	}
})