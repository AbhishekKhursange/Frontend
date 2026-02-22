function AboutUs() {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">

                <h2 className="text-center fw-bold mb-4">
                  About Us
                </h2>

                <p className="fs-5">
                  <strong>Welcome to Cravings!</strong> We are an online food and
                  grocery store offering fresh vegetables, non-veg items, milk products,
                  and daily-need essentials — all in one place.
                </p>

                <p className="mt-4 fw-semibold">
                  Our mission is to provide:
                </p>

                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item">✅ Fresh and high-quality products</li>
                  <li className="list-group-item">💰 Affordable prices for everyone</li>
                  <li className="list-group-item">🚚 Fast and reliable doorstep delivery</li>
                  <li className="list-group-item">🛒 A simple and enjoyable ordering experience</li>
                </ul>

                <p className="fs-5">
                  We started Cravings to make grocery shopping easier and more
                  convenient. Whether you need vegetables, dairy items, or delicious food —
                  we bring everything straight to your home with just one click.
                </p>

                <div className="alert alert-light text-center mt-4 mb-0">
                  <strong>Thank you for choosing Cravings!</strong>
                  <br />
                  Your trust motivates us to serve you better every day.
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
