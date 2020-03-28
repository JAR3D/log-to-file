const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 9001

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.use(cors())

app.post('/log', (req, res) => {
    try {

        if (!fs.existsSync('/tmp')) {
            fs.mkdirSync('/tmp', { recursive: true });
        }

        const body = JSON.stringify(req.body, null, 2)

        const toLog = `\n************\n${Date()}:\n************\n${body}`

        fs.appendFileSync('/tmp/log.js', toLog)

        res.status(200).send({status: 'ok'})
    } catch (err) {

        console.error('\n\n\n')
        console.error('*****[ERROR GENERATED WHILE POST TO /LOG]****')
        console.error(err)
        console.error('\n\n\n')

        const error = JSON.stringify(err, null, 2)

        const errorToLog = `\n************\nError:\n************\n${error}`

        if (!fs.existsSync('/tmp')) {
            fs.mkdirSync('/tmp', { recursive: true });
        }

        fs.appendFileSync('/tmp/log.js', errorToLog)

        res.status(500).send({status: 'failed'})
    }

})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
