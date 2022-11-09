const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');


// database configuration
const dbConfig = {
	host: 'db',
	port: 5432,
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
};

const db = pgp(dbConfig);

app.listen(3000);
console.log("Server is listening on port 3000");

// test your database
db.connect()
	.then(obj => {
		console.log("Database connection successful\n"); // you can view this message in the docker compose logs
		obj.done(); // success, release the connection;
	})
	.catch(error => {
		console.log('ERROR:', error.message || error);
	});


app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
	})
);

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);





app.get("/register", (req, res) => {
	res.render("pages/register");
});

// Register submission
app.post('/register', async (req, res) => {
	const password = req.body.password;
	const hash = await bcrypt.hash(password.toString(), 10);
	const username = req.body.username;

	const query = `INSERT INTO users (username, password) VALUES ($1, $2);`;

	await db.any(query, [
		username,
		hash
	])
		.then((data) => {
			res.redirect("/login");
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/register");
		});

});



// Login submission
app.get("/login", (req, res) => {
	res.render("pages/login");
});

app.post("/login", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const query = `SELECT * FROM users WHERE users.username = '${username}';`;
	const values = [username];

	var user;

	await db.one(query, values)
		.then((data) => {
			user = data;
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/login");
		});

	if(user) {

		const match = await bcrypt.compare(req.body.password, user.password); //await is explained in #8

		if(match) {

			req.session.user = {
				api_key: process.env.API_KEY,
			};
			req.session.save();

			res.redirect('/home');

		}

		else {
			console.log("incorrect password");
			res.redirect('/login');
		}

	}

});




// Authentication Middleware.
const auth = (req, res, next) => {
	if (!req.session.user) {
		// Default to register page.
		return res.redirect('/register');
	}
	next();
};
  
// Authentication Required
app.use(auth);



app.get('/', (req, res) => {
	res.render('pages/register', {
		username: req.session.user.username,
		password: req.session.user.password
	});
});





app.get("/home", (req, res) => {
	res.render('pages/home');
});




app.get("/logout", (req, res) => {
	req.session.destroy();
	res.render("pages/logout");
});



