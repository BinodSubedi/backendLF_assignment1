import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiry: "1hr",
    refreshTokenExpiry: 3000,
  },
};

export default env;
