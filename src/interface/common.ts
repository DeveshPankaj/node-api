export interface IController {
	name: string
	path: string
	status: string
	middlewares: Array<string>
}

export interface IMiddleware {
	name: string
	path: string
	status: string
}