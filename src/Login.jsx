import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiURL from "./axios";

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitLogic = async (data) => {
    try {
      const res = await apiURL.post("api/v1/products/login", {
      email: data.email.trim(),
      password: data.password.trim()
    });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");
      navigate("/home");

    } catch (err) {
      alert("Error connecting to server");
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>

              <form onSubmit={handleSubmit(submitLogic)}>
                
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
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
                    {...register("password", { required: "Password is required" })}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
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

export default LoginForm;
