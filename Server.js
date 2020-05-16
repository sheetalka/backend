const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const knex = require("knex");
const register = require("./Controllers/Register");
const signin = require("./Controllers/Signin");
const profile = require("./Controllers/Profile");
const rank = require("./Controllers/Rank");
const PORT = process.env.PORT || 4003;

/***** Connecting to db *****/
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'hnk506002',
    database : 'new'
  }
});
/**********************/
app.use(
  bodyparser.urlencoded({
    extended: false
  })
);
app.use(bodyparser.json());
app.use(cors());
/*****Signin Route *****/
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});
/**********************/
/*****Register Route *****/
app.post("/register", (req, res) => {
  register.handleRegistration(req, res, db, bcrypt);
});
/**********************/
/*****Get Profile Route *****/
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});
/**********************/
/*****Get Profile Route *****/
app.put("/image", (req, res) => {
  rank.handleRank(req, res, db);
});
/**********************/
/*****Handle api call Route *****/
app.post("/imageurl", (req, res) => {
  rank.handleApiCall(req, res);
});
/**********************/
/*****Listing Server *****/
app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT} `);
});
