var app = angular.module("myBookshelf", ["ngRoute", "imageupload"]);

app.config(function($routeProvider) {

	$routeProvider
	.when("/", {
		templateUrl: "js/home/homeTmpl.html",
		controller: "homeCtrl"
	})
	.when("/books", {
		templateUrl: "js/books/booksTmpl.html",
		controller: "booksCtrl"
	})
	.when("/books/detail/:ISBN", {
		templateUrl: "js/bookDetail/bookDetailTmpl.html",
		controller: "bookDetailCtrl",
		resolve: {
			bookInfo: function(bookDetailService, $q, $route) {
				var deferred = $q.defer();
				bookDetailService.getSingleBook($route.current.params.ISBN).then(function(data) {
					deferred.resolve(data);
				});

				return deferred.promise;
			}
		}
	})
	.when("/books/add-book", {
		templateUrl: "js/addBook/addBookTmpl.html",
		controller: "addBookCtrl"
	})
	.otherwise({
		redirectTo: "/"
	});

})