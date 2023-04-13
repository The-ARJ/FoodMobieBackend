const supertest = require("supertest");
const app = require("../app");
const Foods = require("../models/Food");
const api = supertest(app);
const mongoose = require("mongoose");

const reminder = {
  foodname: "Spicy Tofu Stir-Fr",
  calories: "450",
  meal: "Breakfast",
  cookingtime: "30",
  ingredients: "1 cup uncooked icpeppers, and carrots)",
  recipe: "Cook roed.heated thr Serve stir-fry over rice.",
  date: "2023:3:4",
  time: "11:45",
};

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDZlNjQwNTI5ZjI4MTVhMGQ5ODRjOSIsImVtYWlsIjoidXNlckAxMjM0Z21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4MTczNzY4LCJleHAiOjE2NzgyNjAxNjh9.PPklFkN8ok4WShitmGbIRTg4QxbtCZEYWzixlageH-Y";

beforeAll(async () => {
  //   await Foods.deleteMany({});
});

test("Create Reminder", async () => {
  const res = await api
    .post("/reminders")
    .set("Authorization", `Bearer ${token}`) // set the Authorization header with the token
    .send(reminder)
    .expect(201);
  rId = res.body.reminder_id; // set the foodId for the next test
});

test("Get All Reminder", async () => {
  await api
    .get("/reminders")
    .set("Authorization", `Bearer ${token}`) // set the Authorization header with the token
    .expect(200);
});


afterAll(async () => {
  await mongoose.connection.close();
});
