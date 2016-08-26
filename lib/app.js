var webApp = require('./server/webapp')

var app = webApp.createWebApp();

app.router.use(function (req, res, next) {
    res.setHeader('test', 'header1');
    next();
});

app.router.get('/hi', function (req, res) {
    res.end('you got hi!');
});

app.listen(3000, '127.0.0.1', () => {
    console.log(`Server running at http://${'127.0.0.1'}:${3000}/`);
});
