const expect = require("expect");
const rewire = require("rewire");

const app = rewire("./app");

describe("App", () => {
  const db = {
    saveUser: expect.createSpy()
  }
  app.__set__("db", db);

  it("should call saveUser with user object", () => {
    const email = "joan@example.com";
    const password = "12345";
    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalled();
  });

  it("should call the spy correctly", () => {
    var spy = expect.createSpy();
    spy("Joan", 31);
    expect(spy).toHaveBeenCalledWith("Joan", 31);
  });
})
