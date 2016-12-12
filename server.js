var express = require("express");
var browserify = require("browserify-middleware");
var babelify = require("babelify");
var browserSync = require("browser-sync");
var app = express();
var port = process.env.PORT || 8080;

browserify.settings({
	transform: [babelify.configure({})],
	presets: ["es2015", "react"],
	extentions: ['.js', '.jsx'],
	grep: /\.jsx?$/
});

app.get('/bundle.js', browserify(__dirname+'/source/app.jsx'));

//resources
app.get(['*.png', '*.jpg', '*.css', '*.map'], function(req, res) {
	res.sendFile(__dirname+"/public/"+req.path);
});

//server index.html
app.get('*', function(req, res) {
	res.sendFile(__dirname+"/public/index.html");
});

//finally run the web server with browser-sync
app.listen(port, function() {
	//monitor all files change in /source and /public, but ignore node_modules
	browserSync({
		proxy: 'localhost:' + port,
		files: ['source/**/*.(jsx)', 'public/**/*.(css)'],
		options: {ignored: 'node_modules'}
	});
});

