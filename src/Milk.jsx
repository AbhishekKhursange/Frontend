import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import Pagination from "./Pagination";
import { getMilkItems } from "./milkSlice";
import { toast } from "react-toastify";

function Milk() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.milk);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(getMilkItems());
  }, [dispatch]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = items.slice(indexOfFirst, indexOfLast);
  
  const handleAdd = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`, { autoClose: 1500 });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold">Milk & Dairy Products</h2>

      {loading && <h3>Loading...</h3>}
      {error && <h3 className="text-danger">{error}</h3>}

      <div className="row">
        {currentItems.map((item) => (
          <div className="col-md-3 mb-4" key={item._id}>
            <div className="card shadow-lg h-100 hover-zoom">
              <img
                src={item.img}
                className="card-img-top"
                alt={item.name}
                style={{ height: 160, objectFit: "cover" }}
              />
              <div className="card-body">
                <h5>{item.name}</h5>
                <p className="text-success fw-bold">₹{item.price}</p>
                <button
                  className="btn btn-success w-100"
                  onClick={() => handleAdd(item)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
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
