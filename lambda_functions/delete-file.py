import json
import boto3
from botocore.exceptions import ClientError
from datetime import datetime, timezone
import os

TABLE_NAME = os.environ['DYNAMO_DB_NAME']
BUCKET_NAME = os.environ['BUCKET_NAME']

s3_resource = boto3.resource('s3')
bucket = s3_resource.Bucket(BUCKET_NAME)

dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table(TABLE_NAME)

time_now = datetime.now(timezone.utc)

def lambda_handler(event, context):
    objects = bucket.objects.filter(Prefix = 'files/')
    
    for obj in objects:
        last_modified = obj.last_modified
        
        seconds_passed = (time_now-last_modified).total_seconds()

        print("Lifetime of file {} is {} seconds.".format(obj.key, seconds_passed))
        
        if seconds_passed >= 1800:
            try:
                table.update_item(
                    Key={'file_key': obj.key[6:]}, 
                    UpdateExpression='SET #field1 = :field1, #field2 = :field2',
                    ExpressionAttributeNames={
                    '#field1': 'isDeleted',
                    '#field2': 'file_url',
                    },
                    ExpressionAttributeValues={
                        ':field1': True,
                        ':field2': 'null',
                    })
                print("Deleting {} ".format(obj.key))
                obj.delete()

            except ClientError as e:
                return {
                    'statusCode': 200,
                    'body': json.dumps('Error while deleting object from s3')
                }
    
    return {
        'statusCode': 200,
        'body': json.dumps('Delete Completed.')
    }
