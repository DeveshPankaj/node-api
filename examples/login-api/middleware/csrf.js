module.exports = function csrf(args, resolve, reject) {
	if(args.csrf) {
		// console.log('csrf !!')
		resolve()	
	} else {
		reject('csrf token not found')
	}
}