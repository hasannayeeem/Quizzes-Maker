import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./authentication/auth/RequireAuth";
import RequireAdmin from "./authentication/auth/RequireAdmin";
import Login from "./authentication/Login/Login";
import SignUp from "./authentication/Register/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddQuiz from "./pages/Dashboard/forAdmin/AddQuiz/AddQuiz";
import DashboardHome from "./pages/Dashboard/forAdmin/DashboardHome/DashboardHome";
import ManageQuizzes from "./pages/Dashboard/forAdmin/ManageQuizzes/ManageQuizzes";
import QuizDetails from "./pages/Dashboard/forAdmin/ManageQuizzes/QuizDetails";
import Payments from "./pages/Dashboard/forAdmin/Payments/Payments";
import UserDetails from "./pages/Dashboard/forAdmin/Users/UserDetails";
import Users from "./pages/Dashboard/forAdmin/Users/Users";
import Home from "./pages/home/Home";
import Payment from "./pages/home/Payment/Payment";
import Quizzes from "./pages/home/Quizzzes/Quizzes";
import Address from "./pages/Profile/Address/Address";
import Education from "./pages/Profile/Education/Education";
import MyProfile from "./pages/Profile/MyProfile/MyProfile";
import Profile from "./pages/Profile/Profile";
import TakeQuiz from "./pages/takeQuiz/TakeQuiz";
import Footer from "./shared/Footer/Footer";
import Navbar from "./shared/Header/Nabvar";
import NotFound from "./shared/NotFound/NotFound";
import MyPayments from "./pages/Dashboard/forUser/Payments/MyPayments";
import AddReview from "./pages/Dashboard/forUser/AddReview/AddReview";

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
            <RequireAuth>
            <Profile />
            </RequireAuth>
          }
        >
          <Route index element={<MyProfile />}></Route>
          <Route path="address" element={<Address />}></Route>
          <Route path="education" element={<Education />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/quizzes" element={<RequireAuth><Quizzes /></RequireAuth>}></Route>
        <Route
            path="/user/:userId"
            element={
              <RequireAdmin>
              <UserDetails />
              </RequireAdmin>
            }
          ></Route>
        <Route path="/startQuiz/:quizId" element={<RequireAuth><TakeQuiz /></RequireAuth>}></Route>
        <Route path="/payment" element={<RequireAuth><Payment /></RequireAuth>}></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
            <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardHome />}></Route>
          <Route
            path="users"
            element={
              <RequireAdmin>
              <Users />
              </RequireAdmin>
            }
          ></Route>
         
          <Route
            path="addQuiz"
            element={
              <RequireAdmin>
              <AddQuiz />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="manageQuizzes"
            element={
              <RequireAdmin>
              <ManageQuizzes />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="quizDetails/:quizId"
            element={
              <RequireAdmin>
              <QuizDetails />
             </RequireAdmin>
            }
          ></Route>
          <Route
            path="paymentLists"
            element={
              <RequireAdmin>
              <Payments />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="addReview"
            element={
              <RequireAuth>
              <AddReview />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="myPayments"
            element={
              <RequireAuth>
              <MyPayments />
              </RequireAuth>
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
