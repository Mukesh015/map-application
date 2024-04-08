"use client";
import React, { useCallback, useState, useRef } from "react";
import { auth } from "@/firebase/config";
import { CgSpinner } from "react-icons/cg";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const inputRefs = useRef([]);

  const handleSendOtp = useCallback(async () => {
    setLoading(true);
    let phone = "+" + phoneNumber;
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setShowOtp(false);
      setLoading(false);
      setUser(confirmation);
    } catch (err) {
      console.log(err);
    }
  }, [otp, phoneNumber, loading, setPhoneNumber, setUser, user]);

  const verifyOtp = useCallback(async () => {
    setLoading(true);
    try {
      user
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }, [user,loading]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newOtpDigits = otp.slice(0, index) + value + otp.slice(index + 1);
    setOtp(newOtpDigits);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      <div className="bg-white flex">
        <div className="max-h-full max-w-2xl shadow-2xl">
          <div className="p-5 ml-3 flex">
            <img
              className="h-10"
              src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/05/Mastercard_2019_logo.svg-e1659036851269.png?auto=format&q=60&fit=max&w=930"
              alt=""
            />
            <p className="text-black font-extrabold text-2xl ml-5 mt-1">
              MAPPICS SUITE
            </p>
          </div>
          <p className="text-slate-500 ml-10">
            Join and get access to Mappics Suite to enhance the productivity of
            your businesses
          </p>
          <div className="m-10">
            <div className="">
              <div className="flex">
                {" "}
                <img
                  className=""
                  src="https://outpost.mappls.com/api/sso/img/suitImg01.svg"
                  alt=""
                />
                <p className="text-black font-semibold ml-6 text-xl">
                  Mappics App
                </p>
              </div>
              <p className="text-slate-500 ml-14 text-sm">
                India's Super App for Maps, Navigation, Safety and more.
              </p>
            </div>
            <div className="mt-10">
              <div className="flex">
                <img
                  src="https://outpost.mappls.com/api/sso/img/suitImg02.svg"
                  alt=""
                />
                <p className="text-black font-semibold ml-3 text-xl">
                  Workmate
                </p>
              </div>
              <p className="text-slate-500 ml-14 text-sm">
                Workforce management automation with location intelligence.
              </p>
            </div>
            <div className="mt-10">
              <div className="flex">
                <img
                  src="https://outpost.mappls.com/api/sso/img/suitImg03.svg"
                  alt=""
                />
                <p className="text-black font-semibold ml-4 text-xl">
                  In Touch
                </p>
              </div>
              <p className="text-slate-500 ml-14 text-sm">
                Connect with your customers and get in touch with them.
              </p>
            </div>
            <div className="mt-10">
              <div className="flex">
                <img
                  src="https://outpost.mappls.com/api/sso/img/suitImg04.svg"
                  alt=""
                />
                <p className="text-black font-semibold ml-4 text-xl">mGIS</p>
              </div>
              <p className="text-slate-500 ml-14 text-sm">
                Bring the power of geospatial analytics, GIS and AI
              </p>
            </div>
            <div className="mt-10">
              <div className="flex">
                <img
                  src="https://outpost.mappls.com/api/sso/img/suitImg05.svg"
                  alt=""
                />
                <p className="text-black font-semibold ml-4 text-xl">Insight</p>
              </div>
              <p className="text-slate-500 ml-14 text-sm">
                Dynamic dashboards to turn your data into actionable insights
              </p>
            </div>
          </div>
          <div className="mt-24">
            <p className="text-slate-400 ml-10">
              © Copyright 2024. CE Info Systems Ltd. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="max-h-full" style={{ marginLeft: "250px" }}>
          <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <div>
                    <h1 className="text-2xl font-semibold text-black">
                      Verify your phone number
                    </h1>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4  text-black sm:text-lg sm:leading-7">
                      <PhoneInput
                        country={"in"}
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                      />
                      <div id="recaptcha"></div>

                      {showOtp && (
                        <div className="flex items-center justify-center gap-3">
                          {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div key={index}>
                              <input
                                onInput={(e) => handleInputChange(e, index - 1)}
                                id={`code-${index}`}
                                ref={(el) =>
                                  (inputRefs.current[index - 1] = el)
                                }
                                value={otp[index - 1] || ""}
                                type="number"
                                className="w-10 h-10 text-center text-sm font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                pattern="\d*"
                                maxLength="1"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {!showOtp ? (
                        <div className="relative">
                          <button
                            onClick={() => handleSendOtp()}
                            className="flex active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-green-800 text-white font-semibold rounded-2xl px-6 py-1 mt-2"
                          >
                            {loading && (
                              <CgSpinner
                                className="mt-1 mr-2 animate-spin"
                                size={20}
                              />
                            )}
                            Send otp
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={() => verifyOtp()}
                            className="flex active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-green-800 text-white font-semibold rounded-2xl px-6 py-1 mt-2"
                          >
                            {loading && (
                              <CgSpinner
                                className="mt-1 mr-2 animate-spin"
                                size={20}
                              />
                            )}
                            Verify otp
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
