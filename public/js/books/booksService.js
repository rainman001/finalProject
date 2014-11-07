angular.module("myBookshelf").service("booksService", function($http) {

	var baseUrl = "http://localhost:9001";

	this.returnBooks = function() {
		return $http({
			method: "GET",
			url: baseUrl + "/books"
		});
	};
})