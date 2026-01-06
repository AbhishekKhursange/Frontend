import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "./Store";
import CouponApply from "./CouponApply";
import SendOrderEmail from "./SendOrderEmail";
import QRCode from "react-qr-code";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiURL from "./axios";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const discount = useSelector((state) => state.cart.discount);
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");

  // ---------------- ALL CALCULATIONS FUNCTION ----------------
  const allCalculations = () => {
    const subtotal = cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const discountAmount = (subtotal * discount) / 100;
    const priceAfterDiscount = subtotal - discountAmount;
    const gstAmount = (priceAfterDiscount * 18) / 100;

    return { subtotal, discountAmount, priceAfterDiscount, gstAmount };
  };

  // Destructuring results
  const { subtotal, discountAmount, priceAfterDiscount, gstAmount } =
    allCalculations();

  const finalBill = priceAfterDiscount + gstAmount;

  const navigate = useNavigate();

  const handleCheckout = async () => {
  if (cart.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Cart is empty!",
      text: "Please add some items to continue",
      confirmButtonText: "OK",
    });
    return;
  }

  const orderData = {
    items: cart,
    totalAmount: subtotal,
    discount: discountAmount,
    finalAmount: finalBill,
    date: new Date(),
  };

  try {
    await apiURL.post("api/v1/products/orders", orderData);

    Swal.fire({
      icon: "success",
      title: "Order Placed Successfully!",
      text: "Thanks for ordering 😃",
      confirmButtonText: "Go to Orders",
    }).then(() => {
      navigate("/orders");
      dispatch(clearCart());
    });


  } catch (error) {
    console.error("Checkout Error:", error);
    Swal.fire({
      icon: "error",
      title: "Order Failed",
      text: "Something went wrong while placing order",
      confirmButtonText: "OK",
    });
  }
};



  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-primary">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center fs-4 py-4">
          No items added yet.
        </div>
      ) : (
        <>
          <div className="row">
            {cart.map((item) => (
              <div className="col-md-6 mb-3" key={item.id}>
                <div className="card shadow-sm p-2">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="ms-3 flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-1">₹{item.price}</p>

                      <div className="d-flex align-items-center mt-2">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          –
                        </button>

                        <span className="mx-3 fw-bold">{item.quantity}</span>

                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger ms-3"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BILLING */}
          <div className="card shadow-sm p-3 mt-4">
            <h4 className="fw-bold text-secondary">Billing Summary</h4>
            <hr />

            <p className="fs-5">Subtotal: <b>₹{subtotal.toFixed(2)}</b></p>
            <p className="fs-5 text-success">
              Discount ({discount}%): - ₹{discountAmount.toFixed(2)}
            </p>
            <p className="fs-5 text-warning">GST (18%): ₹{gstAmount.toFixed(2)}</p>

            <h3 className="mt-3 fw-bold text-primary">
              Final Amount: ₹{finalBill.toFixed(2)}
            </h3>
          </div>

          <button
            className="btn btn-danger w-100 mt-3"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>

          {/* QR CODE SECTION */}
<div className="card shadow-sm p-3 mt-4 text-center">
  <h4 className="fw-bold mb-3">Scan & Pay</h4>

  <QRCode
              value={`upi://pay?pa=abhishekkhursange139@okaxis&pn=Abhishek&am=${finalBill.toFixed(
                2
              )}&cu=INR`}
              size={200}
              style={{ margin: "auto" }}
            />

            <p className="mt-2 text-muted">
              Scan this QR to pay: <b>₹{finalBill.toFixed(2)}</b>
            </p>
          </div>

          <button className="btn btn-primary w-100 mt-3"
            onClick={handleCheckout}
          >
            Checkout
          </button>

          {/* COUPON */}
          <div className="mt-3">
            <CouponApply />
          </div>

          {/* EMAIL */}
          <div className="card shadow-sm p-3 mt-4">
            <h4 className="fw-bold mb-2">Enter your email to receive order details:</h4>

            <input
              type="email"
              className="form-control"
              placeholder="yourname@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>

          <SendOrderEmail
            cartItems={cart}
            netAmount={priceAfterDiscount}
            tax={gstAmount}
            totalAmount={finalBill}
            userEmail={userEmail}
          />
        </>
      )}
    </div>
  );
}

export default Cart;
