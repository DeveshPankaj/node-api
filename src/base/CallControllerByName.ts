import GetControllerByName from './GetControllerByName'
import CallController from './CallController'
import {IInput} from '../interface/common'



export default function CallControllerByName(project: string, controllerName: string, input: IInput) {
	return new Promise((_resolve, _reject) => {
		let new_controller = GetControllerByName(project, controllerName)
		// CallController(project, file, input)
		if(new_controller.length === 1) {
			CallController(project, new_controller[0].path, input)
			.then(_resolve)

			// TODO: error logs must be generated
			.catch(_reject)
		} else {
			_reject(`Can not find controller with name: [${controllerName}]`)
		}
	}) 
}