const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { Superhero } = require("../../models/");
const { DB_HOST_TEST, PORT = 4000 } = process.env;

describe("test list superheroes", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(PORT);
    mongoose.connect(DB_HOST_TEST);
  }, 5000);

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    mongoose.connection.close();
    server.close();
  }, 5000);
  test("ERROR list superheroes route", async () => {
    const badReq = "some_text";

    const res = await request(app).get(`/api/superheroes/${badReq}`);
    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ message: "Not Found" });
  });

  test("SUCCESS list superheroes route", async () => {
    const res = await request(app).get(`/api/superheroes?page=1&limit=5`);
    const superheroes = await Superhero.find({}, {});

    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(200);
    expect(res.body.data).toEqual(superheroes);
  });
});
