from models.Question import Question
import requests
import json


def import_questions(tumeplay_base_url, tumeplay_api, strapi_base_api, theme_ids):
    response = requests.get(tumeplay_api + '/quizzs?zone=metropole')
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

    response = requests.get(tumeplay_api + '/quizzs?zone=guyane')
    json_questions = response.json()

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
                theme_ids.get(str(question['theme']) + '-guyane'),
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
                                     files={'files': (
                                     question_image.name[question_image.name.rindex('/') + 1:], question_image,
                                     'image/png', {'Expires': '0'})})
            json_response = response.json()
            image_id = json_response[0]['id']

        requests.post(strapi_base_api + "/questions", data=json.dumps({
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

    print(str(len(questions)) + ' questions insérées')