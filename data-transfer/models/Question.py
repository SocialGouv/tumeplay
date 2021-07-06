import re
import urllib.request
from urllib.error import HTTPError, URLError
import shutil
import tempfile
import os


class Question:

    def __init__(self, text_question, text_answer, image_url, theme_id, response_A, response_B, response_C, response_A_neutral, response_B_neutral, response_C_neutral, right_answer, sound_url_question, sound_url_answer):
        self.text_question = text_question.strip()
        self.text_answer = text_answer.strip()
        self.image_url = image_url.replace(" ", "%20").replace("&amp;", "&")
        self.theme_id = theme_id
        self.response_A = response_A.strip()
        self.response_B = response_B.strip()
        self.response_C = response_C.strip()
        self.response_A_neutral = response_A_neutral
        self.response_B_neutral = response_B_neutral
        self.response_C_neutral = response_C_neutral
        self.right_answer = right_answer.strip()
        self.sound_url_question = sound_url_question.replace(" ", "%20").replace("&amp;", "&").replace("é", "e%CC%81").replace("è", "e%CC%80") if sound_url_question else None
        self.sound_url_answer = sound_url_answer.replace(" ", "%20").replace("&amp;", "&").replace("é", "e%CC%81").replace("è", "e%CC%80") if sound_url_answer else None

    def get_image(self):
        try:
            pattern_url = re.compile(
                r'^(?:http|ftp)s?://'  # http:// or https://
                r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
                r'localhost|'  # localhost...
                r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
                r'(?::\d+)?'  # optional port
                r'(?:/?|[/?]\S+)$', re.IGNORECASE
            )
            if re.match(pattern_url, self.image_url) is not None:
                try:
                    file_url, file_extension = os.path.splitext(self.image_url)
                    response = urllib.request.urlopen(self.image_url)
                    tmp_file = tempfile.NamedTemporaryFile(delete=False)
                    shutil.copyfileobj(response, tmp_file)
                    os.rename(tmp_file.name, tmp_file.name + (file_extension if file_extension != '' else '.jpeg'))
                    return open(tmp_file.name + (file_extension if file_extension != '' else '.jpeg'), 'rb')
                except (HTTPError, URLError, UnicodeEncodeError) as e:
                    return None
            else:
                return open(self.image_url, 'rb')
        except FileNotFoundError:
            return None

    def get_sound_question(self):
        if self.sound_url_question is not None:
            try:
                pattern_url = re.compile(
                    r'^(?:http|ftp)s?://'  # http:// or https://
                    r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
                    r'localhost|'  # localhost...
                    r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
                    r'(?::\d+)?'  # optional port
                    r'(?:/?|[/?]\S+)$', re.IGNORECASE
                )
                if re.match(pattern_url, self.sound_url_question) is not None:
                    try:
                        file_url, file_extension = os.path.splitext(self.sound_url_question)
                        response = urllib.request.urlopen(self.sound_url_question)
                        tmp_file = tempfile.NamedTemporaryFile(delete=False)
                        shutil.copyfileobj(response, tmp_file)
                        os.rename(tmp_file.name, tmp_file.name + (file_extension if file_extension != '' else '.mp3'))
                        return open(tmp_file.name + (file_extension if file_extension != '' else '.mp3'), 'rb')
                    except (HTTPError, URLError, UnicodeEncodeError) as e:
                        print('ERROR : ', e)
                        return None
                else:
                    print('NOT URL : ', self.sound_url_question)
                    return open(self.sound_url_question, 'rb')
            except FileNotFoundError:
                print('FILE NOT FOUND')
                return None
        else:
            return None

    def get_sound_answer(self):
        if self.sound_url_answer is not None:
            try:
                pattern_url = re.compile(
                    r'^(?:http|ftp)s?://'  # http:// or https://
                    r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
                    r'localhost|'  # localhost...
                    r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
                    r'(?::\d+)?'  # optional port
                    r'(?:/?|[/?]\S+)$', re.IGNORECASE
                )
                if re.match(pattern_url, self.sound_url_answer) is not None:
                    try:
                        file_url, file_extension = os.path.splitext(self.sound_url_answer)
                        response = urllib.request.urlopen(self.sound_url_answer)
                        tmp_file = tempfile.NamedTemporaryFile(delete=False)
                        shutil.copyfileobj(response, tmp_file)
                        os.rename(tmp_file.name, tmp_file.name + (file_extension if file_extension != '' else '.mp3'))
                        return open(tmp_file.name + (file_extension if file_extension != '' else '.mp3'), 'rb')
                    except (HTTPError, URLError, UnicodeEncodeError) as e:
                        print('ERROR : ', e)
                        return None
                else:
                    print('NOT URL : ', self.sound_url_answer)
                    return open(self.sound_url_answer, 'rb')
            except FileNotFoundError:
                print('FILE NOT FOUND')
                return None
        else:
            return None
