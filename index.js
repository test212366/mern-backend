require('dotenv').config()
const express = require('express')
const sequlize = require('./db')
const app = express()
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandler')
const path = require('path')



app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {

        await sequlize.authenticate()
        await sequlize.sync()
        app.listen(PORT, () => {
            console.log('server start')
        })
    }catch (e) {
        console.log(e)
    }
}
start()
