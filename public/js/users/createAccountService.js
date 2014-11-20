angular.module("myBookshelf").service("createAccountService", function($http) {

	var baseUrl = "http://localhost:9001";

	this.checkForExistingUser = function(username) {
		return $http({
			method: "GET",
			url: baseUrl + "/accounts/checkForUser/" + username
		});
	};

	this.createNewAccount = function(user) {
		return $http({
			method: "POST",
			url: baseUrl + "/accounts/addUser",
			data: user
		});
	};

});