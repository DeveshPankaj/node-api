import Context from './ContextManager'
import ServiceManager from './ServiceManager'
import CallService from './CallService'
import {IService} from './interface/common'


// import {IManager, IService, IServiceMap} from './interface/common'

Context.register(ServiceManager)
Context.register(CallService)



let s: ServiceManager = Context.ServiceManager
let c: CallService = Context.CallService

let services: Array<IService> = [
	{
		name: 'login',
		version: '1.0.0',
		released: true,
		path: 'D:\\Desktop\\api',
		_id: '234nh32kklhj3khj3'
	},
	{
		name: 'login',
		version: '1.0.0',
		released: false,
		method: 'get',
		path: 'https://jsonplaceholder.typicode.com/users/',
		_id: '1hghbiu3y766jy9gh'
	}
]

function loadServices(services: Array<IService>, context: any) {
	if('ServiceManager' in context) {
		services.forEach(s => context.ServiceManager.add(s))
	} else {
		console.error('failed to load services, ServiceManager not registerd in Context')
	}
}

loadServices(services, Context)
let login = s.find('login', false)


let req = {}
let res = {}

c.call(req, res, login[1]).then((response) => {
	let next = {
		data: response.data || 200,
		status: response.status
	}

	console.log(response)
}).catch((error) => {
	console.error(error)
});


