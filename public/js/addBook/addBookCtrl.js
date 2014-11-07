angular.module("myBookshelf").controller("addBookCtrl", function($scope, addBookService, $location) {

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

	$scope.addNewBook = function() {

		var myBook = new Book($scope.title, $scope.author, $scope.ISBN, $scope.value, $scope.date_published, $scope.date_acquired, $scope.was_read, $scope.rating, $scope.image.dataURL, $scope.comments);

		addBookService.addBook(myBook).then(function() {
			$location.path("/books");
		});
	};
})