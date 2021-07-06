from models.Theme import Theme
import requests


def import_themes(tumeplay_base_url, tumeplay_api, strapi_base_api):
    response = requests.get(tumeplay_api + '/thematiques?zone=guyane')
    json_themes = response.json()
    theme_ids = {}

    themes = []
    for theme in json_themes:
        themes.append(
            Theme(
                theme['id'],
                theme['value'],
                not theme['isSpecial'],
                tumeplay_base_url + '/' + theme['picture'],
                tumeplay_base_url + '/' + theme['sound'] if theme['sound'] else None
            )
        )

    response = requests.get(tumeplay_api + '/thematiques?published=false')
    json_themes = response.json()

    for theme in json_themes:
        themes.append(
            Theme(
                theme['id'],
                theme['value'],
                not theme['isSpecial'],
                tumeplay_base_url + '/' + theme['picture'],
                tumeplay_base_url + '/' + theme['sound'] if theme['sound'] else None
            )
        )

    for theme in themes:
        sound_id = None
        image_id = None

        theme_image = theme.get_image()

        if theme_image and theme_image is not None:
            response = requests.post(strapi_base_api + "/upload",
                                     files={'files': (
                                     theme_image.name[theme_image.name.rindex('/') + 1:], theme_image,
                                     'image/png', {'Expires': '0'})})
            json_response = response.json()
            image_id = json_response[0]['id']

        theme_sound = theme.get_sound()
        if theme_sound and theme_sound is not None:
            response = requests.post(strapi_base_api + "/upload",
                                     files={'files': (
                                     theme_sound.name[theme_sound.name.rindex('/') + 1:], theme_sound,
                                     'audio/mpeg"', {'Expires': '0'})})
            json_response = response.json()
            sound_id = json_response[0]['id']

        response = requests.post(strapi_base_api + "/thematiques", data={
            "title": theme.title,
            "title_backoffice": theme.title + " (Metropole)",
            "display_quiz": theme.display_quiz,
            "environnement": 1,
            "image": image_id
        })
        json_response = response.json()
        theme_ids[theme.id] = json_response['id']

        response = requests.post(strapi_base_api + "/thematiques", data={
            "title": theme.title,
            "title_backoffice": theme.title + " (Guyane)",
            "display_quiz": theme.display_quiz,
            "environnement": 2,
            "image": image_id,
            "sound": sound_id
        })
        json_response = response.json()
        theme_ids[str(theme.id) + "-guyane"] = json_response['id']

    print(str(len(themes)) + ' thèmes insérés')

    return theme_ids
