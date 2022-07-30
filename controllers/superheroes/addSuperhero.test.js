const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { Superhero } = require("../../models/");

const { DB_TEST_HOST, PORT } = process.env;

describe("test add superhero", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(PORT);
    mongoose.connect(DB_TEST_HOST);
  }, 5000);

  afterAll(async () => {
    await mongoose.connection.superheroes-db-test.drop();
    await mongoose.connection.close();
    server.close();
}, 5000);
;
test("test add superhero route", async () => {
    const res = await request(app).post('/api/superheroes');
    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(422);
    expect(res.body).toEqual({"message": "nickname is required and must have minimum 3 characters."})
  });
});
