var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret
});

module.exports = {
	search: function(options) {
		return yelp.search(options).then(function (data) {
			var businesses = data.businesses;
			var formattedBusinesses = businesses.map(function(business) {
				return {
					name: business.name,
					rating: business.rating,
					url: business.url,
					phone: business.phone,
					category: business.categories,
					review_snippet: business.snippet_text,
					address: business.location.display_address
				};
			});
	  		return (formattedBusinesses);
		}).catch(function (err) {
	  		console.error(err);
		});
	}
}

//https://github.com/olalonde/node-yelp/blob/master/src/index.js#L29

// module.exports = {
// 	search: function(searchTerm) {
// 		return new Promise(function(resolve, reject) {
// 			var params = { t: searchTerm };
// 			client.get('search/results', params, function(error, results) {
// 				if(!error) {

// 				}
// 			});
// 		})
// 	}
// }