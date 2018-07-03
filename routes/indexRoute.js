const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const biquge = require('../config/url').biquge;
const uu = require('../config/url').uu;

module.exports = app => {
    app.get('/', (req, res) => res.render('index'));

    var prev = "";
    var next = "";
    app.post('/action', function(req, res){
        var prefix = req.body.URL.split(/\d+/);
        request({url:req.body.URL, encoding: null}, function (error, response, body) {
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            var html = iconv.decode(body, 'gbk');
            const $ = cheerio.load(html, {decodeEntities: false});
            var bookname = "";
            var content = "";
            if(prefix[0].includes(biquge)){
                bookname = $('.bookname').children('h1').text();
                content = $('#content').html();
                prev = biquge + '/' + $('.bottem1').children('a').next().attr('href');
                next = biquge + '/' + $('.bottem1').children('a').next().next().next().attr('href');
            }
            if(prefix[0].includes(uu)){
                bookname = $('.h1title').children('h1').text();
                content = $('#contentbox').html();
                prev = uu + $('#prev').attr('href');
                next = uu + $('#next').attr('href');
            }

            res.render('action', {bookname: bookname, content: content});
        });
    });

    app.get('/prev', function(req, res){
        var prefix = prev.split(/\d+/);
        request({url:prev, encoding: null}, function (error, response, body) {
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            var html = iconv.decode(body, 'gbk');
            const $ = cheerio.load(html, {decodeEntities: false});
            var bookname = "";
            var content = "";
            if(prefix[0].includes(biquge)){
                bookname = $('.bookname').children('h1').text();
                content = $('#content').html();
                prev = biquge + '/' + $('.bottem1').children('a').next().attr('href');
                next = biquge + '/' + $('.bottem1').children('a').next().next().next().attr('href');
            }
            if(prefix[0].includes(uu)){
                bookname = $('.h1title').children('h1').text();
                content = $('#contentbox').html();
                prev = uu + $('#prev').attr('href');
                next = uu + $('#next').attr('href');
            }
            res.render('action', {bookname: bookname, content: content});
        });
    }); 

    app.get('/next', function(req, res){
        var prefix = next.split(/\d+/);
        request({url:next, encoding: null}, function (error, response, body) {
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            var html = iconv.decode(body, 'gbk');
            const $ = cheerio.load(html, {decodeEntities: false});
            var bookname = "";
            var content = "";
            if(prefix[0].includes(biquge)){
                bookname = $('.bookname').children('h1').text();
                content = $('#content').html();
                prev = biquge + '/' + $('.bottem1').children('a').next().attr('href');
                next = biquge + '/' + $('.bottem1').children('a').next().next().next().attr('href');
            }
            if(prefix[0].includes(uu)){
                bookname = $('.h1title').children('h1').text();
                content = $('#contentbox').html();
                prev = uu + $('#prev').attr('href');
                next = uu + $('#next').attr('href');
            }
            res.render('action', {bookname: bookname, content: content});
        });
    });

};