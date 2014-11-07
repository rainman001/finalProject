var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var mongoose = require("mongoose");

var app = express();
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
	// Redo in postman, with the properties added, and see if it will load to the browser
	img: String,//{data: Buffer, contentType: String},
	comments: String
	// current value, 
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
	});
});

/*
app.get("/books/book", function(req, res) {
	
});
*/

// Eventually, the idea is to have the user type in title, and if possible, return the rest of the info from the Amazon Products API
app.post("/books", function(req, res) {
	console.log(req.body);
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

	//newBook.img.data = fs.readFileSync(req.body.img.data);
	//newBook.img.contentType = req.body.img.contentType;

	newBook.save();
	res.status(200).end();
});

/*
app.put("/books/book", function(req, res) {
	
});

app.delete("/books/book", function(req, res) {
	
});

*/

app.listen(9001);