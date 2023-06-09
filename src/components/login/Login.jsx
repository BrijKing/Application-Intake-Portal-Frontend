import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginAPI } from "../../services/AuthorizationService";
import jwt from 'jwt-decode'
import { useAuth } from "../../utils/auth";
import { Toaster, toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

function Login() {
  const [user, setUser] = useState({});
  const [loginButtonText, setLoginText] = useState("Login")
  const params = useParams();
  console.log(params)
  const navigate = useNavigate();
  const auth = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    // setCredentials(data);
    // console.log(data);
    setLoginText("Logging in...")
    loginAPI(data).then((res) => {
      Cookies.set("token", res.data);
      const token = jwt(res.data);
      console.log(token)
      auth.login(token);
      if (token.authorities == "ROLE_ADMIN") {
        navigate("/admin_page", { replace: true })
      }
      if (token.authorities == "ROLE_REVIEWER") {
        navigate("/reviewer_page", { replace: true })
      }
      if (token.authorities == "ROLE_AGENT") {
        navigate("/agent_page", { replace: true })
      }
      // if(data.role=="Admin")
      //   navigate("/admin_page")

    }).catch((err) => {
      setLoginText("Login")
      console.log("error response", err.response)
      if (!err.response)
        toast.error("Server is not responding")
      else if (err.response) {
        toast.error(err.response.data);
      }
    });
  };

  return (
    <div
      className="shadow-lg bg-gray-700 w-1/4 py-10 text-white h-max"
      style={{ padding: "30px 30px" }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <form className="form flex flex-col" onSubmit={handleSubmit(formSubmit)}>
        <label htmlFor="Username">Email</label>
        <input
          type="text"
          id="email"
          value={params.email}
          className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          {...register("email", { required: "Username is required" })}
        />
        <p style={{ color: "red" }}>{errors.username?.message}</p>
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {/* <label htmlFor="Role">    Login as</label>
                <select
            name=""
            id="Role"
            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("role", {
              required: "Role is required",
            })}
          >
            <option selected disabled>
                Select
            </option>

            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_AGENT">Agent</option>
            <option value="ROLE_REVIEWER">Reviewer</option>
          </select> */}
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full">
          {loginButtonText}
        </button>

          <br/>

        <p className="text-center">or</p>

        <br/>

        <form>
            <GoogleLogin className="w-44"
            onSuccess={(credentialResponse) => {

              const data = {
                email : jwtDecode(credentialResponse.credential).email
              }
              formSubmit(data)
              // googleAuthFormSubmit(data)
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
            
            
          </form>



        <div className="mt-3">
          <Link to={"/register"} className="nav-link ">
            {" "}
            Don't have an account ?{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
