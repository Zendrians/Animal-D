var express             = require("express");
var app                 = express ();
var port                = 3000

app.use(express.static('public'))


app.get('/', (req, res) => res.render('index.html'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))