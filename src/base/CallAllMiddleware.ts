import GetControllerByName from './GetControllerByName'
import CallMiddleware from './CallMiddleware'
import GetMiddleware from './GetMiddleware'
import {IInput, IMiddleware} from '../interface/common'


export default function CallAllMiddleware(project: string, controllerName: string, input: IInput) {
	return new Promise((_resolve, _reject) => {
		let new_controller = GetControllerByName(project, controllerName)
		// CallController(project, file, input)
		if(new_controller.length === 1) {
			const middlewares = new_controller[0].middlewares
			const ls = GetMiddleware(project)

			const loop = function(i: number) {
				if(i === middlewares.length) {
					_resolve()
				} else {
					/// TODO: filter active middleware
					const middleware = ls.filter(x => x.name === middlewares[i])
					if(middleware.length === 1) {
						CallMiddleware(project, middleware[0].path, input)
						.then(data => loop(i+1))
						.catch(_reject)
					} else {
						_reject(`[CallAllMiddleware] 001: Can not find middleware with name: '${middlewares[i]}'`)
					}
				}
			}
			loop(0)
		} else {
			_reject(`[CallAllMiddleware] 002: Can not find controller with name: '${controllerName}'`)
		}
	}) 
}