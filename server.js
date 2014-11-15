var express = require("express");
var bodyParser = require("body-parser");
//var fs = require("fs");
var mongoose = require("mongoose");
//var aws = require("aws-lib");

var app = express();
//var prodAdv = aws.createProdAdvClient("AKIAIPJ5CZ55YXEFABPQ", "GzK5ZLFhIJR773RZxtaXzijKVyEEuYQqMEtAL6Ku");

app.use(bodyParser.json({limit: 50000000}));
// Serves up our files from public folder,
// eliminated the need to run http-server
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost/bookshelf");

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
 	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 	next();
});

// Users
var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

var User = mongoose.model("User", userSchema);

// MongoDB and Mongoose setup
var schema = new mongoose.Schema({
	title: String,
	author: String,
	ISBN: String,
	value: Number,
	date_published: String, // Date
	date_acquired: String, // Date
	was_read: Boolean,
	rating: Number,
	img: String,
	comments: String
});

var Book = mongoose.model("Book", schema);

// mongoose.connection.on("open", function() {
	// everything would be in here
//})

app.get("/books", function(req, res) {
	Book.find(function(err, books) {
		if (err) {
			return console.error(err);
		}
		res.send(books);

		/*
		var options = {SearchIndex: "Books", Keywords: "Javascript"};

		prodAdv.call("ItemSearch", options, function(err, result) {
			console.log(JSON.stringify(result));
		});*/
	});
});


app.get("/books/:ISBN", function(req, res) {
	Book.findOne({ISBN: req.params.ISBN}, function(err, book) {
		if (err) {
			return console.error(err);
		}
		res.send(book).status(200).end();
	});
});


// Eventually, the idea is to have the user type in title, and if possible, return the rest of the info from the Amazon Products API
app.post("/books", function(req, res) {
	var newBook = new Book({
		title: req.body.title,
		author: req.body.author,
		ISBN: req.body.ISBN,
		value: req.body.value,
		date_published: req.body.date_published,
		date_acquired: req.body.date_acquired,
		was_read: req.body.was_read,
		rating: req.body.rating,
		img: req.body.img,
		comments: req.body.comments
	});

	newBook.save();
	res.status(200).end();
});


app.put("/books/:ISBN", function(req, res) {
	// Combine post and single get here
	Book.findOne({ISBN: req.params.ISBN}, function(err, book) {
		if (err) {
			return console.error(err);
		}
		book.title = req.body.title;
		book.author = req.body.author;
		// ISBN is not editable
		book.value = req.body.value;
		book.date_acquired = req.body.date_acquired;
		book.date_published = req.body.date_published;
		book.was_read = req.body.was_read;
		book.rating = req.body.rating;
		// For now, img is not editable
		book.comments = req.body.comments;

		book.save();
		res.send(book).status(200).end();
	});
});

// Careful! This will delete anything with the included ISBN
app.delete("/books/:ISBN", function(req, res) {
	Book.remove({ISBN: req.params.ISBN}, function(err) {
		if (err) {
			return console.error(err);
		}
		res.status(200).end();
	});
});


app.listen(9001);