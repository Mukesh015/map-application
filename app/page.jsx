"use client";
import NextTopLoader from "nextjs-toploader";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { auth } from "@/firebase/config";
import {
  useAuthState,
  useSignOut,
  useUpdateProfile,
  useUpdatePassword,
} from "react-firebase-hooks/auth";
import { reload } from "firebase/auth";

export default function Home() {
  // React components
  const [userName, setuserName] = useState(null);
  const [avatar, setavatar] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [toggleMenuSVG, setToggleMenuSVG] = useState(false);
  const [toggleAccountMenu, setToggleAccountMenu] = useState(false);
  const [openUsernamePopup, setOpenUsernamePopup] = useState(false);
  const [openAvatarPopup, setOpenAvatarPopup] = useState(false);
  const [openPasswordPopup, setOpenPasswordPopup] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [toggleSettings, setToggleSettings] = useState(false);

  // Firebase authentications
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const [updatePassword] = useUpdatePassword(auth);

  // Update Profile
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [Password, setPassword] = useState("");

  // Firebase Updatations
  const handleUpdateAvatar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await updateProfile({ photoURL });
      setLoading(false);
      window.navigator, reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [photoURL]);

  const handleUpdateUsername = useCallback(async () => {
    setLoading(true);
    try {
      const res = await updateProfile({ displayName });
      console.log(res);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log("Firebase error", error);
    }
  }, [displayName]);

  const handleUpdatePassword = useCallback(async () => {
    setLoading(true);
    console.log(Password);
    try {
      const res = await updatePassword(Password);
      setLoading(false);
      console.log(res);
    } catch (error) {
      setLoading(false);
      console.log("Firebase error", error);
    }
  }, [Password]);

  const handleLogout = useCallback(async () => {
    const res = await signOut();
    console.log(res);
    window.location.reload();
  }, []);

  // Handle popups
  const handleFlipMenuButton = () => {
    setToggleMenuSVG(!toggleMenuSVG);
  };
  const handleOpenUsernamePopup = () => {
    setOpenUsernamePopup(!openUsernamePopup);
  };
  const handleOpenAvatarPopup = () => {
    setOpenAvatarPopup(!openAvatarPopup);
  };
  const handleFlipAccountMenuButton = () => {
    setToggleAccountMenu(!toggleAccountMenu);
  };
  const handleOpenPasswordPopup = () => {
    setOpenPasswordPopup(!openPasswordPopup);
  };
  const toggleDatkMode = () => {
    setDarkTheme(!darkTheme);
  };
  const handleToggleSettings = () => {
    setToggleSettings(!toggleSettings);
  };
  const handleToggleSpinner = () => {
    setShowSpinner(!showSpinner);
  };

  useEffect(() => {
    window.initMap1 = () => {
      console.log("Initializing map...");
      handleToggleSpinner();
      // Check if the map object exists and is a function
      if (typeof mappls !== "undefined" && typeof mappls.Map === "function") {
        const map = new mappls.Map("map", {
          center: [28.61, 77.23],
          geolocation: true,
          zoomControl: true,
        });
      } else {
        console.error(
          "Map constructor is not available. Mappls library may not have been loaded correctly."
        );
      }
    };

    const script = document.createElement("script");
    script.src = `https://apis.mappls.com/advancedmaps/api/${process.env.NEXT_PUBLIC_MAP_KEY}/map_sdk?layer=vector&v=3.0&callback=initMap1`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("Map SDK script loaded successfully.");
      handleToggleSpinner();
    };
    script.onerror = (error) =>
      console.error("Error loading Map SDK script:", error);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.initMap1;
      // Clean up the global function
    };
  }, []);

  useEffect(() => {
    if (user) {
      setuserName(user.displayName);
      setavatar(user.photoURL);
    } else {
      console.log("NOT Available");
    }
  }, [user]);


  return (
    <div style={{ position: "relative" }}>
      <div
        id="map"
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>
      <NextTopLoader />
      <>
        <div
          className="flex"
          style={{ position: "absolute", top: "20px", left: "20px" }}
        >
          <label
            className="relative bg-white min-w-sm max-w-3xl flex flex-col md:flex-row items-center justify-center border px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300 h-12"
            htmlFor="search-bar"
          >
            {!toggleMenuSVG ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 0 24 24"
                width="48px"
                fill="#000000"
                className="cursor-pointer"
                onClick={handleFlipMenuButton}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            ) : (
              <svg
                onClick={handleFlipMenuButton}
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 0 24 24"
                width="48px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            )}

            <input
              id="search-bar"
              placeholder="Search places here..."
              className="px-6  rounded-md flex-1 outline-none bg-white text-black"
            />
            <button className="w-full md:w-auto px-6 py-2  bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
              <div className="relative">
                {/* Loading animation change opacity to display */}
                <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                  <svg
                    className="opacity-0 animate-spin w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <div className="flex items-center transition-all opacity-1 valid-">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#FFFFFF"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                  </span>
                </div>
              </div>
            </button>
          </label>
          <div className="leading-1.5 flex ml-5 m-1 flex-col">
            <div className="font-semibold shadow-2xl border border-slate-300 bg-gray-50 cursor-pointer text-slate-600 rounded-xl p-2">
              <button className="  flex active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70">
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7z" />
                </svg>
                restaurant
              </button>
            </div>
          </div>
          <div className="leading-1.5 flex m-1 flex-col">
            <div className="font-semibold bg-gray-50 cursor-pointer text-slate-600 rounded-xl p-2">
              <button className="me-2 flex border-slate-300 active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70">
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <g>
                    <rect
                      fill="none"
                      fillRule="evenodd"
                      height="24"
                      width="24"
                      x="0"
                      y="0"
                    />
                    <path d="M4.17,11L4.17,11C4.12,11,4.06,11,4,11H4.17 M13.41,5H9v2h3.59l2,2H11l-4,2L5,9H0v2h4c-2.21,0-4,1.79-4,4 c0,2.21,1.79,4,4,4c2.21,0,4-1.79,4-4l2,2h3l3.49-6.1l1.01,1.01C16.59,12.64,16,13.75,16,15c0,2.21,1.79,4,4,4c2.21,0,4-1.79,4-4 c0-2.21-1.79-4-4-4c-0.18,0-0.36,0.03-0.53,0.05L17.41,9H20V6l-3.72,1.86L13.41,5L13.41,5z M20,17c-1.1,0-2-0.9-2-2 c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C22,16.1,21.1,17,20,17L20,17z M4,17c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2 C6,16.1,5.1,17,4,17L4,17z" />
                  </g>
                </svg>
                Petrol pump
              </button>
            </div>
          </div>
          <div className="leading-1.5 flex m-1 flex-col">
            <div className="font-semibold bg-gray-50 cursor-pointer text-slate-600 rounded-xl p-2">
              <button className="me-2 flex border-slate-300 active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70">
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <rect fill="none" height="24" width="24" />
                  <path d="m11 8.89.94 3.11h2.82l-2.27 1.62.93 3.01L11 14.79l-2.42 1.84.93-3.01L7.24 12h2.82L11 8.89zM8.58 10H1l6.17 4.41L4.83 22 11 17.31 17.18 22l-2.35-7.59L21 10h-7.58L11 2l-2.42 8zm12.78 12-1.86-6.01L23.68 13h-3.44l-3.08 2.2 1.46 4.72L21.36 22zM17 8l-1.82-6-1.04 3.45.77 2.55H17z" />
                </svg>
                Hotel
              </button>
            </div>
          </div>
          <div className="leading-1.5 flex m-1 flex-col">
            <div className="font-semibold bg-gray-50 cursor-pointer text-slate-600 rounded-xl p-2">
              <button className="me-2 flex border-slate-300 active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70">
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" />
                </svg>
                Shopping mall
              </button>
            </div>
          </div>
          <div className="leading-1.5 flex m-1 flex-col">
            <div className="font-semibold bg-gray-50 cursor-pointer text-slate-600 rounded-xl p-2">
              <button className="me-2 flex border-slate-300 active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <g>
                    <rect fill="none" height="24" width="24" />
                    <path d="M21,4h-8h-1H7V2H5v2v10v8h2v-8h4h1h9l-2-5L21,4z M17.14,9.74l0.9,2.26H12h-1H7V6h5h1h5.05l-0.9,2.26L16.85,9L17.14,9.74z M14,9c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S14,7.9,14,9z" />
                  </g>
                </svg>
                Spots
              </button>
            </div>
          </div>
          <div className="leading-1.5 flex m-1 flex-col">
            <div className="font-semibold bg-gray-50 cursor-pointer text-slate-600 rounded-xl p-2">
              <button className="me-2 flex border-slate-300 active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70">
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z" />
                </svg>
                ATM
              </button>
            </div>
          </div>
          <div className="leading-1.5 flex m-1 flex-col">
            <div className="font-semibold bg-gray-50 cursor-pointer text-slate-600 rounded-xl p-2">
              <button className="me-2 flex border-slate-300 active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                  className="mr-1"
                >
                  <g>
                    <rect fill="none" height="24" width="24" />
                  </g>
                  <g>
                    <g>
                      <path d="M20,6h-4V4c0-1.1-0.9-2-2-2h-4C8.9,2,8,2.9,8,4v2H4C2.9,6,2,6.9,2,8v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8 C22,6.9,21.1,6,20,6z M10,4h4v2h-4V4z M20,20H4V8h16V20z" />
                      <polygon points="13,10 11,10 11,13 8,13 8,15 11,15 11,18 13,18 13,15 16,15 16,13 13,13" />
                    </g>
                  </g>
                </svg>
                Medical shop
              </button>
            </div>
          </div>
        </div>
        {/* Navigation Toggle */}
        <button
          type="button"
          className="text-gray-500 hover:text-gray-600"
          data-hs-overlay="#docs-sidebar"
          aria-controls="docs-sidebar"
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            className="flex-shrink-0 size-4"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        {/* End Navigation Toggle */}

        {toggleMenuSVG && (
          <div
            id="docs-sidebar"
            className="transition-opacity ease-in duration-700 hs-overlay cursor-pointer [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full  fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-3 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
          >
            <div className="px-6 flex">
              <a
                className="flex-none text-xl font-semibold text-black"
                href="#"
                aria-label="Brand"
              >
                Mappics
              </a>
              <svg
                onClick={handleFlipMenuButton}
                className="cursor-pointer ml-24 "
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </div>
            <div className="mt-5 items-center justify-center text-center">
              {avatar ? (
                <img className="h-20 w-20 ml-20 rounded-full" src={avatar} />
              ) : (
                <img
                  className="h-20 w-20 ml-20 rounded-full"
                  src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                />
              )}

              {userName ? (
                <p className="text-gray-500 font-semibold mt-2">{userName}</p>
              ) : (
                <Link href={"/login"}>
                  {" "}
                  <button className="flex ml-20  active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-green-800 text-white font-semibold rounded-2xl px-5 py-1 mt-3">
                    <span>Login</span>
                  </button>
                </Link>
              )}
            </div>

            <p className="border border-slate-300 ml-5 mr-5 mt-2"></p>

            <nav
              className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="space-y-1.5">
                <li className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                  <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                    </svg>
                    Dashboard
                  </a>
                </li>

                <li
                  className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                  id="users-accordion"
                >
                  <button
                    type="button"
                    className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <g>
                        <rect fill="none" height="24" width="24" />
                        <path d="M21,4h-8h-1H7V2H5v2v10v8h2v-8h4h1h9l-2-5L21,4z M17.14,9.74l0.9,2.26H12h-1H7V6h5h1h5.05l-0.9,2.26L16.85,9L17.14,9.74z M14,9c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S14,7.9,14,9z" />
                      </g>
                    </svg>
                    Take a tour
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                </li>

                <li
                  className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                  id="projects-accordion"
                >
                  <button
                    type="button"
                    className=" hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <g>
                        <rect fill="none" height="24" width="24" />
                      </g>
                      <g>
                        <path d="M12,4c1.93,0,3.68,0.78,4.95,2.05l-1.41,1.41C14.63,6.56,13.38,6,12,6S9.37,6.56,8.46,7.46L7.05,6.05 C8.32,4.78,10.07,4,12,4z M19.78,3.23l-1.41,1.41C16.74,3.01,14.49,2,12.01,2S7.27,3.01,5.64,4.63L4.22,3.22 C6.22,1.23,8.97,0,12.01,0S17.79,1.23,19.78,3.23z M12,11c1.94,0,4,1.45,4,4.15c0,0.94-0.55,2.93-4,6.17c-3.45-3.24-4-5.23-4-6.17 C8,12.45,10.06,11,12,11z M12,9c-3.15,0-6,2.41-6,6.15c0,2.49,2,5.44,6,8.85c4-3.41,6-6.36,6-8.85C18,11.41,15.15,9,12,9z M13.5,15 c0-0.83-0.67-1.5-1.5-1.5c-0.83,0-1.5,0.67-1.5,1.5c0,0.83,0.67,1.5,1.5,1.5C12.83,16.5,13.5,15.83,13.5,15z" />
                      </g>
                    </svg>
                    Share locations
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                </li>

                <li className="hs-accordion" id="account-accordion">
                  <button
                    onClick={handleFlipAccountMenuButton}
                    type="button"
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <g>
                        <path d="M0,0h24v24H0V0z" fill="none" />
                      </g>
                      <g>
                        <g>
                          <path d="M4,18v-0.65c0-0.34,0.16-0.66,0.41-0.81C6.1,15.53,8.03,15,10,15c0.03,0,0.05,0,0.08,0.01c0.1-0.7,0.3-1.37,0.59-1.98 C10.45,13.01,10.23,13,10,13c-2.42,0-4.68,0.67-6.61,1.82C2.51,15.34,2,16.32,2,17.35V20h9.26c-0.42-0.6-0.75-1.28-0.97-2H4z" />
                          <path d="M10,12c2.21,0,4-1.79,4-4s-1.79-4-4-4C7.79,4,6,5.79,6,8S7.79,12,10,12z M10,6c1.1,0,2,0.9,2,2s-0.9,2-2,2 c-1.1,0-2-0.9-2-2S8.9,6,10,6z" />
                          <path d="M20.75,16c0-0.22-0.03-0.42-0.06-0.63l1.14-1.01l-1-1.73l-1.45,0.49c-0.32-0.27-0.68-0.48-1.08-0.63L18,11h-2l-0.3,1.49 c-0.4,0.15-0.76,0.36-1.08,0.63l-1.45-0.49l-1,1.73l1.14,1.01c-0.03,0.21-0.06,0.41-0.06,0.63s0.03,0.42,0.06,0.63l-1.14,1.01 l1,1.73l1.45-0.49c0.32,0.27,0.68,0.48,1.08,0.63L16,21h2l0.3-1.49c0.4-0.15,0.76-0.36,1.08-0.63l1.45,0.49l1-1.73l-1.14-1.01 C20.72,16.42,20.75,16.22,20.75,16z M17,18c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,18,17,18z" />
                        </g>
                      </g>
                    </svg>
                    Account
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {toggleAccountMenu && (
                    <div
                      id="account-accordion"
                      className="hs-accordion-content w-full overflow-hidden transition-[height] ease-linear duration-700"
                    >
                      <ul className="pt-2 ps-2">
                        <li onClick={handleOpenAvatarPopup}>
                          <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="#000000"
                            >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M14.12 4l1.83 2H20v12H4V6h4.05l1.83-2h4.24M15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm-3 7c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                            </svg>
                            Change Avatar
                          </a>
                        </li>
                        <li onClick={() => handleOpenUsernamePopup()}>
                          <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="#000000"
                            >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            Change Username
                          </a>
                        </li>
                        <li onClick={handleOpenPasswordPopup}>
                          <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              enableBackground="new 0 0 24 24"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="#000000"
                            >
                              <g>
                                <path d="M0,0h24v24H0V0z" fill="none" />
                              </g>
                              <g>
                                <g>
                                  <path d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z" />
                                </g>
                              </g>
                            </svg>
                            Change Password
                          </a>
                        </li>
                        <li onClick={() => handleLogout()}>
                          <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              enableBackground="new 0 0 24 24"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="#000000"
                            >
                              <g>
                                <path d="M0,0h24v24H0V0z" fill="none" />
                              </g>
                              <g>
                                <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" />
                              </g>
                            </svg>
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li className="border border-slate-300 m-3"></li>
              </ul>
              <ul className="space-y-1.5">
                <li
                  className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                  id="users-accordion"
                >
                  <button
                    type="button"
                    className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
                    </svg>
                    Add a place
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                </li>
                <li
                  className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                  id="users-accordion"
                >
                  <button
                    type="button"
                    className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <g>
                        <path d="M0,0h24v24H0V0z" fill="none" />
                      </g>
                      <g>
                        <path d="M15,5l-1.41,1.41L15,7.83L17.17,10H8c-2.76,0-5,2.24-5,5v4h2v-4c0-1.65,1.35-3,3-3h9.17L15,14.17l-1.41,1.41L15,17l6-6 L15,5z" />
                      </g>
                    </svg>
                    Get directions
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                </li>

                <li
                  className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                  id="projects-accordion"
                >
                  <button
                    type="button"
                    className=" hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z" />
                    </svg>
                    History
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                </li>

                <li
                  onClick={handleToggleSettings}
                  className="hs-accordion"
                  id="account-accordion"
                >
                  <button
                    type="button"
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                    </svg>
                    Settings
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </li>
                {toggleSettings && (
                  <div
                    id="account-accordion"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] ease-linear duration-700"
                  >
                    <ul className="pt-2 ps-2">
                      <li
                        onClick={toggleDatkMode}
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 items-center gap-x-3.5  text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                      >
                        <a className="flex py-2 px-2.5">
                          {darkTheme ? (
                            <svg
                              className="mr-3"
                              xmlns="http://www.w3.org/2000/svg"
                              enable-background="new 0 0 24 24"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="#000000"
                            >
                              <rect fill="none" height="24" width="24" />
                              <path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
                            </svg>
                          ) : (
                            <svg
                              className="mr-3"
                              xmlns="http://www.w3.org/2000/svg"
                              enable-background="new 0 0 24 24"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="#000000"
                            >
                              <rect fill="none" height="24" width="24" />
                              <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
                            </svg>
                          )}
                          Toggle theme
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                <li className="border border-slate-300 m-3"></li>
              </ul>
              <ul className="mt-4">
                <li
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hs-accordion"
                  id="projects-accordion"
                >
                  <button
                    type="button"
                    className=" hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9-4h2v2h-2zm0-6h2v4h-2z" />
                    </svg>
                    Send feedback
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                </li>
                <li
                  className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                  id="projects-accordion"
                >
                  <button
                    type="button"
                    className=" hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 0h16v2H4zm0 22h16v2H4zm8-10c1.38 0 2.5-1.12 2.5-2.5S13.38 7 12 7 9.5 8.12 9.5 9.5 10.62 12 12 12zm0-3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 7.49C17 13.9 13.69 13 12 13s-5 .9-5 2.99V17h10v-1.01zm-8.19-.49c.61-.52 2.03-1 3.19-1 1.17 0 2.59.48 3.2 1H8.81z" />
                    </svg>
                    Contact us
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                </li>
                <li
                  className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                  id="projects-accordion"
                >
                  <button
                    type="button"
                    className=" hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    About
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {openUsernamePopup && (
          <div className="fixed inset-0 p-4  flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-md rounded-md p-6 bg-gray-300 shadow-2xl relative">
              <svg
                onClick={handleOpenUsernamePopup}
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
              <div className="my-8 text-center items-center">
                <img
                  className="h-24 ml-36"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/OOjs_UI_icon_alert_destructive.svg/480px-OOjs_UI_icon_alert_destructive.svg.png"
                  alt=""
                />
                <h4 className="text-xl font-semibold mt-6 text-slate-600">
                  Are you sure to update your username?
                </h4>
                <p className="text-slate-500 text-sm mt-3">
                  This operation have to perform full page reload
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <input
                  onChange={(e) => setDisplayName(e.target.value)}
                  id="search-bar"
                  placeholder="Enter a name here..."
                  className="px-6 py-2  rounded-md flex-1 outline-none bg-white text-black"
                />
                <button
                  onClick={() => handleUpdateUsername()}
                  type="button"
                  className="flex px-6 pl-40 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500"
                >
                  Update
                  {loading && (
                    <CgSpinner className="animate-spin ml-3" size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {openAvatarPopup && (
          <div className="fixed inset-0 p-4  flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-md rounded-md p-6 bg-gray-300 shadow-2xl relative">
              <svg
                onClick={handleOpenAvatarPopup}
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
              <div className="my-8 text-center items-center">
                <img
                  className="h-24 ml-36"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/OOjs_UI_icon_alert_destructive.svg/480px-OOjs_UI_icon_alert_destructive.svg.png"
                  alt=""
                />
                <h4 className="text-xl font-semibold mt-6 text-slate-600">
                  Are you sure to update your avatar?
                </h4>
                <p className="text-slate-500 text-sm mt-3">
                  This operation have to perform full page reload
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <input
                  onChange={(e) => setPhotoURL(e.target.value)}
                  id="search-bar"
                  placeholder="Enter a url or upload a pic..."
                  className="px-6 py-2  rounded-md flex-1 outline-none bg-white text-black"
                />
                <button
                  onClick={() => handleUpdateAvatar()}
                  type="button"
                  className="flex px-6 pl-40 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500"
                >
                  Update
                  {loading && (
                    <CgSpinner className="animate-spin ml-3" size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {openPasswordPopup && (
          <div className="fixed inset-0 p-4  flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-md rounded-md p-6 bg-gray-300 shadow-2xl relative">
              <svg
                onClick={handleOpenPasswordPopup}
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
              <div className="my-8 text-center items-center">
                <img
                  className="h-24 ml-36"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/OOjs_UI_icon_alert_destructive.svg/480px-OOjs_UI_icon_alert_destructive.svg.png"
                  alt=""
                />
                <h4 className="text-xl font-semibold mt-6 text-slate-600">
                  Are you sure to update your password?
                </h4>
                <p className="text-slate-500 text-sm mt-3">
                  Please remember your password
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="search-bar"
                  placeholder="Enter a new password"
                  className="px-6 py-2  rounded-md flex-1 outline-none bg-white text-black"
                />
                <button
                  onClick={() => handleUpdatePassword()}
                  type="button"
                  className="flex px-6 pl-40 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500"
                >
                  Update
                  {loading && (
                    <CgSpinner className="animate-spin ml-3" size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
      {showSpinner && (
        <div className="flex space-x-2 justify-center items-center mt-80 dark:invert ">
          <div className="h-8 w-8 bg-red-500 rounded-full animate-bounce"></div>
          <div className="h-8 w-8 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        </div>
      )}
    </div>
  );
}
