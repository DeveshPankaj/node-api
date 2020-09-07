import {IManager, IService, IServiceMap} from './interface/common'

class ServiceMap implements IServiceMap {
	map: {[key: string]: Array<IService>} = {}
	id_map: {[key: string]: string} = {}

	constructor() {}

	add (service: IService): boolean {
		if(service._id in this.id_map) {
			return false
		}

		else {
			this.map[service.name] = this.map[service.name] || []
			this.map[service.name].push(service)
			this.id_map[service._id] = service.name
			return true
		}
		
	}

	// TODO: need to update find function to take service as object and compare on accordingly
	find (serviceName: string, isReleased = true): Array<IService> {

		if(serviceName in this.map) {
			return isReleased ? this.map[serviceName].filter(x => x.released === true) : this.map[serviceName]
		}

		else {
			return []
		}
	}

	update (service: IService): boolean {
		if(service._id in this.id_map) {
			let ls = this.find(this.id_map[service._id], false).filter(x => x._id === service._id)
			if(ls.length !== 1) {
				return false
			}
			else {
				Object.assign(ls[0], service)
				return true
			}
		}
		else {
			return false
		}
	}

	remove (service: IService): void {
		if(service._id in this.id_map) {
			this.map[this.id_map[service._id]] = this.map[this.id_map[service._id]].filter(x => x._id !== service._id)
			delete this.id_map[service._id]
		}
	}
}

export default class ServiceManager implements IServiceMap, IManager {
	local: ServiceMap = new ServiceMap()
	remote: ServiceMap = new ServiceMap()
	constructor(init: (serviceManager: ServiceManager) => void) {
		init(this)
	}

	add(service: IService): boolean {
		return service.path.indexOf('//') === -1 
		? this.local.add(service) 
		: this.remote.add(service)
	}

	find(serviceName: string, isReleased = true): Array<IService> {
		return this.local.find(serviceName, isReleased).concat(this.remote.find(serviceName, isReleased))
	}

	update(service: IService): boolean {
		return service.path.indexOf('//') === -1 
		? this.local.update(service) 
		: this.remote.update(service)
	}

	remove(service: IService): void {
		service.path.indexOf('//') === -1 
			? this.local.remove(service) 
			: this.remote.remove(service)
	}

	install(context: object) {}
}
