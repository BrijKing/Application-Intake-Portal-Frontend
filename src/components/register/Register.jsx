import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import home_page from "../../images/home_page.jpg";
import { registerAPI } from "../../services/EmployeeService";
import { Toaster, toast } from "react-hot-toast";
import { duration } from "@mui/material";
import { Close } from "@mui/icons-material";
import Captcha from "../Captcha/Captcha";
import ProgressBar from "@ramonak/react-progress-bar";
import { BigButton } from "../../pdf/components/BigButton";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import GoogleIcon from '@mui/icons-material/Google';
function Register() {
  // const [details, setdetails] = useState({});
  const [getLinkButtonPressed, setGetLinkButtonPressed] = useState(false);
  const [resendEnabled, setResetEnabled] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse),
  // });

  const formSubmit = (data) => {
    console.log(data);
    data = { ...data };
    // setdetails(data);
    registerAPI(data).then(() => {
      toast.success(" Email sent");
      setResetEnabled(false);
      setGetLinkButtonPressed(true);
      setSeconds(30);
      setGetLinkButtonPressed(true);
      setInterval(() => {
        setSeconds((progress) => progress - 1);
      }, 1000);
      setTimeout(() => {
        setResetEnabled(true);
      }, 30000);
    });
  };
  return (
    <>
      <Toaster
        toastOptions={{
          duration: Infinity,
        }}
        position="top-right"
        reverseOrder={false}
      />
      {}
      <div
        className="flex items-center justify-center"
        style={{
          width: "100vw",
          height: "100vh",
          background: `url(${home_page})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <pre>
      {JSON.stringify(details,2,undefined)}
    </pre> */}

        <div
          className="shadow-lg bg-gray-700 sd:w-full md:px-5 md:py-5 lg:w-1/4 py-10 text-white h-max "
          style={{ padding: "30px 30px" }}
        >
          <form
            className="form flex flex-col register-form"
            onSubmit={handleSubmit(formSubmit)}
          >
            <label htmlFor="Username">Email</label>
            <input
              type="text"
              id="Username"
              className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register("email", { required: "Username is required" })}
            />

            <p style={{ color: "red" }}>{errors.email?.message}</p>

            <label htmlFor="mono">Mobile Number</label>
            <input
              type="number"
              id="mono"
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register("mono", {
                required: "Mobile Number  is required",
              })}
            />
            <p style={{ color: "red" }}>{errors.mono?.message}</p>

            <p style={{ color: "red" }}>{errors.confirm_password?.message}</p>

            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full     submit-button hidden"
            >
              Get Link
            </button>

            {!getLinkButtonPressed ? (
              <>
                <button
                  type="submit"
                  className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full     submit-button"
                >
                  Get Link
                </button>
                <div className="mt-3">
                  <Link to={"/"} className="nav-link ">
                    {" "}
                    Already Have an Account?{" "}
                  </Link>
                </div>
              </>
            ) : (
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                {
                  <>
                    <div>
                      {!resendEnabled ? (
                        <div>
                          <div>
                            Resend Email in{" "}
                            <span style={{ color: "orange" }}>{seconds}</span>{" "}
                            seconds
                          </div>
                          <div>
                            <a href=""> Incorrect Email?</a>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <BigButton
                              title={"Resend"}
                              customFillColor={"green"}
                              style={{ color: "white" }}
                              initialBgColor={"orange"}
                              onClick={() => {
                                setResetEnabled(true);
                                document
                                  .querySelector(".submit-button")
                                  .click();
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                }
              </div>
            )}
            {/* <div style={{display:"flex",justifyContent:"right",marginTop:"20px"}}>
            <button onClick={()=>window.location.href="/register"}> Wrong Email ?  </button>
         </div> */}
          </form>
          <br />
          <p className="text-center">OR</p>
          <br />

          <form>
            <GoogleLogin className="w-44"
            onSuccess={(credentialResponse) => {

              const data = {
                email : jwtDecode(credentialResponse.credential).email
              }
              
              formSubmit(data)
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
            
            
          </form>

          <br />

          <span style={{ color: "orange" }}>
            {" "}
            You will get Link to set Password on gmail id you speicify here
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;
