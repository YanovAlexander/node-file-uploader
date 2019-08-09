var AWS = require("aws-sdk"),
	s3 = new AWS.S3(),
	ses = new AWS.SES();

exports.handler = async (event, context, callback) => {
	// TODO implement
	var response = {
		statusCode: 200,
		body: JSON.stringify('Hello from Lambda!')
	};

	var bucketParams = {
		Bucket : "ec2poc"
	};

	var sum = 0;

	s3.listObjectsV2(bucketParams, function(err, data){
		if (err) {
			console.log("Error", err);
		} else {
			data.Contents.forEach(function(object){
				sum += object.Size;
				console.log("OBJECT " + object.Size);
			});
			console.log("SUM " + sum);
			var params = {
				Destination: {
					ToAddresses: ["yanov.alexander@gmail.com"]
				},
				Message: {
					Body: {
						Text: { Data: "Test"

						}

					},

					Subject: { Data: "Test Email"

					}
				},
				Source: "`=?utf-8?B?${fromBase64}?= <fromemail@someemail.com>`"
			};
			ses.sendEmail(params, function (err, data) {
				callback(null, {err: err, data: data});
				if (err) {
					console.log(err);
					context.fail(err);
				} else {

					console.log(data);
					context.succeed(event);
				}
			});
		}
	});


	return response;
};
