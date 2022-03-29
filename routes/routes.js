const { Router }    = require('express')
const tes           = require('../controllers/tes')
const router    = Router()
const path      = require("path")
const db        = require('../controllers/db')

router.get('/tsses', function(req, res){
    
    //res.sendFile(path.join(__dirname+ '/view/index.html'));
    /*
    db.query('SELECT * FROM songs', function(err, rows, fileds){
        if(err) throw err

        res.status(200).json({data:rows})
    })
    */
})

module.exports = router