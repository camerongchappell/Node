const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();

const w09Router = require('./routes/Assignments/Week09/postalService');
const w10Router = require('./routes/w10.js');

const indexPath = 'pages/index';

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.use(express.urlencoded({ extended: true}))
.use(express.json())
.get('/', (req, res) => res.render('pages/form')) // this is for your homepage, i.e. localhost:5000/
//.get('/w10/getSuit', (req, res) => res.render('pages/index'))
.use('/postalService', w09Router)
.use('/w10', w10Router);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));