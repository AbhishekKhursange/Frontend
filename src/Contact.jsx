function Contact() {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">

                <h2 className="text-center fw-bold mb-2">Contact Us</h2>
                <p className="text-muted text-center mb-4">
                  Have questions? We'd love to hear from you!
                </p>

                {/* Contact Details */}
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-semibold">📍 Address</h6>
                    <p className="text-muted mb-0">
                      Cravings, Pune, Maharashtra, India
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <h6 className="fw-semibold">📞 Phone</h6>
                    <p className="text-muted mb-0">
                      +91 7066606561
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <h6 className="fw-semibold">📧 Email</h6>
                    <p className="text-muted mb-0">
                      cravings@gmail.com
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <h6 className="fw-semibold">🕒 Working Hours</h6>
                    <p className="text-muted mb-0">
                      Monday – Sunday : 9 AM to 9 PM
                    </p>
                  </div>
                </div>

                <hr />

                {/* Contact Form */}
                <h4 className="fw-semibold mb-3">Send Us a Message</h4>

                <form>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary px-4">
                      Submit
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
