const GetController = require('../dist/base/GetController').default
const CallAllMiddleware = require('../dist/base/CallAllMiddleware').default
const path = require('path')

const project = path.resolve('./examples/login-api/')


const ls = GetController(project)
const controllerName = ls[0].name

let payload = {
	token: '876tfbj765ed',
	csrf: 'rfyfutc',
	data: {
		name: 'pankaj',
		password: '**********'
	}
}



test('Should call all middleware for login controller', (next) => {
	// console.log(ls[0])
	CallAllMiddleware(project, controllerName, payload)
	.then(result => {
		next()
	})
	.catch(error => {
		throw error
	})
  //expect(login[0].name).toEqual('Login');
});


