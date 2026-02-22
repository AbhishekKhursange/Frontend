import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getVegItems } from "./vegSlice";
import { getNonvegItems } from "./nonVegSlice";
import { getMilkItems } from "./milkSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const vegItems = useSelector((state) => state.veg.items);
  const nonVegItems = useSelector((state) => state.nonveg.items);
  const milkItems = useSelector((state) => state.milk.items);

  // 🔹 Fetch once
  useEffect(() => {
    if (!vegItems.length) dispatch(getVegItems());
    if (!nonVegItems.length) dispatch(getNonvegItems());
    if (!milkItems.length) dispatch(getMilkItems());
  }, [dispatch, vegItems.length, nonVegItems.length, milkItems.length]); // ✅ dispatch only

  // ✅ FIX: memoize merged items
  const allItems = useMemo(() => {
    return [
      ...vegItems.map((i) => ({ ...i, route: "/veg" })),
      ...nonVegItems.map((i) => ({ ...i, route: "/nonveg" })),
      ...milkItems.map((i) => ({ ...i, route: "/milk" })),
    ];
  }, [vegItems, nonVegItems, milkItems]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // 🔹 Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 🔹 Filter (SAFE now)
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const filtered = allItems.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    setResults(filtered);
    setActiveIndex(-1);
  }, [debouncedSearch, allItems]);

  // 🔹 Keyboard navigation
  const handleKeyDown = (e) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      const item = results[activeIndex];
      navigate(`${item.route}?id=${item._id}`);
      resetSearch();
    }
  };

  // 🔹 Outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        resetSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resetSearch = () => {
    setResults([]);
    setSearchTerm("");
    setActiveIndex(-1);
  };

  // 🔹 Highlight match
  const highlightText = (text) => {
    const regex = new RegExp(`(${debouncedSearch})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === debouncedSearch.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container mt-4" ref={wrapperRef}>
      {/* 🔍 SEARCH */}
      <div className="mb-4 position-relative">
        <div className="input-group input-group-lg shadow-sm rounded-pill">
          <span className="input-group-text bg-white border-0 rounded-start-pill">🔍</span>
          <input
            type="text"
            className="form-control border-0 rounded-pill"
            placeholder="Search veg, nonveg, dairy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {results.length > 0 && (
          <ul
            className="list-group position-absolute w-100 shadow-sm rounded-3"
            style={{ zIndex: 10 }}
          >
            {results.map((item, index) => (
              <li
                key={item._id}
                className={`list-group-item list-group-item-action ${
                  index === activeIndex ? "active" : ""
                }`}
                onMouseDown={() => {
                  navigate(`${item.route}?id=${item._id}`);
                  resetSearch();
                }}
              >
                🔍 {highlightText(item.name)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🌟 HERO */}
      <div
        className="p-5 mb-4 rounded shadow-lg text-white"
        style={{ background: "linear-gradient(120deg, #ff6a00, #ee0979)" }}
      >
        <h1 className="display-5 fw-bold">Welcome to Cravings</h1>
        <p className="fs-5">Fresh food delivered right to your doorstep</p>
        <Link to="/veg" className="btn btn-light btn-lg mt-3">
          Order Now
        </Link>
      </div>

      {/* 🍽 CATEGORIES */}
      <h2 className="mb-3">Our Categories</h2>
      <div className="row">
        <Category img="/Images/Veg.jpeg" title="Veg Items" link="/veg" />
        <Category img="/Images/Nonveg.jpeg" title="Non-Veg Items" link="/nonveg" />
        <Category img="/Images/Milk.jpg" title="Dairy / Milk" link="/milk" />
      </div>
    </div>
  );
}

const Category = ({ img, title, link }) => (
  <div className="col-md-4 mb-4">
    <div className="card h-100 shadow category-card">
      <img src={img} className="card-img-top" />
      <div className="card-body d-flex flex-column">
        <h5>{title}</h5>
        <Link to={link} className="btn btn-success mt-auto">
          Explore
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
