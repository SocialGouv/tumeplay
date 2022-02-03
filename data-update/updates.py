import requests
import json


headers = {'Content-Type': 'application/json'}


def updateContent(data):
    r = requests.post('https://backend-tumeplay-preprod.dev.fabrique.social.gouv.fr/contents/mobile-update', data=data)
    print(r.json())


def updateQuestion(data):
    r = requests.post('https://backend-tumeplay-preprod.dev.fabrique.social.gouv.fr/questions/mobile-update', data=data)
    print(r.json())