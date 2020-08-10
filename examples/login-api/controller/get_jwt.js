// Imports

// Class
class GetJWTToken {
	constructor(platform, req, res) {
		this.platform = platform
		this.req = req
		this.res = res
	}

	main (input, resolve, reject) {
		resolve({token: "JWT-12345.2345we123.1234q=="})
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
