import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
} from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import { useForm } from 'react-hook-form'
import Loading from '../../shared/Loading/Loading'
import useToken from '../../hooks/useToken'
import google from '../../assests/images/google.svg'
import facebook from '../../assests/images/facebook.svg'
import { MdOutlineVisibilityOff, MdOutlineVisibility } from 'react-icons/md'
import toast from 'react-hot-toast'
import login from '../../assests/images/register.png'
import PageTitle from '../../shared/PageTitle/PageTitle'

const Login = () => {
	const [showPassword, setShowPassword] = React.useState(false)
	const [signInWithGoogle, googleUser, googleLoading, googleError] =
		useSignInWithGoogle(auth)
	const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
		useSignInWithEmailAndPassword(auth)
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm()
	const [token] = useToken(googleUser || emailUser)
	const navigate = useNavigate()
     let location = useLocation();
	let from = location.state?.from?.pathname || "/";
//     let [admin, adminLoading] = useAdmin(user)


	useEffect(() => {
		if (token.report === 'inserted' || token.report === 'exist') {
			navigate('/')
			toast.success('Plz Fillup This Form!', { id: "social_login" })
		} else if (token.report === 'dataExist') {
			navigate(from, { replace: true });
			toast.success('Login Successfully!', { id: "social_login" })
		}
	}, [token.report, navigate, from])

	if (googleLoading || emailLoading) {
		return <Loading />
	}

	// if (googleUser || emailUser) {
	//     console.log(googleUser || emailUser);
	// }
	// console.log(token)

	if (googleError || emailError) {
		console.error(googleError || emailError)
		toast.error("Failed To Login", {id: 'failed to login'})
	}

	const handleLogin = data => {
		console.log(data)
		const email = data.email
		const password = data.password
		signInWithEmailAndPassword(email, password)
		reset()
	}

	return (
		<section className=' md:mt-[80px] bg-purple'>
            <PageTitle title='Login'></PageTitle>
			<div className='bg-purple font-family-karla'>
				<div className='w-full flex flex-wrap flex-row-reverse'>
					<div className='w-full md:w-1/2 flex flex-col border-l-2 border-l-gray-500'>
						<div className='flex flex-col justify-center md:justify-start  pt-8 md:pt-0 px-8 md:px-24 lg:px-32'>
							<p className='text-center text-3xl'>Login Here!</p>
							<form
								onSubmit={handleSubmit(handleLogin)}
								className='flex flex-col pt-3 text-white md:pt-8'
							>
								<div className='flex flex-col pt-4'>
									<label htmlFor='email' className='text-lg'>
										Email
									</label>
									<input
										{...register('email', {
											required: {
												value: true,
												message: 'Email is Required',
											},
											pattern: {
												value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
												message: 'Provide a valid email',
											},
										})}
										type='email'
										id='email'
										placeholder='your@email.com'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<label>
										{errors.email?.type === 'required' && (
											<p className='text-red-600 text-sm font-semibold'>
												{errors.email.message}
											</p>
										)}
										{errors.email?.type === 'pattern' && (
											<p className='text-red-600 text-sm font-semibold'>
												{errors.email.message}
											</p>
										)}
									</label>
								</div>

								{showPassword ? (
									<div className='flex flex-col pt-4 relative'>
										<label htmlFor='password' className='text-lg'>
											Password
										</label>
										<input
											{...register('password', {
												required: {
													value: true,
													message: 'Password is Required',
												},
												minLength: {
													value: 6,
													message: 'Must be 6 character or longer',
												},
												pattern: {
													value: /(?=.*?[A-Z])/,
													message: 'At least One Uppercase',
												},
											})}
											type='text'
											id='password'
											placeholder='Password'
											className='shadow text-black appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline'
										/>
										<MdOutlineVisibilityOff
											onClick={() => setShowPassword(!showPassword)}
											className='absolute text-secondary right-0 top-[54px] mr-4 cursor-pointer'
											size={28}
											placeholder='show password'
										/>
										<label>
											{errors.password?.type === 'required' && (
												<p className='text-red-600 text-sm font-semibold'>
													{errors.password.message}
												</p>
											)}
											{errors.password?.type === 'pattern' && (
												<p className='text-red-600 text-sm font-semibold'>
													{errors.password.message}
												</p>
											)}
											{errors.password?.type === 'minLength' && (
												<p className='text-red-600 text-sm font-semibold'>
													{errors.password.message}
												</p>
											)}
										</label>
									</div>
								) : (
									<div className='flex flex-col pt-4 relative'>
										<label htmlFor='password' className='text-lg'>
											Password
										</label>
										<input
											{...register('password', {
												required: {
													value: true,
													message: 'Password is Required',
												},
												minLength: {
													value: 6,
													message: 'Must be 6 character or longer',
												},
												pattern: {
													value: /(?=.*?[A-Z])/,
													message: 'At least One Uppercase',
												},
											})}
											type='password'
											id='password'
											placeholder='Password'
											className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
										/>
										<MdOutlineVisibility
											onClick={() => setShowPassword(!showPassword)}
											className='absolute right-0 top-[54px] text-secondary mr-4 cursor-pointer'
											size={28}
											placeholder='show password'
										/>
										<label>
											{errors.password?.type === 'required' && (
												<p className='text-red-600 text-sm font-semibold'>
													{errors.password.message}
												</p>
											)}
											{errors.password?.type === 'pattern' && (
												<p className='text-red-600 text-sm font-semibold'>
													{errors.password.message}
												</p>
											)}
											{errors.password?.type === 'minLength' && (
												<p className='text-red-600 text-sm font-semibold'>
													{errors.password.message}
												</p>
											)}
										</label>
									</div>
								)}

								<input
									type='submit'
									value='Login'
									className='bg-primary hover:bg-secondary duration-200 transition-all text-white font-bold text-lg  p-2 mt-8 cursor-pointer'
								/>
							</form>
							<div className='flex my-2'>
								<div className='w-[40%] flex m-auto border-b-2 border-b-gray-500' />
								<div className='text-secondary'>or</div>
								<div className='w-[40%] flex m-auto border-b-2 border-b-gray-500' />
							</div>
							<div className='flex flex-col pt-2 space-y-2'>
								<div
									onClick={() => signInWithGoogle()}
									className='flex justify-center items-center cursor-pointer space-x-3 border duration-200 transition border-primary hover:border-secondary py-2'
								>
									<img className='w-7' src={google} alt='' />
									<p className='text-xl font-medium text-white'>
										Continue With Google
									</p>
								</div>
								<div className='flex justify-center items-center cursor-pointer space-x-3 border duration-200 transition border-primary hover:border-secondary py-2'>
									<img className='w-7' src={facebook} alt='' />
									<p className='text-xl font-medium text-white'>
										Continue With Facebook
									</p>
								</div>
							</div>
							<div className='text-center text-white py-5'>
								<p>
									Already have an account?{' '}
									<Link
										to='/signUp'
										className='underline text-secondary font-semibold'
									>
										Register here.
									</Link>
								</p>
							</div>
						</div>
					</div>

					<div className='w-1/2 my-12'>
						<img
							className='object-cover  w-3/4 mx-auto hidden md:block'
							src={login}
							alt='Background'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Login
