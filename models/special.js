var mongoose = require('mongoose');

// FoodMenu Schema
var SpecialMenuSchema = mongoose.Schema({
	name: {
		type: String,
	},
	price: {
		type: Number,
	},
	item: {
		type: String,
	},
	adhoc_price: {
		type: Number
	}
});

const SpecialMenu = module.exports = mongoose.model('SpecialMenu', SpecialMenuSchema);