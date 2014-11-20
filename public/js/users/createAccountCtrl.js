angular.module("myBookshelf").controller("createAccountCtrl", function($scope, $rootScope, $location, createAccountService) {

	$scope.createUser = function() {
		var user = {
			username: $scope.username,
			password: $scope.password
		};

		createAccountService.checkForExistingUser($scope.username).then(function(response) {
				console.log(response.data);
				if (response.data === true) {
					alert("This username is already taken!");
				}
				else {
					// Create the new account
					createAccountService.createNewAccount(user).then(function(response) {
						console.log(response);

						$rootScope.loggedIn = true;
						$location.path("/books");
					})
				}
		})
	};
})