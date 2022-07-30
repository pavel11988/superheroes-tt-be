const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { Superhero } = require("../../models/");
const { DB_HOST_TEST, PORT = 4004 } = process.env;

describe("test delete superhero", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(4002);
    mongoose.connect(DB_HOST_TEST);
  }, 5000);

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    mongoose.connection.close();
    server.close();
  }, 5000);
  test("ERROR test delete superhero route", async () => {
    const errorId = "123456";

    const res = await request(app).delete(`/api/superheroes/${errorId}`);
    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ message: "Not Found" });
  });

  test("SUCCESS test delete superhero route", async () => {
    const addedSuperhero = {
      nickname: "Test nickname",
      real_name: "Test real name",
      origin_description: "Test origin description",
      superpowers: "Test superpowers",
      catch_phrase: "Test catch phrase",
    };

    //create new user
    const crearedSuperhero = await request(app)
      .post("/api/superheroes")
      .send(addedSuperhero);
    const newSuperhero = crearedSuperhero.body;

    // delete new user
    const res = await request(app).delete(
      `/api/superheroes/${newSuperhero._id}`
    );
    const superhero = await Superhero.findById(newSuperhero._id);

    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(200);
    expect(res.body).toBe("");
  });
});
