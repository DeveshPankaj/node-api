
const GetMiddleware = require('../dist/base/GetMiddleware').default
const path = require('path')

const project = path.resolve('./examples/login-api/')

test('Should return array of Controller', (next) => {
	const ls = GetMiddleware(project)
	console.log(ls)
  // const login = GetControllerByName(project, 'Login')
  expect(typeof ls).toBe('object');
  next()
});

