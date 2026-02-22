import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import Pagination from "./Pagination";
import { getMilkItems } from "./milkSlice";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

function Milk() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.milk);
  const cartItems = useSelector((state) => state.cart.items);

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const itemRefs = useRef({});

  // 🔹 Fetch once
  useEffect(() => {
    if (!items.length) dispatch(getMilkItems());
  }, [dispatch, items.length]);

  // 🔹 Jump to correct page
  useEffect(() => {
    if (!productId || !items.length) return;

    const index = items.findIndex(i => i._id === productId);
    if (index !== -1) {
      setCurrentPage(Math.floor(index / itemsPerPage) + 1);
    }
  }, [productId, items]);

  // 🔹 Scroll to item
  useEffect(() => {
    if (!productId) return;

    const el = itemRefs.current[productId];
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    el.classList.add("highlight-item");

    const timer = setTimeout(() => {
      el.classList.remove("highlight-item");
    }, 2200);

    return () => clearTimeout(timer);
  }, [currentPage, productId]);


  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = (item) => {
    const user = localStorage.getItem("user");

    if (!user) {
      toast.info("Please login to add items to cart", { autoClose: 1200 });
      navigate("/login");
      return;
    }
    dispatch(addToCart(item));
    toast.success("Item added successfully", { autoClose: 1200 });
  };

  const isInCart = (id) => cartItems.some(i => i._id === id);

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4">🥛 Milk & Dairy Products</h2>

      {loading && <h3>Loading...</h3>}
      {error && <h3 className="text-danger">{error}</h3>}

      <div className="row">
        {currentItems.map((item) => {
          const added = isInCart(item._id);

          return (
            <div
              className="col-md-3 mb-4"
              key={item._id}
              ref={(el) => (itemRefs.current[item._id] = el)}
            >
              <div className="card h-100 card-hover">
                <img
                  src={item.img}
                  className="card-img-top"
                  alt={item.name}
                  style={{
                    height: "180px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>

                  <p className="fw-bold text-success mb-2">₹{item.price}</p>

                  <button
                    className={`btn mt-auto w-100 ${added ? "btn-secondary" : "btn-success"
                      }`}
                    disabled={added}
                    onClick={() => handleAdd(item)}
                  >
                    {added ? "Added" : "Add To Cart"}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Milk;
