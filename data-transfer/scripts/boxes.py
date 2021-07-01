from models.Box import Box
from models.Product import Product
import requests
import json


def import_boxes(tumeplay_base_url, tumeplay_api, strapi_base_api):
    response = requests.get(tumeplay_api + '/boxs')
    json_boxes = response.json()
    box_ids = {}

    products = []
    product_ids = {}
    for product in json_boxes['products']:
        products.append(
            Product(
                product['id'],
                product['title'],
                product['description'],
                tumeplay_base_url + '/' + product['picture']['path'] if product['picture'] else '',
            )
        )

    for product in products:
        product_image = product.get_image()
        if product_image and product_image is not None:
            response = requests.post(strapi_base_api + "/upload",
                                     files={'files': (
                                         product_image.name[product_image.name.rindex('/') + 1:], product_image,
                                         'image/png', {'Expires': '0'})})
            json_response = response.json()
            image_id = json_response[0]['id']

        response = requests.post(strapi_base_api + "/produits", data={
            "title": product.title,
            "description": product.description,
            "image": image_id,
        })

        json_response = response.json()
        product_ids[product.title] = json_response['id']

    print(str(len(products)) + ' produits insérés')

    boxes = []
    for box in json_boxes['boxs']:
        product_helpers = []

        if box['key'] != 11:
            for product in box['products']:
                product_helpers.append(
                    {
                        "produit": product_ids[product['title'].strip()],
                        "quantity": int(product['qty'])
                    }
                )

            boxes.append(
                Box(
                    box['id'],
                    box['title'],
                    box['description'],
                    tumeplay_base_url + '/' + box['picture'],
                    product_helpers,
                    box['key']
                )
            )

    for box in boxes:
        box_image = box.get_image()
        if box_image and box_image is not None:
            response = requests.post(strapi_base_api + "/upload",
                                     files={'files': (
                                     box_image.name[box_image.name.rindex('/') + 1:], box_image,
                                     'image/png', {'Expires': '0'})})
            json_response = response.json()
            image_id = json_response[0]['id']

        response = requests.post(strapi_base_api + "/boxes", json={
            "title": box.title,
            "description": box.description,
            "image": image_id,
            "stock": box.stock,
            "products": box.products,
            "number": box.number
        }, headers={"Content-Type": "application/json"})

        json_response = response.json()
        box_ids[box.id] = json_response['id']

    print(str(len(boxes)) + ' boxes insérés')

    return box_ids
