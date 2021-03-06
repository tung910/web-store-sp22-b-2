import { Alert, Button, FormControl } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signin } from "../api/users";
import { saveLocal } from "../utils/localstorage";
import { login } from "../actions/users";
import { addToWishListAsUser } from "../actions/wishlist";
interface IFormInput {
	email: any;
	password: String;
}

export default function SignIn({ onClose, messageErr, setMessageErr }: any) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>({ mode: "onBlur" });
	const dispatch = useDispatch();
	const onSubmit: SubmitHandler<IFormInput> = async (payload) => {
		try {
			const { data } = await signin(payload);
			if (!data.user.isActive) {
				setMessageErr({
					type: "error",
					message:
						"Tai khoan cua ban da bi khoa vui long lien he voi quan tri vien de mo lai tai khoan thanks!",
				});
				return;
			}

			const newData = {
				accessToken: data.accessToken,
				email: data.user.email,
				isActive: data.user.isActive,
				role: data.user.role,
				username: data.user.username,
				_id: data.user._id,
				wishlist: data.user.wishlist,
			};
			const refreshToken = {
				refreshToken: data.refreshToken,
			};

			saveLocal("user", newData);
			saveLocal("refreshToken", refreshToken);

			dispatch(addToWishListAsUser(newData.wishlist));
			dispatch(login(data.user.username));

			setMessageErr({
				type: "success",
				message: "Success!",
			});
			setTimeout(() => {
				onClose(false);
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
					type="email"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					{...register("email", {
						required: true,
						minLength: 15,
						pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
					})}
				/>
				<label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
					Email address
				</label>
				{errors.email && (
					<span className="text-red-600">This field is required email</span>
				)}
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
				{errors.password && (
					<span className="text-red-600">This field is required password</span>
				)}
			</div>

			<Button variant="contained" onClick={handleSubmit(onSubmit)}>
				login
			</Button>
		</FormControl>
	);
}
