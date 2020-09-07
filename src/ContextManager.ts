import {IManager} from './interface/common'
import { prototype } from 'module'

const Context: {[key: string]: IManager | any} = {
	init: (manager: IManager): void => {
		let self = Context
		let name = manager.constructor.name
		if(name in self) {
			return
		}
		else {
			manager.install(self)
			self[name] = manager
		}
	},
	register: <T>(type: {new(context: Function):T}): void => {
		let inst = new type(Context.init);
	}
}


export default new Proxy(Context, {
	get (obj: {[key: string]: any, [key: number]: any}, prop: string|number, receiver: any) : any {
		if(prop in obj) {
			return obj[prop]
		} else {
			throw Error(`'${prop}' not found in Context.`)
		}
	}
})
