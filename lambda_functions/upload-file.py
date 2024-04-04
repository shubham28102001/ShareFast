import json
import boto3
from botocore.exceptions import ClientError
from botocore.client import Config
import uuid
import os

BUCKET_NAME = os.environ['BUCKET_NAME']

def lambda_handler(event, context):

    s3_client = boto3.client("s3", config=Config(signature_version="s3v4"))
    fileName = event["fileName"]
    randomFileName = "".join([str(uuid.uuid4().hex[:6]), fileName])
    key = "files/" + randomFileName

    response = s3_client.generate_presigned_url(
        ClientMethod="put_object", Params={"Bucket": BUCKET_NAME, "Key": key}
    )

    json_response = {"file_upload_url": response, "key": key}

    return {
        "statusCode": 200,
        "headers": {
          "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
        },
        "body": json_response
    }
