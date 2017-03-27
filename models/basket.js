var mongoose = require('mongoose');

// Basket Schema
var BasketSchema = mongoose.Schema({
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

const Basket = module.exports = mongoose.model('Basket', BasketSchema);