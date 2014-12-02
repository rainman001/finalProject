angular.module("myBookshelf").service("booksService", function($http, bookDetailService) {

	var baseUrl = "http://localhost:9001";

	this.returnBooks = function() {
		return $http({
			method: "GET",
			url: baseUrl + "/books"
		});
	};

	this.formatDates = function(books) {
		for (var i = 0; i < books.length; i++) {

			var dateArray = books[i].date_acquired.split("T");
			var dateString = dateArray[0];
			dateArray = dateString.split("-");
			dateString = dateArray[1] + "-" + dateArray[2] + "-" + dateArray[0];
			books[i].date_acquired = dateString;

			dateArray = books[i].date_published.split("T");
			dateString = dateArray[0];
			dateArray = dateString.split("-");
			dateString = dateArray[1] + "-" + dateArray[2] + "-" + dateArray[0];
			books[i].date_published = dateString;
		}

		return books;
	};
})