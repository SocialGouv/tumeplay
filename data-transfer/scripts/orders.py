from models.Order import Order
from utils import geo
import requests


def import_orders(tumeplay_api, strapi_base_api, box_ids):
    response = requests.get(tumeplay_api + '/orders?code=tumeplay-data-transfer')
    json_orders = response.json()
    index = 1

    orders = []
    for order in json_orders:

        if order['shippingModeId'] == 1:
            print('building order ', index)

            dept_name, region_name = geo.get_address_infos(order['shippingAddress']['street'], order['shippingAddress']['zipCode'])

            box_id = False
            try:
                box_id = box_ids[order['boxId']]
            except KeyError:
                print('KEY ERROR BOX ', order['boxId'])

            orders.append(
                Order(
                    order['profile']['surname'],
                    order['profile']['name'],
                    order['profile']['email'],
                    order['shippingAddress']['phoneNumber'],
                    'home',
                    None,
                    ', '.join(order['shippingAddress']['concatenation'].split(',')) + str(order['shippingAddress']['streetMore']),
                    order['shippingAddress']['zipCode'],
                    order['shippingAddress']['zipCode'][0:2],
                    dept_name,
                    region_name,
                    [{
                        '__component': 'commandes.box',
                        'box': box_id
                    }] if box_id else [{}],
                    order['createdAt']
                )
            )
        else:
            print('building order ', index)

            dept_name, region_name = geo.get_address_infos(order['pickup']['street'], order['pickup']['zipCode'])

            try:
                box_id = box_ids[order['boxId']]
            except KeyError:
                print('KEY ERROR BOX ', order['boxId'])

            orders.append(
                Order(
                    order['profile']['surname'],
                    order['profile']['name'],
                    order['profile']['email'],
                    order['shippingAddress']['phoneNumber'],
                    'pickup',
                    order['pickup']['name'],
                    order['pickup']['street'] + ', ' + order['pickup']['zipCode'] + ' ' + order['pickup']['city'],
                    order['pickup']['zipCode'],
                    order['pickup']['zipCode'][0:2],
                    dept_name,
                    region_name,
                    [{
                        '__component': 'commandes.box',
                        'box': box_id
                    }] if box_id else [{}],
                    order['createdAt']
                )
            )

        index = index + 1

    for order in orders:

        jsonOrder = {
            "first_name": order.first_name,
            "last_name": order.last_name,
            "email": order.email,
            "phone": order.phone,
            "delivery": order.delivery,
            "address": order.address,
            "address_zipcode": order.address_zipcode,
            "address_deptcode": order.address_deptcode,
            "address_dept": order.address_dept,
            "address_region": order.address_region,
            "no_email": True,
            "content": order.content
        }

        if order.poi_name:
            jsonOrder['poi_name'] = order.poi_name

        response = requests.post(strapi_base_api + "/commandes", json=jsonOrder, headers={"Content-Type": "application/json"})

    print(str(len(orders)) + ' commandes insérées')