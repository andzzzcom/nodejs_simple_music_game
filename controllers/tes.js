const db        = require('../controllers/db')

module.exports.list = (req, res) =>{
    db.query('SELECT * FROM songs', function(err, rows, fileds){
        if(err) throw err

        console.log(err)

        res.status(200).json({data:rows})
    })
}