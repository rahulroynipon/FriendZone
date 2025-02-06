import React from "react";
import { Outlet } from "react-router";

const MobileMessageLayout = () => {
  return (
    <div>
      <h1>MobileMessageLayout</h1>
      <Outlet />
    </div>
  );
};

export default MobileMessageLayout;
