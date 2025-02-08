import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import DeskLayout from "./components/layout/DeskLayout";
import { useIsMobile } from "./hook/useIsMobile";
import MobileLayout from "./components/layout/MobileLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Notification from "./pages/Notification";
import NotFound from "./pages/NotFound";
import ProfileLayout from "./components/layout/ProfileLayout";
import ProfilePost from "./pages/ProfilePost";
import ProfileFriend from "./pages/ProfileFriend";
import ProfileSave from "./pages/ProfileSave";
import MobileMessageLayout from "./components/layout/MobileMessageLayout";
import DeskMessageLayout from "./components/layout/DeskMessageLayout";
import Post from "./pages/Post";
import Conversation from "./pages/Conversation";
import Messages from "./pages/Messages";
import { Login } from "./pages/Authentication/Login";
import { Signup } from "./pages/Authentication/Signup";
import { VerifyEmail } from "./pages/Authentication/VerifyEmail";

function App() {
  const isMobile = useIsMobile();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isMobile ? <MobileLayout /> : <DeskLayout />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="notification" element={<Notification />} />
          <Route path="search" element={<Search />} />

          <Route path="profile/:id" element={<ProfileLayout />}>
            <Route index element={<ProfilePost />} />
            <Route path="friend-list" element={<ProfileFriend />} />
            <Route path="saved" element={<ProfileSave />} />
          </Route>
        </Route>

        <Route
          path="/messages"
          element={isMobile ? <MobileMessageLayout /> : <DeskMessageLayout />}
        >
          <Route index element={<Messages />} />
          <Route path=":id" element={<Conversation />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/email-verification" element={<VerifyEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
