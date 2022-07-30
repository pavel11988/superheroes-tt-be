const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const { Superhero } = require("../../models/");
const { setupDB } = require("./test-setup");

describe("test delete superhero", () => {
  setupDB("delete-superhero-test");

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
