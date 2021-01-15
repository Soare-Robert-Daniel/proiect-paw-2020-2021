var express = require('express');
var app = express();
var path = require('path');
var http = require('http')
var bodyparser = require('body-parser')
var db = require('./db')

/**
 * Baza de date
 */
db.sequelize.sync({ force: true }).then(() => {
    console.log("Baza de date a fost curatat")
})

/*  
    Adauga fisierele de css si js
*/
app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

// viewed at http://localhost:8080
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// viewed at http://localhost:8080
app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/pagina1.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/pagina1.html'));
});

app.get('/pagina2.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/pagina2.html'));
});

app.get('/dashboard.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/dashboard.html'));
});

/**
 * API - Lucrul cu baza de date
 */
app.get('/api/v1/memes', async function (req, res) {
    const memes = await db.memesTable.findAll()
    res.json(JSON.stringify(memes, null, 2))
});

app.post('/api/v1/meme/add', async function (req, res) {
    const { src, src_img } = req.body;
    const meme = await db.memesTable.create({
        src,
        src_img
    });
    res.json(meme.toJSON())
});


const server = http.createServer(app)
server.listen(3000);