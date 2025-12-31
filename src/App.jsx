import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Milk from "./Milk";
import Cart from "./Cart";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import { Provider, useSelector } from "react-redux";
import { store } from "./Store";
import Orders from "./Orders";
import RegistrationForm from "./Registration";
import LoginForm from "./Login";

// ---------------------- PROTECTED ROUTE INSIDE APP ----------------------
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user"); 

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// ---------------------- NAVBAR INSIDE APP ----------------------
function Navbar() {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">

        <Link className="navbar-brand" to={user ? "/home" : "/register"}>
          Cravings
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {!user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/veg">VegItems</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/nonveg">NonVegItems</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/milk">Milk</Link></li>

                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart ({cart.length})
                  </Link>
                </li>

                <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

                <li className="nav-item">
                  <button className="btn btn-danger ms-3" onClick={handleLogout}>
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
    <Provider store={store}>
      <BrowserRouter>

        <Navbar />

        <Routes>
          {/* FIRST VISIT LOGIC */}
          <Route
            path="/"
            element={
              localStorage.getItem("user")
                ? <Navigate to="/home" />
                : <RegistrationForm />
            }
          />

          {/* PUBLIC ROUTES */}
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* PROTECTED ROUTES */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/veg" element={<ProtectedRoute><Veg /></ProtectedRoute>} />
          <Route path="/nonveg" element={<ProtectedRoute><NonVeg /></ProtectedRoute>} />
          <Route path="/milk" element={<ProtectedRoute><Milk /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        </Routes>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
