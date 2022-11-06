const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
//const bcrypt = require('bcrypt');
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

// test your database
db.connect()
	.then(obj => {
		console.log('Database connection successfull'); // you can view this message in the docker compose logs
		obj.done(); // success, release the connection;
	})
	.catch(error => {
		console.log('ERROR:', error.message || error);
	});
// set the view engine to ejs
app.set("view engine", "ejs");
app.use(bodyParser.json());

// set session
app.use(
	session({
		secret: "XASDASDA",
		saveUninitialized: true,
		resave: true,
	})
);
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);


app.post('/register', async (req, res) => {
	console.log("COMES HERE")
	const username = req.body.username;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const hash = await bcrypt.hash(req.body.password, 10)
	var query = "INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2);"
	//the logic goes here
	db.any(query, [
		username,
		firstname,
		lastname,
		hash,
	]).then(() => {
		console.log("new user:", username)
		return res.send({ message: "User added successful" });
		// TODO: Redirect to login page when implemented 
		// res.redirect("/login") login to portal 
	}).catch(function (err) {
		return result.status(200).json(err);
		// TODO: Implement redirect to page when implemented 
		// res.redirect("/register", {
		//   error: true,
		//  message: err.message
		// });
	});
});

app.post('/login', async (req, res) => {
	const username = req.body.username;
	var query = "Select * FROM users WHERE username=$1"
	//the logic goes here
	db.any(query, [
		username,
	]).then(async (user) => {
		const match = await bcrypt.compare(req.body.password, user[0].password); //await is explained in #8
		if (match == false) {
			err = ("Incorrect username or password.");
		} else {
			return res.send({ message: "User added successful" });
		}
	}).catch(function (err) {
		return res.status(200).json(err);
		// TODO: redirect to login page 
		//res.render("/login", {
		//    courses: [],
		//    error: true,
		//   message: err.message
		//});
	});
});



app.listen(3000);
console.log("Server is listening on port 3000");
