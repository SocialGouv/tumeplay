import requests
import json


headers = {'Content-Type': 'application/json'}


def updateContent(data):
    r = requests.post('http://localhost:1337/contents/mobile-update', data=data)
    print(r.json())