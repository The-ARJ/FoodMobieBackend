const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");

const feedback = {
  subject: "Important Announcement Scheduled 2",
  message:
    "There will be a meeting tomorrow at 10am in the conference room."
};

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDM0NmM4NzQ1YzliMGZkNWNlNGNlMCIsImVtYWlsIjoibmV3Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc3OTM2MzQwLCJleHAiOjE2NzgwMjI3NDB9.wSCS40ZpeCjXq1ECchTfF-0uqodSv3sDS1Xfk2GKIuA";

beforeAll(async () => {
  //   await Foods.deleteMany({});
});

test("Post Feedback", async () => {
  const res = await api
    .post("/feedbacks")
    .set("Authorization", `Bearer ${token}`) // set the Authorization header with the token
    .send(feedback)
    .expect(201);
    feedbackId = res.body.feedback._id; // set the foodId for the next test
});
test("Get Feedback", async () => {
  await api
    .get("/feedbacks")
    .set("Authorization", `Bearer ${token}`) // set the Authorization header with the token
    .expect(200)
    .expect((res) => {
      //   expect(res.body.status).toContain("Unexpected field");
    });
});

test("Get Feedback by ID", async () => {
  const res = await api
    .get(`/feedbacks/${feedbackId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});

test("Delete Feedback by ID", async () => {
    const res = await api
      .delete(`/feedbacks/${feedbackId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });


  test("Delete All Feedback", async () => {
    const res = await api
      .delete(`/feedbacks`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
afterAll(async () => {
  await mongoose.connection.close();
});
