import React from "react";
import { Outlet } from "react-router";

const ProfileLayout = () => {
  return (
    <div>
      <h1>ProfileLayout</h1>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
