"use client";
import React, { useCallback, useState } from "react";
import { auth } from "@/firebase/config";
import { CgSpinner } from "react-icons/cg";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import NextTopLoader from 'nextjs-toploader';
export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(!loading);
  };

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignup = useCallback(async () => {
    toggleLoading();
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      setLoading(false);
      console.log(res);
    } catch (error) {
      setLoading(false);
      console.error("Internal server error", error);
    }
  }, [email, password, userName, phone,loading]);

  return (
    <>
    <NextTopLoader />
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
                      Signup
                    </h1>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative z-0 w-full mb-5 group">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400 fixed mt-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <input
                          onChange={(e) => setUserName(e.target.value)}
                          value={userName}
                          type="text"
                          name="floating_name"
                          id="floating_name"
                          className="block py-2.5 px-7 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-500 font-semibold  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="floating_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-6"
                        >
                          Username
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <svg
                          className="w-4 h-4 fixed mt-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 16"
                        >
                          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                        <input
                          type="email"
                          name="floating_email"
                          id="floating_email"
                          className="block py-2.5 px-7 w-full text-sm font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                        <label
                          htmlFor="floating_email"
                          className="ml-6 peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email address
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="password"
                          name="floating_password"
                          id="floating_password"
                          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        <label
                          htmlFor="floating_password"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Password
                        </label>
                      </div>

                      <div className="relative">
                        <span className="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400">
                          <svg
                            className="w-4 h-4 rtl:rotate-[270deg]"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 19 18"
                          >
                            <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                          </svg>
                        </span>
                        <input
                          type="text"
                          id="floating-phone-number"
                          className="block py-2.5 ps-6 pe-0 w-full text-sm  font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          placeholder=""
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                        />
                        <label
                          htmlFor="floating-phone-number"
                          className="absolute text-sm text-gray-600  duration-300 dark:text-gray-400 transform -translate-y-6 scale-75 top-3  origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                          Phone number
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="link-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                        <label
                          htmlFor="link-checkbox"
                          className="ms-2 text-sm font-medium text-gray-500 "
                        >
                          I agree with the{" "}
                          <a
                            href="#"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            terms and conditions
                          </a>
                          .
                        </label>
                      </div>
                      <div className="relative justify-center ml-20">
                        <button
                          type="button"
                          onClick={handleSignup}
                          className="flex active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-green-800 text-white font-semibold rounded-2xl px-6 py-1 mt-2"
                        >
                          {loading && (
                            <CgSpinner
                              className="mt-1 mr-2 animate-spin"
                              size={20}
                            />
                          )}
                          Signup
                        </button>
                      </div>
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
