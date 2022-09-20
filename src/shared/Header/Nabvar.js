import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
	MdModeNight,
	MdOutlineDarkMode,
	MdDashboardCustomize,
	MdNightsStay,
	MdLightMode,
	MdOutlineClose,
} from 'react-icons/md'
import { GoThreeBars } from 'react-icons/go'
import { IoMdNotificationsOutline } from 'react-icons/io'
import './Navbar.css'
// import { DarkModeContext } from '../../App'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
// import Loading from '../../Shared/Loading/Loading'
import { signOut } from 'firebase/auth'
// import useRole from '../../hooks/useRole'
// import NotificationModal from './Notification/NotificationModal'
import axios from 'axios';
import logo from '../../assests/images/qm-logo-3.png';
import useRole from '../../hooks/useRole'
import Loading from '../Loading/Loading'

const Navbar = () => {
	const [colorChange, setColorchange] = useState(false)
	const [toggle, setToggle] = useState(false)
	const [notificationModal, setNotificationModal] = useState(false)
	const [notifications, setNotifications] = useState([])
	const [NewNotificationsCount, setNewNotificationsCount] = useState(0)
	const [user, loading] = useAuthState(auth)
	const navigate = useNavigate();
	const location = useLocation().pathname;
	let [role, roleLoading] = useRole(user);
	if(loading){
		<Loading />
	}
	// const [darkMode, setDarkMode] = useContext(DarkModeContext)
	// //     console.log(role);
	// const setNotificationZero = () => {
	// 	setNotificationModal(!notificationModal)
	// 	axios
	// 		.put(
	// 			`https://neighbour-home--server.herokuapp.com/notification/${user?.email}`
	// 		)
	// 		.then(data => {
	// 			// console.log(data.data)
	// 			setNewNotificationsCount(0)
	// 		})
	// }

	// useEffect(() => {
	// 	axios
	// 		.get(
	// 			`https://neighbour-home--server.herokuapp.com/notification/${user?.email}`
	// 		)
	// 		.then(data => {
	// 			// console.log(data.data);
	// 			setNotifications(data.data)
	// 			const NewNotifications = data.data.filter(
	// 				notification => notification.status === 'unseen'
	// 			)
	// 			setNewNotificationsCount(NewNotifications.length)
	// 		})
	// }, [user?.email, notifications])

	// if (loading ) {
	// 	return <Loading />
	// }

	// // console.log(user?.email)

	// // console.log(location);
	const navBtnHndle = () => {
		setToggle(!toggle)
	}
	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorchange(true)
		} else {
			setColorchange(false)
		}
	}
	window.addEventListener('scroll', changeNavbarColor)
	//   console.log(colorChange);
	return (
		<div className="">
			{/* start header  */}
			<header
				className={`fixed  top-0 left-0 w-full  px-4 sm:px-8 lg:px-16 xl:px-28 2xl:px-64 ${colorChange && (1<0 ? 'bg-bgc' : 'bg-p')
					} ${location !== '/' && (1<0 ? 'bg-teal-600' : 'bg-[#1A1929]')
					} ${location === '/properties'
						? colorChange
							? 'z-50 duration-100'
							: 'z-10'
						: 'z-50'
					}bg-[#1A1929] z-50` }
			>

				{/* phone navbar */}
				<div className="flex flex-wrap items-center justify-between py-6 sm:px-2 px-5">
					<label
						htmlFor="dashboard-drower"
						tabIndex="1"
						className={`${location.includes('dashboard') ? 'block' : 'hidden'
							} md:hidden text-white cursor-pointer`}
					>
						<MdDashboardCustomize className="h-5 w-5"></MdDashboardCustomize>
					</label>

					<div className=" md:w-auto flex justify-center items-center">
                        <img className='h-12 w-12 rounded-sm' src={logo} alt="" />
						<a
							style={{ letterSpacing: '2px' }}
							href="/"
							className="text-white ml-2 font-semibold  text-3xl"
						>
							{role === 'admin' ? 'Quizzes Maker' : 'Quiz Master'}
						</a>
					</div>

					<label htmlFor="menu-toggle" className="pointer-cursor hidden "><svg className="fill-current text-white"
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg></label>

                    <input className="hidden" type="checkbox" id="menu-toggle" />
					{/* {user &&
						<div className="relative md:hidden">
							<label
								// onClick={() => setNotificationZero()}
								htmlFor="notificattonModal"
								className="inline-block text-white md:px-2 font-semibold cursor-pointer"
							>
								<IoMdNotificationsOutline className="text-2xl"></IoMdNotificationsOutline>

								<span className="py-0 text-xs absolute -top-1 text-white px-1 bg-pink-600 rounded-full">
									{NewNotificationsCount}
								</span>
							</label>

							<div className="absolute top-10 -right-14">
								{notificationModal && (
									<NotificationModal
										notifications={notifications}
										setNotificationModal={setNotificationModal}
									/>
								)}
							</div>
						</div>
					} */}

					<span
						onClick={navBtnHndle}
						className="md:hidden text-white text-2xl cursor-pointer"
					>
						{toggle ? (
							<MdOutlineClose></MdOutlineClose>
						) : (
							<GoThreeBars></GoThreeBars>
						)}
					</span>

					<ul
						onClick={navBtnHndle}
						className={`mobile-manu flex md:hidden text-secondary flex-col text-center z-10   left-0 w-full bg-p  absolute  py-4 duration-500 ${toggle ? ' opacity-100  top-20' : ' top-[-350px] opacity-0'
							}`}
					>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'activeLink' : 'navLink'
							}
							to={'/'}
						>
							Home
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'activeLink' : 'navLink'
							}
							to={'/dashboard'}
						>
							Dashboard
						</NavLink>
						{1<0 ? (
							<li className="">
								<button
									// onClick={() => setDarkMode(false)}
									className="py-2 mx-auto md:text-white md:px-2  flex items-center"
									href="#"
								>
									Light{' '}
									<MdLightMode className="ml-1 text-2xl font-semibold"></MdLightMode>
								</button>
							</li>
						) : (
							<li className="">
								<button
									// onClick={() => setDarkMode(true)}
									className="py-2 mx-auto  md:text-white md:px-2 flex items-center "
									href="#"
								>
									Dark{' '}
									<MdNightsStay className="ml-1 text-2xl font-semibold"></MdNightsStay>
								</button>
							</li>
						)}

						<div className="avatar mx-auto my-2">
							<div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
								<img
									src="https://placeimg.com/192/192/people"
									alt="Profile"
								/>
							</div>
						</div>
						<Link
							className="inline-block w-44 mx-auto font-semibold px-4 py-2 hover:bg-primary hover:text-white  bg-secondary text-white  border-white rounded"
							to={'/quizzes'}
						>
							Start Quiz
						</Link>

						{/* {user ?
                        <button onClick={handleLogout} className='uppercase my-0.5 md:my-0 text-left   mx-auto md:mx-0 md:pb-0.5' >LogOut</button>
                        :
                        <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/login"}>Login</NavLink>
                    } */}
					</ul>

					{/* desktop navbar  */}
					<div className="hidden md:block w-full md:w-auto" id="menu">
						<nav className="w-full bg-teal-100  md:bg-transparent rounded shadow-lg px-6 py-10 mt-4 text-center md:p-0 md:mt-0 md:shadow-none">
							<ul className="md:flex items-center">
								<li>
									<Link
										to={'/'}
										className="py-2 inline-block md:text-white md:hidden lg:block font-semibold"
										href="#"
									>
										Home
									</Link>
								</li>
								
								
								<li className="md:ml-2.5 md:hidden lg:block">
									<Link
										to={'/quizzes'}
										className="py-2 inline-block md:text-white md:px-2 font-semibold"
										href="#"
									>
										Quizzes
									</Link>
								</li>

								<li className="md:ml-2.5">
									<Link
										to={'/dashboard'}
										className="py-2 inline-block md:text-white md:px-2 font-semibold"
										href="#"
									>
										Dashboard
									</Link>
								</li>

								{1<0 ? (
									<li className="md:ml-2.5">
										<button
											// onClick={() => setDarkMode(false)}
											className="py-2 inline-block md:text-white md:px-2 font-semibold"
											href="#"
										>
											<MdLightMode className="text-2xl"></MdLightMode>
										</button>
									</li>
								) : (
									<li className="md:ml-2.5">
										<button
											// onClick={() => setDarkMode(true)}
											className="py-2 inline-block md:text-white md:px-2 font-semibold"
											href="#"
										>
											<MdOutlineDarkMode className="text-2xl"></MdOutlineDarkMode>
										</button>
									</li>
								)}
								{
									user &&

									<li className="md:ml-2.5 md:mr-2.5 flex items-center relative">
										<label
											// onClick={() => setNotificationZero()}
											htmlFor="notificattonModal"
											className="inline-block md:text-white md:px-2 font-semibold cursor-pointer"
										>
											<IoMdNotificationsOutline className="text-2xl"></IoMdNotificationsOutline>

											<span className="py-0 text-xs absolute -top-1 right-1.5 px-1 bg-pink-600 rounded-full">
												{NewNotificationsCount}
											</span>
										</label>

										{/* <div className="absolute top-10 -left-10">
											{notificationModal && (
												<NotificationModal
													notifications={notifications}
													setNotificationModal={setNotificationModal}
												/>
											)}
										</div> */}
									</li>
								}


									<div className="relative">
								<Link to={'/profile'} className="avatar mx-2">
									<div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
										<img
											src={user ? user?.photoURL : "https://placeimg.com/192/192/people"}
											alt="Profile"
										/>
									</div>
								</Link>
									{/* <div class="badge badge-secondary absolute top-0 left-8 py-0 px-1 m-0">pro</div> */}
									</div>

								{user ? (
									<li className="md:ml-6 mt-3 md:mt-0">
										<Link to='/'
											onClick={() => signOut(auth)}
											className={`inline-block font-semibold px-4 py-2 ${colorChange
												? 'hover:bg-primary hover:text-white text-black bg-secondary'
												: 'hover:bg-primary hover:text-white text-white bg-secondary'
												}   border-white rounded cursor-pointer`}
										>
											Sign Out
										</Link>
									</li>
								) : (
									<li className="md:ml-6 mt-3 md:mt-0">
										<Link
											className={`inline-block font-semibold px-4 py-2 ${colorChange
												? 'hover:bg-primary hover:text-white text-black bg-secondary'
												: 'hover:bg-primary hover:text-white text-white bg-secondary'
												}   border-white rounded`}
											to="/login"
										>
											Login
										</Link>
									</li>
								)}
							</ul>
						</nav>
					</div>
				</div>
			</header>
			{/* -- end header -- */}
		</div>
	)
}

export default Navbar
