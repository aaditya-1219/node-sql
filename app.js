const express = require('express')
const hostname = '0.0.0.0'
const port = 8080

const app = express()

app.use(express.json())

app.use(express.urlencoded())

app.use(express.static(__dirname + "/"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})


app.listen(port, hostname, () => {
    console.log(`Server started at http://${hostname}:${port}`);
})

var mysql = require('mysql');

var con = mysql.createConnection({
  host: hostname,
  user: "root",
  password: "sql123",
  database: "test"
});

app.post('/formPost', (req, res) => {;
    const rollNo = req.body.rollNo
    const game = req.body.game
    const fees = req.body.fees
    console.log(rollNo + " " + game + " " + fees);
    con.connect(function(err) {
        if (err) throw err;
        con.query(`INSERT INTO STUDENT (Roll_no, Game, Fees) VALUES (${rollNo}, "${game}", ${fees});`, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });
    res.sendFile(__dirname + '/thanks.html')
})
