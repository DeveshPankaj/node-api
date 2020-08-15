import GetMiddlewareByName from './base/GetMiddlewareByName'
import { IController, IMiddleware } from './interface/common'


function getControllerMiddlewares(project: string, middlewares: Array<string>): Array<IMiddleware> {
	let ls = []
	for(const index in middlewares) {
		// TODO: change return type of 'GetMiddlewareByName' to single object
		ls.push(GetMiddlewareByName(project, middlewares[index])[0])
	}
	return ls
}


export default function ProcessRequest(project: string, controller: IController, args: any) {
	return new Promise((resolve, reject) => {
		let ls = getControllerMiddlewares(project, controller.middlewares)
		resolve()
	})
}