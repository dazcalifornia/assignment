import React, { useState } from "react";
import NavBar from "./Navbar";

const Layout = ({ loggedIn, children }: any) => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar loggedIn={loggedIn} />
      <main className="flex-1 p-4">{children}</main>
      <footer className="p-4 text-center">Your Footer Content</footer>
    </div>
  );
};

export default Layout;
