var merge = require('merge');
var config = require('./config');

module.exports = {
	// Build an options object for using in `request`, there's probably a way to set
	// this globally somehow.
	buildOptionsObject: function buildOptionsObject(opts) {
		return merge(config.BASE_OPTIONS, opts);
	},
	createFormObjectFromCardObject: function createFormObjectFromCardObject(cardObject) {
		return {
			type: cardObject.type,
			value: 5,
			quantity: 1,
			minValue: cardObject.minValue,
			maxValue: cardObject.maxValue,
			productCode: cardObject.code,
			donation: cardObject.donation
		};
	}
};