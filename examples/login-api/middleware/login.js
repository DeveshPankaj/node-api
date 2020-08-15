module.exports = function login(args, resolve, reject) {
	if(args.token) {
		resolve()	
	} else {
		reject('token not found')
	}
}