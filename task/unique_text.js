const express = require('express'),
    app = express(),
    request = require('request'),
    fs = require('fs')


const userKey = 'cfd32af48bf2c1ee2babc9f4f99f53f6'
const textCheck = fs.readFileSync('../lorem/lorem.txt', 'utf-8')
request.post(
    {
        url: "http://api.text.ru/post",
        qs: {
            text: textCheck,
            userKey: userKey
        }
    }
)
