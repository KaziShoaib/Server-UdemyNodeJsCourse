const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');

app.use((req, res, next)=>{
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('sever.log',log+'\n', (err)=>{
		if(err)
			console.log('unable to append to server log file');
	});
	next();
});

// app.use((req, res, next)=>{
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
	//return 'test';
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req, res)=>{
	//res.send('<h1>Hello Express!</h1>');
	/*
	res.send({
		name : 'shoaib',
		likes : ['food', 'books'],
		age : 31
	});*/
	res.render('home.hbs',{
		pageTitle : 'Home page',
		welcomeMessage : 'Welcome to this website'
	});
});

app.get('/about',(req, res)=>{
	res.render('about.hbs', {
		pageTitle : 'About Page'
	});
});

app.get('/bad',(req, res)=>{
	res.send({
		errorMessage : 'unable to fulfill the request'
	});
});

app.listen(3000, ()=>{
	console.log('server is up on port 3000');
});
