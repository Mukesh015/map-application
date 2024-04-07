"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

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
                    <h1 className="text-2xl font-semibold text-black">Login</h1>
                    <h2 className="text-gray-500 mt-2 text-sm flex">
                      Don't have an account?
                      <p className="text-blue-500 hover:text-blue-900 font-semibold cursor-pointer">
                        {" "}
                        <Link href={"/signup"}>Create Account</Link>
                      </p>
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input
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
                        <input
                          autoComplete="off"
                          id="password"
                          name="password"
                          type="password"
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                          placeholder="Password"
                        />
                        <label
                          htmlFor="password"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Password
                        </label>
                      </div>
                      <div className="flex">
                        <p className="cursor-pointer text-sm mr-16 hover:text-blue-900 font-semibold text-blue-500">
                          <Link href={"/forgotpassword"}>Forgot password</Link>
                        </p>
                        <p className="cursor-pointer hover:text-blue-900 text-sm font-semibold text-blue-500">
                          <Link href={"/otplogin"}>Login via otp</Link>
                        </p>
                      </div>
                      <div className="relative">
                        <button className="active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-green-800 text-white font-semibold rounded-2xl px-6 py-1 mt-2">
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-10 text-slate-500 flex flex-row items-center">
                  <div className="flex-grow border-gray-300 border"></div>
                  <div className="ml-10 mr-10 text-slate-400">or</div>
                  <div className="flex-grow border-gray-300 border"></div>
                </div>
                <div className="w-full flex">
                  <button
                    onClick={() => signInWithGoogle()}
                    className="mr-14 active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="48px"
                      height="48px"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                  </button>
                  <button className="mr-16 active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      width="48px"
                      height="48px"
                    >
                      <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z" />
                    </svg>
                  </button>
                  <button className="active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="48px"
                      height="48px"
                    >
                      <path
                        fill="#039be5"
                        d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                      />
                      <path
                        fill="#fff"
                        d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
