import json
import time
import traceback
from db import *

def default_response():
    response = dict()
    response["statusCode"] = 200
    response["body"] = "default response body"
    # CORS support
    response["headers"] = {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
    return response

def handle_method_post(body):
    db = Database()
    return db.insert(body["uid"], body["filename"], body["content"])

def handle_method_get(path_params):
    db = Database()
    ret = None
    if "uid" in path_params.keys():
        if "filename" in path_params.keys():
            ret = db.get_file(int(path_params["uid"]), path_params["filename"])
        else:
            ret = db.get_user_files(int(path_params["uid"]))
    else:
        ret = "Invalid resource"
    return ret

def handle_method_delete(path_params):
    db = Database()
    ret = None
    if "uid" in path_params.keys():
        if "filename" in path_params.keys():
            ret = db.delete_file(int(path_params["uid"]), path_params["filename"])
        else:
            ret = db.delete_user_files(int(path_params["uid"]))
    else:
        ret = "Invalid resource"
    return ret