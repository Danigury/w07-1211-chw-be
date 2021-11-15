const User = require("../../database/models/user");
const { getUsers } = require("./usersControllers");

jest.mock("../../database/models/user");

describe("Given a getUsers function", () => {
  describe("When it's invoked", () => {
    test("Then it should respond with an array of users", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const req = null;
      const users = [
        {
          username: "lokotron",
        },
        {
          username: "lokotronco",
        },
      ];

      User.find = jest.fn().mockReturnThis();
      User.populate = jest.fn().mockResolvedValue(users);
      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke next with the error 400 and message", async () => {
      const req = null;
      const next = jest.fn();
      const res = null;
      const error = new Error("I can't find users");
      error.code = 400;
      User.find = jest.fn().mockReturnThis();
      User.populate = jest.fn().mockRejectedValue(error);

      await getUsers(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next).toHaveBeenLastCalledWith(error);
    });
  });
});
