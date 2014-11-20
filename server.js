var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();
app.use(bodyParser.json({limit: 5000000}));
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

var currentUserInfo = {
	loggedIn: false,
	username: "",
	password: ""
};

// MongoDB and Mongoose setup
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	//newstuff
	bookCollection: [bookSchema]
});

var User = mongoose.model("User", userSchema);

var bookSchema = new mongoose.Schema({
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

var Book = mongoose.model("Book", bookSchema);

// mongoose.connection.on("open", function() {
	// everything would be in here
//})

//newstuff
app.get("/accounts/checkForUser/:username", function(req, res) {
	User.findOne({username: req.params.username}, function(err, user) {
		// If username is not found
		if (!user) {
			res.send(false);
		}
		else {
			// If username is found
			res.send(true);
		}
	});
});

//newstuff
// Pass in a user object rather than passing info in params
app.get("/accounts/logInUser/:username/:password", function(req, res) {
	User.findOne({username: req.params.username}, function(err, user) {

		// Why does it come in here when you enter incorrect creds?
		if (!user) {
			res.send(false);
		}

		if (user.password === req.params.password) {
			currentUserInfo.loggedIn = true;
			currentUserInfo.username = user.username;
			currentUserInfo.password = user.password;
			res.send(true);
			console.log(currentUserInfo);
		}
		else {
			currentUserInfo.loggedIn = false;
			currentUserInfo.username = "";
			currentUserInfo.password = "";
			res.send(false);
		};
	});
});

//newStuff
app.post("/accounts/addUser", function(req, res) {
	console.log(req.body);
	var newUser = new User({
		username: req.body.username,
		password: req.body.password
	});

	newUser.save();
	res.status(200).end();
})





app.get("/books", function(req, res) {
	Book.find(function(err, books) {
		if (err) {
			return console.error(err);
		}
		res.send(books);
	});
});


app.get("/books/:ISBN", function(req, res) {
	Book.findOne({ISBN: req.params.ISBN}, function(err, book) {
		if (err) {
			return console.error(err);
		}
		res.send(book);
	});
});

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

	//newBook.img.data = fs.readFileSync(req.body.img.data);
	//newBook.img.contentType = req.body.img.contentType;

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
	})
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