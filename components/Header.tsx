"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { showErrorToast } from "./Toast";

const Header = () => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  function toggleSidebar() {
    setShowSidebar((prevState) => {
      return !prevState;
    });
  }

  async function handleLogout() {
    const logoutResponse = await fetch('http://localhost:8080/user/logout', {
      credentials: "include"
    });
    if (logoutResponse.status === 200) {
      router.replace('/');
    } else {
      showErrorToast('Error logging you out!');
    }
  }

  return (
    <header className=" bg-[rgb(17,24,39)]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            onClick={toggleSidebar}
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 text-white">
          <Link href="#" className="text-sm font-semibold leading-6 ">
            About
          </Link>
          <Link href="#" className="text-sm font-semibold leading-6 ">
            Marketplace
          </Link>
          <Link href="#" className="text-sm font-semibold leading-6 ">
            Company
          </Link>
        </div>
        {router.pathname === "/dashboard" ? <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        </div> : <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/auth/login" className="btn">
            Login
          </Link>
        </div>}
      </nav>
      {showSidebar && (
        <div
          className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[rgb(17,24,39)] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                onClick={toggleSidebar}
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-300"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <Link href="/auth/login" className="btn">
                    LOGIN
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
