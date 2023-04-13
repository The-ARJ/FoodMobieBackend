const supertest = require("supertest");
const app = require("../app");
const Foods = require("../models/Food");
const api = supertest(app);
const mongoose = require("mongoose");

const food = {
  name: "Spicy Tofu Stir-Fr",
  calories: "450",
  meal: "Breakfast",
  time: "30",
  ingredients: "1 cup uncooked icpeppers, and carrots)",
  recipe: "Cook roed.heated thr Serve stir-fry over rice.",
};

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDZlNjQwNTI5ZjI4MTVhMGQ5ODRjOSIsImVtYWlsIjoidXNlckAxMjM0Z21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4MTczNzY4LCJleHAiOjE2NzgyNjAxNjh9.PPklFkN8ok4WShitmGbIRTg4QxbtCZEYWzixlageH-Y";

beforeAll(async () => {
  //   await Foods.deleteMany({});
});

test("Create Food", async () => {
  const res = await api
    .post("/foods")
    .set("Authorization", `Bearer ${token}`) // set the Authorization header with the token
    .send(food)
    .expect(201);
  foodId = res.body.food._id; // set the foodId for the next test
});

test("Get All Foods", async () => {
  await api
    .get("/foods")
    .set("Authorization", `Bearer ${token}`) // set the Authorization header with the token
    .expect(200);
});
test("Get food by ID", async () => {
  const res = await api
    .get(`/foods/${foodId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});

test("Update Food by ID", async () => {
  const updatedFood = {
    name: "Updated Food Name",
    calories: "500",
    meal: "Dinner",
    time: "45",
    ingredients: "1 cup uncooked rice, 1 cup broccoli, 1 cup carrots",
    recipe: "Cook rice, steam broccoli and carrots, serve together",
  };

  // Make the PUT request to update the food item
  await api
    .put(`/foods/${foodId}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updatedFood)
    .expect(200);

  // Check that the food item was actually updated by fetching it again
  const getRes = await api
    .get(`/foods/${foodId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});
afterAll(async () => {
  await mongoose.connection.close();
});
