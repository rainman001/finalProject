var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var session = require("express-session");

var app = express();


// Configuring Passport
var passport = require('passport'); 
var LocalStrategy = require("passport-local").Strategy;

// Serves up our files from public folder,
// eliminated the need to run http-server
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json({limit: 5000000}));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cookieParser());
app.use(session({secret: "oi2j32389fjef32r320jr30jwer"}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // password validation method needed
      if (!user.password) { /*validPassword(password)) {*/
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// Put the id in the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Pull the id from the session
// Test the findById later
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
 	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 	next();
});

mongoose.connect("mongodb://localhost/bookshelf");

var currentUserInfo = {
	loggedIn: false,
	username: "",
	password: ""
};

// MongoDB and Mongoose setup
var userSchema = new mongoose.Schema({
	username: String,
	password: String
	// Maybe an array of references to book ISBN's?
	//bookCollection: []
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
	img: String,
	comments: String
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
/*
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
});*/

// Add a new user
app.post("/accounts/addUser", function(req, res) {
	console.log(req.body);
	var newUser = new User({
		username: req.body.username,
		password: req.body.password
	});

	newUser.save();
	res.status(200).end();
});

// Log in route
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
    	return next(err) 
    }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/')
    }
    req.logIn(user, function(err) {
      if (err) { 
      	return next(err); 
      }
      // Then allows the user to proceed to books page
      return res.redirect('/#/books');
    });
  })(req, res, next);
});


app.get("/books", function(req, res) {
	Book.find(function(err, books) {
		if (err) {
			return console.error(err);
		}
		res.send(books);
	});
});

// New version, for getting a user's books
/*
app.get("/books/:username", function(req, res) {
	User.findOne({username: req.params.username}, function(err, user) {
		if (err) {
			return console.error(err);
		}
		var bookArray = [];
		for (var i = 0; i < user.bookCollection.length; i++) {
			Book.findOne({ISBN: user.bookCollection[i]}, function(err, book) {
				if (err) {
					return console.error(err);
				}
				bookArray.push(book);
			})
		}
		res.send(bookArray);
	})
});
*/


app.get("/books/:ISBN", function(req, res) {
	Book.findOne({ISBN: req.params.ISBN}, function(err, book) {
		if (err) {
			return console.error(err);
		}
		res.send(book);
	});
});


// :username is new
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

	// New stuff
	// Find user and then add ISBN to their collection
	/*
	User.findOne({username: req.params.username}, function(err, user) {
		if (err) {
			return console.error(err);
		}
		// Should add a new ISBN to the user's collection
		user.bookCollection.push(newBook.ISBN);
	})*/
});

app.put("/books/:ISBN", function(req, res) {
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