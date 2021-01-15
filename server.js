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

app.get('/logare.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/logare.html'));
});

app.get('/dashboard.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/dashboard.html'));
});
/**
 * API - Lucrul cu baza de date
 */
/** Preia toate meme-urle */
app.get('/api/v1/memes', async function (req, res) {
    const memes = await db.memesTable.findAll()
    res.json(JSON.stringify(memes, null, 2))
});

/** Adauga un meme */
app.post('/api/v1/meme/add', async function (req, res) {
    const { src, src_img, alt } = req.body;
    console.log(req.body)
    const meme = await db.memesTable.create({
        src,
        src_img,
        alt
    });
    res.json(meme.toJSON())
});

/** Sterge un meme */
app.get('/api/v1/meme/:id/delete', async function (req, res) {
    const result = await db.memesTable.destroy({
        where: {
            id: req.params.id
        }
    })

    res.send('Meme a fost distrus! DB raspuns: ' + result)
})

/** Modifica un meme */
app.post('/api/v1/meme/:id/update', async function (req, res) {
    const { src, src_img, alt } = req.body;
    console.log(req.body)
    const meme = await db.memesTable.update({
        src,
        src_img,
        alt
    }, {
        where: {
            id: req.params.id
        }
    });
    res.json(JSON.stringify(meme))
})

const server = http.createServer(app)
server.listen(3000);