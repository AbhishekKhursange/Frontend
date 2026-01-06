import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiURL from "./axios";

function RegistrationForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitLogic = async (data) => {
    try {
      await apiURL.post("/api/v1/products/register", data);
      alert("Registration Successful!");
      reset();
      navigate("/login");

    } catch (err) {
      alert("Error connecting to server");
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create Account</h2>

              <form onSubmit={handleSubmit(submitLogic)}>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    placeholder="Enter your full name"
                    {...register("username", { required: "Name is required" })}
                  />
                  <div className="invalid-feedback">
                    {errors.username?.message}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters required" },
                    })}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="Enter your phone number"
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
                    })}
                  />
                  <div className="invalid-feedback">
                    {errors.phone?.message}
                  </div>
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label">Full Address</label>
                  <textarea
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    placeholder="Enter your full address"
                    rows="3"
                    {...register("address", {
                      required: "Address is required",
                      minLength: { value: 10, message: "Min 25 characters required" },
                    })}
                  ></textarea>
                  <div className="invalid-feedback">
                    {errors.address?.message}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
