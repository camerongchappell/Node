const express = require('express');
const app = express();
var router = express.Router();

router.get('/signIn', function(req, res, next) {
	  res.render('pages/signIn.ejs');
	});
router.get('/signUp', function(req, res, next) {
	  res.render('pages/signUp.ejs');
	});

router.get("/getSuit", getSuit);
router.get('/suitDetails', getSuitDetails);


router.get('/addSuit', function(req, res, next) {
	  res.render('pages/addSuit.ejs');
	});

router.post('/insertSuit', function(req, res, next) {
	  insertSuit(req, res);
	});


const indexPath = 'pages/index';

// Following the "Single query" approach from: https://node-postgres.com/features/pooling#single-query

const { Pool } = require("pg"); // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL || "postgres://test_user:test_pass@localhost:5432/spiderman";

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});


/*const {Pool, Client} = require('pg')

const pool = new Pool ({
	user:"test_user",
	host:"localhost",
	database:"spiderman",
	password: "test_pass",
	port: 5432
})*/

// This function handles requests to the /getSuit endpoint
function getSuit(req, res) {
	getSuitsFromDb(function(error, suitResults) {
		if (error || suitResults == null) {
			res.status(500).json({success:false, data:error});
		}
		else {
			res.render(indexPath, {suitResults: suitResults});
		}
	});
}

function getSuitDetails(req, res) {
	var suitId = req.query.id;
	getSuitDetailsFromDb(suitId, function(error, suitDetails) {
		if (error || suitDetails == null) {
			res.status(500).json({success:false, data:error});
		}
		else {
			res.render('pages/suitDetails', {suitDetails: suitDetails});
		}
	});
}

function insertSuit(req, res) {
	var sql = "INSERT INTO SUIT (name, color, image, year_created, info) VALUES('" + req.body.suitName + "', '" + req.body.color + "', '" + req.body.image + "', '" + req.body.year + "', '" + req.body.info + "')";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
		}
		else {
			// Log this to the console for debugging purposes.
			console.log("Found result: " + JSON.stringify(result.rows));
		}
	});
	res.render('pages/addSuit');
}

function getSuitsFromDb(callback) {
	var sql = "SELECT * FROM SUIT";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		else {
			// Log this to the console for debugging purposes.
			console.log("Found result: " + JSON.stringify(result.rows));
			// (The first parameter is the error variable, so we will pass null.)
			callback(null, result.rows);	
		}
	});
}

function getSuitDetailsFromDb(suitId, callback) {
	var sql = "SELECT * FROM SUIT WHERE id = '" + suitId + "'";
	//var sql = "SELECT * FROM GADGET WHERE suit_id = '" + suitId + "'";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		else {
			// Log this to the console for debugging purposes.
			console.log("Found result: " + JSON.stringify(result.rows));
			// (The first parameter is the error variable, so we will pass null.)
			callback(null, result.rows);	
		}
	});
}

module.exports = router;