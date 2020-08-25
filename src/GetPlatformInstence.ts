import CallControllerByName from './base/CallControllerByName'


export default function GerPlatformInstance(project: string) {
	return {
		project,
		CallController: CallControllerByName
	}
}