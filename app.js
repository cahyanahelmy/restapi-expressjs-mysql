const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

const appRoute = require('./src/routes/route-bahasa')
app.use('/', appRoute)

app.listen(8000, ()=> {
 console.info("Server Running On 8000")
})