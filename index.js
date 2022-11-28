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
app.set('views', './src/views');
app.set("view engine", "ejs");

app.use(bodyParser.json());

// set session
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

app.get("/profile", (req, res) => {
	res.render("pages/profile", {
		username: req.session.user.username,
		first_name: req.session.user.first_name,
		last_name: req.session.user.last_name,
	});
});

app.get("/employeeMenu", (req, res) => {
	res.render("pages/employeeMenu");
});

app.get("/employee", (req, res) => {
	res.render("pages/employee");
});

const user = {
	user_id: undefined,
	username: undefined,
	first_name: undefined,
	last_name: undefined,
	is_manager: undefined,
};

app.post('/login', async (req, res) => {
	const username = req.body.username;
	var query = "Select * FROM users WHERE username=$1"
	//the logic goes here
	db.one(query, [
		username,
	]).then(async (data) => {
		const match = await bcrypt.compare(req.body.password, data.password); //await is explained in #8
		if (match == false) {
			err = ("Incorrect username or password.");
		} else {
			req.session.user = {
				api_key: process.env.API_KEY,
			};
			user.username = username;
			user.user_id = data.user_id;
			user.first_name = data.first_name;
			user.last_name = data.last_name;
			user.is_manager = data.is_manager;
			req.session.user = user;
			req.session.save();
			res.redirect("/profile");
		}
	}).catch(function (err) {
		console.log(err);
		res.redirect("/login");
	});
});

app.post('/register', async (req, res) => {
	const username = req.body.username;
	const first_name = req.body.firstname;
	const last_name = req.body.lastname;
	const is_manager = false;
	const hash = await bcrypt.hash(req.body.password, 10)
	var query = "INSERT INTO users (username, first_name, last_name, password, is_manager) VALUES($1, $2, $3, $4, $5);"
	//the logic goes here
	db.any(query, [
		username,
		first_name,
		last_name,
		hash,
		is_manager,
	]).then(() => {
		console.log("new user:", username);
		res.redirect("/login");
	}).catch(function (err) {
		console.log(err)
		res.redirect("/register")
	});
});


const auth = (req, res, next) => {
	if (!req.session.user) {
		return res.render("pages/login");
	}
	next();
};

app.use(auth);


app.get('/', (req, res) => {
	res.render('pages/login');
});


app.get("/login", (req, res) => {
	res.render("pages/login");
});


app.get("/profile", (req, res) => {
	res.render("pages/profile", {
		username: req.session.user.username,
		first_name: req.session.user.first_name,
		last_name: req.session.user.last_name,
	});
});

app.get("/employeeMenu", (req, res) => {
	res.render("pages/employeeMenu");
});

app.get("/employee", (req, res) => {
	res.render("pages/employee");
});


const user_projects = `
SELECT DISTINCT
  projects.project_id,
  projects.project_name,
  projects.description
  FROM
	projects WHERE projects.project_id IN ( SELECT users_to_projects.project_id
		FROM users_to_projects
		WHERE users_to_projects.user_id = $1)`;

//Return all coruses for specific user

app.get("/projects", (req, res) => {
	query = user_projects
	db.any(query, [
		req.session.user.user_id,
	]).then(function (courses) {
		console.log(courses);
		res.render("pages/allProjects", {
			courses,
		});
	}).catch(function (err) {
		return res.status(200).json(err);
	});
});


const user_projects_done = `
SELECT DISTINCT
  projects.project_id,
  projects.project_name,
  projects.description
  FROM
	projects WHERE projects.project_id IN ( SELECT users_to_projects.project_id
		FROM users_to_projects
		WHERE users_to_projects.user_id = $1 && users_to_projects.completed = True)`;

//Return all coruses for specific user
app.get("/projects_done", (req, res) => {
	query = user_projects_done
	db.any(query, [
		req.session.user.user_id,
	]).then(function (courses) {
		console.log(courses);
		res.render("pages/allProjects", {
			courses,
		});
	}).catch(function (err) {
		return res.status(200).json(err);
	});
});

const user_projects_not_done = `
SELECT DISTINCT
  projects.project_id,
  projects.project_name,
  projects.description
  FROM
	projects WHERE projects.project_id IN ( SELECT users_to_projects.project_id
		FROM users_to_projects
		WHERE users_to_projects.user_id = $1 && users_to_projects.completed = False)`;


//Return all coruses for specific user
app.get("/projects_not_done", (req, res) => {
	query = user_projects_not_done
	db.any(query, [
		req.session.user.user_id,
	]).then(function (courses) {
		console.log(courses);
		res.render("pages/allProjects", {
			courses,
		});
	}).catch(function (err) {
		return res.status(200).json(err);
	});
});


employee_for_manager = `
SELECT *
  FROM
	users WHERE users.user_id IN ( SELECT users_to_manager.user_id
		FROM users_to_manager
		WHERE users_to_manager.manager_id = $1)`;

//Return all employees for a specific manager 
app.get("/allEmployees", (req, res) => {
	query = employee_for_manager
	db.any(query, [
		req.session.user.user_id,
	]).then(
		function (employees) {
			console.log(employees)
			res.render("pages/allEmployees", {
				employees,
			});
		}).catch(function (err) {
			return res.status(200).json(err);
		});
});

app.get("/project", async (req, res) => {
	let query = 'select * from projects'; // get proj data

	try {
		res.render("pages/project");
	}
	catch {
		console.log("error!");
		res.redirect("/profile");
	}

});

app.listen(3000);
console.log("Server is listening on port 3000");