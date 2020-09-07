// Imports
const jwt = require('jsonwebtoken');

// Class
class GetJWTToken {
	constructor(platform, req, res) {
		this.platform = platform
		this.req = req
		this.res = res
	}

	main (input, resolve, reject) {
		let token = jwt.sign(input, 'shhhhh');
		resolve({token})
	}

	destroy () {
	}
}

// Input
GetJWTToken.input = ({
	name: 'string',
	password: 'string'
})


// Output
GetJWTToken.output = ({
	token: 'string'
})

module.exports = GetJWTToken
