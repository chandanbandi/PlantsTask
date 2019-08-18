var express = require("express");
 
var app = express();
 
app.use(express.static('public'));
 
//make way for some custom css, js and images
app.use('/js', express.static(__dirname + '/public/script'));
 
var port = process.env.PORT || 8080;
var server = app.listen(port, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});