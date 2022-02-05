import dotenv from "dotenv";

dotenv.config();
export default {
	port: 1337,
	dbUri: "mongodb://127.0.0.1:27017/shop-api",
	saltWorkFactor: 10,
	accessTokenExpire: "10m",
	refreshTokenExpire: "1y",
	publicKey: process.env.PUBLIC_KEY,
	privateKey: process.env.PRIVATE_KEY,
};
