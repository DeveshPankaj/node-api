import { IController } from '../interface/common'
const path = require('path')
const fs = require('fs')
const thisPkg:{[key: string]: any} = require('../../package.json')

function loadPackage(file: string): object {
	try {
		return require(file)
	} catch (error) {
		console.error(error)
		process.exit()
	}
}

function resolveControllerPath(pkg_data: {[key: string]:any}, project: string): string {
	if (pkg_data[thisPkg.name]) {
		let controller_path = pkg_data[thisPkg.name].controller || 'controller'
		if(!path.parse(controller_path).root) {
			controller_path = path.join(project, controller_path)
		}

		const p = path.parse(controller_path)
		if(p.ext && (p.ext === '.json' || p.ext === '.js')) {
			if(fs.existsSync(controller_path)) {
				return controller_path
			} else {
				console.error(`[Controller] ${controller_path}: does not exist.`)
				process.exit()
			}
		}

		if(fs.existsSync(controller_path)) {
			if(fs.existsSync(path.join(controller_path, 'controller.json'))) {
				return path.join(controller_path, 'controller.json')
			} else if(fs.existsSync(path.join(controller_path, 'controller.js'))) {
				return path.join(controller_path, 'controller.js')
			} else {
				console.error(`controller.js or controller.json: does not exist in ${controller_path} folder.`)
				process.exit()
			}
		} else {
			console.error(`[Controller] ${controller_path}: does not exist.`)
			process.exit()
		}
	} else {
		console.error(`${thisPkg.name}: not define in packege.json`)
		process.exit()
	}
}

function getAllControllers(controllerPath: string) {
	let controller_json = require(controllerPath)
	let dir = path.parse(controllerPath).dir
	for(const index in controller_json.controller) {
		if(!path.parse(controller_json.controller[index].path).root) {
			controller_json.controller[index].path = path.join(dir, controller_json.controller[index].path)
		}
	}
	return controller_json.controller
}

export default function GetController(project: string): Array<IController> {
	let pkg = path.join(project, 'package.json')
	if (fs.existsSync(pkg)) {
		// console.log(pkg)
		// @ts-ignore
		let pkg_data: {[key: string]:string} = loadPackage(pkg)
		let controllerPath = resolveControllerPath(pkg_data, project)
		let ls = getAllControllers(controllerPath)
		return ls
	} else {
		console.log(`[Controller] ${pkg}: does not exist`)
		process.exit()
	}
}


if (require.main === module) {
    // called directly
    if(process.argv.length > 2) {
    	let project = process.argv[2]
    	if(!path.parse(project).root) {
    		project = path.join(process.cwd(), project)
    	}
    	const ls = GetController(project)
		for(const index in ls) {
			console.log(`${ls[index].name} [${ls[index].status}]: ${ls[index].path}`)
		}
    } else {
    	console.error('need project path')
    }
} else {
    // required as a module
}