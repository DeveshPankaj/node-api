import GetControllerByName from './GetControllerByName'
import CallControllerByName from './CallControllerByName'
import {IInput} from '../interface/common'



const path = require('path')
const fs = require('fs')

interface IController {
	main: Function
	destroy: Function
}

function validate (input: {[key: string]: any}, args: {[key: string]: any}): boolean {
	// TODO: improve validation pattern
	if(!args) return false
	for(const key in input) {
		if(args[key] === undefined) {
			return false
		}
	}
	return true
}

// Call Controller from file path
export default function CallController (project: string, file: string, input: IInput) {
	
	return new Promise((resolve, reject) => {
		if(!path.parse(file).ext) {
			file = file + '.js'
		}

		if(!fs.existsSync(file)) {
			reject(`[CallController] ${file}: does not exist`)
		
		} else {

			let con = require(file)

			// TODO: platform object should be created from saperate function
			let platform = {
				CallController: (controllerName: string, input: IInput) => CallControllerByName(project, controllerName, input)
			}

			// TODO: request, response must come form user (developer) 
			let req = {}
			let res = {}
			try {
				let _con: IController = new con(platform, req, res)
				if(!validate(con.input, input)) {
					reject(`[CallController ${con.name}] Error: input param not match with the expected`)
				}
				if(_con.main) {
					let pro = new Promise((resolve, reject) => {
						_con.main(input || {}, resolve, reject)
					
					}).catch(error => {
						console.error(error)
						reject(`[CallController ${con.name}] Error: in main process`)
					
					}).then(data => {
						if(_con.destroy) {
							_con.destroy()
						}
						// @ts-ignore
						if(!validate(con.output, data)) {
							reject(`[CallController ${con.name}] Error: invalid return data`)
						} else {
							resolve(data)
						}
					})
					
					
				} else {
					reject(`[CallController ${con.name}] Error: main method does not exist`)
				}
			} catch (error) {
				reject(`[CallController ${con.name}] Error: ${error}`)
			}

		}
	})
}
