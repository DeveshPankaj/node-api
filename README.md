# node-api
node-api is a framework for rapid `API` development and managing large project. It provides full controle over data flow between diffrent components at `runtime`

# Warning: This project is under development.
![][Logo_Small] 

## Getting Started
Creating an API in `node-api` can be done with few simple steps


# Create Controller mapping
To run the project the only configuration require is to provide `controllers` 
```json
/* 
   ~/project/package.json 
   set controller mapping file
*/
{
    "name": "myProject"
    ...
    "node-api": {
        "controller": "<path-of-controller-mapping-file>"  // <path-of-controller-mapping-file> this file can be (.json, .js)
    }
    ...
}
```

Mapping Controllers
```js
// project/<path-of-controller-mapping-file>.js
module.exports = {
	"controller": [
		{
			"name": "Login",
			"path": "./controller/login",
			"status": true
		},
		{
			"name": "GetJWTToken",
			"path": "./controller/get_jwt",
			"status": true
		}
	],
	"middleware": []
}
```

# Creating first controller
```js
// project/controller/get_jwt.js
class GetJWTToken {
	constructor(platform, req, res) {
		this.platform = platform
		this.req = req
		this.res = res
	}

	main (input, resolve, reject) {
		resolve({token: "JWT-12345.2345we123.1234q=="})
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
```

# Calling `Controller` from other controller
```js
// project/controller/login.js
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
```

[Logo_Small]: ./in-progress.png "In-Progress"
