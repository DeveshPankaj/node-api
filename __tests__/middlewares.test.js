
const con = require('../dist/base/GetMiddleware').default
const path = require('path')

const project = path.resolve('./examples/login-api/')

test('Should return array of Controller', (next) => {
	const ls = con(project)

  // const login = GetControllerByName(project, 'Login')
  expect(typeof ls).toBe('object');
  next()
});

