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
	/*
	.when("/books/:bookId", {
		templateUrl: "js/book/bookTmpl.html",
		controller: "bookCtrl"
	})*/
	.when("/books/add-book", {
		templateUrl: "js/addBook/addBookTmpl.html",
		controller: "addBookCtrl"
	})
	.otherwise({
		redirectTo: "/"
	});

})