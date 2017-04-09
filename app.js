var express = require('express') // call express
var app = express() // define our app using express
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var path = require('path')
mongoose.connect('mongodb://localhost/on-the-snow-2') //connects to db on-the-snow-2

var Resort = require('./models/resort')

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
var port = process.env.PORT || 8080 // set our port

// ROUTES FOR OUR API
// =============================================================================

// middleware to use for all requests
app.use(function(req, res, next) {
	console.log('Something is happening')
	next() // make sure we go to the next routes and don't stop here
})

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function(req, res) {
	res.sendFile()
})

app.get('/places/:placeName', function(req, res) {
	console.log(req.params.placeName)
	res.render('places', { placeName: req.params.placeName })
})

app.get('/api/resort', function(req, res) {
	Resort.find(function(err, resort) {
		if (err) res.send(err)
		res.json(resort)
	})
})

app.get('/api/resort/:resortId', function(req, res) {
	Resort.findOne({ id: req.params.resortId }, function(err, resort) {
		if (err) res.send(err)
		res.json(resort)
	})
})

//compare resort 
app.get('/api/compare', function(req, res) {
	var place1 = req.query.place1
	var place2 = req.query.place2
	console.log(place1)
	console.log(place2)
	res.send('Comparison from DB')
})
//end of compare resort

//add here coded to receive/get info of location and its lat and lon! Which will then be used by the scriptAspen.js, this file will then need to be changed to be called in another way

// more routes for our API will happen here
// router.route('/resort')

// get all the resorts (accessed at GET http://localhost:8080/api/resorts)
// .get(function(req, res) {
//     Resort.find(function(err, resort) {
//         if (err) res.send(err);
//         res.json(resort);
//     });
// });

// routes that end in /resort/_id
// router.route('/resort/:id')
//     .get(function(req, res) {
//         console.log("REQ FOR", req.params.id);
//         Resort.findOne({ id: req.params.id }, function(err, resort) {
//             if (err) res.send(err);
//             res.json(resort);
//         });
//     })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Magic happens on port ' + port)
