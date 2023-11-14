import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/home/home";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authslice";
import Profile from "./pages/profile/profile";
// import Loader from "./components/loader/loader";
// import { Spinner } from "./components/loader/loader";

const App = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  // get login status
  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
