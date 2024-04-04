import json
import boto3
from botocore.exceptions import ClientError
import uuid
import logging
import datetime
import os

TABLE_NAME = os.environ['DYNAMO_DB_NAME']
BUCKET_NAME = os.environ['BUCKET_NAME']

s3_client = boto3.client("s3")
dynamodb_client = boto3.resource("dynamodb")
table = dynamodb_client.Table(TABLE_NAME)


def lambda_handler(event, context):
    bucketName = event["Records"][0]["s3"]["bucket"]["name"]
    key = event["Records"][0]["s3"]["object"]["key"]
    fileName = key[12:]

    currentTime = datetime.datetime.now(datetime.timezone.utc).strftime(
        "%Y-%m-%dT%H:%M:%S.%f%Z"
    )

    json_response = {"url": "", "key": "", "message": "", "success": ""}

    try:
        json_response["url"] = s3_client.generate_presigned_url(
            "get_object",
            Params={
                "Bucket": bucketName,
                "Key": key,
                "ResponseContentDisposition": "attachment; filename=" + fileName,
            },
        )
        json_response["message"] = "File successfully uploaded"
        json_response["success"] = "true"
        json_response["key"] = key
    except ClientError as e:
        json_response["url"] = "null"
        json_response["message"] = "Error while generating presigneed url"
        json_response["success"] = "false"
        json_response["key"] = "null"
        logging.error(e)

        return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
            },
            "body": json.dumps(json_response),
        }

    try:
        response = table.put_item(
            Item={
                "file_key": key[6:],
                "file_name": fileName,
                "file_url": json_response["url"],
                "uploadTime": currentTime,
                "isDeleted": False,
            }
        )
        json_response[
            "message"
        ] = "File uploaded and data inserted to database successfully"
    except ClientError as e:
        json_response["message"] = "Error while inserting data into database"
        json_response["success"] = "false"
        logging.error(e)

        return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
            },
            "body": json.dumps(json_response),
        }

    return {
        "statusCode": 200,
        "headers": {
          "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
        },
        "body": json.dumps(json_response),
    }
