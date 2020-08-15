const GetController = require('../dist/base/GetController').default
const CallController = require('../dist/base/CallController').default
const path = require('path')

const project = path.resolve('./examples/login-api/')


const ls = GetController(project)
const controllerPath = ls[0].path

let payload = {
	name: 'pankaj',
	password: '**********'
}



test('Should call \'Login\' controller', (next) => {
	console.log(ls[0])
	CallController(project, controllerPath, payload)
	.then(result => {
		expect(result).toHaveProperty('token');
		next()
	})
	.catch(error => {
		console.log(error)
	})
  //expect(login[0].name).toEqual('Login');
});






