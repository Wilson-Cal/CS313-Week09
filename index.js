const express = require("express");
const bodyParser = require('body-parser')
const path = require("path");

const letterConversion = require("./letterConversion.js");

const port = process.env.PORT || 5000;

const app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.urlencoded({ extended: true }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .post('/getRate', (req, res) => {
        const { weight, mail_type } = req.body;
        const price = weight > 3.5 ? letterConversion[mail_type]["3.5"].toFixed(2) : letterConversion[mail_type][weight].toFixed(2);
        const mail_name = letterConversion[mail_type].name;
        res.render('pages/result.ejs', { price, weight, mail_name });
    });

app.listen(port, () => { console.log(`Listening on port ${port}!`) })