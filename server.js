const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    let currency = req.body.currency;
    let amount = parseInt(req.body.amount);
    let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`
    request(url, function(err, response, body) {
        console.log(response.statusCode);
        let data = JSON.parse(response.body);
        let price;
        if(currency === 'EUR') {
            price = data.bpi.EUR;
            console.log(price.rate_float);
            res.send(`${amount} BitCoin = ${price.rate_float * amount}€`);
        } else {
            price = data.bpi.USD;
            console.log(price.rate_float);
            res.send(`${amount} BitCoin = ${price.rate_float * amount}$`)
        }
    })
})

app.listen(3000);