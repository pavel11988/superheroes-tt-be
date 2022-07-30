const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const { Superhero } = require("../../models/");
const { setupDB } = require("./test-setup");

describe("test add superhero", () => {
  setupDB("add-superhero-test");

  test("ERROR test add superhero route", async () => {
    const res = await request(app).post("/api/superheroes");
    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(422);
    expect(res.body).toEqual({
      message: "nickname is required and must have minimum 3 characters.",
    });
  });

  test("SUCCESS test add superhero route", async () => {
    const addedSuperhero = {
      nickname: "Test nickname",
      real_name: "Test real name",
      origin_description: "Test origin description",
      superpowers: "Test superpowers",
      catch_phrase: "Test catch phrase",
    };

    const res = await request(app)
      .post("/api/superheroes")
      .send(addedSuperhero);
    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(201);
    const newSuperhero = res.body;
    const superhero = await Superhero.findById(newSuperhero._id);
    expect(newSuperhero._id).toBe(superhero.id);
  });
});
