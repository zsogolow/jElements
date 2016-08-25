var webApp = require('./lib/webapp')

var app = webApp.createWebApp();

app.router.use(function (req, res, next) {
    res.setHeader('test', 'header1');
    next();
});

app.router.use('/hi', function (req, res, next) {
    res.setHeader('test2', 'header2');
    next();
});

app.router.get('/hi', function (req, res) {
    res.end('you got hi!');
});

app.listen(3000, '127.0.0.1', () => {
    console.log('listening');
});
