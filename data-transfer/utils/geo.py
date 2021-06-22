import requests

base_api = "https://api-adresse.data.gouv.fr/search/"


def get_address_infos(address, zip_code):
    response = requests.get(base_api + '?q=' + address + '&postcode=' + zip_code)
    json_response = response.json()
    try:
        splited_context = json_response['features'][0]['properties']['context'].split(', ')
        return splited_context[1], splited_context[2]
    except (IndexError, KeyError):
        return '', ''
