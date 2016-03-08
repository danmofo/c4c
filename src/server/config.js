module.exports = {
	ENDPOINTS: {
		query: 'https://cardsforcauses.giveasyoulive.com/query',
		basket: 'https://cardsforcauses.giveasyoulive.com/list',
		deleteItem: 'https://cardsforcauses.giveasyoulive.com/deleteOrderLine',
		addItem: 'https://cardsforcauses.giveasyoulive.com/addOrderLine'
	},
	DEFAULT_FILTERS: {
		market: 'instore',
		sort: 'name',
		card: '',
		digital: '',
		reloadable: ''
	},
	// Base options we always want to use for 'request'
	BASE_OPTIONS: {
		method: 'POST',
		headers: {
			'Cookie': require('./.cookie.json')['cookies'] || ''
		}
	},
	JSON_RESPONSES: {
		UNKNOWN_ERROR: {
			errorMessage: 'Something went wrong.',
			errorCode: 1
		}
	},
	DUMMY_CARD_OBJECT: {
		"code": "CINE00",
		"minValue": 5,
		"maxValue": 250,
		"type": "CARD",
		"donation": 6,
};
