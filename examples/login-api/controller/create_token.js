// Imports

// Class
class GetToken {
	constructor(platform, req, res) {
		this.platform = platform
		this.req = req
		this.res = res
	}

	main (input, resolve, reject) {
		resolve({token: "123"})
	}

	destroy () {
	}
}

// Input
GetToken.input = ({
	name: 'string',
	password: 'string'
})


// Output
GetToken.output = ({
	token: 'string'
})

module.exports = GetToken
