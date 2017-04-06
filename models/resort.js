const mongoose = require('mongoose');

const resortSchema = mongoose.Schema({
	id: Number,
	resortName: String,
	resortTerrain: Object, //part of the module that gets updated by update-profile
	resortSnowreport: Object, //part of the module that gets updated by update-profile
	updatedAt: Date,
	createdAt: Date
});

let Resort = mongoose.model('Resort',resortSchema); //converts schema to model that can be used

module.exports = Resort;
