from scripts import themes, contents, questions, boxes, orders, referents

tumeplay_base_url = "https://tumeplay-api.fabrique.social.gouv.fr"
tumeplay_api = tumeplay_base_url + "/api"
strapi_base_api = "http://localhost:1337"

# # CONTENTS
# theme_ids = themes.import_themes(tumeplay_base_url, tumeplay_api, strapi_base_api)
# contents.import_contents(tumeplay_base_url, tumeplay_api, strapi_base_api, theme_ids)
# questions.import_questions(tumeplay_base_url, tumeplay_api, strapi_base_api, theme_ids)
#
# # STOCKS
# box_ids = boxes.import_boxes(tumeplay_base_url, tumeplay_api, strapi_base_api)
#
# # COMMANDES
# orders.import_orders(tumeplay_api, strapi_base_api, box_ids)

# REFERENTS
referents.import_referents(strapi_base_api)