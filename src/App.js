import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./authentication/Login/Login";
import SignUp from "./authentication/Register/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Dashboard/forAdmin/Users/Users";
import Home from "./pages/home/Home";
import Address from "./pages/Profile/Address/Address";
import Education from "./pages/Profile/Education/Education";
import MyProfile from "./pages/Profile/MyProfile/MyProfile";
import Profile from "./pages/Profile/Profile";
import Footer from "./shared/Footer/Footer";
import Navbar from "./shared/Header/Nabvar";
import NotFound from "./shared/NotFound/NotFound";

function App() {
  return (
    <div className="App bg-[#1B2640]">
      <Navbar />
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/profile"
          element={
            // <RequireAuth>
            <Profile />
            // </RequireAuth>
          }
        >
          <Route index element={<MyProfile />}></Route>
          <Route path="address" element={<Address />}></Route>
          <Route path="education" element={<Education />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route
          path="/dashboard"
          element={
            // <RequireAuth>
            <Dashboard />
            // </RequireAuth>
          }
        >
          <Route
            path="users"
            element={
              // <RequireAdmin>
              <Users />
              // </RequireAdmin>
            }
          ></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
