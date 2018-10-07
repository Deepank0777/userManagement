const	request 	=	require('request');

module.exports = {
	isJson: function (str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	},
	httpRequest: function(options){
	    return new Promise(function (resolve, reject){
	        request(options, function (err, res, body){
	            err ? reject(err) : resolve(body);
	        });
	    });
	}
}