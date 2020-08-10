import { IMiddleware } from '../interface/common'
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

function resolveMiddlewarePath(pkg_data: {[key: string]:any}, project: string): string {
	if (pkg_data[thisPkg.name]) {
		let middleware_path = pkg_data[thisPkg.name].middleware || 'controller'
		if(!path.parse(middleware_path).root) {
			middleware_path = path.join(project, middleware_path)
		}
		
		const p = path.parse(middleware_path)
		if(p.ext && (p.ext === '.json' || p.ext === '.js')) {
			if(fs.existsSync(middleware_path)) {
				return middleware_path
			} else {
				console.error(`[Middleware] ${middleware_path}: does not exist.`)
				process.exit()
			}
		}

		if(fs.existsSync(middleware_path)) {
			if(fs.existsSync(path.join(middleware_path, 'middleware.json'))) {
				return path.join(middleware_path, 'middleware.json')
			} else if(fs.existsSync(path.join(middleware_path, 'middleware.js'))) {
				return path.join(middleware_path, 'middleware.js')
			} else {
				console.error(`middleware.js or middleware.json: does not exist in ${middleware_path} folder.`)
				process.exit()
			}
		} else {
			console.error(`[Middleware] ${middleware_path}: does not exist.`)
			process.exit()
		}
	} else {
		console.error(`${thisPkg.name}: not define in packege.json`)
		process.exit()
	}
}

function getAllMiddlewares(controllerPath: string) {
	let controller_json = require(controllerPath)
	return controller_json.middleware
}

export default function GetController(project: string) {
	let pkg = path.join(project, 'package.json')
	if (fs.existsSync(pkg)) {
		// console.log(pkg)
		// @ts-ignore
		let pkg_data: {[key: string]:string} = loadPackage(pkg)
		let controllerPath = resolveMiddlewarePath(pkg_data, project)
		let ls = getAllMiddlewares(controllerPath)
		return ls
	} else {
		console.log(`[Middleware] ${pkg}: does not exist`)
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