angular.module("myBookshelf").controller("bookDetailCtrl", function($scope, $location,$routeParams, bookDetailService, bookInfo) {

	$scope.currentBook = bookInfo.data;

	$scope.readableDateAcquired = bookDetailService.parseDate($scope.currentBook.date_acquired);
	$scope.readableDatePublished = bookDetailService.parseDate($scope.currentBook.date_published);
	$scope.hasBeenRead = bookDetailService.parseWasRead($scope.currentBook.was_read);

	// Error handling for the date fields
	var curDate = new Date();
	$scope.theCurrentDate = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate();

	// Variables and methods for editing control
	$scope.editMode = false;
	$scope.staticMode = true;

	$scope.enterEditMode = function() {
		$scope.editMode = true;
		$scope.staticMode = false;

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

		$scope.currentBook.title = $scope.title;
		$scope.currentBook.author = $scope.author;
		// ISBN is read only
		$scope.currentBook.value = $scope.value;
		$scope.currentBook.was_read = $scope.read;
		$scope.currentBook.date_acquired = $scope.date_acquired;
		$scope.currentBook.date_published = $scope.date_published;
		$scope.currentBook.rating = $scope.rating;
		$scope.currentBook.comments = $scope.comments;

		bookDetailService.updateBookInfo($scope.currentBook).then(function(response) {
				$scope.currentBook = response.data;
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