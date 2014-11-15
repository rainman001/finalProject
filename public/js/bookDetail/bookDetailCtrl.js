angular.module("myBookshelf").controller("bookDetailCtrl", function($scope, $location,$routeParams, bookDetailService, bookInfo) {

	// Could change to $scope.currentBook = bookInfo.data, and then
	// update in template file, if time; same for method below
	$scope.currentBook = bookInfo.data;
	
	$scope.readableDateAcquired = bookDetailService.parseDate($scope.currentBook.date_acquired);
	$scope.readableDatePublished = bookDetailService.parseDate($scope.currentBook.date_published);
	$scope.hasBeenRead = bookDetailService.parseWasRead($scope.currentBook.was_read);

	// Variables and methods for editing control
	$scope.editMode = false;
	$scope.staticMode = true;

	$scope.enterEditMode = function() {
		$scope.editMode = true;
		$scope.staticMode = false;

		// Two-way data binding
		$scope.title = $scope.currentBook.title;
		$scope.author = $scope.currentBook.author;
		$scope.ISBN = $scope.currentBook.ISBN;
		$scope.value = $scope.currentBook.value;
		$scope.read = $scope.currentBook.was_read;
		$scope.date_acquired = $scope.currentBook.date_acquired;
		$scope.date_published = $scope.currentBook.date_published;
		$scope.rating = $scope.currentBook.rating;
		$scope.comments = $scope.currentBook.comments;
	};

	// Test here; see why first if is not working
	$scope.enterStaticMode = function() {
		$scope.editMode = false;
		$scope.staticMode = true;

		$scope.currentBook.rating = $scope.rating;

		// It also needs to update current book with the input boxes
		bookDetailService.updateBookInfo($scope.currentBook).then(function(response) {
				$scope.currentBook = response.data;
				console.log(response.data);
		});
	};

	$scope.confirmDelete = function() {
		var response = confirm("Are you sure you want to delete this book?");

		if (response === true) {
			bookDetailService.deleteBook($scope.currentBook).then(function() {
					$location.path("/books");
			})
		}
		else {
			return;
		}
	};

})