const path = require('path')
const fs = require('fs')

export default function CallMiddleware(project: string, file: string, input: object) {
	return new Promise((resolve, reject) => {
		if(!path.parse(file).ext) {
			file = file + '.js'
		}

		if(!fs.existsSync(file)) {
			reject(`[CallMiddleware] ${file}: does not exist`)
		} else {
			let con = require(file)
			let middleware: Function = () => {
				reject(`[CallMiddleware] called unassigned middleware`)
			}

			if(typeof con === 'function') {
				middleware = con
			} else if(typeof con === 'object') {
				if(con.default) {
					middleware = con.default
				} else {
					let name = path.parse(file).name
					if(con[name]) {
						middleware = con[name]
					} else {
						reject(`[CallMiddleware] ${file}: does not contain middleware function. export function as refault or with name '${name}'`)
					}
				}
			}
			middleware(input, resolve, reject)
		}
	})
}