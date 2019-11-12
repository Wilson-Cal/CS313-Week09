const express = require("express");
const bodyParser = require('body-parser')
const path = require("path");

const letterConversion = require("./letterConversion.js");

const port = process.env.PORT || 5000;

const calculateRate = (req, res) => {
    const { weight, mail_type } = req.body;
    const price = weight > letterConversion[mail_type].maxWeight ? letterConversion[mail_type].maxWeight.toFixed(2) : letterConversion[mail_type][weight].toFixed(2);
    const mail_name = letterConversion[mail_type].name;
    res.render('pages/result.ejs', { price, weight, mail_name });
}

const app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.urlencoded({ extended: true }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .post('/getRate', calculateRate);

app.listen(port, () => { console.log(`Listening on port ${port}!`) })