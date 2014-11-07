angular.module("myBookshelf").controller("booksCtrl", function($scope, booksService) {

	booksService.returnBooks().then(function(data) {
		$scope.books = data.data;
	});

	// Variables used for sorting
	$scope.predicate = "";
	$scope.reverse = false;

})