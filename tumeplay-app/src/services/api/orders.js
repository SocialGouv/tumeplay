const OrdersAPI = {
  orderBoxes: async order => {
    let res = await fetch('http://localhost:1337/commandes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: order.first_name,
        last_name: order.last_name,
        email: order.email,
        delivery: order.delivery,
        content: order.content,
      }),
    });
    return res.ok;
  },
};

export default OrdersAPI;
