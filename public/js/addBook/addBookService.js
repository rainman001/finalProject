angular.module("myBookshelf").service("addBookService", function($http) {

	var baseUrl = "http://localhost:9001";

	// Does http request to mongo endpoint to add a new book
	this.addBook = function(Book) {
		return $http({
			method: "POST",
			url: baseUrl + "/books",
			data: Book
		});
	};
})