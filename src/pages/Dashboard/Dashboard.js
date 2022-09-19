import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
// import { DarkModeContext } from "../../../App";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdDashboardCustomize, MdOutlinePayment, MdQuiz, MdRateReview, MdVerifiedUser, RiUserSettingsFill } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../../shared/Loading/Loading";
import useRole from "../../hooks/useRole";
import { GoSettings } from "react-icons/go";

const Dashboard = () => {
//   const [darkMode] = useContext(DarkModeContext);
  let [user, loading] = useAuthState(auth);
  let [role, roleLoading] = useRole(user);

  if (loading || roleLoading) {
    return <Loading />;
  }

  return (
    <div
      style={{ fontFamily: "'Rajdhani', sans-serif" }}
      className="lg:mt-[80px] md:mt-[80px] mt-[80px]"
    >
      <div className="drawer drawer-mobile mt-[64px]">
        <input
          id="dashboard-drower"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <h3 className="text-2xl text-center sm:px-10 pb-3 pt-5 text-purple-500 font-bold">
            Dashboard
          </h3>
          {/* <!-- Page content here --> */}

          <Outlet />
        </div>
        <div className="drawer-side sm:z-0">
          <label htmlFor="dashboard-drower" className="drawer-overlay "></label>

          <ul
            className={`${
              1<0
                ? " bg-white text-base-content"
                : "bg-p text-gray-100"
            } menu p-4 overflow-y-auto w-80 `}
          >
            {/* <!-- Sidebar content here --> */}

            {/* user few details with navigation */}
            <div className="mt-8 text-center">
              <img
                src={
                  user
                    ? user.photoURL || "https://i.ibb.co/K035fHn/149071.png"
                    : "https://i.ibb.co/K035fHn/149071.png"
                }
                alt=""
                className="w-10 h-10 m-auto rounded-full object-cover lg:w-20 lg:h-20"
              />
              <h5 className="hidden mt-4 text-xl font-semibold text-secondary lg:block">
                {user?.displayName}
              </h5>
              <span className="hidden text-gray-400 lg:block">{role}</span>
              <div>
                <Link
                  to={"/profile"}
                  className="btn btn-xs btn-outline btn-info border mb-1"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            <li>
              <Link
                className={` shadow-lg my-1 font-bold ${
                    1<0
                    ? "bg-teal-400 hover:bg-teal-600 hover:text-gray-300 text-gray-600 "
                    : " text-gray-200 hover:bg-teal-600"
                }`}
                to={"/dashboard"}
              >
                <MdDashboardCustomize /> Dashboard
              </Link>
            </li>

            {role === "admin" && (
              <li>
                <Link
                  className={` shadow-lg my-1 font-bold ${
                    1<0
                      ? "bg-teal-400 hover:bg-teal-600 hover:text-gray-300 text-gray-600 "
                      : " text-gray-200 hover:bg-teal-600"
                  }`}
                  to={"/dashboard/users"}
                >
                  <FaUsersCog /> Users
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link
                  className={` shadow-lg my-1 font-bold ${
                    1<0
                      ? "bg-teal-400 hover:bg-teal-600 hover:text-gray-300 text-gray-600 "
                      : " text-gray-200 hover:bg-teal-600"
                  }`}
                  to={"/dashboard/addQuiz"}
                >
                  <MdQuiz /> Add Quiz
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link
                  className={` shadow-lg my-1 font-bold ${
                    1<0
                      ? "bg-teal-400 hover:bg-teal-600 hover:text-gray-300 text-gray-600 "
                      : " text-gray-200 hover:bg-teal-600"
                  }`}
                  to={"/dashboard/manageQuizzes"}
                >
                  <GoSettings /> Manage Quizzes
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link
                  className={` shadow-lg my-1 font-bold ${
                    1<0
                      ? "bg-teal-400 hover:bg-teal-600 hover:text-gray-300 text-gray-600 "
                      : " text-gray-200 hover:bg-teal-600"
                  }`}
                  to={"/dashboard/paymentLists"}
                >
                  <MdOutlinePayment /> Payments list
                </Link>
              </li>
            )}
            {/* {role !== "admin" &&
              <li>
              <Link
                className={` shadow-lg my-1 font-bold ${
                    1<0
                    ? "bg-teal-400 hover:bg-teal-600 hover:text-gray-300 text-gray-600 "
                    : " text-gray-200 hover:bg-teal-600"
                }`}
                to={"/dashboard/myQuizzes"}
              >
                <img className="w-4" src={reviewSvg} alt="book svg" /> My
                Quizzes
              </Link>
            </li>
            } */}
            {role !== "admin" &&
              <li>
              <Link
                className={` shadow-lg my-1 font-bold ${
                    1<0
                    ? "bg-teal-400 hover:bg-teal-600 hover:text-gray-300 text-gray-600 "
                    : " text-gray-200 hover:bg-teal-600"
                }`}
                to={"/dashboard/myPayments"}
              >
                <RiSecurePaymentFill /> My
                Payments
              </Link>
            </li>
            }
            {role !== "admin" &&
              <li>
              <Link
                className={` shadow-lg my-1 font-bold ${
                    1<0
                    ? "bg-teal-400 hover:bg-teal-600 hover:text-gray-300 text-gray-600 "
                    : " text-gray-200 hover:bg-teal-600"
                }`}
                to={"/dashboard/addReview"}
              >
                <MdRateReview></MdRateReview> Add a
                Review
              </Link>
            </li>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
