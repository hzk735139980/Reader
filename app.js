const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
var request = require('request');
const cheerio = require('cheerio');
var iconv = require('iconv-lite')
const biquge = "http://www.biquge.com.tw/";
const biq = "http://www.biquge.com.tw";
const uu = "https://www.uukanshu.com/b/";
const uuu = "https://www.uukanshu.com";

app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
		if(prefix[0] == biquge){
			bookname = $('.bookname').children('h1').text();
			content = $('#content').html();
			prev = biq + $('.bottem1').children('a').next().attr('href');
			next = biq + $('.bottem1').children('a').next().next().next().attr('href');
		}
		if(prefix[0] == uu){
			bookname = $('.h1title').children('h1').text();
			content = $('#contentbox').html();
			prev = uuu + $('#prev').attr('href');
			next = uuu + $('#next').attr('href');
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
		if(prefix[0] == biquge){
			bookname = $('.bookname').children('h1').text();
			content = $('#content').html();
			prev = biq + $('.bottem1').children('a').next().attr('href');
			next = biq + $('.bottem1').children('a').next().next().next().attr('href');
		}
		if(prefix[0] == uu){
			bookname = $('.h1title').children('h1').text();
			content = $('#contentbox').html();
			prev = uuu + $('#prev').attr('href');
			next = uuu + $('#next').attr('href');
		}
		res.render('prev', {bookname: bookname, content: content});
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
		if(prefix[0] == biquge){
			bookname = $('.bookname').children('h1').text();
			content = $('#content').html();
			prev = biq + $('.bottem1').children('a').next().attr('href');
			next = biq + $('.bottem1').children('a').next().next().next().attr('href');
		}
		if(prefix[0] == uu){
			bookname = $('.h1title').children('h1').text();
			content = $('#contentbox').html();
			prev = uuu + $('#prev').attr('href');
			next = uuu + $('#next').attr('href');
		}
		res.render('next', {bookname: bookname, content: content});
	});
});

app.listen(3000, () => console.log('Reader app listening on port 3000!'));