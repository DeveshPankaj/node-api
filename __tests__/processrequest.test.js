const GetController = require('../dist/base/GetController').default
const CallController = require('../dist/base/CallController').default
const ProcessRequest = require('../dist/ProcessRequest').default
const path = require('path')

const project = path.resolve('./examples/login-api/')
const ls = GetController(project)

let payload = {
	data: {
		name: 'pankaj',
		password: '**********'
	},
	csrf: 'se4fvuj98yf'
}

test('Should call ProcessRequest', (next) => {
  ProcessRequest(project, ls[0], payload)
  .then(_ => next())
});
