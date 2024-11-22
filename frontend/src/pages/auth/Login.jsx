import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMiniEyeSlash } from 'react-icons/hi2';
import useLogin from '../../hooks/useLogin';
import useForgotPassword from '../../hooks/useForgotPassword';
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";

const Login = () => {
	const [inputs, setInputs] = useState({ email: '', password: '' });
	const [otpInput, setOtpInput] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [secure, setSecure] = useState(true);
	const { loading, login } = useLogin();
	const { sendOTP, verifyOTP, resetPassword, otpSent, loading: otpLoading } = useForgotPassword();
	const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (forgotPasswordMode) {
			return;
		}
		if (!inputs.email || !inputs.password) {
			toast.error("Please fill all the fields");
			return;
		}
		if (inputs.password.length < 6) {
			toast.error("Password should be at least 6 characters long");
			return;
		}
		await login(inputs);
	};

	const handleForgotPassword = async () => {
		if (!inputs.email) {
			toast.error("Enter Email first");
			return;
		}
		setForgotPasswordMode(true);
		await sendOTP(inputs.email);
	};

	const handleOTPSubmit = async (e) => {
		e.preventDefault();
		if (verifyOTP(otpInput)) {
			await resetPassword(inputs.email, newPassword);
			setForgotPasswordMode(false);
		}
	};

	return (
		<div className="h-screen p-4 flex items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center">
			<div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
				<div className="relative flex w-1/2 shadow-xl border-4 border-r-0 border-green-700">
					<img src="bg2.png" alt="auth bg" className="w-full h-full object-cover opacity-70" />
					<div className="absolute inset-0 bg-black opacity-30"></div>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<h1 className="text-white text-[100px] md:text-[80px] lg:text-[100px] xl:text-[100px] font-bold neon-text z-50 neon-green">The</h1>
						<h1 className="text-white text-center text-[100px] md:text-[80px] lg:text-[100px] xl:text-[100px] font-bold neon-text z-50 neon-green">Sports Edge</h1>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center p-5 w-1/2 shadow-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-4 border-l-0 border-green-700 rounded-r-lg">
					{!forgotPasswordMode ? (
						<>
							<h1 className="text-3xl font-bold text-green-500">Login</h1>
							<div className="w-10 h-1 bg-green-800 mx-auto my-4 rounded-full mb-8"></div>
							<form className="w-full" onSubmit={handleSubmit}>
								<div className="space-y-6 w-full">
									<div className="flex items-center bg-green-200 rounded-lg w-full">
										<MdEmail className="ml-4 text-gray-600 h-10" />
										<input type="email" placeholder="Enter your email" className="w-full h-[50px] p-4 bg-transparent border-0 focus:outline-none"
											value={inputs.email}
											onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
										/>
									</div>

									<div className="flex items-center bg-green-200 rounded-lg w-full">
										<RiLockPasswordFill className="ml-4 text-gray-600 h-10" />
										<input type={secure ? "password" : "text"} placeholder="Enter your password" className="w-full h-[50px] p-4 bg-transparent border-0 focus:outline-none"
											value={inputs.password}
											onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
										/>
										<button onClick={(e) => { e.preventDefault(); setSecure(!secure); }}>
											<HiMiniEyeSlash className="ml-4 text-gray-600 h-10 mr-4" />
										</button>
									</div>
								</div>

								<div className="flex flex-col items-center justify-center mt-10">
									{loading ? (
										<button className="w-full bg-green-700 text-white text-lg py-2 rounded-full hover:bg-green-500 transition-colors" disabled={loading}>
											<Spinner />
										</button>
									) : (
										<button className="w-full bg-green-700 text-white text-lg py-2 rounded-full hover:bg-green-500 transition-colors" disabled={loading}>
											Login
										</button>
									)}

									<button onClick={handleForgotPassword} className="text-gray-800 hover:underline hover:text-green-700 mt-3">
										Forgot Password?
									</button>

									<Link to="/signup" className="text-gray-800 hover:underline hover:text-green-700 mt-3">
										{"Don't"} have an Account? Signup
									</Link>
								</div>
							</form>
						</>
					) : (
						<>
							<h1 className="text-3xl font-bold text-green-500">Forgot Password</h1>
							<form className="w-full" onSubmit={handleOTPSubmit}>
								<div className="w-10 h-1 bg-green-800 mx-auto my-4 rounded-full mb-8"></div>
								<div className="space-y-6 w-full">
									<div className="flex items-center bg-green-200 rounded-lg w-full">
										<MdEmail className="ml-4 text-gray-600 h-10" />
										<input type="email" placeholder="Enter your email" className="w-full h-[50px] p-4 bg-transparent border-0 focus:outline-none"
											value={inputs.email}
											onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
										/>
									</div>

									{otpSent && (
										<>
											<div className="flex items-center bg-green-200 rounded-lg w-full">
												<input type="text" placeholder="Enter OTP" className="w-full h-[50px] p-4 bg-transparent border-0 focus:outline-none"
													value={otpInput}
													onChange={(e) => setOtpInput(e.target.value)}
												/>
											</div>

											<div className="flex items-center bg-green-200 rounded-lg w-full">
												<RiLockPasswordFill className="ml-4 text-gray-600 h-10" />
												<input type="password" placeholder="Enter new password" className="w-full h-[50px] p-4 bg-transparent border-0 focus:outline-none"
													value={newPassword}
													onChange={(e) => setNewPassword(e.target.value)}
												/>
												<button onClick={(e) => { e.preventDefault(); setSecure(!secure); }}>
													<HiMiniEyeSlash className="ml-4 text-gray-600 h-10 mr-4" />
												</button>
											</div>
										</>
									)}
								</div>

								{otpSent && (<div className="flex flex-col items-center justify-center mt-10">
									{otpLoading ? (
										<button className="w-full bg-green-700 text-white text-lg py-2 rounded-full hover:bg-green-500 transition-colors" disabled={otpLoading}>
											<Spinner />
										</button>
									) : (
										<button className="w-full bg-green-700 text-white text-lg py-2 rounded-full hover:bg-green-500 transition-colors" disabled={otpLoading}>
											Reset Password
										</button>
									)}
								</div>)}
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
