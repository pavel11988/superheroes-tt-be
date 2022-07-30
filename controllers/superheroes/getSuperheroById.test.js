const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { Superhero } = require("../../models/");
const { DB_HOST_TEST, PORT = 4003 } = process.env;

describe("test get by id superhero", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(4003);
    mongoose.connect(DB_HOST_TEST);
  }, 5000);

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    mongoose.connection.close();
    server.close();
  }, 5000);
  test("ERROR test get by id superhero route", async () => {
    const errorId = "123456";

    const res = await request(app).delete(`/api/superheroes/${errorId}`);
    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ message: "Not Found" });
  });

  test("SUCCESS test get by id superhero route", async () => {
    const addedSuperhero = {
      nickname: "Test nickname",
      real_name: "Test real name",
      origin_description: "Test origin description",
      superpowers: "Test superpowers",
      catch_phrase: "Test catch phrase",
    };

    //create new user
    const resAddedSuperhero = await request(app)
      .post("/api/superheroes")
      .send(addedSuperhero);
    const { _id } = resAddedSuperhero.body;

    // find new user
    const res = await request(app).get(`/api/superheroes/${_id}`);
    const superhero = await Superhero.findById(_id);

    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(200);
    expect(res.body.data._id).toBe(superhero.id);
  });
});
