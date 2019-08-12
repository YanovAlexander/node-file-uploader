var AWS = require("aws-sdk"),
    s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
    var sum = 0, bucketName;

    bucketName = event.Records[0].s3.bucket.name;

    s3.listObjectsV2({
        Bucket: bucketName
    }, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            sum += counting(data, sum);

            new AWS.SNS().publish({
                Message: "Bucket name = " + bucketName + " and size used = " + sum + " bytes",
                TopicArn: "arn:aws:sns:us-east-1:273610051498:NotifyMe",
            }).promise()
                .then(function (data) {
                    console.log("SUCCESS SEND TO ARN: MessageID is " + data.MessageId);
                }).catch(function (err) {
                console.error(err, err.stack);
            });
        }
    });
};

var counting = function (data, sum) {
    data.Contents.forEach(function (object) {
        sum += object.Size;
    });
    return sum;
};
