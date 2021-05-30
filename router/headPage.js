const {Router} = require('express')
const router = Router()
const Spelling = require('../task/spelling')
const request = require('request')

router.get('/', (req, res) => {
    res.render('index.html', {
        title: 'Main page',
    })
})
// синхрафазатрон
router.post('/result',
    async (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const spelling = new Spelling(req.body.sendText)
        return res.send(await spelling.checkCountError())
    })


module.exports = router
