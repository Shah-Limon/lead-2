import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderMenus from "../../components/Shared/OrderMenus";

const Orders = () => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setorders(info));
  }, []);

  return (
    <div className="container mx-auto items-center">
      <div className=" w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <OrderMenus></OrderMenus>
          <h2 className="card-title">Total {orders.length}</h2>

          <div className="container mx-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Prduct Name</th>
                  <th>Price</th>
                  <th>Customer</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Delivery Status</th>
                  <th>Payment Option</th>
                  <th>Customer Number & TrID</th>
                  <th>Edit Order</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .map((order) => (
                    <tr>
                      <th className="w-[150px] whitespace-normal break-all">{order.ProductName}</th>
                      <td>{order.ProductPrice}</td>
                      <td>
                        <h2 className="font-bold">{order.customerName}</h2>
                        {order.customerAddress},<br></br>{order.customerUpozilaName},
                        {order.customerDistrictName}
                        <h2>{order.customerPhoneNumber}</h2>
                      </td>
                      <td>
                        {order.paymentStatus === 'Pending' && <>Payment Is Pending <br></br><Link to={`/admin/aprove-payment/${order._id}`} className="btn">Approve Now</Link></>}
                        {order.paymentStatus === 'Received' && <>Payment Is Received <br></br><Link to={`/admin/aprove-payment/${order._id}`} className="btn">Edit Now</Link></>}
                        
                        </td>
                      <td>
                        {order.orderStatus === "Pending" && (
                          <>
                            <p className="font-bold">Order Pending</p>
                            <Link
                              to={`/admin/order/accept-cancel/${order._id}`}
                              className="btn btn-sm"
                            >
                              Accept/Cancel
                            </Link>
                          </>
                        )}
                        {order.orderStatus === "Cancelled" && (
                          <>
                            <p className="font-bold">Order Cancelled</p>
                            <Link
                              to={`/admin/order/accept-cancel/${order._id}`}
                              className="btn btn-sm"
                            >
                              Accept Now
                            </Link>
                          </>
                        )}
                        {order.orderStatus === "Accepted" && (
                          <>
                            <p className="font-bold">Order Accepted</p>
                            <Link
                              to={`/admin/order/accept-cancel/${order._id}`}
                              className="btn btn-sm"
                            >
                              Cancel Now
                            </Link>
                          </>
                        )}
                      </td>
                      <td>
                        {order.deliveryStatus === 'NotDelivered' && <>Not Delivered <br></br> <Link to={`/admin/delivery/${order._id}`} className="btn">Update Now</Link></>}
                        {order.deliveryStatus === 'Delivered' && <>Delivered <br></br> <Link to={`/admin/delivery/${order._id}`} className="btn">Update Now</Link></>}
                        {order.deliveryStatus === 'ProcessingDelivery' && <>Delivery is Processing <br></br> <Link to={`/admin/delivery/${order._id}`} className="btn">Update Now</Link></>}
                      </td>
                      <td>{order.paymentOptionName}</td>
                      <td>
                        {order.customerAccountNumber} & <br></br>{" "}
                        {order.paymentTRansactionID}
                      </td>

                      <td>
                        <Link
                          to={`/admin/order/edit/${order._id}`}
                          className="btn"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                  .reverse()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
