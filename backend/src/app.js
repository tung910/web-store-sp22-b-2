import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import db from "./config/connect";
import products from "./routes/products";
import categories from "./routes/categories";
dotenv.config();
const app = express();
// MIDDLEWARE
app.use(morgan());
app.use(express.json());
app.use(cors());

//ROUTING
app.use("/api/products", products);
app.use("/api/categories", categories);

app.get("/", (req, res) => {
	res.send("<h1>HOME PAGE</h1>");
});

//CONNECT DB
db.connect();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
	console.log("Running port " + PORT);
});
