const supertest = require("supertest");
const app = require("../app");
const User = require("../models/User");
const api = supertest(app);
const mongoose = require("mongoose");
const user = {
  email: "testUser1",
  password: "testUser1",
};
beforeAll(async () => {
  await User.deleteMany({});
});

test("user registration", async () => {
  await api
    .post("/users")
    .send(user)
    .expect(201)
    .expect((res) => {
      //   console.log(res.body);
      expect(res.body.status).toContain("User registration success.");
    });
});
test("user login", async () => {
  await api
    .post("/users/login/user")
    .send(user)
    .expect(200)
    .expect((res) => {
      console.log(res.body);
      expect(res.body.status).toContain("Login Success");
      // expect(res.body.data).toHaveProperty("token");
    });
});

afterAll(async () => {
  await mongoose.connection.close();
});
