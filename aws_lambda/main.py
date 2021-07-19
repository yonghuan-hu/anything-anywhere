import json
import time
import traceback
from handler import *

def lambda_handler(event, context):
    response = default_response()
    
    try:
        # get request method
        method = event["httpMethod"]
        # and react accordingly
        if method == "POST":
            response["body"] = handle_method_post(json.loads(event["body"]))
        elif method == "GET":
            response["body"] = handle_method_get(event["pathParameters"])
        elif method == "DELETE":
            response["body"] = handle_method_delete(event["pathParameters"])
        else:
            response["statusCode"] = 404
    
    except Exception as err:
        response["body"] = traceback.format_exc()
    
    # do response
    return response
