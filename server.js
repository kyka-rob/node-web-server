const express = require('express')
const app = express()
const hbs = require('hbs')
const fs  = require('fs')

var port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs)

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('toUpper', (text)=>{
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString;
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home page',
        userName: 'Tee'
    });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to handle this request'
    })
})

app.listen(port, () => console.log(`Server listen on port ${port}`))