import GetMiddleware from './GetMiddleware'
import { IMiddleware } from '../interface/common'


export default function GetMiddlewareByName(project: string, middlewareName: string): Array<IMiddleware> {
	const ls = GetMiddleware(project)
	return ls.filter(x => x.name === middlewareName)
}
