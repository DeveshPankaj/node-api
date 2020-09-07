const jwt = require('jsonwebtoken');

module.exports = function token(args, resolve, reject) {
	if(args.token) {
		try {
			console.log(args)
			var decoded = jwt.verify(args.token, 'wrong-secret');
			resolve()	
		} catch(err) {
			reject(err)
		}
	} else {
		reject('token not found')
	}
}