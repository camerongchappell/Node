var express = require('express');
var router = express.Router();

/* Get page for postal prices, week09 Prove */
router.get('/', function(req, res, next) {
  res.render('pages/form.ejs');
});

router.post('/determinePostage', function(req, res, next) {
  determinePostage(req, res);
});

function calculateRate(weight, mail_type) {
	var rate = 0;
	if (mail_type == "Letters (Stamped)") {
			if (weight >= 0 && weight <= 1) {
				rate = 0.55;
			}
			else if (weight > 1 && weight <= 2) {
				rate = 0.70;
			}
			else if (weight > 2 && weight <= 3) {
				rate = 0.85;
			}
			else if (weight > 3 && weight <= 3.5) {
				rate = 1.00;
			}
	}
	else if (mail_type == "Letters (Metered)") {
		if (weight >= 0 && weight <= 1) {
			rate = 0.50;
		}
		else if (weight > 1 && weight <= 2) {
			rate = 0.65;
		}
		else if (weight > 2 && weight <= 3) {
			rate = 0.80;
		}
		else if (weight > 3 && weight <= 3.5) {
			rate = 0.95;
		}
	}
	else if (mail_type == "Large Envelopes (Flats)") {
		if (weight >= 0 && weight <= 1) {
			rate = 1.00;
		}
		else if (weight > 1 && weight <= 2) {
			rate = 1.20;
		}
		else if (weight > 2 && weight <= 3) {
			rate = 1.40;
		}
		else if (weight > 3 && weight <= 4) {
			rate = 1.60;
		}
		else if (weight > 4 && weight <= 5) {
			rate = 1.80;
		}
		else if (weight > 5 && weight <= 6) {
			rate = 2.00;
		}
		else if (weight > 6 && weight <= 7) {
			rate = 2.20;
		}
		else if (weight > 7 && weight <= 8) {
			rate = 2.40;
		}
		else if (weight > 8 && weight <= 9) {
			rate = 2.60;
		}
		else if (weight > 9 && weight <= 10) {
			rate = 2.80;
		}
		else if (weight > 10 && weight <= 11) {
			rate = 3.00;
		}
		else if (weight > 11 && weight <= 12) {
			rate = 3.20;
		}
		else if (weight > 12 && weight <= 13) {
			rate = 3.40;
		}
	}
	else if (mail_type == "First-Class Package Service-Retail") {
		if (weight >= 0 && weight <= 1) {
			rate = 3.80;
		}
		else if (weight > 1 && weight <= 2) {
			rate = 3.80;
		}
		else if (weight > 2 && weight <= 3) {
			rate = 3.80;
		}
		else if (weight > 3 && weight <= 4) {
			rate = 3.80;
		}
		else if (weight > 4 && weight <= 5) {
			rate = 4.60;
		}
		else if (weight > 5 && weight <= 6) {
			rate = 4.60;
		}
		else if (weight > 6 && weight <= 7) {
			rate = 4.60;
		}
		else if (weight > 7 && weight <= 8) {
			rate = 4.60;
		}
		else if (weight > 8 && weight <= 9) {
			rate = 5.30;
		}
		else if (weight > 9 && weight <= 10) {
			rate = 5.30;
		}
		else if (weight > 10 && weight <= 11) {
			rate = 5.30;
		}
		else if (weight > 11 && weight <= 12) {
			rate = 5.30;
		}
		else if (weight > 12 && weight <= 13) {
			rate = 5.90;
		}
	}
	return rate;
}

function determinePostage(req, res) {
	console.log("In a different file");
	
	var mail_type = req.body.mail_type;
	var weight = req.body.weight;
	
	var rate = calculateRate(weight, mail_type);
	
	var contents = {weight: weight, mail_type: mail_type, rate: rate};
	
	res.render('pages/results.ejs', contents);
}

module.exports = router;