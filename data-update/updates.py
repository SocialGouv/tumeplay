import requests
import json


headers = {'Content-Type': 'application/json'}


def updateContent(data):
    r = requests.post('https://backend-tumeplay-preprod.dev.fabrique.social.gouv.fr/contents/mobile-update', data=data)
    response = r.json()
    try:
        if response['statusCode'] == 400:
            print(response['message'])
    except KeyError:
        pass


def updateQuestion(data):
    r = requests.post('https://backend-tumeplay-preprod.dev.fabrique.social.gouv.fr/questions/mobile-update', data=data)
    response = r.json()
    try:
        if response['statusCode'] == 400:
            print(response['message'])
    except KeyError:
        pass
