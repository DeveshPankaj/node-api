import {IManager, IService, IServiceMap} from './interface/common'
import axios from 'axios'

interface IResponse {
	[key: string]: any
	data: JSON | object
	status: number
	headers: {[name: string]: string | Array<string>}
}


// 'set-cookie': [
// 	'__cfduid=dfc42ba2c22844c1d290f5676eaf1f2551598529691; expires=Sat, 26-Sep-20 12:01:31 GMT; path=/; domain=.typicode.com; HttpOnly; SameSite=Lax'
// ]


export default class CallService implements IManager {
	
	constructor(init: (callLocalService: CallService) => void) {
		init(this)
	}
	
	install(context: object) {}

	private local(req: any, res: IResponse, controller: IService): Promise<IResponse> {
		return new Promise((resolve, reject) => {
			console.log('Calling local service...', controller.path)
			
			let data = {
				name: 'devesh',
				about: 'useless'
			}
			res.status = 400
			res.data = data
			resolve(res)
		})
	}

	private remote(req: any, res: IResponse, controller: IService): Promise<IResponse> {
		return new Promise((resolve, reject) => {
			console.log('Calling remote service...', controller.path)
			
			axios({
				method: controller.method,
				url: controller.path,
				// responseType: 'stream'
			})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				reject(error)
			});
		})
		
	}
	
	public call(req: any, res: any, controller: IService): Promise<IResponse> {
		return controller.path.indexOf('//') === -1 
		? this.local(req, res, controller) 
		: this.remote(req, res, controller)
	}
}
