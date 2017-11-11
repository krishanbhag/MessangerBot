'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
app.set('port',(process.env.PORT || 5000))

//allow to process data
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Routes
app.get('/',function(req,res) {
 res.send('Test')

})
app.get('/wife',function(req,res) {
 res.send('Pavana')

})
app.get('/webhook/',function(req,res) {

	if (req.query['hub.verify_token'] === "admin@1023") {
		req.send(req.query['hub.challenge'])
	}
	else {
		req.send("wrong token")
	}
})
app.listen(app.get('port'),function() {
 
  console.log("running port")
})