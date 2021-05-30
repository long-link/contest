const express = require('express')
const app = express()
const formText = require('./router/headPage')
const PORT = process.env.PORT || 3000

app.use(express.static('view'))
app.use(express.urlencoded({extended: false}))
app.use('/', formText)


app.listen(PORT, () => {
    console.log('server is running on ' + PORT)
})

