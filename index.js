const express       = require('express')
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser')
const dotenv        = require('dotenv')
                        dotenv.config()
const path          = require('path');
var engines         = require('consolidate');

const db            = require('./controllers/db')
const routes        = require('./routes/routes')
const app           = express()

app.use(express.static(path.join(__dirname, '/public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(routes)

var server = app.listen(process.env.PORT, function(){
    console.log("started!")
})

//array of exception id
var ids = ['1']

app.get('/', function(req, res){
    db.query('SELECT * FROM songs WHERE id=1', function(err, rows, fields){
        if(err) throw err

        res.render(__dirname + '/views/index.html', {
            data: rows
        });
    })
})

app.post('/answer', function(req, res){
    var c = switchAns(req.body.c)
    var id = req.body.id
    var query = "SELECT * FROM songs WHERE id="+id

    //array of id exception
    ids.indexOf(id) === -1 ? ids.push(id): ''
    
    db.query(query, function(err, rows, fields){
        if(err) throw err

        //check answer
        const answer = rows[0].answer
        var check = (answer==c)?1:0

        res.send({hasil:check})
    })
})

app.post('/nextSong', function(req, res){
    var id = req.body.id
    
    //array of id exception
    ids.indexOf(id) === -1 ? ids.push(id): ''
    
    //next question
    db.query("SELECT * FROM songs WHERE id=2", function(err, rows, fields2){
        if(err) throw err
        
        res.send({next:rows})
    })
})

function switchAns(ans){
    var ret
    if(ans == 0)
        ret = 'a'
    else if(ans == 1)
        ret = 'b'
    else if(ans == 2)
        ret = 'c'
    else
        ret = 'd'
    return ret
}
