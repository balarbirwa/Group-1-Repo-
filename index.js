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
      console.log('Database connection successful'); // you can view this message in the docker compose logs
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

  app.listen(3000);


  app.get('/', (req, res) =>{
    res.redirect('/login'); //this will call the /anotherRoute route in the API
  });
  
  app.get('/login', (req, res) => {
    res.render("pages/login");
  });

  app.get('/register', (req, res) => {
    res.render("pages/register");
  });

  app.post('/register', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const query = `INSERT into users(username, password) VALUES ('${req.body.username}', '${hash}') ;`;
    db.any(query)
    .then(function(data) {
        res.redirect('/login');
      })
      .catch(function(err) {
        res.redirect('/register')
      });
  });

  app.get('/login', (req, res) => {
    res.render("pages/login");
  });

  app.post('/login', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = `select * from users where users.username = ${username}`;
    //ERROR I AM RUNNING INTO WHENEVER I TRY TO LOG IN
    // 2022-10-27 17:46:32.674 UTC [33] ERROR:  column "michael" does not exist at character 44
    // 2022-10-27 17:46:32.674 UTC [33] STATEMENT:  select * from users where users.username = michael
    db.any(query)
      .then(function(result){
        if(result.length == 0)
        {
          res.redirect('/register');
          return console.log("----->User not found");
        }
        else
        {
          const match = bcrypt.compare(results[0], password);
          if(match)
          {
            req.session.user = {
              api_key: process.env.API_KEY,            
            };
            req.session.save();
            res.redirect('/discover');
            return console.log("----->Login Successful");
          }
          else
          {
            res.redirect('/login');
            return console.log("----->Incorrect Credentials");
          }
        }
      })
      .catch(function(err) {
        return console.log(err);
      })
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

app.get('/discover', async (req, res)  => {
    axios({
            url: `https://app.ticketmaster.com/discovery/v2/events.json`,
            method: 'GET',
            dataType:'json',
            params: {
                "apikey": req.session.user.api_key,
                "keyword": "Michael", //you can choose any artist/event here
                "size": 10,
            }
        })
        .then(results => {
            console.log(results.data._embedded.events); // the results will be displayed on the terminal if the docker containers are running
            dataRes = results.data._embedded.events;
            res.render("pages/discover", {dataRes});
        })
        .catch(error => {
        // Handle errors
        console.log(error);
        console.log("error with API");
        })
});


app.get("/logout", (req, res) => {
    req.session.destroy();
    res.render("pages/logout");
  });