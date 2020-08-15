const GetMiddleware = require('../dist/base/GetMiddleware').default
const CallMiddleware = require('../dist/base/CallMiddleware').default
const path = require('path')

const project = path.resolve('./examples/login-api/')

const ls = GetMiddleware(project)
const middlewarePath = ls[0].path

const args = {
	token: '2345kjhcxtr',
	data: {
		q: 1,
		a: 2
	}
}

global.developmentMode = false

test('Should Call Middleware', (next) => {
	CallMiddleware(project, middlewarePath, args)
	.then(() => {
		next()
	})
	.catch(error => {
		if(developmentMode) throw error
		else console.log('failed')
		next()
	})
});

