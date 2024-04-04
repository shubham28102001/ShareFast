import json
import boto3
from botocore.exceptions import ClientError
import os

TABLE_NAME = os.environ['DYNAMO_DB_NAME']

dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table(TABLE_NAME)

def lambda_handler(event, context):
    fileKey = event['queryStringParameters']['key'][6:]
    
    json_response = {"url": "", "file_name": "", "is_deleted": "", "record_exists": "", "message": "", "success": ""}
    
    try:
        response = table.get_item(TableName=TABLE_NAME, Key={'file_key': fileKey})
        if 'Item' in response:
            if (response['Item']['isDeleted'] == True):
                json_response['url'] = 'null'
                json_response['file_name'] = 'null'
                json_response['message'] = 'File has been deleted'
                json_response['success'] = 'true'
                json_response['is_deleted'] = 'true'
                json_response['record_exists'] = 'true'
            else:
                json_response['url'] = response['Item']['file_url']
                json_response['file_name'] = response['Item']['file_name']
                json_response['message'] = 'Successfully fetched file url'
                json_response['success'] = 'true'
                json_response['is_deleted'] = 'false'
                json_response['record_exists'] = 'true'
        else:
            json_response['url'] = 'null'
            json_response['file_name'] = 'null'
            json_response['message'] = 'Invalid key'
            json_response['success'] = 'true'
            json_response['is_deleted'] = 'false'
            json_response['record_exists'] = 'false'
    except ClientError as e:
        json_response['url'] = 'null'
        json_response['file_name'] = 'null'
        json_response['message'] = 'Error while fetching url from database'
        json_response['success'] = 'false'
        json_response['is_deleted'] = 'false'
        json_response['record_exists'] = 'false'
        return {
            'statusCode': 200,
            "headers": {
              "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
            },
            'body': json.dumps(json_response)
        }
    
    return {
        'statusCode': 200,
        "headers": {
          "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
        },
        'body': json.dumps(json_response)
    }
