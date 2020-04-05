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
/*router.get('/suitDetails', function(req, res, next) {
	  res.render('pages/suitDetails.ejs');
	});*/
router.get('/suitDetails', getSuitDetails);
router.get('/addSuit', function(req, res, next) {
	  res.render('pages/addSuit.ejs');
	});


const indexPath = 'pages/index';

// Following the "Single query" approach from: https://node-postgres.com/features/pooling#single-query

const { Pool } = require("pg"); // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL || "postgres://test_user:test_pass@localhost:5432/spiderman";

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});

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
	getSuitDetailsFromDb(function(error, suitDetails) {
		if (error || suitDetails == null) {
			res.status(500).json({success:false, data:error});
		}
		else {
			res.render('pages/suitDetails', {suitDetails: suitDetails});
		}
	});
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

function getSuitDetailsFromDb(callback) {
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

module.exports = router;