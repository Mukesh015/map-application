"use client";
import React, { useCallback, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const toggleLoading = () => {
    setLoading(!loading);
  };
  const toggleGoogleLoading = () => {
    setGoogleLoading(!googleLoading);
  };

  const handleLogin = useCallback(
    async (provider) => {
      try {
        if (provider === "google") {
          toggleGoogleLoading();
          const res = await signInWithGoogle();
          setGoogleLoading(false);
          console.log(res);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else if (provider === "email") {
          toggleLoading();
          const res = await signInWithEmailAndPassword(email, password);
          setLoading(false);
          console.log(res);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      } catch (error) {
        setLoading(false);
        console.error("Internal server error", error);
      }
    },
    [
      email,
      password,
      loading,
      signInWithGoogle,
      signInWithEmailAndPassword,
      toggleLoading,
    ]
  );

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
                    <h1 className="text-2xl font-semibold text-black">Login</h1>
                    <h2 className="text-gray-500 mt-2 text-sm flex">
                      Don't have an account?
                      <p className="text-blue-500 hover:text-blue-900 font-semibold cursor-pointer">
                        {" "}
                        <Link href={"/signup"}> Create Account</Link>
                      </p>
                    </h2>
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
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
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
                        <button
                          onClick={() => handleLogin("email")}
                          className="flex ml-20 active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-green-800 text-white font-semibold rounded-2xl px-6 py-1 mt-10"
                        >
                          {loading && (
                            <CgSpinner
                              className="mt-1 mr-2 animate-spin"
                              size={20}
                            />
                          )}
                          <span>Login</span>
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
                    onClick={() => handleLogin("google")}
                    type="button"
                    className="text-white w-full active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70  bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 me-2 mb-2"
                  >
                    <svg
                      className="mr-10"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="24px"
                      height="24px"
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
                    Sign in with Google
                    {googleLoading && (
                      <CgSpinner className="animate-spin ml-3" size={20} />
                    )}
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
