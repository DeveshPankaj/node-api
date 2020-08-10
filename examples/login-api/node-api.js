module.exports = {
	"controller": [
		{
			"name": "Login",
			"path": "./controller/login",
			"status": true
		},
		{
			"name": "GetToken",
			"path": "./controller/create_token",
			"status": true
		},
		{
			"name": "GetJWTToken",
			"path": "./controller/get_jwt",
			"status": true
		}
	],
	"middleware": [
		{
			"name": "Login.middleware",
			"path": "./middleware/login",
			"status": true
		}
	]
}