"use client";
import React, { useCallback, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import NextTopLoader from "nextjs-toploader";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  const actionCodeSettings = {
    url: "http://localhost:3000/login",
  };

  const handleresetpassword = useCallback(async () => {
    setLoading(true);
    const success = await sendPasswordResetEmail(email, actionCodeSettings);
    setLoading(false);
    console.log(success);
  }, [email, actionCodeSettings, loading]);

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
                      Verify your email
                    </h1>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          autoComplete="off"
                          id="email"
                          name="email"
                          type="text"
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                          placeholder="Email address"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Email Address
                        </label>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => handleresetpassword()}
                          className="flex active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-green-800 text-white font-semibold rounded-2xl px-6 py-1 mt-2"
                        >
                          {loading && (
                            <CgSpinner
                              className="mt-1 mr-2 animate-spin"
                              size={20}
                            />
                          )}
                          Send link
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
