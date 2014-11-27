angular.module("myBookshelf").controller("homeCtrl", function($rootScope, $scope, $location, homeService) {

	$scope.goToItemsPage = function() {
		$location.path("/books");
	};

	$scope.goHome = function() {
		$location.path("/");
	}

	$scope.goToCreateAccount = function() {
		$location.path("/createAccount");
	};
})