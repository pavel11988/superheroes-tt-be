const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const { Superhero } = require("../../models/");
const { setupDB } = require("./test-setup");

describe("test list superheroes", () => {
  setupDB("list-superheroes-test");
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
