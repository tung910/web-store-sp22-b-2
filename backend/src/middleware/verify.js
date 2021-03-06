import jwt from "jsonwebtoken";
require("dotenv").config();

const verify = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(403).json({ message: "Forbidden" });
	}
	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.SECRET_KEY, function (err, data) {
		if (err) {
			return res.status(400).json({ message: "Token invalid" });
		}
		req.user = data;
		return next();
	});
};
const isAdmin = async (req, res, next) => {
	try {
		// const user = await UserModel.findOne({ email: req.user.email }).exec();
		if (!req.profile) return res.status(400).json({ message: "Account empty!" });
		if (req.profile.role == 0) return res.status(401).json({ message: "You have no authority!" });
		return next();
	} catch (error) { }
};

export { isAdmin };
export default verify;
