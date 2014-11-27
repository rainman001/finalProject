angular.module("myBookshelf").controller("booksCtrl", function($scope, $rootScope, $location, booksService) {

	booksService.returnBooks().then(function(data) {
		$scope.books = booksService.formatDates(data.data);
	});

	$scope.goToDetailView = function(bookISBN) {
		var url = "/books/detail/" + bookISBN;
		$location.path(url);
	};

	// Variables used for sorting
	$scope.predicate = "";
	$scope.reverse = true;

	// Filtering
	$scope.searchText = "";
})