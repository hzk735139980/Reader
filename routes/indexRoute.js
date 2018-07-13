const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const { URL } = require('url');
const biquge = require('../config/url').biquge;
const uu = require('../config/url').uu;
const situ = require('../config/url').situ;
var situtest = /(?=^\/book)(?=.*.html$).*$/;
var biqugetest = /.html$/;
var uutest = /(?=^\/b\/)(?=.*.html$).*$/;

module.exports = app => {

    app.post('/api/getcontent', function(req, res){
        const myURL = new URL(req.body.URL);
        request({ url: req.body.URL, encoding: null }, function(error, response, body){
            if(error) return res.status(422).send({error: error});
            
            var bookname = "";
            var content = "";
            var next = "";
            var prev = "";
            var prevhref = "";
            var nexthref="";
            var $ = '';
            if(myURL.origin.toString().includes(biquge) && biqugetest.test(myURL.pathname.toString())){
                var html = iconv.decode(body, 'gbk');
                $ = cheerio.load(html, {decodeEntities: false});
                bookname = $('.bookname').children('h1').text();
                content = $('#content').html();
                prevhref = $('.bottem1').children('a').next().attr('href');
                nexthref = $('.bottem1').children('a').next().next().next().attr('href');
                if( biqugetest.test(prevhref) ){
                    prev = biquge + prevhref;
                }else{
                    prev = 'undefined';
                }
                if( biqugetest.test(nexthref) ){
                    next = biquge + nexthref;
                }else{
                    next = 'undefiened';
                }
                return res.send({ bookname, content, prev, next, myURL });
            }
            if(myURL.origin.toString().includes(uu) && uutest.test(myURL.pathname.toString())){
                var html = iconv.decode(body, 'gbk');
                $ = cheerio.load(html, {decodeEntities: false});
                bookname = $('.h1title').children('h1').text();
                content = $('#contentbox').html();
                prevhref = $('#prev').attr('href');
                nexthref = $('#next').attr('href');
                if( typeof prevhref !== 'undefined'){
                    prev = uu + prevhref;
                }else{
                    prev = 'undefined';
                }
                if( typeof nexthref !== 'undefined'){
                    next = uu + nexthref;
                }else{
                    next = 'undefined';
                }
                return res.send({ bookname, content, prev, next, myURL });                
            }
            if(myURL.origin.toString().includes(situ) && situtest.test(myURL.pathname.toString())){
                $ = cheerio.load(body);
                bookname = $('.bookbox').children('h1').text();
                content = $('#BookContent').html();
                prevhref = $('#webPage').children('a')[1].attribs.href;
                nexthref = $('#webPage').children('a')[10].attribs.href;
                if( typeof prevhref !== 'undefined'){
                    prev = situ + prevhref;
                }else{
                    prev = 'undefined';
                }
                if( typeof nexthref !== 'undefined'){
                    next = situ + nexthref;
                }else{
                    next = 'undefined';
                }
                return res.send({ bookname, content, prev, next, myURL });
            }else{
                res.status(422).send({ error: 'Sorry, cannnot process this url' });
            }
        })
    });
};