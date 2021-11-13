const { notFoundErrorHandler, generalErrorHandler } = require("./error");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given a notFoundErrorHandler", () => {
  describe("When it's invoke", () => {
    test("Then it should response with an error status 404 and message", () => {
      const res = mockRes();

      notFoundErrorHandler(null, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Endpoint not found" });
    });
  });
});

describe("Given a generalErrorHandler function", () => {
  describe("When it receives an object error a code and message", () => {
    test("Then it should invoke status method with it's code, json and it's message", () => {
      const res = mockRes();
      const error = { code: 600, message: "Invalid request" };

      generalErrorHandler(error, null, res);
      expect(res.status).toHaveBeenCalledWith(600);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("When it receives an empty object error and an object res", () => {
    test("Then it should invoke status method with it's code, json and it's message", () => {
      const res = mockRes();
      const error = {};

      generalErrorHandler(error, null, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "General ERROR" });
    });
  });
});
