import * as React from "react";
import { signInWithPopup } from "firebase/auth";
import auth, { provider } from "../firebase/config";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Box } from "@mui/system";
import { Tab, Tabs, Typography } from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { saveLocal } from "../utils/localstorage";
import { login } from "../actions/users";
import { useDispatch } from "react-redux";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(3),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(6),
	},
}));

export interface DialogTitleProps {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};
type DialogForm = {
	open: boolean;
	children: React.ReactNode;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	messageErr: any;
	setMessageErr: any;
};

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}
export default function DialogForm({ open, onClose, messageErr, setMessageErr }: DialogForm) {
	const [value, setValue] = React.useState(0);
	const dispatch = useDispatch();
	const handleCloseDialog = () => {
		onClose(false);
	};
	const handleLoginWithGoogle = async () => {
		try {
			const { user }: any = await signInWithPopup(auth, provider);
			const newData = {
				accessToken: user.accessToken,
				email: user.email,
				role: 0,
				username: user.displayName,
				_id: user.uid,
			};
			saveLocal("user", newData);
			dispatch(login(user.displayName));
			setTimeout(() => {
				setMessageErr({
					type: "success",
					message: "Success!",
				});
				onClose(false);
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setMessageErr({
			message: null,
			type: null,
		});
		setValue(newValue);
	};

	return (
		<div>
			<BootstrapDialog
				onClose={handleCloseDialog}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
					<Box>
						<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
							<Tab label="SIGN IN" />
							<Tab label="SIGN UP" />
						</Tabs>
					</Box>
				</BootstrapDialogTitle>
				{/* {children} */}
				<DialogContent dividers>
					<TabPanel value={value} index={0}>
						<SignIn
							onClose={handleCloseDialog}
							messageErr={messageErr}
							setMessageErr={setMessageErr}
						/>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<SignUp setValue={setValue} messageErr={messageErr} setMessageErr={setMessageErr} />
					</TabPanel>
				</DialogContent>
				<DialogActions
					sx={{
						display: "flex",
						flexDirection: "column",
						rowGap: 2,
					}}
				>
					Or sign up using?
					<Box
						sx={{
							display: "flex",
							gap: 2,
						}}
					>
						<IconButton>
							<FacebookIcon color="info" />
						</IconButton>
						<IconButton onClick={handleLoginWithGoogle}>
							<LanguageOutlinedIcon color="primary" />
						</IconButton>
					</Box>
					<Typography>
						Not a member?<span>Sign up</span>
					</Typography>
				</DialogActions>
			</BootstrapDialog>
		</div>
	);
}
