import { BrowserRouter, Routes, Route, NavLink, useNavigate, Navigate } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Milk from "./Milk";
import Cart from "./Cart";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Orders from "./Orders";
import RegistrationForm from "./Registration";
import LoginForm from "./Login";
import { useSelector } from "react-redux";

// ICONS
import { FaHome, FaLeaf, FaDrumstickBite, FaShoppingCart, FaUser, FaInfoCircle, FaPhone } from "react-icons/fa";
import Profile from "./Profile";

// ---------------------- PROTECTED ROUTE ----------------------
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// ---------------------- NAVBAR ----------------------
function Navbar() {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top">
      <div className="container-fluid">

        <NavLink className="navbar-brand fw-bold" to={user ? "/home" : "/register"}>
          Cravings
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home">
                    <FaHome /> Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/veg">
                    <FaLeaf /> Veg
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/nonveg">
                    <FaDrumstickBite /> Non-Veg
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/milk">
                    🥛 Milk
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    <FaShoppingCart /> Cart ({cart.length})
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/orders">Orders</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    <FaInfoCircle /> About
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    <FaPhone /> Contact
                  </NavLink>
                </li>

                {/* USER NAME */}
                <li className="nav-item ms-3">
                  <NavLink className="nav-link d-flex align-items-center" to="/profile">
                    <FaUser className="me-1" />
                    {user?.username || "User"}
                  </NavLink>
                </li>

                {/* LOGOUT */}
                <li className="nav-item ms-3">
                  <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

// ---------------------- MAIN APP ----------------------
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
          
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/milk" element={<Milk />} />

        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/about" element={<AboutUs />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;