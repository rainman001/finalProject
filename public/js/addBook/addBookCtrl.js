angular.module("myBookshelf").controller("addBookCtrl", function($scope, addBookService, $location) {

	// Error handling for the date fields
	var curDate = new Date();
	$scope.theCurrentDate = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate();

	// Set up a new book object
	function Book (title, author, ISBN, value, date_published, date_acquired, was_read, rating, img, comments) {

			this.title = title;
			this.author = author;
			this.ISBN = ISBN;
			this.value = value;
			this.date_published = date_published;
			this.date_acquired = date_acquired;
			this.was_read = was_read;
			this.rating = rating;
			this.img = img;
			this.comments = comments;
		}

	// Handles the logic of actually initializing a new Book object
	$scope.addNewBook = function() {

		var myBook = new Book($scope.title, $scope.author, $scope.ISBN, $scope.value, $scope.date_published, $scope.date_acquired, $scope.was_read, $scope.rating, $scope.image.dataURL, $scope.comments);

		console.log($scope.date_acquired);
		console.log($scope.date_published);

		addBookService.addBook(myBook).then(function() {
			$location.path("/books");
		});
	};
})