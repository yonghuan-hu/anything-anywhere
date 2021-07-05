import json
import time
import traceback
from db import *

def default_response():
    response = dict()
    response["statusCode"] = 200
    response["body"] = "success"
    # CORS support
    response["headers"] = {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
    return response

def handle_method_post(body):
    response = default_response()
    try:
        db = Database()
        db.insert(body["uid"], body["filename"], body["content"])
    except Exception as err:
        print(err)
        response["body"] = "failed"
    return response

def handle_method_get(body):
    response = default_response()
    try:
        db = Database()
        response["body"] = db.getcontent(int(body["uid"]), body["filename"])
    except Exception as err:
        print(err)
        response["body"] = "failed"
    return response

def lambda_handler(event, context):
    # parse request
    method = event["httpMethod"]
    
    # format response
    if method == "OPTIONS":
        response = default_response()
    elif method == "POST":
        response = handle_method_post(json.loads(event["body"]))
        # response = handle_method_post(event["body"])
    elif method == "GET":
        # response = default_response()
        # response["body"] = str(event)
        response = handle_method_get(event["queryStringParameters"])
    else:
        response = dict()
        response["statusCode"] = 404
    
    # do response
    return response

    

