const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();

const w09Router = require('./Assignments/Week 09/postalService');

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.urlencoded({ extended: true}))
  .use(express.json())
  .get('/', (req, res) => res.render('pages/index'))
  .use('/postalService', w09Router);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));