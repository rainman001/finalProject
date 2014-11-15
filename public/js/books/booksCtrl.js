angular.module("myBookshelf").controller("booksCtrl", function($scope, $location, booksService) {

	booksService.returnBooks().then(function(data) {
		$scope.books = data.data;
	});

	$scope.goToDetailView = function(bookISBN) {
		var url = "/books/detail/" + bookISBN;
		console.log(url);
		$location.path(url);
	};

	// Variables used for sorting
	$scope.predicate = "";
	$scope.reverse = true;

	// Filtering
	$scope.filterText = "";
})