const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.set('view engine', 'ejs');

app.listen(3000, () => console.log('listening on port 3000'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', function(req, res) {
    var file = req.files.file;
    res.send(file.name);
});
