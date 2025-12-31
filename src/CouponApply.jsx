import { useState } from "react";
import { useDispatch } from "react-redux";
import { applyDiscount } from "./Store";
import { Coupons } from "./Coupon";

function CouponApply() {
    const[couponCode, setCouponCode] = useState("");
    const dispatch = useDispatch();

    const apply = () => {
        const discount = Coupons[couponCode.toUpperCase()] || 0;
        dispatch(applyDiscount(discount));
    };

    return (
        <>
        <input type="text" className="form-control mb-2" placeholder="Enter Coupon" value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)} />

        <button className="btn btn-primary mt-2" onClick={apply}>
              Apply Coupon
            </button>
        </>
    );
}
export default CouponApply;