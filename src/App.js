import React, { useState } from "react";
import OtpInput from "otp-input-react"
import { CgSpinner } from "react-icons/cg";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import "./App.css"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.config";
import { toast, Toaster } from "react-hot-toast";

const App = () => {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  const [user, setUser] = useState(null)


  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => { },
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phone;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return <section className="500 flex items-center justify-center h-screen">
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {
        user ?
          <div className="suc-con">
            <div>
              <img src="https://img.freepik.com/free-vector/flat-design-innovation-concept_23-2149178560.jpg?size=626&ext=jpg&ga=GA1.1.2002628386.1688888353&semt=ais" alt="success" className="log" />
              <h2 className="text-center font-medium text-2xl mb-6">
                Welcome to AdmitKard
              </h2>
              <p5>In order to provide you with <br /> a custom experience,</p5>
              <p2>We need to ask you a few questions.</p2>
              <button className="btn w-30 flex gap-1 items-center justify-center rounded">
                Get Started
              </button>
              <p6>*This will only take five min.</p6>
            </div>
          </div> :
          <div className="bg-container w-80 gap-4 rounded-lg p-4">
            <div>
            </div>
            {/* <img src="https://www.hrkatha.com/wp-content/uploads/2021/10/AdmitKard.png" alt="logo" className="logo-image" /> */}
            {/* <h1 className="text-center leading-normal font-medium text-3xl mb-6">Welcome Back</h1>
            <p>Please sign in to your account</p> */}
            {
              showOtp ?
                <>
                  <div className="bg-emerald text-emerald-500 w-fit mx-auto p-4 rounded-full">

                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAMofHdRbJUPGD1a06vXLwbKsYz1duwEmykA&usqp=CAU" alt="verify-otp" className="ver" />
                    <BsFillShieldLockFill size={30} />
                  </div>
                  <h2>Please verify Mobile number</h2>
                  <p6 className="om">An otp is sent to +<span className="ome">{phone}</span></p6>
                  <p5 className="num">Change Phone Number</p5>
                  <label htmlFor="ph" className="font-bold text-2xl head">
                  </label>
                  <OtpInput OTPLength={6} otpType="number" disabled={false} autoFocus className="opt"
                    value={otp}
                    onChange={setOtp}
                  ></OtpInput>
                  <p6 className="pp">Didn't receive the code? <span className="res">Resend</span></p6>
                  <button onClick={onOTPVerify} className="btn w-30 flex gap-1 items-center justify-center rounded">
                    {
                      loading && <CgSpinner size={20} className="mt-1 animate-spin" />
                    }
                    Verify
                  </button>
                </> :
                <>
                <img src="https://www.hrkatha.com/wp-content/uploads/2021/10/AdmitKard.png" alt="logo" className="logo-image" />
                  <h1 className="text-center leading-normal font-medium text-3xl mb-6">Welcome Back</h1>
                  <p>Please sign in to your account</p>
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={30} />
                  </div>

                  <label htmlFor="otp" className="font-bold text-1xl head">
                    Enter Contact Number
                  </label>
                  <PhoneInput country={"in"} value={phone} onChange={setPhone} />
                  <p6 className="conta">we will send you a one time SMSmessage. <br /> Charges may apply.</p6>
                  <button className="btn w-30 flex gap-1 items-center justify-center rounded" onClick={onSignup}>
                    Sign In with Otp
                  </button>
                </>

            }

          </div>

      }


    </div>
  </section>
}

export default App