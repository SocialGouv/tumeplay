# coding=utf-8

import requests
from models.Content import Content
from models.Theme import Theme
from models.Question import Question
import json

tumeplay_base_url = "https://tumeplay-api.fabrique.social.gouv.fr"
tumeplay_api = tumeplay_base_url + "/api"
strapi_base_api = "http://localhost:1337"

response = requests.get(tumeplay_api + '/thematiques')
json_themes = response.json()
theme_ids = {}

themes = []
for theme in json_themes:

    themes.append(
        Theme(
            theme['id'],
            theme['value'],
            not theme['isSpecial'],
            tumeplay_base_url + '/' + theme['picture']
        )
    )

for theme in themes:
    theme_image = theme.get_image()
    if theme_image and theme_image is not None:
        response = requests.post(strapi_base_api + "/upload", files={'files': (theme_image.name[theme_image.name.rindex('/') + 1:], theme_image, 'image/png', {'Expires': '0'})})
        json_response = response.json()
        image_id = json_response[0]['id']

    response = requests.post(strapi_base_api + "/thematiques", data={
        "title": theme.title,
        "display_quiz": theme.display_quiz,
        "environnement": 1,
        "image": image_id
    })
    json_response = response.json()
    theme_ids[theme.id] = json_response['id']

response = requests.get(tumeplay_api + '/contents')
json_contents = response.json()

contents = []
for content in json_contents:

    contents.append(
        Content(
            content['title'],
            content['text'],
            tumeplay_base_url + '/' + content['picture'],
            theme_ids.get(content['theme'])
        )
    )

for content in contents:
    content_image = content.get_image()
    if content_image and content_image is not None:
        response = requests.post(strapi_base_api + "/upload",
                                 files={'files': (content_image.name[content_image.name.rindex('/') + 1:], content_image, 'image/png', {'Expires': '0'})})
        json_response = response.json()
        image_id = json_response[0]['id']

    requests.post(strapi_base_api + "/contents", data={
        "title": content.title,
        "text": content.text,
        "image": image_id,
        "theme": content.theme_id
    })


response = requests.get(tumeplay_api + '/quizzs')
json_questions = response.json()

questions = []
for question in json_questions:

    right_answer = ''

    if question['rightAnswer'] == 1:
        right_answer = 'A'
    elif question['rightAnswer'] == 2:
        right_answer = 'B'
    elif question['rightAnswer'] == 3:
        right_answer = 'C'

    questions.append(
        Question(
            question['question'],
            question['explanation'],
            tumeplay_base_url + '/' + question['background'] if question['background'] else 'None',
            theme_ids.get(question['theme']),
            question['answers'][0]['text'],
            question['answers'][1]['text'],
            question['answers'][2]['text'],
            question['neutralAnswer'] == 1,
            question['neutralAnswer'] == 2,
            question['neutralAnswer'] == 3,
            right_answer
        )
    )

for question in questions:
    question_image = question.get_image()
    if question_image and question_image is not None:
        response = requests.post(strapi_base_api + "/upload",
                                 files={'files': (question_image.name[question_image.name.rindex('/') + 1:], question_image, 'image/png', {'Expires': '0'})})
        json_response = response.json()
        image_id = json_response[0]['id']

    response = requests.post(strapi_base_api + "/questions", data=json.dumps({
        "text_question": question.text_question,
        "text_answer": question.text_answer,
        "image": image_id,
        "theme": question.theme_id,
        "responses": {
            "response_A": question.response_A,
            "response_B": question.response_B,
            "response_C": question.response_C,
            "response_A_neutral": question.response_A_neutral,
            "response_B_neutral": question.response_B_neutral,
            "response_C_neutral": question.response_C_neutral,
            "right_answer": question.right_answer,
        }
    }), headers={"Content-type": "application/json"})

print(str(len(themes)) + ' thèmes insérés')
print(str(len(contents)) + ' contenus insérés')
print(str(len(questions)) + ' questions insérées')