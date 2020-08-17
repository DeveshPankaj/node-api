module.exports = function login(args, resolve, reject) {
	if(args.token) {
		// console.log('any token !!')
		resolve()	
	} else {
		reject('token not found')
	}
}