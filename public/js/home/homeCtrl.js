angular.module("myBookshelf").controller("homeCtrl", function($rootScope, $scope, $location, homeService) {

	//$rootScope.loggedIn === false;
	$scope.username = "";
	$scope.password = "";

	$scope.goToItemsPage = function() {
		$location.path("/books");
	};

	$scope.goHome = function() {
		$location.path("/");
	}

	// Method to go and check login creds from database
	// Debug this, to find out why user is always logged in, no matter what is entered, and why username/password account is persisting in HTML, controller, service and server
	$scope.checkCredentials = function() {

		// method going to service
		homeService.logInUser($scope.username, $scope.password).then(function(response) {
			if (response.data === true) {
				//$rootScope.loggedIn = true;
				$location.path("/books");
			}
			else {
				alert("Your credentials are wrong!");
			}
		});
	};

	$scope.goToCreateAccount = function() {
		$location.path("/createAccount");
	};
})