const express = require('express');
const formidable = require('express-formidable');
const fs = require('fs');

var app = express();

app.listen(3000, function () {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});

fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    file = JSON.parse(file)
});

app.use(formidable());
app.use(express.static("public"));

app.post('/create-post', function (req, res) {
    console.log(req.fields.blogpost);
    fs.readFile(__dirname + "/data/posts.json", function(error, file) {
        file = JSON.parse(file);
        var timestamp = Date.now();
        file[timestamp] = req.fields.blogpost;
        file = JSON.stringify(file);
        fs.writeFile(__dirname + '/data/posts.json', file, function (error) {
            console.log(`${timestamp} was added successfully`)
        })
    })
    res.redirect(req.get('referer'))
});

app.get('/get-posts', function (req, res) {
    res.sendFile(__dirname + "/data/posts.json");
});


/* let file = {};
app.post('/create-post-napa', function (req, res) {
    ts = new Date().getTime().toString();
    post = req.fields.blogpost;
    
    yourData=file;
    yourData[ts] = post;
    yourDataJs = JSON.stringify(yourData);
    
    console.log(yourData);
    fs.writeFile(__dirname + '/data/posts2.json', yourDataJs, function (error) {    
        // do something
    });

    fs.readFile(__dirname + '/data/posts2.json', function (error, file) {
        file = JSON.parse(file)
    });
}); */