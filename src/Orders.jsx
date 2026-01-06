import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import apiURL from "./axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ NEW

  useEffect(() => {
    apiURL.get("/api/v1/products/orders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="container mt-4 order-container">
      <h2 className="text-center fw-bold mb-4 heading-style">📦 Your Orders</h2>

      {orders.length === 0 ? (
        <h4 className="text-center text-danger">No Orders Found</h4>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-6 mb-4" key={order._id}>
              <div className="card order-card h-100 d-flex flex-column hover-zoom">
                <h5 className="fw-bold mb-2">
                  Order ID: <span className="text-primary">{order._id}</span>
                </h5>

                <p className="text-muted mb-3">
                  <strong>Date:</strong>{" "}
                  {new Date(order.date).toLocaleString()}
                </p>

                <div className="items-box flex-grow-1">
                  <h6 className="fw-bold item-title">Items:</h6>
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="d-flex justify-content-between border-bottom py-2"
                    >
                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                      <span className="fw-bold text-success">₹{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <h6 className="fw-bold">Total:</h6>
                  <h6 className="fw-bold">₹{order.total}</h6>
                </div>

                <div className="d-flex justify-content-between final-amount mt-2">
                  <h5 className="fw-bold text-success">Final Amount:</h5>
                  <h5 className="fw-bold text-success">
                    ₹{order.finalAmount}
                  </h5>
                </div>

                {/* ⭐ VIEW DETAILS BUTTON */}
                <button
                  className="btn btn-primary w-100 mt-3 view-btn"
                  onClick={() => setSelectedOrder(order)} // ← OPENS MODAL
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ⭐ MODAL POPUP */}
      <Modal show={selectedOrder !== null} onHide={() => setSelectedOrder(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.date).toLocaleString()}
              </p>

              <h5 className="mt-3 mb-2">Items:</h5>
              {selectedOrder.items.map((item, index) => (
                <p key={index}>
                  {item.name} — ₹{item.price} (x{item.quantity})
                </p>
              ))}

              <hr />

              <h4 className="text-success">
                Final Amount: ₹{selectedOrder.finalAmount}
              </h4>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Orders;
