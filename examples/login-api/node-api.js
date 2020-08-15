module.exports = {
	"controller": [
		{
			"name": "Login",
			"path": "./controller/login",
			"middlewares": ["login.middleware"],
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
			"name": "login.middleware",
			"path": "./middleware/login",
			"status": true
		}
	]
}