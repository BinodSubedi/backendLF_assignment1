import dotenv from "dotenv";

dotenv.config({ path: __dirname + "./../.env" });

const env = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET || "thisisasecrettext",
    accessTokenExpiry: "1hr",
    refreshTokenExpiry: "3d",
  },
  pg_password: process.env.Pg_PASSWORD,
};

export default env;
