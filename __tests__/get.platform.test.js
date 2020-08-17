
const GetPlatformInstence = require('../dist/GetPlatformInstence').default

const path = require('path')
const project = path.resolve('./examples/login-api/')

const platform  = GetPlatformInstence(project)

let payload = {
	data: {
		name: 'pankaj',
		password: '**********'	
	}
}

test('Should call Login Controller', (next) => {
  platform.CallController(project, 'GetJWTToken', payload)
	.then(data => {
		expect(data).toHaveProperty('token');
		expect(data.token.indexOf('JWT') !== -1).toBe(true)
		next()
	})
	.catch(error=> {throw error})
});


