import GetController from './GetController'
import { IController } from '../interface/common'


export default function GetControllerByName(project: string, controllerName: string): Array<IController> {
	const ls = GetController(project)
	return ls.filter(x => x.name === controllerName)
}
