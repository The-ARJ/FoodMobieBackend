const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");

const notification = {
  title: "Important Announcement Scheduled 2",
  description:
    "There will be a meeting tomorrow at 10am in the conference room.",
  time: "13:50",
};

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDZlNjQwNTI5ZjI4MTVhMGQ5ODRjOSIsImVtYWlsIjoidXNlckAxMjM0Z21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4MTczNzY4LCJleHAiOjE2NzgyNjAxNjh9.PPklFkN8ok4WShitmGbIRTg4QxbtCZEYWzixlageH-Y";

beforeAll(async () => {
  //   await Foods.deleteMany({});
});

test("Get Notification", async () => {
  const res = await api
    .post("/notifications")
    .set("Authorization", `Bearer ${token}`) // set the Authorization header with the token
    .send(notification)
    .expect(201);
  notId = res.body.notification._id; // set the foodId for the next test
});
test("Get Notification", async () => {
  await api
    .get("/notifications")
    .set("Authorization", `Bearer ${token}`) // set the Authorization header with the token
    .expect(200)
    .expect((res) => {
      //   expect(res.body.status).toContain("Unexpected field");
    });
});

test("Get Notificaiton by ID", async () => {
  const res = await api
    .get(`/notifications/${notId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});

test("Delete Notification by ID", async () => {
    const res = await api
      .delete(`/notifications/${notId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });


  test("Delete All Notification", async () => {
    const res = await api
      .delete(`/notifications`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
afterAll(async () => {
  await mongoose.connection.close();
});
