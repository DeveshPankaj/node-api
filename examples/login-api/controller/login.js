// Imports

// Class
class Login {
	constructor(platform, req, res) {
		this.platform = platform
		this.req = req
		this.res = res
	}

	main (input, resolve, reject) {
		this.platform.CallController('GetJWTToken', input)
		.then(resolve)
		.catch(error => {
			console.log(error)
			resolve({token: "default"})
		})
	}

	destroy () {
	}
}

// Input
Login.input = ({
	name: 'string',
	password: 'string'
})


// Output
Login.output = ({
	token: 'string'
})

module.exports = Login