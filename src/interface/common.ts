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

export interface IService {
	method?: "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined
	name: string
	version: string
	released: boolean
	path: string
	_id: string
}

export interface IServiceMap {
	add(service: IService): boolean
	find(serviceName: string, isReleased?: boolean): Array<IService>
	update(service: IService): boolean
	remove(service:IService): void
}

export interface IManager {
	install(context: object): void
}
