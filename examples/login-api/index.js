const express = require('express')
const api = require('../../dist')

const config = {
	port: 8000,
	host: '0.0.0.0',
	route: '/api/:Version/:Controller'
}

const app = express()
api.config = config
api.run()

// api.run(app)



// app.listen(config.port, config.host, (_) => {
// 	// console.log("Server is running on", config.port)
// })

// console.table(config)

