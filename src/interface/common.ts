export interface IController {
	name: string
	version?:string
	path: string	// system file path || URI
	status: string
	middlewares: Array<string>
}

export interface IMiddleware {
	name: string
	version?:string
	path: string
	status: string
}

export interface IInput {
	[key: string]: string | { [key:string]: any }
	data: { [key:string]: any }
}