import GetController from './base/GetController'
import GetMiddleware from './base/GetMiddleware'
import GetPlatformInstence from './GetPlatformInstence'
import {IInput} from './interface/common'
import Express from 'express'
const bodyParser = require('body-parser');

const config = {
	port: 8000,
	host: '127.0.0.1',
	route: '/api/:version/:controller', // URN
	project: process.cwd()
}

let platform: any

interface Request extends Express.Request {
	'rmi-trail': Array<string> 
}

// TODO: fix errorHandler
function errorHandler (err: any, req: any, res: any, next: any) {
	
	res.json({err})
	next(err)
}

function controller() {

}

function middleware(req: Request, res: Express.Response, next: Express.NextFunction) {
	req['rmi-trail'] = []
	if(req.get('RMI') === 'true') {
		try {
			let trail = Buffer.from(req.get('request-trail')||'', 'base64').toString('binary')
			req['rmi-trail'] = JSON.parse(trail)
		} catch(error) {
			next(error)
		}
	}
	next()
}

function exec(req: Request, res: Express.Response, next: Express.NextFunction) {
	let data: {[key: string]: any} = {...req.params, method: req.method, 'rmi-trail': req['rmi-trail']};
	
	let payload = {
		token: '876tfbj765ed',
		csrf: 'rfyfutc',
		data: req.body
	};

	(<{CallController(project: string, controllerName: string, input: { [key:string]: any }): Promise<unknown>}>platform).CallController(config.project, 'Login', payload.data)
	.then(data => {
		res.json(data)
	})
	.catch(error => {
		console.error(error)
		res.json(error)
	})
	
}

function add_listner(app: Express.Application) {
	//@ts-ignore
	app.use(config.route, [middleware], errorHandler)
	//@ts-ignore
	app.all(config.route, [exec], errorHandler)
}

function run(app?: Express.Application): void {
	if(app) {
		add_listner(app)
	} else {
		let _app = Express()
		_app.use(bodyParser.urlencoded({ extended: true }))
		_app.use(bodyParser.json())
		add_listner(_app)
		_app.listen(config.port, config.host, () => {
			let info = ({host, port, route}: {host:string, port: number, route: string}) => ({host, port, route})
			console.table(info(config))
		})
	}

	platform = GetPlatformInstence(config.project)
}


if (require.main === module) {
    run()
    console.log(process.cwd())
} else {
    // console.log('Required !')
}

const proxy_handel = {
	get: function(obj: {[key: string]: any, [key: number]: any}, prop: string|number, receiver: any): any {
		if(prop === 'config') return config
		if(prop in obj) {
			return obj[prop]
		} else {
			console.error(`[index.js]: '${prop}' property not found`)
			return undefined
		}
	},

	set: function(obj: {[key: string]: any, [key: number]: any}, prop: string, value: any) {
		if(prop === 'config') {
			Object.assign(config, value)
		} else {
			obj[prop] = value
		}
		return true
	}
}

module.exports = new Proxy({
	GetController,
	GetMiddleware,
	run
}, proxy_handel)


