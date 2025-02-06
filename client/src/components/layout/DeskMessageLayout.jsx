import React from "react";
import { Outlet } from "react-router";

const DeskMessageLayout = () => {
  return (
    <div>
      <h1>DeskMessageLayout</h1>
      <Outlet />
    </div>
  );
};

export default DeskMessageLayout;
