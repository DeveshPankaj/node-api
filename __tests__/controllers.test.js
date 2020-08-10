
const GetController = require('../dist/base/GetController').default
const GetControllerByName = require('../dist/base/GetControllerByName').default

const path = require('path')
const project = path.resolve('./examples/login-api/')


// const ls = GetController(project)
// console.log(ls)

// const login = GetControllerByName(project, 'Login')
// console.log(login)

test('Should return Controller with same name', () => {
  const login = GetControllerByName(project, 'Login')
  expect(login[0].name).toEqual('Login');
});
