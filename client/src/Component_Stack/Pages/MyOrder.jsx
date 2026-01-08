import React, { useEffect, useState } from 'react';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    


    try {
      const response = await fetch("{process.env.APP_API_URL}/api/myorderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetching successful");
        console.log(data);

        const sortedOrderData = data.orderData.order_data.sort((a, b) => {
          return new Date(b.order_date) - new Date(a.order_date);
        });

        setOrderData(sortedOrderData);
      } else {
        console.error('Failed to fetch order data');
      }
    } catch (error) {
      console.error('An error occurred while fetching order data', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
        <div className='ashishmyorder-heading'>Your  Orders : </div>
      <div className='ashishcontainer' style={{paddingBottom : "100px"}}>
        <div className='ashishrow'>
          {orderData.length > 0 ? (
            orderData.map((order, index) => (
              <div className='ashishcol-12 col-md-6 col-lg-3' key={index}>
                {order.order_data.map((item, itemIndex) => (
                  <div className="ashishorder-card mt-3" key={itemIndex}>
                    <img src={item.img} alt="Product" />
                    <div className="ashishorder-details">
                      <h5 className="ashishorder-title">{item.name}</h5>
                      <div className='ashishorder-info'>
                        <div className="ashishorder-quantity">Quantity: {item.qty}</div>
                        <div className="ashishorder-span">Span: {item.span}</div>
                        <div className="ashishorder-date">Order Date: {order.order_date}</div>
                      </div>
                      <div className='ashishorder-price'> Price: ₹{item.price}/- </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="ashishno-order-data">No order data available</div>
          )}
        </div>
      </div>
    </div>
  );
}
