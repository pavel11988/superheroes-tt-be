"use strict";

var mongoose = require("mongoose");

var request = require("supertest");

require("dotenv").config();

var app = require("../../app");

var _require = require("../../models/user"),
    User = _require.User;

var _process$env = process.env,
    DB_TEST_HOST = _process$env.DB_TEST_HOST,
    PORT = _process$env.PORT;
describe("test auth routes", function () {
  var server;
  beforeAll(function () {
    return server = app.listen(PORT);
  });
  afterAll(function () {
    return server.close();
  });
  beforeEach(function (done) {
    mongoose.connect(DB_TEST_HOST).then(function () {
      return done();
    });
  });
  afterEach(function (done) {
    mongoose.connection.db.dropCollection(function () {
      mongoose.connection.close(function () {
        return done();
      });
    });
  });
  test("test login route", function _callee() {
    var newUser, user, loginUser, response, body, _ref, token;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newUser = {
              email: "bogdan@gmail.com",
              password: "123456"
            };
            _context.next = 3;
            return regeneratorRuntime.awrap(User.create(newUser));

          case 3:
            user = _context.sent;

            /*
                1. Проверить правильность получаемого ответа на 
                AJAX-запрос документации
                2. Проверить что в базу записался нужный элемент.
                */
            loginUser = {
              email: "bogdan@gmail.com",
              password: "123456"
            };
            _context.next = 7;
            return regeneratorRuntime.awrap(request(app).post("/api/auth/login").send(loginUser));

          case 7:
            response = _context.sent;
            expect(response.statusCode).toBe(200);
            body = response.body;
            expect(body.token).toByTruthy();
            _context.next = 13;
            return regeneratorRuntime.awrap(User.findById(user._id));

          case 13:
            _ref = _context.sent;
            token = _ref.token;
            expect(body.token).toBe(token);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});