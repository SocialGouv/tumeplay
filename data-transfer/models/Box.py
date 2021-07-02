import re
import urllib.request
from urllib.error import HTTPError, URLError
import shutil
import tempfile
import os


class Box:

    def __init__(self, id, title, description, image_url, products, number):
        self.id = id
        self.title = title.strip()
        self.description = description
        self.image_url = image_url.replace(" ", "%20").replace("&amp;", "&")
        self.stock = 10000
        self.products = products
        self.number = number

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

