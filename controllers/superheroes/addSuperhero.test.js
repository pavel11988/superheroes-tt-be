// const mongoose = require("mongoose");
// const request = require("supertest");
// require("dotenv").config();

// const app = require("../../app");
// const { Superhero } = require("../../models/");

// const { DB_TEST_HOST, PORT } = process.env;

// describe("test add superhero", () => {
//   let server;
//   beforeAll(() => (server = app.listen(PORT)));
//   afterAll(() => server.close());

//   beforeEach((done) => {
//     mongoose.connect(DB_TEST_HOST).then(() => done());
//   }, 60000);

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection(() => {
//       mongoose.connection.close(() => done());
//     });
//   }, 60000);

//   test("test login route", async () => {
//     const test = true;

//     expect(test).toByTruthy();
//   });
// });
