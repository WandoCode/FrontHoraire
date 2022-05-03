import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

function Layout(props) {
  return (
    <div className="Layout">
      LAYOUT
      <Outlet />
    </div>
  );
}

export default Layout;