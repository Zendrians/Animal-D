var express             = require("express");
var app                 = express ();
var port                = process.env.PORT || 3000

app.use (express.static(__dirname + ("/public")));


app.get('/', (req, res) => res.render('index.html'));


app.listen(port, () => console.log(`Animal Drinking listening on port ${port}!`));
// app.listen(process.env.PORT, process.env.IP, function (){
//     console.log ("Animal Drinking 'On'");
// });