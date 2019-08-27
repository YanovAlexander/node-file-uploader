# Proof of concept "AWS CodePipeline and CloudFormation stack's"

**Background:**
 - Used language NodeJS
 - Package manager npm <br>
This application show an index page where you can upload files and images, 
they will be saved in S3 and after that the Lambda will work on all put events and send a message to the technical email address. 
To simplify the template, steps were skipped to create the S3 bucket and lambda.

**Startup:**<br>
To create the CloudFormation stack, you need run create_pipeline.sh:
./create_pipeline Ayus123nsjJksl <br>
Where Ayus123nsjJksl  is your OAuth2 github token.<br>
 