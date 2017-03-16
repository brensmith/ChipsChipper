var mongoose = require('mongoose');

// FoodMenu Schema
var FoodMenuSchema = mongoose.Schema({
	category: {
		type: String,
		index: true
	},
	name: {
		type: String,
	},
	quantity: {
		type: Number
	},
	price: {
		type: Number
	},
	img_url: {
		type: String
	}
});

const FoodMenu = module.exports = mongoose.model('FoodMenu', FoodMenuSchema);