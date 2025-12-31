function Contact() {
    return(
        <>
       <div className="container mt-5">

      <div className="card shadow p-4">
        <h2 className="mb-3 text-center">Contact Us</h2>

        <p className="text-muted text-center">
          Have questions? We'd love to hear from you!
        </p>

        {/* Contact Details */}
        <div className="mt-3">
          <h5>📍 Address</h5>
          <p>Cravings, Pune, Maharashtra, India</p>

          <h5>📞 Phone</h5>
          <p>‪+91 7066606561‬</p>

          <h5>📧 Email</h5>
          <p>cravings@gmail.com</p>

          <h5>🕒 Working Hours</h5>
          <p>Monday – Sunday : 9 AM to 9 PM</p>
        </div>

        <hr />

        {/* Contact Form */}
        <h4 className="mt-3">Send Us a Message</h4>

         <form className="mt-3">

          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" />
          </div>

          <div className="mb-3">
            <label className="form-label">Your Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4" placeholder="Write your message here..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

        </form>
      </div>

    </div>


        </>
    );
}
export default Contact;
