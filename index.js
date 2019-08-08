const express = require('express'),
	app = express(),
	fileUpload = require('express-fileupload'),
	AWS = require("aws-sdk"),
	s3 = new AWS.S3();

app.use(fileUpload());
app.set('view engine', 'ejs');

app.listen(80, () => console.log('listening on port 80'));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/upload', function (req, res) {
	var file = req.files.file;

	const params = {
		Bucket: "ec2poc",
		Key: file.name,
		Body: file.data
	};

	s3.upload(params, function(s3Err, data) {
		if (s3Err) throw s3Err;
		console.log(`File uploaded successfully at ${data.Location}`)
	});

	res.send(file.name);
});
