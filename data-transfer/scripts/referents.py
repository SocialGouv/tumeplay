import json

import requests
from utils import referents


def import_referents(strapi_base_api):
    tmp_referents = referents.get_referents()
    for referent in tmp_referents:
        requests.post(strapi_base_api + "/referents", data=json.dumps(referent), headers={"Content-type": "application/json"})

    print(str(len(tmp_referents)) + ' référents insérées')