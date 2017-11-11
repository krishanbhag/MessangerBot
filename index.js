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
let token = "EAAM6vqeZBUsQBAEh4lyEOpMCJqlIDVUYZB0CWRfecYjS9O1idlH9Bfdk2hlesM819k4sZC0BRQZBPcmfbRUM42X5e57zGUHhyYLrn9192eJNWP0ZAw1LQK6pWf78ZAZBGoE4eziVNdoQX90NckPqbI9rrdVZA2mneOrpivzdzDwWoQZDZD"
app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "admin@1023") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		console.log("**** sender Id" + sender)
		console.log("**** Message" + event.message.text)
		if (event.message && event.message.text) {
			let text = event.message.text
			sendText(sender, "Text echo: " + text.substring(0, 100))
		}
	}
	res.sendStatus(200)
})

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("**** sending error")
		} else if (response.body.error) {
			console.log("**** response body error")
		}
	})
}
app.listen(app.get('port'),function() {
 
  console.log("running port")
})