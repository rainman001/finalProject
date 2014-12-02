angular.module("myBookshelf").service("bookDetailService", function($http, $q) {

	var baseUrl = "http://localhost:9001";

	this.getSingleBook = function(bookISBN) {
		return $http({
			method: "GET",
			url: baseUrl + "/books/" + bookISBN
		});
	};

	this.updateBookInfo = function(book) {
		return $http({
			method: "PUT",
			url: baseUrl + "/books/" + book.ISBN,
			data: book
		})
	};

	this.deleteBook = function(book) {
		return $http({
			method: "DELETE",
			url: baseUrl + "/books/" + book.ISBN,
			data: book
		})
	};

	// Helper array and function to give a more human readable date
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	this.parseDate = function(date) {

		var dateString = "";

		if (date === undefined) {
			dateString = "January 1, 2001";
			return dateString;
		}

		var dateArray = date.split("T");

		dateString = dateArray[0];
		dateArray = dateString.split("-");

		var day = dateArray[2];
		var month = "";
		var year = dateArray[0];

		var monthAsInt = parseInt(dateArray[1]);
		month = monthNames[monthAsInt - 1];

		var finalDateString = month + " " + day + ", " + year;

		return finalDateString;
	};

	this.formatDate = function(date) {
		var asDate = new Date(date);

		return asDate;
	};

	this.parseWasRead = function(wasRead) {
		if (wasRead === true) {
			return "Yes";
		}
		else {
			return "No";
		}
	}
})