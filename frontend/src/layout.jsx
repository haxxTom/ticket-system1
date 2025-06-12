import React from "react";
import Sidebar from "./sidebar";

function Layout({ children, selected, setSelected }) {
  return (
    <div className="flex w-screen h-screen fixed">
      <Sidebar selected={selected} onSelect={setSelected} />
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;
