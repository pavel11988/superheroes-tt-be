const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const { Superhero } = require("../../models/");
const { setupDB } = require("./test-setup");

describe("test update superhero", () => {
  setupDB("update-superhero-test");
  test("ERROR test update superhero route", async () => {
    const res = await request(app).post("/api/superheroes");
    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(422);
    expect(res.body).toEqual({
      message: "nickname is required and must have minimum 3 characters.",
    });
  });

  test("SUCCESS test update superhero route", async () => {
    const addedSuperhero = {
      nickname: "Test nickname",
      real_name: "Test real name",
      origin_description: "Test origin description",
      superpowers: "Test superpowers",
      catch_phrase: "Test catch phrase",
    };

    //create superhero
    const resAddedSuperhero = await request(app)
      .post("/api/superheroes")
      .send(addedSuperhero);
    const addedSuperheroId = resAddedSuperhero.body._id;

    const updatedSuperhero = {
      nickname: "Test nickname",
      real_name: "Test real name",
      origin_description: "Test origin description",
      superpowers: "Test superpowers",
      catch_phrase: "Test catch phrase",
    };

    const res = await request(app)
      .put(`/api/superheroes/${addedSuperheroId}`)
      .send(updatedSuperhero);
    const updatedSuperheroData = res.body;
    const superhero = await Superhero.findById(updatedSuperheroData._id);

    expect(res.type).toEqual("application/json");
    expect(res.status).toEqual(200);
    expect(updatedSuperheroData._id).toBe(superhero.id);
  });
});
