import request from "supertest";
import express from "express";
import router from "../../src/routes";
import { globalErrorHandler } from "../../src/utils/error";
import env from "../../src/config";
import expect from "expect";

const app = express();
app.use(express.json());
app.use("/api", router);
app.use(globalErrorHandler);

const port = env.port || 3000;

describe("Create User", () => {
  it("Creating user with User interface", async () => {
    const res = await request(app)
      .put("/api/user/signup")
      .send({
        username: "Binod125",
        email: "binodsubedi125@gmail.com",
        gender: "male",
        password: "hellothere1",
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("status", "success");
  });
});

// describe("Login User", () => {
//   const username: string = "Binod125";
//   const password: string = "hellothere1";

//   before(async () => {
//     const res = await request(app)
//       .put("/api/user/signup")
//       .send({
//         username,
//         email: "binodsubedi125@gmail.com",
//         gender: "male",
//         password,
//       })
//       .set("Accept", "application/json");

//     expect(res.statusCode).toBe(201);
//   });

//   it("Login User", async () => {
//     const res = await request(app)
//       .post("/api/user/login")
//       .send({
//         username,
//         password,
//       })
//       .set("Accept", "application/json");

//     console.log(res.body);

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("status", "success");
//   });
// });

//doesnot work on Array as runtime instance finishes after each request
describe("Login User", () => {
  const username = "Binod125";
  const password = "hellothere1";

  before(async () => {
    const signupRes = await request(app)
      .put("/api/user/signup")
      .send({
        username,
        email: "binodsubedi125@gmail.com",
        gender: "male",
        password,
      })
      .set("Accept", "application/json");

    console.log("Signup Response:", signupRes.body);
    expect(signupRes.statusCode).toBe(201); // Ensure user creation is successful
  });

  it("Login User", async () => {
    const loginRes = await request(app)
      .post("/api/user/login")
      .send({
        username,
        password,
      })
      .set("Accept", "application/json");

    console.log("Login Response:", loginRes.body);

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty("status", "success");
  });
});
