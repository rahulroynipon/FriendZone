import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import DeskLayout from "./components/layout/DeskLayout";
import { useIsMobile } from "./hook/useIsMobile";
import MobileLayout from "./components/layout/MobileLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
  const isMobile = useIsMobile();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isMobile ? <MobileLayout /> : <DeskLayout />}>
          <Route index element={<Home />} />
          <Route path="notification" element={<Notification />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
