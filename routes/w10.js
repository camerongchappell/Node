const express = require('express');
const app = express();
var router = express.Router();

/*router.post('/getSuit', function(req, res, next) {
	getSuit(req, res);
	});*/
router.get('/getSuit', function (req, res) {
	  res.send({"id": "1"})
	})

// Following the "Single query" approach from: https://node-postgres.com/features/pooling#single-query

const { Pool } = require("pg"); // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL || "postgres://test_user:test_pass@localhost:5432/spiderman";

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});

// This function handles requests to the /getSuit endpoint
// it expects to have an id on the query string, such as: http://localhost:5000/getSuit?id=1
function getSuit(request, response) {
	// First get the suit's id
	const id = request.query.id;

	// TODO: We should really check here for a valid id before continuing on...

	// use a helper function to query the DB, and provide a callback for when it's done
	getSuitFromDb(id, function(error, result) {
		// This is the callback function that will be called when the DB is done.
		// The job here is just to send it back.

		// Make sure we got a row with the suit, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			const suit = result[0];
			response.status(200).json(suit);
		}
	});
}

// This function gets a suit from the DB.
// By separating this out from the handler above, we can keep our model
// logic (this function) separate from our controller logic (the getSuit function)
function getSuitFromDb(id, callback) {
	console.log("Getting suit from DB with id: " + id);

	// Set up the SQL that we will use for our query. Note that we can make
	// use of parameter placeholders just like with PHP's PDO.
	const sql = "SELECT id, name, color, image, year_created, info FROM suit WHERE id = $1::int";

	// We now set up an array of all the parameters we will pass to fill the
	// placeholder spots we left in the query.
	const params = [id];

	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		// Log this to the console for debugging purposes.
		console.log("Found result: " + JSON.stringify(result.rows));


		// When someone else called this function, they supplied the function
		// they wanted called when we were all done. Call that function now
		// and pass it the results.

		// (The first parameter is the error variable, so we will pass null.)
		callback(null, result.rows);
	});

} // end of getSuitFromDb

module.exports = router;