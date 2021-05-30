const request = require('request')


class Spelling{

    constructor(text) {
        this.text = text
        this.urlGet = 'https://speller.yandex.net/services/spellservice.json/checkText?text='
    }

    toSendFormat() {
        return this.checkLength(this.text.replace(/ /g, '+'))
    }

    checkLength(processedText) {     // не проверял и дохуя переенных
        const maxLen = 10000
        let textArr = []
        let textLength = processedText.length
        let lastWord, partStr
        do {    // если будет время переделать
                // разбиваю символы по частям не длиней 10000(+ разбиение по ласт слову)
            lastWord = processedText.indexOf('+', maxLen)
            partStr = processedText.substring(lastWord)
            textArr.push(partStr)
            processedText = processedText.slice(lastWord)
            textLength -= lastWord
        } while (textLength > maxLen)
        return textArr
    }

    errorCounter(jsonError) {
        if (jsonError < this.text.split(' ').length * 0.3) { // процент ошибок
            return 'Текст проходит дальнейшую модерацию'
        }else return 'Учи руский'
    }

    sendText(partText) {
        return new Promise((resolve, reject) => {
            request(
                this.urlGet + encodeURI(partText),
                (err, response, body) => {
                    if (err) {  // тут что то поменять
                        return { message: err }
                    }
                    resolve(JSON.parse(body).length)
                })
        })
    }

    async checkCountError() {
        let textURL = this.toSendFormat()
        let currentCountError = 0
        for (let i = 0; i < textURL.length; i++) {
            currentCountError += await this.sendText(textURL[i])
        }
        return this.errorCounter(currentCountError)
    }
}

module.exports = Spelling
