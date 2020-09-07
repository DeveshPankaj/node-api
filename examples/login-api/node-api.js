module.exports = {
	"controller": [
		{
			"name": "Login",
			"path": "./controller/login",
			"middlewares": ["csrf", "token"],
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
			"middlewares": [],
			"status": true
		}
	],
	"middleware": [
		{
			"name": "token",
			"path": "./middleware/token",
			"status": true
		},
		{
			"name": "csrf",
			"path": "./middleware/csrf",
			"status": true
		}
	]
}