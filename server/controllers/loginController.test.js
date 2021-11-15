require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");
const { userLogin, userSignUp } = require("./loginControllers");

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given a userLogin function", () => {
  describe("When it receives a request with an incorrect username", () => {
    test("Then it should invoke the next function with an error and status 401", async () => {
      const usernameTesting = "Durruti";
      const req = {
        body: {
          username: usernameTesting,
        },
      };
      const res = {};
      User.findOne = jest.fn().mockResolvedValue(false);
      const error = new Error("Wrong credentials");
      error.code = 401;

      const next = jest.fn();
      await userLogin(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
  describe("When it receives a request with an correct username and incorrect password", () => {
    test("Then it should invoke the next function with an error ", async () => {
      const req = {
        body: {
          username: "durruti",
          password: "cnt",
        },
      };
      const res = {};
      User.findOne = jest.fn().mockResolvedValue({
        username: "durruti",
        password: "cnt",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const error = new Error("Wrong credentials");
      error.code = 401;

      const next = jest.fn();
      await userLogin(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
  describe("When it receives a request with an correct username and correct password", () => {
    test("Then it should invoke res.json with an object and a token ", async () => {
      const req = {
        body: {
          username: "durruti",
          password: "cnt",
        },
      };
      const res = {
        json: jest.fn(),
      };

      User.findOne = jest.fn().mockResolvedValue({
        username: "durruti",
        password: "cnt",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const expectedtoken = "token";
      jwt.sign = jest.fn().mockReturnValue(expectedtoken);

      const next = jest.fn();
      await userLogin(req, res, next);

      const expectedResponse = {
        token: expectedtoken,
      };

      await userLogin(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});

describe("Given a userSignUp function", () => {
  describe("When it receives a request with an incorrect username", () => {
    test("Then it should invoke the next function with an error and status 400", async () => {
      const usernameTest = "durruti";
      const req = {
        body: {
          usernameTest,
        },
      };
      const res = {};
      User.findOne = jest.fn().mockResolvedValue(true);
      const error = new Error("Username already taken");
      error.code = 400;

      const next = jest.fn();
      await userSignUp(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
  describe("When it receives a request with a new username", () => {
    test("Then it should respond with a new user ", async () => {
      const newUserTest = {
        name: "David",
        password: "pepino",
        username: "David",
        age: 37,
        bio: "LOL",
        image: "url",
        imageLocal: "url",
        friends: [],
        enemies: [],
      };

      const req = {
        body: newUserTest,
      };

      const res = {
        json: jest.fn(),
      };

      User.findOne = jest.fn().mockResolvedValue();

      await userSignUp(req, res);
      console.log(res.json);

      expect(res.json).toHaveBeenCalledWith(newUserTest);
    });
  });
});
