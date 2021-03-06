import { Alert, Button, FormControl } from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "../api/users";

interface IFormInput {
	email: any;
	password: any;
	username: String;
}

export default function SignUp({ setValue, messageErr, setMessageErr }: any) {
	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>({ mode: "onBlur" });
	const onSubmit: SubmitHandler<IFormInput> = async (payload) => {
		try {
			await signup(payload);
			setMessageErr({
				type: "success",
				message: "Success",
			});
			setTimeout(() => {
				setValue(0);
				setMessageErr({
					type: null,
					message: null,
				});
				reset();
			}, 1000);
		} catch (err: any) {
			setMessageErr({
				type: "error",
				message: err.response.data.message,
			});
		}
	};

	return (
		<FormControl
			sx={{
				width: 350,
				maxWidth: "100%",
				paddingLeft: 3,
				paddingRight: 3,
				color: "black",
			}}
		>
			{messageErr.message && (
				<Alert severity={messageErr.type} sx={{ marginBottom: 2 }}>
					{messageErr.message}
				</Alert>
			)}
			<div className="relative z-0 mb-6 w-full group ">
				<input
					type="text"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					{...register("username", {
						required: true,
						minLength: 5,
					})}
				/>
				<label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
					Username
				</label>
				{errors.username && <span className="text-red-600">This field is required username</span>}
			</div>

			<div className="relative z-0 mb-6 w-full group ">
				<input
					type="email"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					{...register("email", {
						required: true,
						minLength: 5,
						pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
					})}
				/>
				<label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
					Email address
				</label>
				{errors.email && <span className="text-red-600">This field is required email</span>}
				{errors?.email?.type == "minLength" && (
					<span className="text-red-600"> Email more than 20 characters</span>
				)}
			</div>

			<div className="relative z-0 mb-6 w-full group">
				<input
					type="password"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					{...register("password", { required: true, minLength: 8 })}
				/>
				<label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
					Password
				</label>
				{errors.password && <span className="text-red-600">This field is required password</span>}
				{errors?.password?.type == "minLength" && (
					<span className="text-red-600"> Password more than 8 characters</span>
				)}
			</div>

			<Button variant="contained" onClick={handleSubmit(onSubmit)}>
				Sign up
			</Button>
		</FormControl>
	);
}
