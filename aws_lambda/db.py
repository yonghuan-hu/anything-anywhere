import boto3
import json
from boto3.dynamodb.conditions import Key, Attr

class Database():
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('anything-anywhere-db')
    
    def insert(self, uid: int, filename: str, content: str):
        Database.table.put_item(
           Item={
                'uid': uid,
                'filename': filename,
                'content': content
            }
        )
        return "success"
        
    def get_file(self, uid: int, filename: str):
        db_response = Database.table.get_item(
            Key={
                'uid': uid, 
                'filename': filename
            }
        )
        return db_response['Item']['content']

    def get_user_files(self, uid: int):
        query_res = Database.table.query(
            KeyConditionExpression = Key('uid').eq(uid)
        )
        db_response = []
        for item in query_res['Items']:
            db_response.append(item['filename'])
        return json.dumps(db_response)
        
    def delete_file(self, uid: int, filename: str):
        db_response = Database.table.delete_item(
            Key={
                'uid': uid,
                'filename': filename
            }
        )
        return json.dumps(db_response)
    
    def delete_user_files(self, uid: int):
        pass
        return None
