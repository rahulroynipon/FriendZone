import React from "react";
import { Outlet } from "react-router";

const MobileLayout = () => {
  return (
    <div>
      <h1>MobileLayout</h1>
      <Outlet />
    </div>
  );
};

export default MobileLayout;
