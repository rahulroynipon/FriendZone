import React from "react";
import logo from "../../assets/logo.svg";

const AppLoading = () => {
  return (
    <section className="min-h-screen bg-gray-900 px-6 font-poppins flex flex-col items-center justify-center space-y-6">
      {/* Logo */}
      <div className="flex items-center justify-center relative -top-24">
        <img className="h-10 md:h-16 object-cover" src={logo} alt="logo" />
      </div>

      {/* Loading Spinner */}
      <div className="flex items-center relative top-5">
        <span class="loading loading-lg loading-spinner text-[#3B82F6]"></span>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center absolute bottom-12 ">
        <span className="text-2xl font-semibold text-gray-400">FriendZone</span>
        <span className="text-xs text-gray-500 mt-1">
          &copy;{new Date().getFullYear()} All rights reserved by FriendZone
        </span>
        <span className="text-xs text-gray-500">
          Created by Rahul Roy Nipon
        </span>
      </div>
    </section>
  );
};

export default AppLoading;
