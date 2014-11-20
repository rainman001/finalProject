angular.module("myBookshelf").service("homeService", function($http) {

	var baseUrl = "http://localhost:9001";

	this.logInUser = function(username, password) {
		return $http({
			method: "GET",
			url: baseUrl + "/accounts/logInUser/" + username + "/" + password
		});

	};
})