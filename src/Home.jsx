import { Link } from "react-router-dom";
function Home() {
    return (
        <>
        <div className="container mt-4">

      {/* Hero Section */}
      <div className="p-5 mb-4 bg-light rounded-3 shadow">
        <div className="container-fluid py-4">
          <h1 className="display-5 fw-bold">Welcome to Cravings</h1>
          <p className="col-md-8 fs-5 mt-3">
            Enjoy fresh, delicious food delivered right to your doorstep.  
            Explore our Veg, Non-Veg, and Dairy categories and shop with ease!
          </p>
          <Link to="/veg" className="btn btn-primary btn-lg mt-3">
            Order Now
          </Link>
        </div>
      </div>

       {/* Categories Section */}
      <h2 className="mb-3">Our Categories</h2>

      <div className="row">

        {/* Category 1 - Veg */}
        <div className="col-md-4 mb-4">
          <div className="card shadow category-card">
            <img src="/Images/Veg.jpeg" className="card-img-top category-image" alt="Veg" />
            <div className="card-body category-body">
              <h5 className="card-title">Veg Items</h5>
              <p className="card-text">Fresh, tasty, and healthy vegetarian dishes.</p>
              <Link to="/veg" className="btn btn-success">Explore Veg</Link>
            </div>
          </div>
        </div>

        {/* Category 2 - Non Veg */}
        <div className="col-md-4 mb-4">
          <div className="card shadow category-card">
            <img src="/Images/Nonveg.jpeg" className="card-img-top category-image" alt="Non Veg" />
            <div className="card-body category-body">
              <h5 className="card-title">Non-Veg Items</h5>
              <p className="card-text">Delicious chicken, mutton, and seafood dishes.</p>
              <Link to="/nonveg" className="btn btn-success">Explore Non-Veg</Link>
            </div>
          </div>
        </div>

        {/* Category 3 - Milk */}
        <div className="col-md-4 mb-4">
          <div className="card shadow category-card">
            <img src="/Images/Milk.jpg" className="card-img-top category-image" alt="Milk" />
            <div className="card-body category-body">
              <h5 className="card-title">Dairy / Milk</h5>
              <p className="card-text">Fresh milk & dairy products delivered daily.</p>
              <Link to="/milk" className="btn btn-success">Explore Milk</Link>
            </div>
          </div>
        </div>

      </div>

      {/* Why Choose Us Section */}
      <div className="mt-5 p-4 bg-light rounded shadow">
        <h2 className="text-center mb-4">Why Choose Us?</h2>

        <div className="row text-center">

          <div className="col-md-4 mb-3">
            <h4>🥗 Fresh Food</h4>
            <p>We deliver only fresh and quality food items.</p>
          </div>

          <div className="col-md-4 mb-3">
            <h4>⚡ Fast Delivery</h4>
            <p>Your order is delivered quickly and safely.</p>
          </div>

          <div className="col-md-4 mb-3">
            <h4>💰 Best Prices</h4>
            <p>Affordable food items with exciting offers.</p>
          </div>

        </div>
      </div>

    </div>

        </>
    );
}
export default Home;