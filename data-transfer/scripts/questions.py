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
                right_answer,
                None,
                None
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
                right_answer,
                tumeplay_base_url + '/' + question['questionSound'] if 'questionSound' in question else None,
                tumeplay_base_url + '/' + question['answerSound'] if 'answerSound' in question else None
            )
        )

    for question in questions:
        sound_question_id = None
        sound_answer_id = None
        image_id = None

        question_image = question.get_image()

        if question_image and question_image is not None:
            response = requests.post(strapi_base_api + "/upload",
                                     files={'files': (
                                     question_image.name[question_image.name.rindex('/') + 1:], question_image,
                                     'image/png', {'Expires': '0'})})
            json_response = response.json()
            image_id = json_response[0]['id']

        question_sound_question = question.get_sound_question()
        if question_sound_question and question_sound_question is not None:
            response = requests.post(strapi_base_api + "/upload",
                                     files={'files': (
                                     question_sound_question.name[question_sound_question.name.rindex('/') + 1:], question_sound_question,
                                     'audio/mpeg"', {'Expires': '0'})})
            json_response = response.json()
            sound_question_id = json_response[0]['id']

        question_sound_answer = question.get_sound_answer()
        if question_sound_answer and question_sound_answer is not None:
            response = requests.post(strapi_base_api + "/upload",
                                     files={'files': (
                                     question_sound_answer.name[question_sound_answer.name.rindex('/') + 1:], question_sound_answer,
                                     'audio/mpeg"', {'Expires': '0'})})
            json_response = response.json()
            sound_answer_id = json_response[0]['id']

        requests.post(strapi_base_api + "/questions", data=json.dumps({
            "text_question": question.text_question,
            "text_answer": question.text_answer,
            "image": image_id,
            "sound_question": sound_question_id,
            "sound_answer": sound_answer_id,
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