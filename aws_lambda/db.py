import boto3

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
        
    def getcontent(self, uid: int, filename: str):
        db_response = Database.table.get_item(
            Key={
                'uid': uid, 
                'filename': filename
            }
        )
        return db_response['Item']['content']

        