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
            Message: 'TEXT_MESSAGE', /* required */
            TopicArn: 'arn:aws:sns:us-east-1:273610051498:NotifyMe',
            };
        var publishTextPromise = new AWS.SNS().publish(params).promise();
        
        publishTextPromise.then(
          function(data) {
            console.log("SUCCESS SEND TO ARN: MessageID is " + data.MessageId);
          }).catch(
            function(err) {
            console.error(err, err.stack);
          });
        }
    });
    
    
    return response;
};

